from django.test import TestCase, Client
from django.urls import reverse
from core.models import Seller, Customer, Query
import json

class SellerLoginViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )

    def test_login_exitoso(self):
        payload = {"user": "carlos.adrogue", "password": "clave123"}
        response = self.client.post(reverse("seller-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["redirect"], "http://localhost:3000/seller-index")

    def test_login_contraseña_incorrecta(self):
        payload = {"user": "carlos.adrogue", "password": "malapass"}
        response = self.client.post(reverse("seller-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("Contraseña incorrecta", response.json()["error"])

    def test_login_usuario_inexistente(self):
        payload = {"user": "no.existe", "password": "algo"}
        response = self.client.post(reverse("seller-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertIn("Usuario no encontrado", response.json()["error"])


class CustomerLoginViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123",
            province="Buenos Aires"
        )

    def test_login_exitoso(self):
        payload = {"email": "luciana@test.com", "password": "segura123"}
        response = self.client.post(reverse("customer-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["redirect"], "http://localhost:3000/customer-index")

    def test_login_contraseña_incorrecta(self):
        payload = {"email": "luciana@test.com", "password": "incorrecta"}
        response = self.client.post(reverse("customer-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 401)
        self.assertIn("Contraseña incorrecta", response.json()["error"])

    def test_login_email_inexistente(self):
        payload = {"email": "no@existe.com", "password": "algo"}
        response = self.client.post(reverse("customer-login"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertIn("Usuario no encontrado", response.json()["error"])


class CustomerSignupViewTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_crea_cliente_desde_api(self):
        payload = {
            "first_name": "Luciana",
            "last_name": "Test",
            "birthDate": "1990-01-01",
            "province": "Buenos Aires",
            "email": "luciana@test.com",
            "password": "segura123"
        }
        response = self.client.post(reverse("customer-signup"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["message"], "Usuario creado")
        self.assertEqual(Customer.objects.count(), 1)


class CustomerDetailViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.customer = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            birthDate="1990-01-01",
            province="Buenos Aires",
            email="luciana@test.com",
            password="segura123"
        )

    def test_detalle_cliente_existente(self):
        url = reverse("customer-detail", args=[self.customer.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["email"], "luciana@test.com")

    def test_detalle_cliente_inexistente(self):
        url = reverse("customer-detail", args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        self.assertIn("Cliente no encontrado", response.json()["error"])


class QueryCreateViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.customer = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123"
        )
        self.seller = Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )

    def test_crea_consulta_con_asignacion(self):
        payload = {
            "full_name": "Luciana Test",
            "email": "luciana@test.com",
            "phone": "123456789",
            "general_reason": "Consulta desde test",
            "city": "Adrogue"
        }
        response = self.client.post(reverse("create_query"), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("Consulta guardada correctamente", response.json()["message"])
        self.assertEqual(Query.objects.count(), 1)


class SellerQueriesViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.seller = Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )
        Query.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            phone=123456789,
            general_reason="Consulta test",
            city="Adrogue",
            assigned_seller=self.seller
        )

    def test_consultas_asignadas_a_vendedor(self):
        url = reverse("seller_queries", args=[self.seller.user])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("queries", response.json())
        self.assertEqual(len(response.json()["queries"]), 1)

    def test_vendedor_inexistente(self):
        url = reverse("seller_queries", args=["no.existe"])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
        self.assertIn("Vendedor no encontrado", response.json()["error"])