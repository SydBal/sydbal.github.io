const html = document.documentElement

/* Avatar Button */
const avatarButton = document.getElementById('avatar-button')
avatarButton.addEventListener('click', () => {
  html.classList.toggle('inverse')
}, false)