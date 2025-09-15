from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import Seller, Customer, Query
import random

@method_decorator(csrf_exempt, name='dispatch')
class SellerLoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            user = data.get('user', '').strip()
            password = data.get('password', '').strip()
            seller = Seller.objects.get(user=user)
            if seller.password == password:
                return JsonResponse({'redirect': 'http://localhost:3000/seller-index', 'first_name': seller.first_name, 'seller_id': seller.id, 'seller_user': seller.user})
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except Seller.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        except Exception as e:
            print("Error inesperado:", e)
            return JsonResponse({'error': 'Error interno'}, status=500)
        

@method_decorator(csrf_exempt, name='dispatch')
class CustomerLoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()
            customer = Customer.objects.get(email=email)
            if customer.password == password:
                return JsonResponse({'redirect': 'http://localhost:3000/customer-index', 'first_name': customer.first_name, 'customer_id': customer.id})
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        except Exception as e:
            print("Error inesperado:", e)
            return JsonResponse({'error': 'Error interno'}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class CustomerSignupView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            customer = Customer.objects.create(
                first_name=data.get('first_name', '').strip(),
                last_name=data.get('last_name', '').strip(),
                birthDate=data.get('birthDate'),
                province=data.get('province', '').strip(),
                email=data.get('email', '').strip(),
                password=data.get('password', '').strip()
            )
            return JsonResponse({'message': 'Usuario creado'}, status=201)

        except Exception as e:
            print("Error al registrar:", e)
            return JsonResponse({'error': 'Error al crear el usuario'}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class CustomerDetailView(View):
    def get(self, request, customer_id):
        try:
            customer = Customer.objects.get(id=customer_id)
            data = {
                'first_name': customer.first_name,
                'last_name': customer.last_name,
                'birthDate': customer.birthDate.strftime('%d/%m/%Y'),
                'province': customer.province,
                'email': customer.email
            }
            return JsonResponse(data, status=200)

        except Customer.DoesNotExist:
            return JsonResponse({'error': 'Cliente no encontrado'}, status=404)


@method_decorator(csrf_exempt, name='dispatch')
class QueryCreateView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            full_name = data.get('full_name', '').strip()
            if ' ' in full_name:
                first_name, last_name = full_name.split(' ', 1)
            else:
                first_name = full_name
                last_name = ''
            city = data.get('city', '').strip().title()
            email = data.get('email', '').strip()
            sellers_list = list(Seller.objects.filter(city__iexact=city))
            assigned_seller = random.choice(sellers_list) if sellers_list else None
            try:
                customer = Customer.objects.get(email__iexact=email)
            except Customer.DoesNotExist:
                customer = None
            query = Query.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                phone=data.get('phone', ''),
                general_reason=data.get('general_reason', ''),
                city=city,
                Customer=customer,
                assigned_seller=assigned_seller
            )
            return JsonResponse({'message': 'Consulta guardada correctamente'}, status=201)

        except Exception as e:
            print("Error al crear la consulta:", e)
            return JsonResponse({'error': str(e)}, status=400)
        
        
@method_decorator(csrf_exempt, name='dispatch')
class SellerQueriesView(View):
    def get(self, request, seller_user):
        try:
            seller = Seller.objects.get(user=seller_user)
            queries = Query.objects.filter(assigned_seller=seller)
            data = [{
                'first_name': q.first_name,
                'last_name': q.last_name,
                'email': q.email,
                'phone': q.phone,
                'general_reason': q.general_reason,
                'city': q.city,
                'created_at': q.created_at.strftime('%d/%m/%Y')
            } for q in queries]
            return JsonResponse({'queries': data}, status=200)

        except Seller.DoesNotExist:
            return JsonResponse({'error': 'Vendedor no encontrado'}, status=404)