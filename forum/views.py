# Create your views here.
from django.http import HttpResponse
from forum.models import *
from django.template import Context, loader
from django.views.decorators.csrf import csrf_protect

from django.shortcuts import render
from django.http import Http404, HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.utils import timezone
import random

#Login view

def welcome(request):
	if not('user' in request.session.keys()):
		return render(request, "forum/welcome.html")
	else:
		return HttpResponseRedirect(reverse('home'))

def login(request):
	if not('user' in request.session.keys()):
		return render(request, "forum/login.html")
	else:
		return HttpResponseRedirect(reverse('home'))


def about(request):
		return render(request, "forum/about.html")




def travel(request):
	if ('user' in request.session.keys()):
		return render(request, "forum/travel3.html")
	else:

		context = {'error' : "first login please"}
		#print "hello3"
		return render(request, "forum/login.html" , context)
		#return HttpResponseRedirect(reverse('home'))


def contact(request):
		#print "hello3"
		return render(request, "forum/contact_us.html")
		#return HttpResponseRedirect(reverse('home'))



def perform(request):
	if ('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('home'))
	try:
		uname = request.POST['username']
		password = request.POST['password']
	except:
		context = {'error' : "Invalid Data! Please try again."}
		return render(request, "forum/login.html", context)
	u = User.objects.filter(username=uname)
	if len(u) == 0:
		#Not Registered. Render to register.html with appropriate msg
		context = {'error' : "Please register yourself first. Then Login."}
		#print "hello2"
		return render(request, "forum/login.html", context)
	else:
		if u[0].password == password:
			#User if authenticated
			request.session['user'] = u[0]
			return HttpResponseRedirect(reverse('home'))
		else:
			return render(request, "forum/perform.html")

def register(request):
	if ('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('home'))
	return render(request, "forum/register.html")

def registration(request):
	if ('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('home'))
	data = {}
	# try:
	value1 = request.POST['firstname']
	data['firstname'] = value1
	value2 = request.POST['lastname']
	data['lastname'] = value2
	value3 = request.POST['username']
	data['username'] = value3
	value4 = request.POST['password']
	data['password'] = value4
	value5 = request.POST['email']
	data['email'] = value5
	value6 = request.POST['gender']
	data['gender'] = value6
	value7 = request.POST['dob']
	data['dob'] = value7
	
	#Get all data
	u = User(firstname=data['firstname'])
	u.lastname = data['lastname']
	u.username = data['username']
	u.password = data['password']
	u.email = data['email']
	u.gender = data['gender']
	u.dob = data['dob']
	u.admin = False
	u.save()
	#except:
	#	return render(request, 'forum/register.html', data)
	return HttpResponseRedirect(reverse('login'))	

def logout(request):
	request.session.flush()
	return HttpResponseRedirect(reverse('welcome'))

def home(request):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('welcome'))
	context = {'myvar':'home'}
	return render(request, "forum/home.html", context)

def user(request, uname):
	print "Done"
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	u = User.objects.get(username=uname)
	context = {'u' : u}
	return render(request, "forum/user.html", context)

def post(request, pid):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	p = Post.objects.get(pk=pid)
	user = request.session['user']
	context = {'post': p, 'uname': user.firstname + " " + user.lastname}
	return render(request, "forum/post.html", context)

def postadd(request):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))

	return render(request,"forum/postadd.html")


def postperform(request):
	#print "Doing1 . . . "
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	#try:
	#print "Doing . . . "
	user = User.objects.get(username=request.session['user'].username)
	p = Post(author=user)

	p.timestamp = timezone.now()
	p.description = request.POST['description']
	p.save()
	#except:
	#	context = {"error" : "Please try again later"}
	#	return render(request, "forum/postadd.html", context)
	print "Done"
	return HttpResponseRedirect(reverse('forum'))


def postdelete(request,pid):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	p = Post.objects.get(pk=pid)
	user = request.session['user']
    #if (p.author.username == user):
    #	p.delete()




def forum(request):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	ps = Post.objects.all()
	context = {'posts' : ps }
	return render(request, "forum/forum.html", context)


def city(request,cname):
	#print "come on "
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	cn = City.objects.get(name = cname)
	#print cn
	context = {'cn' : cn}
	return render(request, "forum/city.html", context)

def maincity(request):
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	return render(request, "forum/maincity.html")

def kohinoor(request):
	#print request
	#print posts
	#comperform(request,int(random.random()*1000000000))
	comperform(request,2)

def comperform(request,pid):
	print 'hello';
	if not('user' in request.session.keys()):
		return HttpResponseRedirect(reverse('login'))
	user = User.objects.get(username=request.session['user'].username)
	p = Comment(post=pid)
	p = Comment(author=user)
	p.timestamp = timezone.now()
	p.description = request.Comment['description']
	p.save()
	print "Done"
	return HttpResponseRedirect(reverse('forum'))

