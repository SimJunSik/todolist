from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
from django.utils import timezone
from django.conf import settings

class User(AbstractUser) :

    def __str__(self) :

        return self.username


class TodoItem(models.Model) :

    TODOITEM_GRADE_CHOICES = {
        ('1', '중요'),
        ('2', '보통'),
        ('3', '사소')
    }

    title = models.CharField(max_length = 100, default = '')
    content = models.CharField(max_length = 255, default = '')
    deadline = models.DateTimeField(blank = True, null = True)
    owner = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True, related_name='todoitems')
    created_at = models.DateTimeField(auto_now_add=True)
    grade = models.CharField(max_length = 30, choices = TODOITEM_GRADE_CHOICES)
    is_finished = models.BooleanField(default=False)
    is_overdue = models.BooleanField(default=False)

    def __str__(self) :

        return self.title + ' - ' + self.content

    @property
    def d_day_count(self) :

        time_now = timezone.now()
        d_day = (time_now - self.deadline).days

        return d_day

    class Meta :

        ordering = ['-created_at']


class Notification(models.Model) :

    content = models.CharField(max_length = 255, default = '')
    owner = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True, related_name='notifications')
    created_at = models.DateTimeField(auto_now_add=True)
    todoitem = models.ForeignKey(TodoItem, on_delete = models.CASCADE, null = True, blank = True, related_name='todoitem_notifications')

    def __str__(self) :

        return self.content

    class Meta :

        ordering = ['-created_at']