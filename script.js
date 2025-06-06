const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');
const countdown = document.getElementById('timer');

const compliments = {
  1: { img: 'images/1.jpg', text: 'You shine brighter than the stars, Precious' },
  2: { img: 'images/2.jpg', text: ' Conversation that make me happy most' },
  3: { img: 'images/3.jpg', text: 'You’re my favorite person in the whole universe' },
};

let viewed = new Set();
let countdownInterval = null;

cards.forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-id');
    if (card.classList.contains('viewed')) return;

    // Show modal
    const compliment = compliments[id];
    modalImg.src = compliment.img;
    modalText.textContent = compliment.text;
    modal.style.display = 'flex';

    // Start countdown
    let timeLeft = 8;
    countdown.textContent = timeLeft;
    countdownInterval = setInterval(() => {
      timeLeft--;
      countdown.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        modal.style.display = 'none';
        card.classList.add('viewed');
        card.style.backgroundImage = `url('${compliment.img}')`;
        viewed.add(card);

        // Check if all viewed
        if (viewed.size === cards.length) {
          celebrateAndRedirect();
        }
      }
    }, 1000);
  });
});

function celebrateAndRedirect() {
  // Confetti burst
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    window.location.href = 'love-note.html';
  }, 5000);
}
