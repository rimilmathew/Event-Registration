# Database Setup Guide

## Database Engine

This project uses **SQLite** as the database engine through Django ORM.

**Configuration**

* Engine: `django.db.backends.sqlite3`
* Database File: `db.sqlite3`
* Settings File: `eventplatform/settings.py`

The database file is created automatically when migrations are executed for the first time.

---

## Prerequisites

Before setting up the database, ensure that:

* Python is installed
* Project dependencies are installed

```bash
pip install -r requirements.txt
```

Navigate to the Django project directory:

```bash
cd eventmgnt-api/eventplatform
```

---

## Database Initialization

Apply all migrations:

```bash
python manage.py migrate
```

Verify migration status:

```bash
python manage.py showmigrations
```

This command creates the SQLite database and all required tables.

---

## Database Schema Overview

The core models are located in:

```text
eventmgnt-api/eventplatform/events/models.py
```

### User

Custom authentication model using email-based login.

Fields:

* `id`
* `name`
* `email` (unique)
* `password` (hashed)
* `created_at`

Authentication Configuration:

```python
USERNAME_FIELD = "email"
```

Notes:

* Username-based authentication is not used.
* Email addresses must be unique.

---

### Event

Fields:

* `id`
* `title`
* `description`
* `date`
* `location`
* `created_at`

---

### Registration

Fields:

* `id`
* `user` (ForeignKey → User)
* `event` (ForeignKey → Event)
* `registered_at`

Constraint:

* Unique `(user, event)` combination to prevent duplicate registrations.

---

## Updating the Database Schema

Whenever models are modified:

```bash
python manage.py makemigrations
python manage.py migrate
```

Review generated migrations before applying them in production environments.

---

## Admin Setup

Create an administrator account:

```bash
python manage.py createsuperuser
```

Start the development server:

```bash
python manage.py runserver
```

Access the Django Admin Panel:

```text
http://127.0.0.1:8000/admin/
```

The admin panel can be used to:

* Create and manage events
* View registered users
* Manage event registrations

---

## JWT Blacklist Support

The project uses Simple JWT token blacklisting.

Required migrations are applied automatically when running:

```bash
python manage.py migrate
```

provided that:

```python
'rest_framework_simplejwt.token_blacklist'
```

is included in `INSTALLED_APPS`.

---

## Operational Notes

Current configuration is intended for development:

* SQLite database
* Local Django development server


