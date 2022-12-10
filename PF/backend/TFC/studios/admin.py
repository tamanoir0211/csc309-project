from django.contrib import admin
from .models import Location, Studio, StudioImages, StudioAmenities, Coach, Class, ClassKeyword, ClassTime


class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'address']


class StudioImagesInline(admin.TabularInline):
    model = StudioImages


class StudioAmenitiesInline(admin.TabularInline):
    model = StudioAmenities


class StudioAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    inlines = [StudioImagesInline, StudioAmenitiesInline]


class StudioImagesAdmin(admin.ModelAdmin):
    list_display = ['id', 'studio']


class ClassKeywordInline(admin.TabularInline):
    model = ClassKeyword


class ClassTimeInline(admin.TabularInline):
    model = ClassTime
    ordering = ['time']
    # readonly_fields = ['time']

    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        #check if status has been changed. If status changed, remove user from classbooking associated with the classtime
        if obj.status == False:
            classbookings = ClassBooking.objects.filter(
                    class_time=classtime.id)
            for classbooking in classbookings:
                lassBooking.objects.filter(id=classbooking).delete()
            
            


class ClassAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'studio']
    inlines = [ClassKeywordInline, ClassTimeInline]


# Register your models here.
admin.site.register(Location, LocationAdmin)
admin.site.register(Studio, StudioAdmin)
# admin.site.register(StudioImages, StudioImagesAdmin)
# admin.site.register(StudioAmenities)
admin.site.register(Coach)
admin.site.register(Class, ClassAdmin)
# admin.site.register(ClassKeyword)
# admin.site.register(ClassTime)
