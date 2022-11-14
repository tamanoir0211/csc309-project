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


class ClassAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    verbose_name_plural = 'Classes'
    inlines = [ClassKeywordInline, ClassTimeInline]


# Register your models here.
admin.site.register(Location, LocationAdmin)
admin.site.register(Studio, StudioAdmin)
admin.site.register(StudioImages, StudioImagesAdmin)
admin.site.register(StudioAmenities)
admin.site.register(Coach)
admin.site.register(Class, ClassAdmin)
admin.site.register(ClassKeyword)
admin.site.register(ClassTime)
