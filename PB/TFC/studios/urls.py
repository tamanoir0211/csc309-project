from django.urls import path
from .views import StudioListView, StudioDetailView, ClassScheduleView, ClassEnrollView, ClassDropView

app_name = 'studios'
urlpatterns = [
    path('list/lat=<str:latitude>&long=<str:longitude>', StudioListView.as_view()),
    path('<int:studio_id>/details/', StudioDetailView.as_view()),
    path('<int:studio_id>/classes/schedule/', ClassScheduleView.as_view()),
    path('<int:studio_id>/classes/<int:class_id>/enroll/',
         ClassEnrollView.as_view()),
    path('<int:studio_id>/classes/<int:class_id>/drop/', ClassDropView.as_view())
]
