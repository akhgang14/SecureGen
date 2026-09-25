# 🔐 SecureGen — Secure Password Generator

SecureGen is a simple full-stack password generator designed to create strong, customizable passwords based on the user's requirements.

The project combines a **React/Next.js frontend** with a **Python backend** to generate passwords securely and provide an easy-to-use interface.

## ✨ Features

* 🔑 Generate strong random passwords
* 📏 Customize password length
* 🔠 Include uppercase letters
* 🔡 Include lowercase letters
* 🔢 Include numbers
* 🔣 Include special characters
* ⚡ Fast password generation
* 🖥️ Simple and user-friendly interface
* 🔗 Full-stack frontend and backend architecture

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Python
* FastAPI
* Uvicorn

### Development Tools

* Git
* GitHub
* VS Code

## 📁 Project Structure

```text
SecureGen/
│
├── backend/
│   ├── main.py
│   ├── password_generator.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/akhgang14/SecureGen.git
cd SecureGen
```

### 2. Set up the backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://localhost:8000
```

### 3. Set up the frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

## 🔄 How It Works

```text
User
  │
  ▼
Frontend (Next.js)
  │
  │ Password configuration
  ▼
Backend API (FastAPI)
  │
  ▼
Password Generator
  │
  ▼
Generated Secure Password
  │
  ▼
Frontend
```

The user selects the desired password options through the frontend. These options are sent to the FastAPI backend, where the password is generated according to the selected requirements and returned to the frontend.

## 🔒 Security

SecureGen is intended as a learning project demonstrating password generation and full-stack application development.

For real-world security-sensitive applications, passwords should be generated and handled using carefully reviewed cryptographic libraries and appropriate security practices.

**Never reuse passwords across important accounts.**

## 🎯 Project Goals

The main goals of SecureGen are:

* Learn full-stack application development
* Understand communication between a frontend and backend
* Practice building REST APIs with FastAPI
* Practice React/Next.js development
* Understand Git and GitHub workflows
* Build a practical security-related application

## 🔮 Future Improvements

Possible future improvements include:

* Password strength indicator
* Copy-to-clipboard functionality
* Passphrase generation
* Secure password history handling
* Improved password entropy estimation
* Responsive UI improvements
* Deployment of frontend and backend
* Additional security-focused utilities

## 👩‍💻 Author

**Akhila Gangone**

GitHub: `https://github.com/akhgang14`

---

⭐ If you find this project useful, consider giving it a star!
