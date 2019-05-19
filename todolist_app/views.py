from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login

def index(request) :

    # user = request.user

    user = User.objects.get(username='junsik')
    login(request, user)

    if not user.is_anonymous : 

        # print(timezone.now())

        deadline_items = TodoItem.objects.filter(deadline__isnull=False, owner=user)

        # print(deadline_items)


        for deadline_item in deadline_items :

            if (deadline_item.d_day_count > 0) and (deadline_item.is_overdue == False) :
                deadline_item.is_overdue = True
                deadline_item.save()

                if (deadline_item.is_finished == False) :
                    content = '[' + deadline_item.title + ']' + ' 마감기한이 지났습니다.'
                    new_notification = Notification.objects.create(
                        content = content,
                        owner = user,
                        todoitem = deadline_item,
                    )

        notifications = user.notifications.all()

        normal_items = TodoItem.objects.filter(deadline__isnull=True)

        context = { 'user' : user , 'deadline_items' : deadline_items , 'normal_items' : normal_items , 'notifications' : notifications }

        return render(request, 'todolist_app/index.html', context )

    else :

        return render(request, 'todolist_app/index.html')

from django.http import Http404

def add_item(request) :

    user = User.objects.get(username='junsik')
    login(request, user)

    if not user.is_anonymous :

        if request.method == 'GET' :

            notifications = user.notifications.all()

            context = { 'user' : user , 'notifications' : notifications }

            return render(request, 'todolist_app/addItem.html', context)

        if request.method == 'POST' :

            title = request.POST['title']
            content = request.POST['content']
            grade = request.POST['grade']
            deadline = request.POST['deadline']

            # print(title, content, grade, deadline)

            if not deadline :
                deadline = None

            new_todoitem = TodoItem.objects.create(
                title = title,
                content = content,
                grade = grade,
                deadline = deadline,
                owner = user,
            )

            return redirect('/show_list/')

    else :

        raise Http404


def modify_item(request, todoitem_id) :

    user = User.objects.get(username='junsik')
    login(request, user)

    if not user.is_anonymous :

        if request.method == 'GET' :

            notifications = user.notifications.all()

            todoitem = TodoItem.objects.get(id=todoitem_id)

            context = { "user" : user, "todoitem" : todoitem , 'notifications' : notifications }

            return render(request, 'todolist_app/modifyItem.html', context)



        if request.method == 'POST' :

            title = request.POST['title']
            content = request.POST['content']
            grade = request.POST['grade']
            deadline = request.POST['deadline']

            # print(title, content, grade, deadline)

            if not deadline :
                deadline = None

            todoitem = TodoItem.objects.get(id=todoitem_id)

            todoitem.title = title
            todoitem.content = content
            todoitem.grade = grade
            todoitem.deadline = deadline
            todoitem.save()

            return redirect('/show_list/')


def delete_todoitem(request, todoitem_id) :

    # print(todoitem_id)

    try :
        todoitem = TodoItem.objects.get(id=todoitem_id)
        todoitem.delete()

        # print(todoitem)

        result = { "result" : "success" }

    except :

        result = { "result" : "failed" }

    return JsonResponse(result)


def finish_todoitem(request, todoitem_id) :

    # print(todoitem_id)

    try :
        todoitem = TodoItem.objects.get(id=todoitem_id)
        todoitem.is_finished = True
        todoitem.save()

        # print(todoitem)

        result = { "result" : "success" }

    except :

        result = { "result" : "failed" }

    return JsonResponse(result)


def unfinish_todoitem(request, todoitem_id) :

    # print(todoitem_id)

    try :
        todoitem = TodoItem.objects.get(id=todoitem_id)
        todoitem.is_finished = False
        todoitem.save()

        # print(todoitem)

        result = { "result" : "success" }

    except :

        result = { "result" : "failed" }

    return JsonResponse(result)


def delete_notification(request, notification_id) :

    try :
        notification = Notification.objects.get(id=notification_id)
        notification.delete()

        result = { "result" : "success" }

    except :

        result = { "result" : "failed" }

    return JsonResponse(result)