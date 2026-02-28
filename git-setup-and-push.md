# BuyCalc — Push to GitHub

**Repo:** [https://github.com/workbyaria/BuyCalc.git](https://github.com/workbyaria/BuyCalc.git)  
**Branch:** `main`

Open Cursor’s integrated terminal in the **BuyCalc** project folder, then run the commands below in order. Works on **macOS** and **Windows** (PowerShell / CMD).

---

## Step-by-step commands (copy-paste)

```bash
git init
git remote add origin https://github.com/workbyaria/BuyCalc.git
git add .
git commit -m "Initial commit: BuyCalc app"
git branch -M main
git push -u origin main
```

---

## Later: sync changes

```bash
git add .
git commit -m "Your message"
git push
```

---

## Troubleshooting

### 1. `git` command not found

- **Windows:** Install [Git for Windows](https://git-scm.com/download/win), then restart the terminal.
- **macOS:** Run `xcode-select --install` in Terminal, or install from [git-scm.com](https://git-scm.com/download/mac).

### 2. Remote `origin` already exists

Replace the existing remote URL:

```bash
git remote set-url origin https://github.com/workbyaria/BuyCalc.git
```

### 3. Branch is `master` instead of `main`

Rename and push:

```bash
git branch -M main
git push -u origin main
```

### 4. Push rejected — remote has commits (e.g. README)

Pull with rebase, then push:

```bash
git pull origin main --rebase
git push -u origin main
```

If the remote default is still `master`:

```bash
git pull origin master --rebase
git branch -M main
git push -u origin main
```

### 5. Authentication (HTTPS)

- **Personal Access Token (PAT):**  
  GitHub no longer accepts account passwords for HTTPS. Create a token: [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens). Use the token as the password when `git push` asks for it.

- **GitHub CLI (easier):**  
  Install [GitHub CLI](https://cli.github.com/), then run `gh auth login` and follow the prompts. After that, `git push` uses your logged-in account.

---

*Project: BuyCalc*
