function getChoreFromUser(e) {
    e.preventDefault();
    const choreInput = document.getElementById('user-input');
    const chore = choreInput.value.trim();
    console.log(chore);
}
addEventListener('submit', getChoreFromUser);
export {};
//# sourceMappingURL=app.js.map