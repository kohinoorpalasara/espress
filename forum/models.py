from django.db import models

# Create your models here.
class City(models.Model):
	name = models.CharField(max_length=32)
	description = models.CharField(max_length=32)
	country = models.CharField(max_length=32)
	def getname(self):
			return self.name
	def __unicode__(self):
		return self.getname()



class User(models.Model):
	firstname = models.CharField(max_length=32)
	lastname = models.CharField(max_length=32)
	username = models.CharField(max_length=32)
	email = models.CharField(max_length=32)
	password = models.CharField(max_length=32)
	GENDER_CHOICES = ( ('M', 'Male'), ('F', 'Female'))
	gender = models.CharField(max_length=2, choices=GENDER_CHOICES)
	dob = models.DateField()
	admin = models.BooleanField()
	def getname(self):
		return self.firstname + " " + self.lastname
	def __unicode__(self):
		return self.username + " - " + self.getname()

class Post(models.Model):
	author = models.ForeignKey(User, related_name='User_Post')
	description = models.TextField()
	timestamp = models.DateTimeField()
	def __unicode__(self):
		return self.description
	def comments(self):
		return Comment.objects.filter(post=self)
		
class Comment(models.Model):
	post = models.ForeignKey(Post, related_name= 'Post_Comment')
	author = models.ForeignKey(User, related_name='User_Comment')
	description = models.TextField()
	timestamp = models.DateTimeField()
	def __unicode__(self):
		return self.description
