document.addEventListener('DOMContentLoaded', () => {
  const hintContainer = document.querySelector('.hint');
  const hintMessage = hintContainer.querySelector('i');
  const hintButton = document.createElement('button');
  hintButton.textContent = 'Show Hint';
  hintContainer.insertBefore(hintButton, null);
  hintMessage.style.display = 'none';

  hintButton.addEventListener('click', showHint);

  function showHint() {
    hintButton.style.display = 'none';
    hintMessage.style.display = 'block';
  }
})









