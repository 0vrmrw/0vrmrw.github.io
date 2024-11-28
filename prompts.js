const prompts = [
    "Write about a time you overcame a challenge.",
    "Describe your perfect day.",
    "Imagine you are a detective solving a mystery.",
    "Write a story set in a futuristic world.",
    "What would you do if you could time travel?"
];

document.getElementById('generate').addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    document.getElementById('prompt').innerText = prompts[randomIndex];
});
