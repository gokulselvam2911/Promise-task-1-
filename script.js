const levels = ['Fresh', 'In Training', 'Rookie', 'Champion', 'Ultimate', 'Armor', 'Mega'];
let currentLevelIndex = 0;

const apiUrl = "https://digimon-api.vercel.app/api/digimon";
let digimonData = [];

const gameContainer = document.getElementById('game-container');
const digimonCard = document.getElementById('digimon-card');
const evolveButton = document.getElementById('evolve-button');

async function fetchDigimonData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        digimonData = await response.json();
        displayCurrentDigimon();
    } catch (error) {
        console.error('Error fetching Digimon data:', error);
    }
}

function getCurrentDigimon() {
    return digimonData.find(digimon => digimon.level === levels[currentLevelIndex]);
}

function displayCurrentDigimon() {
    const digimon = getCurrentDigimon();
    if (!digimon) return;

    digimonCard.innerHTML = `
        <div class="col-md-6">
            <div class="card ${getCardClassByLevel(digimon.level)}">
                <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
                <div class="card-body">
                    <h5 class="card-title">${digimon.name}</h5>
                    <p class="card-text">Level: ${digimon.level}</p>
                </div>
            </div>
        </div>
    `;

    if (currentLevelIndex === levels.length - 1) {
        evolveButton.disabled = true;
        evolveButton.textContent = "Congratulations! You've reached Mega level!";
    }
}

function getCardClassByLevel(level) {
    switch (level) {
        case 'Fresh':
            return 'bg-primary text-white';
        case 'In Training':
            return 'bg-success text-white';
        case 'Rookie':
            return 'bg-warning text-dark';
        case 'Champion':
            return 'bg-info text-white';
        case 'Ultimate':
            return 'bg-danger text-white';
        case 'Armor':
            return 'bg-secondary text-white';
        case 'Mega':
            return 'bg-dark text-white';
        default:
            return 'bg-light text-dark';
    }
}

evolveButton.addEventListener('click', () => {
    if (Math.random() > 0.5) { // 50% chance of successful evolution
        currentLevelIndex++;
        displayCurrentDigimon();
    } else {
        alert("Evolution failed! Try again.");
    }
});

fetchDigimonData();
