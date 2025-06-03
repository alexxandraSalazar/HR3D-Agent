# 📃 Contributing Guidelines ✏️

Welcome! To maintain consistency and ensure a smooth workflow for everyone, please follow the guidelines below.

---

## 📌 Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/alexxandraSalazar/HR3D-Agent.git
   ```
2. **Create and activate virtual environment** 

   ```bash
   cd HR3D-AGENT
   python -m venv venv
   ./venv/Scripts/activate
   ```
3. **Install dependencies** 

   ```bash
   pip install -r requirements.txt
   ```
4. **Creat .envs files for develop and production**

   ```bash
   cd backend
   ```
   _Create '.env.dev' file and '.env.prod' files_

   ```bash
   backend/
      ├── apps/
      ├── core/
      │   ├── settings/
      │   │   ├── base.py
      │   │   ├── dev.py
      │   │   ├── prod.py
      │   │   └── __init__.py
      │   ├── asgi.py
      │   ├── urls.py
      │   └── wsgi.py
      ├── .env.dev           ← add .env.dev variables
      ├── .env.prod          ← add .env.prod variables
      ├── manage.py
   ```
4. **Apply migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. **Run in dev**
   ```bash
   python manage.py runserver --settings=core.settings.dev
   ```

## 📌 Workflow

1. **Start from the `develop` branch.**  
   Never work directly on `main`.

2. **Create your own feature branch** using the following naming convention:  `your-stack/your-first-name`.


3. **Commit your changes** to your feature branch using [Conventional Commits](https://www.conventionalcommits.org/). See below for syntax.

4. **Create a Pull Request (PR)** from your branch into `develop`.

5. **Assign a reviewer**: Choose an available team member for code review.  
Pull requests **must be reviewed** by someone else before merging.

6. **NEVER** open a PR directly to `main`.

---




## 📌 Commit Messages – Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to make commit history readable and automate changelogs.

### Format:

`<type>(optional-scope): <short summary>`


###  Common types:

| Type       | Description                             |
|------------|-----------------------------------------|
| `feat`     | A new feature                           |
| `fix`      | A bug fix                               |
| `docs`     | Documentation changes                   |
| `style`    | Formatting (tabs, spaces, etc.)         |
| `refactor` | Code changes that neither fix nor add   |
| `test`     | Adding or fixing tests                  |
| `chore`    | Maintenance tasks (e.g., build config)  |

###  Example:

```bash
"feat(backend): add user login endpoint"
-m "fix(frontend): fix button alignment issue"
-m "docs(readme): update installation guide"
```



