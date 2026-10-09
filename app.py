import os
import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# MyMemory provides a simple translation API for a beginner-friendly starter.
# For production use, check provider limits and terms, or replace this with
# Google Cloud Translation, Microsoft Translator, or a self-hosted LibreTranslate instance.
TRANSLATION_API_URL = "https://api.mymemory.translated.net/get"
REQUEST_TIMEOUT_SECONDS = 15

LANGUAGES = {
    "en": "English",
    "ta": "Tamil",
    "hi": "Hindi",
    "ml": "Malayalam",
    "te": "Telugu",
    "kn": "Kannada",
    "bn": "Bengali",
    "mr": "Marathi",
    "gu": "Gujarati",
    "pa": "Punjabi",
    "ur": "Urdu",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "it": "Italian",
    "pt": "Portuguese",
    "ru": "Russian",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese",
    "ar": "Arabic",
    "tr": "Turkish",
    "id": "Indonesian",
    "th": "Thai",
    "vi": "Vietnamese",
    "nl": "Dutch",
    "pl": "Polish",
    "sv": "Swedish",
}

@app.route("/")
def index():
    return render_template("index.html", languages=LANGUAGES)

@app.route("/api/translate", methods=["POST"])
def translate():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()
    source = (data.get("source") or "en").strip()
    target = (data.get("target") or "ta").strip()

    if not text:
        return jsonify({"error": "Enter some text to translate."}), 400
    if len(text) > 5000:
        return jsonify({"error": "Please keep the text under 5,000 characters."}), 400
    if target == "auto":
        return jsonify({"error": "Choose a target language; target language cannot be Auto-detect."}), 400
    if source not in LANGUAGES:
        return jsonify({"error": "The selected source language is not supported by this app."}), 400
    if target not in LANGUAGES:
        return jsonify({"error": "The selected target language is not supported by this app."}), 400

    # MyMemory expects an explicit source and target language pair, e.g. en|ta.
    source_code = source
    params = {
        "q": text,
        "langpair": f"{source_code}|{target}",
    }

    contact_email = os.getenv("MYMEMORY_EMAIL")
    if contact_email:
        params["de"] = contact_email

    try:
        response = requests.get(
            TRANSLATION_API_URL,
            params=params,
            timeout=REQUEST_TIMEOUT_SECONDS,
            headers={"User-Agent": "CodeAlpha-Language-Translation-Tool/1.0"},
        )
        response.raise_for_status()
        payload = response.json()
    except requests.Timeout:
        return jsonify({"error": "The translation service took too long. Please try again."}), 504
    except requests.RequestException:
        return jsonify({"error": "Could not connect to the translation service. Check your internet connection and try again."}), 502
    except ValueError:
        return jsonify({"error": "The translation service returned an unexpected response."}), 502

    response_data = payload.get("responseData") or {}
    translated_text = response_data.get("translatedText")
    response_status = payload.get("responseStatus")

    if response_status not in (200, "200") or not translated_text:
        details = payload.get("responseDetails") or "The provider could not translate this text."
        return jsonify({"error": str(details)}), 502

    detected = (payload.get("responseData") or {}).get("detectedLanguage") or source
    return jsonify({
        "translatedText": translated_text,
        "source": source,
        "target": target,
        "detectedLanguage": detected,
    })

if __name__ == "__main__":
    app.run(debug=True)
