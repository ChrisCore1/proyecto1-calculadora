const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn');

const calculate = () => {
  if (!screen.value) return;

  try {
    const expression = screen.value;
    screen.value = eval(expression);
  } catch {
    screen.value = 'ERROR';
  }
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const pressButton = button.textContent;

    if (button.id === 'clearAll') return (screen.value = '');

    if (button.id === 'deleteNumber') {
      if (screen.value.length === 1 || screen.value === 'ERROR') {
        screen.value = '';
      } else {
        screen.value = screen.value.slice(0, -1);
      }
      return;
    }

    if (button.id === 'equal') return calculate();

    if (screen.value === 'ERROR') screen.value = '';

    screen.value += pressButton;
  });
});
