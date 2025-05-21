# 🚀 Workflow Repo for the CA

## 📖 Description 
A template repository for managing workflows in CA projects, supporting automated testing and streamlined development.

## 📚 Table of Contents
- [Installation](#-installation)
- [Development](#-development)
- [Testing](#-testing)
- [View all scripts](#-view-all-scripts)

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
gh repo clone FransoArbela/workflow-repo-ca
cd workflow-repo-ca
npm install
```

## 🛠️ Development

``` bash
npm run dev
```

## 🧪 Testing
Run playwright & view the reports
```bash
npx playwright test
npx playwright show-report
```
Vitest
```bash
npx vitest run
```

## ℹ️ View-all-scripts
If you right click on the project folder name and check on the "NPM Scripts"...

![image](https://github.com/user-attachments/assets/ef0915f7-b4ee-422a-9d77-9bd52f3bb83d)

It'll show a section with the same name, there you can see all the scripts that you can run in the project

![image](https://github.com/user-attachments/assets/e8c22faf-a0aa-406a-9f76-9e73c862e1e8)

## 🔐 Environment Variables

The project expects the following environment variables in a `.env` file, the variables must be a valid email and password for the playwright test to work:

TEST_USER_EMAIL=
TEST_USER_PASSWORD=
