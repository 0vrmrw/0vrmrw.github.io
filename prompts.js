const prompts = [ "Write about your favorite childhood memory.",
                 "Describe a place you've always wanted to visit.",
                 "Write a letter to your future self.",
                 "Imagine you are a character in a fantasy world. What is your role?",
                 "Write about a time you overcame a challenge.",
                 "Describe your perfect day.",
                 "Imagine you are a detective solving a mystery.",
                 "Write a story set in a futuristic world.",
                 "What would you do if you could time travel?"];
function generatePrompt() { 
    const date = new Date(); 
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24); 
    const prompt = prompts[dayOfYear % prompts.length]; 
    document.getElementById("prompt").innerText = prompt; } 
window.onload = generatePrompt();

document.addEventListener('DOMContentLoaded', () => { 
  const streakDisplay = document.getElementById('streakDisplay');
  const streakForm = document.getElementById('streakForm');
  
  let streak = parseInt(localStorage.getItem('streak')) || 0;
  let lastSubmitDate = localStorage.getItem('lastSubmitDate');
  
function updateStreak() {
  const today = new Date().toDateString();
  
  if (lastSubmitDate && new Date(today) - new Date(lastSubmitDate) === 86400000) {
    streak += 1; 
  } else if (lastSubmitDate && new Date(today) - new Date(lastSubmitDate) > 86400000) {
    streak = 1; 
  } else if (!lastSubmitDate || new Date(today) - new Date(lastSubmitDate) < 86400000) {
    streak += 0; 
  } else {
    streak = 1; 
  } 
  
  localStorage.setItem('streak', streak);
  localStorage.setItem('lastSubmitDate', today);
  streakDisplay.textContent = `Current Streak: ${streak} days`; 
} 
  
  streakForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateStreak();
    lastSubmitDate = new Date().toDateString();
    streakForm.reset(); 
  }); 
  
  // Display the current streak on load
  streakDisplay.textContent = `Current Streak: ${streak} days`; 
});




