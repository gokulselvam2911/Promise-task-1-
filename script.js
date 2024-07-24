var res = fetch("https://digimon-api.vercel.app/api/digimon");
res.then((data) => data.json()).then((data1) => displayDigimon(data1));

var container = document.createElement("div");
container.className = "container";
var row = document.createElement("div");
row.className = "row";

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
        case 'Mega':
            return 'bg-dark text-white';
        default:
            return 'bg-light text-dark';
    }
}

function displayDigimon(data1) {
    for (let i = 0; i < data1.length; i++) {
        var col = document.createElement("div");
        col.className = "col-lg-4 mb-4";
        var cardClass = getCardClassByLevel(data1[i].level);
        col.innerHTML = `
            <div class="card h-100 ${cardClass}">
                <img src="${data1[i].img}" class="card-img-top" alt="${data1[i].name}">
                <div class="card-body">
                    <h5 class="card-title">${data1[i].name}</h5>
                    <p class="card-text">Level: ${data1[i].level}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    }
    container.appendChild(row);
    document.body.appendChild(container);
}
