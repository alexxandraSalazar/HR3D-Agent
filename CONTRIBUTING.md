# 📃 Contributing Guidelines ✏️

Welcome! To maintain consistency and ensure a smooth workflow for everyone, please follow the guidelines below.

---


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



