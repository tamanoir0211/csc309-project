from django.urls import path
from .views import StudioListView, StudioDetailView

app_name = 'studios'
urlpatterns = [
    path('list/lat=<str:latitude>&long=<str:longitude>/', StudioListView.as_view()),
    path('<int:studio_id>/details/', StudioDetailView.as_view()),
]
