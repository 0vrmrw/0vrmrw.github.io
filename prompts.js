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
console.log(generatePrompt())






