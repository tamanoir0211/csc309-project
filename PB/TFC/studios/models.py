from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import CASCADE
import datetime
from django.core.exceptions import ValidationError

# Create your models here.


class Location(models.Model):
    latitude = models.DecimalField(max_digits=8, decimal_places=6, validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.DecimalField(max_digits=9, decimal_places=6, validators=[MinValueValidator(-180), MaxValueValidator(180)])
    address = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=50)

    def __str__(self):
        return self.address


class Studio(models.Model):
    name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)
    location = models.OneToOneField(Location, on_delete=CASCADE)

    def __str__(self):
        return self.name


class StudioImages(models.Model):
    image = models.ImageField()
    studio = models.ForeignKey(Studio, on_delete=CASCADE)

    class Meta:
        verbose_name_plural = "Studio images"


class StudioAmenities(models.Model):
    type = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    studio = models.ForeignKey(Studio, on_delete=CASCADE)

    class Meta:
        verbose_name_plural = "Studio amenities"

    def __str__(self):
        return self.studio.name + " - " + self.type


class Coach(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Coaches"

    def __str__(self):
        return self.name


class Class(models.Model):
    DAY_CHOICES = (
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    capacity = models.PositiveIntegerField()
    range_date_start = models.DateField()
    range_date_end = models.DateField()
    day = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    end_time = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    studio = models.ForeignKey(Studio, on_delete=CASCADE)
    coach = models.ForeignKey(Coach, on_delete=CASCADE)

    class Meta:
        verbose_name_plural = "Classes"

    def clean(self):
        super(Class, self).clean()
        if self.start_time >= self.end_time:
            raise ValidationError('End time cannot be earlier than start time')
        if self.range_date_start >= self.range_date_end:
            raise ValidationError('End date cannot be earlier than start date')

    def save(self, *args, **kwargs):
        created = self.pk
        super().save(*args, **kwargs)
        if not created:
            date = find_date(self.range_date_start, self.day)
            while date < self.range_date_end:
                time = datetime.time(self.start_time, 0)
                start = datetime.datetime.combine(date, time)
                ClassTime.objects.create(classes=self, time=start)
                date += datetime.timedelta(days=7)
        else:
            all_classes = ClassTime.objects.filter(classes=self)
            new_range_start = self.range_date_start
            new_range_end = self.range_date_end
            for each_class in all_classes:
                if not (new_range_start <= each_class.time.date() < new_range_end):
                    each_class.status = False
                    each_class.save()
                else:
                    pass

    def __str__(self):
        return self.name


class ClassKeyword(models.Model):
    keyword = models.CharField(max_length=100)
    classes = models.ForeignKey(Class, on_delete=CASCADE)

    def __str__(self):
        return self.classes.name + ' - ' + self.keyword


def find_date(date, day):
    today = datetime.date.today()
    diff = day - date.weekday()
    if diff <= 0:
        diff += 7
    return today + datetime.timedelta(diff)


class ClassTime(models.Model):
    STATUS_CHOICES = (
        (True, 'Scheduled'),
        (False, 'Cancelled'),
    )
    classes = models.ForeignKey(Class, on_delete=CASCADE)
    status = models.BooleanField(default=True, choices=STATUS_CHOICES)
    time = models.DateTimeField()

    def __str__(self):
        return self.classes.name + ' - ' + self.time.strftime("%Y-%m-%d %H:%M")
