# CodeAlpha Language Translation Tool

A responsive language translation web application built for the CodeAlpha Artificial Intelligence internship Task 1.

## Features

- Text input with a 5,000-character limit
- Source and target language selectors (explicit source language selection)
- Translation through an external translation API
- Swap languages
- Copy translated text
- Browser text-to-speech where supported
- Responsive layout for desktop and mobile
- Backend input validation and helpful error messages

## Technology stack

- Python
- Flask
- Requests
- HTML, CSS, JavaScript
- MyMemory Translation API

## Requirements

- Python 3.10 or newer recommended
- Internet connection
- A modern browser

## Run locally

### Windows

1. Install Python from the official Python website and enable **Add Python to PATH** during setup.
2. Extract this project ZIP.
3. Open Command Prompt or the VS Code terminal in the `CodeAlpha_Language_Translation_Tool` folder.
4. Create a virtual environment:

   ```bash
   python -m venv .venv
   ```

5. Activate it:

   ```bash
   .venv\Scripts\activate
   ```

6. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

7. Start the server:

   ```bash
   python app.py
   ```

8. Open `http://127.0.0.1:5000` in your browser.

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`.

## Translation API note

This starter uses the MyMemory translation API at `https://api.mymemory.translated.net/get`. It requires an internet connection and is subject to the provider's current availability, usage limits, and terms. A free public service may occasionally rate-limit or reject requests. Do not rely on it for sensitive or confidential text.

For deployment or higher reliability, review the provider's current documentation and replace the API integration in `app.py` with an approved API such as Google Cloud Translation, Microsoft Translator, or a properly configured LibreTranslate instance. Keep API keys on the server in environment variables; never place secret keys in frontend JavaScript.

## Suggested GitHub repository

Repository name: `CodeAlpha_LanguageTranslationTool`

Before publishing:
- Test the app locally.
- Add screenshots to the README.
- Do not commit API secrets or `.env` files.
- Follow the CodeAlpha submission instructions provided to your batch.

## Project structure

```text
CodeAlpha_Language_Translation_Tool/
├── app.py
├── requirements.txt
├── README.md
├── .env.example
├── .gitignore
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```
