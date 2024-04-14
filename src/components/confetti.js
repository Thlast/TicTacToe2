import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

export function confetti() {
    jsConfetti.addConfetti();
    // Puedes ajustar la duración del confeti si lo deseas
    setTimeout(() => {
        jsConfetti.clear();
    }, 3000); // Por ejemplo, aquí el confeti se eliminará después de 3 segundos
}
