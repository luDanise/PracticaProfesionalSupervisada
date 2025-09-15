from django.contrib import admin
from django.urls import path
from core.views import SellerLoginView, CustomerLoginView, CustomerSignupView, CustomerDetailView, QueryCreateView, SellerQueriesView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/seller-login/', SellerLoginView.as_view(), name='seller-login'),
    path('api/customer-login/', CustomerLoginView.as_view(), name='customer-login'),
    path('api/customer-signup/', CustomerSignupView.as_view(), name='customer-signup'),
    path('api/customer/<int:customer_id>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('api/query/', QueryCreateView.as_view(), name='create_query'),
    path('api/seller-queries/<str:seller_user>/', SellerQueriesView.as_view(), name='seller_queries'),
]