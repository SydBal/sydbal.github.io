const html = document.documentElement

const toggleInverseClass = () => html.classList.toggle('inverse')

/* Avatar Button */
const avatarButton = document.getElementById('avatar-button')
avatarButton.addEventListener('click', () => {
  // only turn off inverse via click
  if (html.classList.contains('inverse')) {
    toggleInverseClass()
  }
}, false)

let hacktoberTracker = 0
document.addEventListener('keyup', event => {
  // H
  if (event.key === 'h' && hacktoberTracker === 0) {
    hacktoberTracker++
  // A
  } else if (event.key === 'a' && hacktoberTracker === 1) {
    hacktoberTracker++
  // C
  } else if (event.key === 'c' && hacktoberTracker === 2) {
    hacktoberTracker++
  // K
  } else if (event.key === 'k' && hacktoberTracker === 3) {
    hacktoberTracker++
  // T
  } else if (event.key === 't' && hacktoberTracker === 4) {
    hacktoberTracker++
  // O
  } else if (event.key === 'o' && hacktoberTracker === 5) {
    hacktoberTracker++
  // B
  } else if (event.key === 'b' && hacktoberTracker === 6) {
    hacktoberTracker++
  // E
  } else if (event.key === 'e' && hacktoberTracker === 7) {
    hacktoberTracker++
  // R
  } else if (event.key === 'r' && hacktoberTracker === 8) {
    // Spooky!
    toggleInverseClass()
    hacktoberTracker = 0
    console.log('Happy Hacktoberfest 2020!!!')
  } else {
    hacktoberTracker = 0
  }
})
