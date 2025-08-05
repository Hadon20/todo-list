let chores = [];
let currentFilter = 'all';
function main() {
    loadChores();
    displayChores();
    updateCounter();
    filterChores();
    const form = document.querySelector('#chore-form');
    form.addEventListener('submit', getChoreFromUser);
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearCompletedChores);
    window.addEventListener('load', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
function getChoreFromUser(e) {
    e.preventDefault();
    const choreInput = document.querySelector('.chores-input');
    const choreName = choreInput.value.trim();
    if (!choreName)
        return;
    createChore(choreName);
    choreInput.value = '';
    displayChores();
}
function createChore(choreName) {
    const chore = {
        name: choreName,
        status: false,
        date: new Date().toString()
    };
    console.log(chore.date);
    chores.push(chore);
    saveChoresLocal();
}
function saveChoresLocal() {
    localStorage.setItem('chores', JSON.stringify(chores));
}
function loadChores() {
    const data = localStorage.getItem('chores');
    if (data) {
        chores = JSON.parse(data);
    }
}
function displayChores() {
    const choresList = document.querySelector('.chores-list');
    choresList.innerHTML = '';
    let choresToDisplay = [];
    if (currentFilter === 'all') {
        choresToDisplay = chores;
    }
    else if (currentFilter === 'active') {
        choresToDisplay = chores.filter(chore => (!chore.status));
    }
    else if (currentFilter === 'completed') {
        choresToDisplay = chores.filter(chore => (chore.status));
    }
    choresToDisplay.forEach(chore => {
        const choreDiv = document.createElement('div');
        choreDiv.classList.add('chore-item');
        choreDiv.classList.add(chore.status ? 'completed' : 'active');
        const choreCheckbox = document.createElement('input');
        choreCheckbox.type = 'checkbox';
        choreCheckbox.style.position = 'absolute';
        choreCheckbox.style.opacity = '0';
        choreCheckbox.style.width = '100%';
        choreCheckbox.style.height = '100%';
        choreCheckbox.style.cursor = 'pointer';
        choreCheckbox.checked = chore.status;
        choreCheckbox.addEventListener('change', () => {
            chore.status = choreCheckbox.checked;
            updateChoreClass(choreDiv, chore.status);
            saveChoresLocal();
            updateCounter();
            displayChores();
        });
        const choreCheckboxWrapper = document.createElement('div');
        choreCheckboxWrapper.classList.add('chore-checkbox');
        choreCheckboxWrapper.style.position = 'relative';
        const checkboxImageUnchecked = document.createElement('img');
        checkboxImageUnchecked.classList.add('checkbox-image', 'unchecked');
        checkboxImageUnchecked.src = 'resources/uncheck.svg';
        const checkboxImageChecked = document.createElement('img');
        checkboxImageChecked.classList.add('checkbox-image', 'checked');
        checkboxImageChecked.src = 'resources/check.svg';
        const choreName = document.createElement('span');
        choreName.classList.add('chore-name');
        choreName.textContent = chore.name;
        choreDiv.append(choreCheckboxWrapper);
        choreDiv.append(choreName);
        choresList.append(choreDiv);
        choreCheckboxWrapper.appendChild(checkboxImageUnchecked);
        choreCheckboxWrapper.appendChild(checkboxImageChecked);
        choreCheckboxWrapper.appendChild(choreCheckbox);
    });
}
function updateChoreClass(element, status) {
    if (status) {
        element.classList.remove('active');
        element.classList.add('completed');
    }
    else {
        element.classList.remove('completed');
        element.classList.add('active');
    }
}
function updateCounter() {
    const choresCounter = document.querySelector('.chores-counter');
    const activeChores = chores.filter(chore => !chore.status);
    choresCounter.textContent = `${activeChores.length} chores left`;
}
function clearCompletedChores() {
    const activeChores = chores.filter(chore => !chore.status);
    chores = activeChores;
    saveChoresLocal();
    displayChores();
    updateCounter();
}
function filterChores() {
    const filterAll = document.querySelector('#filter-all');
    const filterActive = document.querySelector('#filter-active');
    const filterCompleted = document.querySelector('#filter-completed');
    filterAll.addEventListener('click', () => {
        currentFilter = 'all';
        displayChores();
    });
    filterActive.addEventListener('click', () => {
        currentFilter = 'active';
        displayChores();
    });
    filterCompleted.addEventListener('click', () => {
        currentFilter = 'completed';
        displayChores();
    });
}
main();
export {};
//# sourceMappingURL=app.js.map