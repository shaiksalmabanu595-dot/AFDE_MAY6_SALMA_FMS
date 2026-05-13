# How to Push This Project to Your GitHub Repository

This guide walks you through getting the project onto your GitHub
repository at https://github.com/shaiksalmabanu595-dot/fdetraining.

## ⚠️ Security Note (Read First)

You shared your GitHub password in chat. **Please change it immediately**:

1. Go to https://github.com/settings/security
2. Click "Change password"
3. Enable two-factor authentication (2FA) while you're there
4. Never share passwords with anyone (AI or human) over chat

GitHub no longer accepts passwords for git operations — you need a
**Personal Access Token (PAT)**. The steps below walk through this.

---

## Step 1: Create a Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like `FMS-capstone`
4. Set expiration (e.g. 30 days)
5. Check the **`repo`** scope (full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token immediately** — you won't see it again. Save it somewhere safe (password manager).

---

## Step 2: Install Git (if you don't have it)

- **Windows:** Download from https://git-scm.com/download/win
- **macOS:** `brew install git` or use the installer from git-scm.com
- **Linux:** `sudo apt install git` or your distro's package manager

Verify installation:

```bash
git --version
```

---

## Step 3: Configure Git (one-time setup)

```bash
git config --global user.name "Salma"
git config --global user.email "shaiksalmabanu595@gmail.com"
```

---

## Step 4: Make Your Repository Public

1. Go to https://github.com/shaiksalmabanu595-dot/fdetraining/settings
2. Scroll all the way down to the **"Danger Zone"**
3. Click **"Change repository visibility"** → **"Make public"**
4. Confirm by typing the repository name

---

## Step 5: Extract the Project Files

Download the project zip provided in the chat, and extract it to a folder on your computer, for example:

- Windows: `C:\Users\Salma\Documents\AFDE_Salma_FMS`
- macOS/Linux: `~/Documents/AFDE_Salma_FMS`

---

## Step 6: Initialize Git and Push to GitHub

Open a terminal (PowerShell on Windows, Terminal on macOS/Linux) and `cd` into the extracted folder:

```bash
cd path/to/AFDE_Salma_FMS
```

Then run these commands one by one:

```bash
# 1. Initialize a new git repo
git init

# 2. Set the main branch
git branch -M main

# 3. Add all files
git add .

# 4. Make your first commit
git commit -m "Initial commit: project structure and full FMS implementation"

# 5. Connect to your GitHub repo
git remote add origin https://github.com/shaiksalmabanu595-dot/fdetraining.git

# 6. Push (will prompt for username + password)
git push -u origin main
```

When git asks for credentials:

- **Username:** `shaiksalmabanu595-dot`
- **Password:** paste the **Personal Access Token** you created in Step 1 (NOT your GitHub password)

---

## Step 7: Make Daily Commits (as the instructions require)

The capstone requires at least 1–2 meaningful commits per day. After
making changes:

```bash
git add .
git commit -m "Added search and filter feature"
git push
```

**Good commit message examples** (from the instructions document):

- `Added ticket creation API`
- `Implemented feedback search feature`
- `Integrated React frontend with FastAPI backend`
- `Created database schema for complaints module`
- `Fixed validation issue in borrow book workflow`

**Avoid messages like:** `update`, `changes`, `final`, `work done`, `code added`.

---

## Step 8: Run the Project Locally

After pushing, follow the setup instructions in `README.md`:

```bash
# Backend
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

In a **new terminal**:

```bash
# Frontend
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser — that's the real-time UI.

---

## Step 9: Take Screenshots

Once the app is running, capture screenshots of each page (Dashboard, Submit, List, Detail, Search results) and the Swagger UI at http://localhost:8000/docs. Save them in the `screenshots/` folder, then commit and push:

```bash
git add screenshots/
git commit -m "Added UI and API testing screenshots"
git push
```

---

## Troubleshooting

### "Repository not found" or 403 error on push

- Check that you're using the **Personal Access Token** as the password, not your GitHub password
- Check that the remote URL is correct: `git remote -v`
- Check that you have write access to the repository

### "Permission denied (publickey)"

You're using SSH instead of HTTPS. Switch to HTTPS:

```bash
git remote set-url origin https://github.com/shaiksalmabanu595-dot/fdetraining.git
```

### Git asks for the password every time

Enable a credential helper to cache your token:

```bash
# Windows
git config --global credential.helper manager

# macOS
git config --global credential.helper osxkeychain

# Linux
git config --global credential.helper cache
```

---

## What to Submit

Per the instructions document, your final submission should include:

- ✅ GitHub Repository Link (public)
- ✅ Complete Source Code (frontend + backend)
- ✅ Database Schema (`database/schema.sql`)
- ✅ README.md
- ✅ API Documentation (`docs/API.md`)
- ✅ Screenshots (`screenshots/` folder)
- ✅ Working application (you'll demo it)
