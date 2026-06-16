from django.contrib import admin
from events.models import User, Event, Registration

admin.site.register(User)
admin.site.register(Event)
admin.site.register(Registration)