function showDiseaseInfo() {
    const info = document.getElementById('disease-info');
    info.style.display = info.style.display === 'none' ? 'block' : 'none';
}
// Toggle Chatbot Visibility
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display =
        chatbotContainer.style.display === 'none' ? 'flex' : 'none';
});

// Chatbot Logic
const sendButton = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chatbot-messages');

// Predefined Responses
const responses = {
    hello: "Hi! Please share your problem or disease?",
    hygiene: "Here are some hygiene tips: Wash hands regularly, drink clean water, and maintain cleanliness.",
    disease: "You can check our 'Know Your Disease' section for details on diseases and remedies.",
    emergency: "For emergencies, check the 'Emergency Contacts' section for ambulance and hospital numbers.",
    default: "I'm sorry, I don't understand that. Please try asking differently."
};

// Handle Chat Input
sendButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    // Display User Message
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    chatMessages.appendChild(userMessageElement);

    // Generate Bot Response
    const botResponse = getResponse(userMessage.toLowerCase());
    const botMessageElement = document.createElement('div');
    botMessageElement.classList.add('bot-message');
    botMessageElement.textContent = botResponse;
    chatMessages.appendChild(botMessageElement);

    // Clear Input
    chatInput.value = "";

    // Scroll to Bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

function getResponse(message) {
    for (const key in responses) {
        if (message.includes(key)) return responses[key];
    }
    return responses.default;
}
// Symptom Checker Logic
const symptomForm = document.getElementById('symptom-form');
const symptomsInput = document.getElementById('symptoms-input');
const symptomResults = document.getElementById('symptom-results');

// Symptom-Disease Mapping
const symptomMapping = {
    fever: ["Malaria", "Dengue", "Typhoid"],
    headache: ["Migraine", "Tension Headache", "Dengue"],
    fatigue: ["Anemia", "Diabetes", "Thyroid Issues"],
    cough: ["Common Cold", "Tuberculosis", "COVID-19"],
    nausea: ["Food Poisoning", "Gastritis", "Pregnancy"],
    "joint pain": ["Arthritis", "Dengue", "Chikungunya"]
};

// Handle Symptom Form Submission
symptomForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputSymptoms = symptomsInput.value.toLowerCase().split(",").map(s => s.trim());
    const possibleDiseases = new Set();

    inputSymptoms.forEach(symptom => {
        if (symptomMapping[symptom]) {
            symptomMapping[symptom].forEach(disease => possibleDiseases.add(disease));
        }
    });

    // Display Results
    if (possibleDiseases.size > 0) {
        symptomResults.innerHTML = `
            <h3>Possible Conditions:</h3>
            <ul>
                ${Array.from(possibleDiseases).map(disease => `<li>${disease}</li>`).join("")}
            </ul>
            <p>Note: Consult a healthcare professional for a proper diagnosis.</p>
        `;
    } else {
        symptomResults.innerHTML = "<p>No conditions found for the given symptoms. Please try different keywords.</p>";
    }

    symptomResults.style.display = "block";
});
