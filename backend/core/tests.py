from django.test import TestCase, Client
from django.urls import reverse
from core.models import City, Customer, Query, Seller
import json

# Tests del modelo Customer
class CustomerModelTest(TestCase):
    def test_creacion_cliente_basico(self):
        cliente = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123"
        )
        self.assertEqual(cliente.first_name, "Luciana")
        self.assertEqual(cliente.email, "luciana@test.com")
        self.assertIsNone(cliente.birthDate)

    def test_cliente_con_provincia(self):
        cliente = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123",
            province="Buenos Aires"
        )
        self.assertEqual(cliente.province, "Buenos Aires")

    def test_consultas_asociadas_a_cliente(self):
        cliente = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123"
        )
        Query.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            phone=123456789,
            general_reason="Consulta 1",
            city="Adrogue",
            Customer=cliente
        )
        self.assertEqual(cliente.consultas.count(), 1)


# Tests del modelo Seller
class SellerModelTest(TestCase):
    def test_creacion_vendedor(self):
        vendedor = Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )
        self.assertEqual(vendedor.city, "Adrogue")
        self.assertEqual(vendedor.user, "carlos.adrogue")

    def test_ciudad_valida_en_choices(self):
        ciudades_validas = [choice[0] for choice in City.choices()]
        self.assertIn("Adrogue", ciudades_validas)
        self.assertIn("LaPlata", ciudades_validas)

    def test_user_unico_en_seller(self):
        Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )
        with self.assertRaises(Exception):
            Seller.objects.create(
                first_name="Otro",
                last_name="Vendedor",
                city="CABA",
                user="carlos.adrogue",
                password="clave456"
            )


# Tests del modelo Query
class QueryModelTest(TestCase):
    def setUp(self):
        self.cliente = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123"
        )
        self.vendedor = Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )

    def test_creacion_consulta_con_cliente_y_vendedor(self):
        consulta = Query.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            phone=123456789,
            general_reason="Consulta de prueba",
            city="Adrogue",
            Customer=self.cliente,
            assigned_seller=self.vendedor
        )
        self.assertEqual(consulta.Customer.email, "luciana@test.com")
        self.assertEqual(consulta.assigned_seller.user, "carlos.adrogue")

    def test_consulta_sin_cliente_ni_vendedor(self):
        consulta = Query.objects.create(
            first_name="Anonimo",
            last_name="SinCliente",
            email="anonimo@test.com",
            phone=111111111,
            general_reason="Consulta sin asignación",
            city="Quilmes"
        )
        self.assertIsNone(consulta.Customer)
        self.assertIsNone(consulta.assigned_seller)


# Test de creación de consulta vía vista POST
class QueryCreateViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.customer = Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123"
        )

    def test_creacion_consulta_asociada_a_cliente(self):
        payload = {
            "full_name": "Luciana Test",
            "email": "luciana@test.com",
            "phone": "123456789",
            "general_reason": "Consulta desde test",
            "city": "Adrogue"
        }
        url = reverse('create_query')
        response = self.client.post(url, data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertIn("Consulta guardada correctamente", response.json()["message"])


# Test de asignación automática de vendedor
class AsignacionSellerTest(TestCase):
    def setUp(self):
        self.client = Client()
        Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )

    def test_asignacion_vendedor_por_ciudad(self):
        payload = {
            "full_name": "Luciana Test",
            "email": "luciana@test.com",
            "phone": "123456789",
            "general_reason": "Consulta con vendedor",
            "city": "Adrogue"
        }
        url = reverse('create_query')
        response = self.client.post(url, data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)