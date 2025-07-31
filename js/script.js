document.addEventListener('DOMContentLoaded', () => {
    const memberImage = document.getElementById('member-image');
    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-guess');
    const resultMessage = document.getElementById('result-message');
    const nextButton = document.getElementById('next-member');

    let correctAnswer = '';

    // Fetch new member data
    async function fetchMember() {
        try {
            const response = await fetch('https://api.fikmydomainsz.xyz/games/tebakjkt');
            const data = await response.json();
            if (data.status && data.data) {
                memberImage.src = data.data.gambar;
                correctAnswer = data.data.jawaban.toLowerCase();
                guessInput.value = '';
                resultMessage.textContent = '';
                nextButton.style.display = 'none';
                memberImage.style.animation = 'zoomIn 0.5s ease-in-out';
            } else {
                resultMessage.textContent = 'Failed to load member data.';
            }
        } catch (error) {
            resultMessage.textContent = 'Error fetching data.';
            console.error(error);
        }
    }

    // Check guess
    function checkGuess() {
        const userGuess = guessInput.value.trim().toLowerCase();
        if (userGuess === correctAnswer) {
            resultMessage.textContent = 'Correct! Well done!';
            resultMessage.style.color = '#28a745';
            nextButton.style.display = 'inline-block';
        } else {
            resultMessage.textContent = 'Wrong! Try again.';
            resultMessage.style.color = '#dc3545';
        }
    }

    // Event listeners
    submitButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkGuess();
    });
    nextButton.addEventListener('click', fetchMember);

    // Initial fetch
    fetchMember();
});
