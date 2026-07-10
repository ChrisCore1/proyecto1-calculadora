const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn:not(#cleanHistory)');
const operationsHistoryList = document.querySelector('.operationsHistoryList');
const btnCleanHistory = document.getElementById('cleanHistory');

const calculate = () => {
  if (!screen.value) return;

  const getOperationByScreen = screen.value;

  try {
    const expression = screen.value
      .replace(/(\d)\(/g, '$1*(')
      .replace(/\)(\d)/g, ')*$1')
      .replace(/\)\(/g, ')*(');

    const result = eval(expression);
    const operation = getOperationByScreen + ' = ' + result;

    if (getOperationByScreen !== String(result)) {
      addToLocalStorage(operation);
    }

    screen.value = result;
  } catch {
    screen.value = 'ERROR';
  }
};

const addToHistoryView = (operation) => {
  const itemHistory = document.createElement('div');
  itemHistory.classList.add('itemHistory');
  itemHistory.textContent = `${operation}`;
  operationsHistoryList.append(itemHistory);
};

const addToLocalStorage = (operation) => {
  addToHistoryView(operation);
  const arrayHistory =
    JSON.parse(localStorage.getItem('keyOperationsHistory')) || [];
  arrayHistory.push(operation);
  localStorage.setItem('keyOperationsHistory', JSON.stringify(arrayHistory));
};

const loadHistory = () => {
  const arrayHistory =
    JSON.parse(localStorage.getItem('keyOperationsHistory')) || [];

  arrayHistory.forEach((operation) => {
    addToHistoryView(operation);
  });
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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    calculate();
  }
});

screen.addEventListener('input', () => {
  screen.value = screen.value.replace(/[^0-9+\-*/.()]/g, '');
});

btnCleanHistory.addEventListener('click', () => {
  if (
    localStorage.getItem('keyOperationsHistory') &&
    confirm(
      'Esta seguro de limpiar el historial? Este proceso lo eliminara de forma permanente',
    )
  ) {
    operationsHistoryList.textContent = '';
    localStorage.removeItem('keyOperationsHistory');
  }
});

loadHistory();
