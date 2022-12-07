from django.urls import path
from .views import StudioListView, StudioDetailView, ClassScheduleView, StudioSearchFilterView, ClassEnrolAllView, ClassTimeEnrolView, ClassTimeDropView, ClassDropAllView, ClassSearchFilterView, ClassListView

app_name = 'studios'
urlpatterns = [
    # path('list/lat=<str:latitude>&long=<str:longitude>', StudioListView.as_view()),
    path('list/', StudioListView.as_view()),
    path('<int:studio_id>/details/', StudioDetailView.as_view()),
    path('<int:studio_id>/classes/schedule/', ClassScheduleView.as_view()),
    path('<int:studio_id>/classes/list/', ClassListView.as_view()),
    path('search/', StudioSearchFilterView.as_view()),
    path('<int:studio_id>/classes/<int:class_id>/enrol_all/',
         ClassEnrolAllView.as_view()),
    path('classtime/<int:classtime_id>/enrol/',
         ClassTimeEnrolView.as_view()),
    path('<int:studio_id>/classes/<int:class_id>/drop_all/',
         ClassDropAllView.as_view()),
    path('classtime/<int:classtime_id>/drop/',
         ClassTimeDropView.as_view()),
    path('classes/search/', ClassSearchFilterView.as_view())
]
