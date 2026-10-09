# 🌐 CodeAlpha Language Translation Tool

A web-based language translation application developed using Python, Flask, HTML, CSS, and JavaScript. The application allows users to translate text between multiple languages through a simple and responsive user interface.

This project was developed as part of the **CodeAlpha AI Internship**.

## ✨ Features

- 🌍 **Multi-Language Translation** — Translate text between supported languages.
- 📝 **Simple User Interface** — Enter text and select source and target languages.
- 📋 **Copy Translation** — Copy translated text to the clipboard.
- 🔊 **Text-to-Speech** — Listen to translated text using browser speech synthesis.
- 🔄 **Swap Languages** — Quickly switch the source and target languages.
- 📱 **Responsive Design** — Use the application on desktop and mobile screens.
- ⚡ **API Integration** — Retrieve translations using an external translation API.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web application framework |
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Interactive functionality |
| Requests | API communication |
| MyMemory Translation API | Translation service |

## 📁 Project Structure

```text
CodeAlpha_Language_Translation_Tool/
│
├── app.py
├── requirements.txt
├── README.md
├── .env.example
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.10 or later
- Git
- A web browser
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CodeAlpha_Language_Translation_Tool.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Open the Project Folder

```bash
cd CodeAlpha_Language_Translation_Tool
```

### 3. Create a Virtual Environment

**Windows:**

```powershell
py -m venv .venv
```

### 4. Install Dependencies

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### 5. Run the Application

```powershell
.\.venv\Scripts\python.exe app.py
```

### 6. Open the Application

Open your browser and visit:

```text
http://127.0.0.1:5000
```

The application should now be available locally.

## 🚀 How to Use

1. Open the application in your browser.
2. Enter the text you want to translate.
3. Select the source language.
4. Select the target language.
5. Click the translation button.
6. View the translated result.
7. Copy the result or use text-to-speech if supported by your browser.

## 🔌 Translation API

The application uses the MyMemory Translation API to retrieve translations.

Translation availability depends on the external service, internet connectivity, supported language pairs, and applicable usage limits.

## 🔮 Future Improvements

- Add more language options.
- Improve translation error handling.
- Add translation history.
- Provide a dark mode.
- Add downloadable translation results.
- Improve accessibility.
- Deploy the application online.

## 🎯 Project Objective

The objective of this project is to build a practical web application that demonstrates API integration, Python backend development, frontend interaction, and multilingual text translation.

## 👨‍💻 Internship Project

**Program:** CodeAlpha AI Internship  
**Project:** Language Translation Tool

## 📄 License

This project is intended for educational and portfolio purposes. Add an appropriate open-source license if you decide to distribute the project under specific reuse terms.
