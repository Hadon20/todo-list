function getChoreFromUser(e: Event) {
    e.preventDefault()
    const choreInput = document.getElementById('user-input') as HTMLInputElement

    const chore = choreInput.value.trim()
    console.log(chore)
}

addEventListener('submit', getChoreFromUser)