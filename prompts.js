const prompts = [
  "Write about your favorite childhood memory.",
  "Describe a place you've always wanted to visit.",
  "Write a letter to your future self.",
  "Imagine you are a character in a fantasy world. What is your role?",
  "Write about a time you overcame a challenge.",
  "Describe your perfect day.",
  "Imagine you are a detective solving a mystery.",
  "Write a story set in a futuristic world.",
  "What would you do if you could time travel?"
];

function generatePrompt() {
  const date = new Date();
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const prompt = prompts[dayOfYear % prompts.length];
  document.getElementById("prompt").innerText = prompt;
}

window.onload = generatePrompt;

document.addEventListener('DOMContentLoaded', () => {
  const streakDisplay = document.getElementById('streakDisplay');
  const streakForm = document.getElementById('streakForm');
  const dailyInput = document.getElementById('dailyInput');
  const errorMessage = document.getElementById('error-message'); // Ensure this element exists in your HTML

  let streak = parseInt(localStorage.getItem('streak')) || 0;
  let lastSubmitDate = localStorage.getItem('lastSubmitDate');

  function updateStreak() {
    const today = new Date().toDateString();

    if (lastSubmitDate === today) {
      // No change to streak
    } else if (lastSubmitDate && new Date(today) - new Date(lastSubmitDate) === 86400000) {
      streak += 1; // Increment streak for consecutive days
    } else {
      streak = 1; // Reset streak if not consecutive
    }

    localStorage.setItem('streak', streak);
    localStorage.setItem('lastSubmitDate', today);
    streakDisplay.textContent = `🔥 ${streak}`;
  }

  function countWords(str) {
    return str.trim() ? str.trim().split(/\s+/).length : 0; // Handle empty strings
  }

  streakForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const wordCount = countWords(dailyInput.value);
    if (wordCount < 250) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Your text must be at least 250 words.';
    } else {
      errorMessage.style.display = 'none';
      updateStreak();
      streakForm.reset();
    }
  });

  // Initial display of streak
  streakDisplay.textContent = `🔥 ${streak}`;
});

function handleFormSubmit(event) {
    event.preventDefault();
    const userInput = document.getElementById('userInputField').value; // Assuming you have an input field with this ID
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));
    document.getElementById('userInputField').value = ''; // Clear the input field after submission
}

    // Check if input is valid
    if (dailyInput.trim() === "") {
        document.getElementById('error-message').innerText = "Please enter some text.";
        document.getElementById('error-message').style.display = "block";
        return;
    }

    // Save the input and date to localStorage
    const historyEntry = {
        date: currentDate,
        text: dailyInput
    };

    // Retrieve existing history or initialize an empty array
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(historyEntry); // Add the new entry
    localStorage.setItem('history', JSON.stringify(history)); // Save back to localStorage

    // Clear the input field
    document.getElementById('dailyInput').value = '';
    document.getElementById('error-message').style.display = "none"; // Hide error message
}

// Function to display saved prompts in history.html
function displayHistory() {
    const historyContainer = document.getElementById('historyContainer');
    const history = JSON.parse(localStorage.getItem('history')) || [];

    // Clear previous content
    historyContainer.innerHTML = '';

    // Display each prompt
    history.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.textContent = `${index + 1}: ${entry}`; // Format entry
        historyContainer.appendChild(entryElement);
    });

    if (history.length === 0) {
        historyContainer.textContent = 'No history available.';
    }
}

// Call displayHistory when the page loads
window.onload = function() {
    displayHistory();
};
