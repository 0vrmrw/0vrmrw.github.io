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
  const errorMessage = document.getElementById('error-message');
  
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
    
    localStorage.setItem('streak', streak); localStorage.setItem('lastSubmitDate', today);
    streakDisplay.textContent = `🔥${streak} `;
  } 
  
  function countWords(str) {
    return str.trim().split(/\s+/).length;
  } 
  
  streakForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const wordCount = countWords(dailyInput.value); 
    if (wordCount < 250) {
      errorMessage.style.display = 'block'; 
      errorMessage.textContent = 'Your text must be at least 250 words long.'; 
    } else { 
      errorMessage.style.display = 'none';
      updateStreak(); 
      lastSubmitDate = new Date().toDateString();
      streakForm.reset(); }
  }); 
  
  streakDisplay.textContent = `🔥${streak} `;
});



