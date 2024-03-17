const form = document.querySelector('.forgotpassword-cart');
const spinner = document.querySelector('.spinner-container');
const btn = document.querySelector('.forgotpassword-btn');
const email = document.getElementById('email');
email.value = 'ms.senhadji@esi-sba.dz';

function handelSpinner() {
  spinner.classList.toggle('hidden');
  btn.classList.toggle('hidden');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    handelSpinner();
    const res = await fetch('http://localhost:3000/Users/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });
    console.log(res);
    if (!res.ok) throw new Error('Some shit is wrong');
    if (res.status === 200)
      console.log(
        'Un e-mail de réinitialisation de mot de passe a été envoyé.'
      );
    else console.log("Erreur lors de l'envoi du courriel.");
  } catch (err) {
    console.log(err);
  } finally {
    handelSpinner();
  }
});
