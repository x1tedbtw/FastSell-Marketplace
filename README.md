# Project Name

Brief description of the project.

## Installation and Setup

Follow these steps to get your development environment set up.

### Prerequisites

- [Python](https://www.python.org/doc/) - Programming language used
- [pipenv](https://pipenv.pypa.io/en/latest/) - Dependency manager
- [PostgreSQL](https://www.postgresql.org/docs/) - Database system
- [Gunicorn](https://docs.gunicorn.org/en/stable/) - WSGI server for production

### How to Start

1. **Install Packages**

   Use pipenv to install all dependencies. In your terminal, run:



   ```bash
   $ pipenv install
   ```


2. **Environment Variables**


   Set up your environment variables, using a .env file.



3. **Activate Virtual Environment**

To activate the virtual environment, run:



```bash
$ pipenv shell
```



4. **Database Migrations**

   
Create local database migration files:


```bash
$ python manage.py makemigrations
```


Apply the migrations to the database:
```bash
$ python manage.py migrate
```


5. **Running the Server**

   
For development:

```bash
$ python manage.py runserver
```
For production with Gunicorn:

```bash
$ gunicorn store.wsgi:application -c gunicorn_config.py
```

6. **Gunicorn and Systemd**

 
To set up Gunicorn with systemd for automatic startup, follow [Gunicorn's deployment guide](https://docs.gunicorn.org/en/stable/deploy.html).


7. Web Server Configuration
Configure your web server (like Nginx or Apache) to serve static content and set up a reverse proxy to Gunicorn
