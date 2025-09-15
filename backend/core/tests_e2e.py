import os
import json
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from playwright.sync_api import sync_playwright, expect, Browser
from core.models import Customer, Seller, Query

os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
playwright = sync_playwright().start()
headless = os.environ.get("HEADLESS", 1) == 1
slow_mo = os.environ.get("SLOW_MO", 0)

# Clase base para pruebas E2E con Playwright sobre el servidor de Django.
class PlaywrightTestCase(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.browser: Browser = playwright.chromium.launch(
            headless=headless, slow_mo=int(slow_mo)
        )

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.browser.close()

    def setUp(self):
        super().setUp()
        self.page = self.browser.new_page()

    def tearDown(self):
        super().tearDown()
        self.page.close()


# Pruebas E2E para el login de vendedores.
class SellerLoginAPITest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
        Seller.objects.create(
            first_name="Carlos",
            last_name="Adrogue",
            city="Adrogue",
            user="carlos.adrogue",
            password="clave123"
        )

    def test_login_exitoso(self):
        response = self.page.request.post(
            f"{self.live_server_url}/api/seller-login/",
            data=json.dumps({"user": "carlos.adrogue", "password": "clave123"}),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 200
        assert body["redirect"] == "http://localhost:3000/seller-index"
        assert body["seller_user"] == "carlos.adrogue"

    def test_login_fallido(self):
        response = self.page.request.post(
            f"{self.live_server_url}/api/seller-login/",
            data=json.dumps({"user": "carlos.adrogue", "password": "incorrecta"}),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 401
        assert "Contraseña incorrecta" in body["error"]


# Pruebas E2E para el login de clientes.
class CustomerLoginAPITest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
        Customer.objects.create(
            first_name="Luciana",
            last_name="Test",
            email="luciana@test.com",
            password="segura123",
            province="Buenos Aires"
        )

    def test_login_exitoso(self):
        response = self.page.request.post(
            f"{self.live_server_url}/api/customer-login/",
            data=json.dumps({"email": "luciana@test.com", "password": "segura123"}),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 200
        assert body["redirect"] == "http://localhost:3000/customer-index"
        assert body["first_name"] == "Luciana"

    def test_login_email_inexistente(self):
        response = self.page.request.post(
            f"{self.live_server_url}/api/customer-login/",
            data=json.dumps({"email": "no@existe.com", "password": "algo"}),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 404
        assert "Usuario no encontrado" in body["error"]

    def test_formato_json_aceptado_por_backend(self):
        payload = {
            "email": "luciana@test.com",
            "password": "segura123"
        }
        response = self.page.request.post(
            f"{self.live_server_url}/api/customer-login/",
            data=json.dumps(payload),
            headers={"Content-Type": "application/json"}
        )
        assert response.status == 200


# Pruebas E2E para el registro de nuevos clientes.
class CustomerSignupAPITest(PlaywrightTestCase):
    def test_registro_exitoso(self):
        payload = {
            "first_name": "Luciana",
            "last_name": "Test",
            "birthDate": "1990-01-01",
            "province": "Buenos Aires",
            "email": "luciana@test.com",
            "password": "segura123"
        }
        response = self.page.request.post(
            f"{self.live_server_url}/api/customer-signup/",
            data=json.dumps(payload),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 201
        assert body["message"] == "Usuario creado"


# Pruebas E2E para la creación de consultas por parte del cliente.
class QueryCreateAPITest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
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

    def test_creacion_consulta_exitosa(self):
        payload = {
            "full_name": "Luciana Test",
            "email": "luciana@test.com",
            "phone": "123456789",
            "general_reason": "Consulta desde E2E",
            "city": "Adrogue"
        }
        response = self.page.request.post(
            f"{self.live_server_url}/api/query/",
            data=json.dumps(payload),
            headers={"Content-Type": "application/json"}
        )
        body = response.json()
        assert response.status == 201
        assert "Consulta guardada correctamente" in body["message"]

    def test_asignacion_vendedor_por_ciudad(self):
        Seller.objects.create(
            first_name="Ana",
            last_name="LaPlata",
            city="La Plata",
            user="ana.laplata",
            password="clave456"
        )
        payload = {
            "full_name": "Luciana Test",
            "email": "luciana@test.com",
            "phone": "123456789",
            "general_reason": "Consulta desde La Plata",
            "city": "La Plata"
        }
        response = self.page.request.post(
            f"{self.live_server_url}/api/query/",
            data=json.dumps(payload),
            headers={"Content-Type": "application/json"}
        )
        assert response.status == 201


# Pruebas E2E para la visualización de consultas asignadas a un vendedor.
class SellerQueriesAPITest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
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
            phone="123456789",
            general_reason="Consulta test",
            city="Adrogue",
            assigned_seller=self.seller
        )

    def test_consultas_asignadas(self):
        response = self.page.request.get(
            f"{self.live_server_url}/api/seller-queries/carlos.adrogue/"
        )
        body = response.json()
        assert response.status == 200
        assert "queries" in body
        assert len(body["queries"]) == 1
        assert body["queries"][0]["email"] == "luciana@test.com"