const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");
const sourceText = document.getElementById("sourceText");
const translatedText = document.getElementById("translatedText");
const translateButton = document.getElementById("translateButton");
const buttonLabel = document.getElementById("buttonLabel");
const statusMessage = document.getElementById("statusMessage");
const charCount = document.getElementById("charCount");
const resultLanguage = document.getElementById("resultLanguage");
const copyButton = document.getElementById("copyButton");
const speakButton = document.getElementById("speakButton");
const clearButton = document.getElementById("clearButton");
const swapButton = document.getElementById("swapButton");

let latestTranslation = "";

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}

function updateCount() {
  charCount.textContent = `${sourceText.value.length} / 5000`;
}

function setBusy(busy) {
  translateButton.disabled = busy;
  buttonLabel.textContent = busy ? "Translating..." : "Translate text";
}

async function translate() {
  const text = sourceText.value.trim();
  if (!text) {
    setStatus("Please enter some text first.", "error");
    sourceText.focus();
    return;
  }
  if (sourceLanguage.value === targetLanguage.value) {
    setStatus("Source and target languages are the same.", "error");
    return;
  }

  setBusy(true);
  setStatus("Connecting to the translation service…");
  translatedText.textContent = "Translating your text…";
  translatedText.classList.add("placeholder");
  copyButton.disabled = true;
  speakButton.disabled = true;

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        source: sourceLanguage.value,
        target: targetLanguage.value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Translation failed.");

    latestTranslation = data.translatedText;
    translatedText.textContent = latestTranslation;
    translatedText.classList.remove("placeholder");
    resultLanguage.textContent = `${sourceLanguage.options[sourceLanguage.selectedIndex].text} → ${targetLanguage.options[targetLanguage.selectedIndex].text}`;
    copyButton.disabled = false;
    speakButton.disabled = false;
    setStatus("Translation completed.", "success");
  } catch (error) {
    latestTranslation = "";
    translatedText.textContent = "Your translation will appear here.";
    translatedText.classList.add("placeholder");
    resultLanguage.textContent = "Translation unavailable";
    setStatus(error.message || "Something went wrong. Please try again.", "error");
  } finally {
    setBusy(false);
  }
}

translateButton.addEventListener("click", translate);
sourceText.addEventListener("input", updateCount);
sourceText.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") translate();
});

clearButton.addEventListener("click", () => {
  sourceText.value = "";
  latestTranslation = "";
  translatedText.textContent = "Your translation will appear here.";
  translatedText.classList.add("placeholder");
  resultLanguage.textContent = "Ready to translate";
  copyButton.disabled = true;
  speakButton.disabled = true;
  updateCount();
  setStatus("Text cleared.");
  sourceText.focus();
});

swapButton.addEventListener("click", () => {
  if (sourceLanguage.value === "auto") {
    setStatus("Choose a source language before swapping.", "error");
    return;
  }
  const oldSource = sourceLanguage.value;
  sourceLanguage.value = targetLanguage.value;
  targetLanguage.value = oldSource;
  if (latestTranslation) {
    sourceText.value = latestTranslation;
    latestTranslation = "";
    translatedText.textContent = "Your translation will appear here.";
    translatedText.classList.add("placeholder");
    copyButton.disabled = true;
    speakButton.disabled = true;
    updateCount();
  }
  setStatus("Languages swapped. Press Translate to translate again.");
});

copyButton.addEventListener("click", async () => {
  if (!latestTranslation) return;
  try {
    await navigator.clipboard.writeText(latestTranslation);
    setStatus("Translation copied to clipboard.", "success");
  } catch {
    setStatus("Clipboard access was blocked by your browser.", "error");
  }
});

speakButton.addEventListener("click", () => {
  if (!latestTranslation || !("speechSynthesis" in window)) {
    setStatus("Text-to-speech is not supported in this browser.", "error");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(latestTranslation);
  const lang = targetLanguage.value;
  const speechLanguages = { en: "en-US", ta: "ta-IN", hi: "hi-IN", ml: "ml-IN", te: "te-IN", kn: "kn-IN", fr: "fr-FR", de: "de-DE", es: "es-ES", it: "it-IT", ja: "ja-JP", ko: "ko-KR", zh: "zh-CN", ar: "ar-SA" };
  utterance.lang = speechLanguages[lang] || lang;
  window.speechSynthesis.speak(utterance);
});

updateCount();
