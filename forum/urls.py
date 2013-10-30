from django.conf.urls import patterns, url
from forum import views

from django.views.static import *
from django.conf import settings

urlpatterns = patterns('',
	url(r'^login$', views.login, name='login'),
	url(r'^welcome$', views.welcome, name='welcome'),
	url(r'^about$', views.about, name='about'),
	url(r'^contact$', views.contact, name='contact_us'),
	url(r'^perform$', views.perform, name='performlogin'),
	url(r'^travel$', views.travel, name='travelinfo'),
	url(r'^register$', views.register, name='register'),
	url(r'^registration$',views.registration, name='registration'),
	url(r'^logout$', views.logout, name='logout'),
	url(r'^user/(?P<uname>[a-z][a-z1-9]*)$', views.user, name='user'),
	url(r'^post/(?P<pid>[1-9]+)$', views.post, name='post'),
	url(r'^post/add$',views.postadd,name='postadd'),
	url(r'^postperform$',views.postperform,name='postperform'),
	url(r'^post/delete/(?P<pid>[1-9]+)$',views.postdelete,name='postdelete'),
	url(r'^forum$', views.forum, name='forum'),
	url(r'^city/(?P<cname>[a-zA-Z][A-Za-z1-9]*)$', views.city, name ='city'),
	url(r'^city$', views.maincity, name ='maincity'),
	url(r'^$', views.home, name='home'),
	url(r'^comperform$',views.comperform , name='comperform'),
	)