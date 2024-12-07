// Voice Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;

// Get references to buttons
const startButton = document.getElementById("start-listening");
const stopButton = document.getElementById("stop-listening");

// Function to handle the assistant's responses
function handleResponse(question) {
    const lowerQuestion = question.toLowerCase();

    let response = "";

    if (lowerQuestion.includes("creator")) {
        response = "I was created by an amazing developer named Ankana!";
    } else if (lowerQuestion.includes("name")) {
        response = "I am your AI assistant!";
    } else if (lowerQuestion.includes("who are you")) {
        response = "I am an AI assistant designed to help you!";
    } else if (lowerQuestion.includes("hello")) {
        response = "Hello! How can I assist you today?";
    } else {
        response = "I'm not sure about that. Let me search it for you!";
        searchGoogle(question);
    }

    // Speak the response
    speak(response);
}

// Function to perform a Google Search for unrecognized questions
function searchGoogle(query) {
    const googleSearchUrl = https://www.google.com/search?q=${encodeURIComponent(query)};
    window.open(googleSearchUrl, "_blank");
}

// Function to use Speech Synthesis API to speak the response
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the voice to a preferred one, if available
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => voice.name === "Google UK English Male") || voices[0];

    // Set additional properties
    utterance.pitch = 1; // Normal pitch
    utterance.rate = 1;  // Normal rate

    // Speak the response
    speechSynthesis.speak(utterance);
}

// Start Listening Button
startButton.addEventListener("click", () => {
    recognition.start();
    speak("I am listening. Please ask your question.");
});

// Stop Listening Button
stopButton.addEventListener("click", () => {
    recognition.stop();
    speak("Listening stopped.");
});

// Handle recognition results
recognition.addEventListener("result", (event) => {
    const spokenWords = event.results[0][0].transcript;
    handleResponse(spokenWords);
});

// Handle recognition errors
recognition.addEventListener("error", (event) => {
    console.error("Recognition error:", event.error);
    speak("I couldn't understand you. Please try again.");
});