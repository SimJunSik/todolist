# Environment
* Python 3.6.6
* Django 2.2.1
* sqlite3
* python virtualenv
* AWS EC2 Ubuntu 18.04

# Installation & Build
### Instance Setting
```
$ sudo apt-get update
$ sudo apt-get install git
$ sudo apt-get install python3-pip
```

### Virtual Environment
```
$ sudo pip3 install virtualenv
$ source todolist/Sripcts/activate
```

### Install Requirements
```
(todolist) $ cd todolist
(todolist) /todolist$ pip3 install -r requirements.txt
```

### Run Server
```
(todolist) /todolist$ python3 manage.py runserver 0.0.0.0:8000
```
