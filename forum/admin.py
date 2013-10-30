from django.contrib import admin
import forum.models as m

admin.site.register(m.User)
admin.site.register(m.Post)
admin.site.register(m.Comment)