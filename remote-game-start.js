const BUTTON_TEXT_1 = 'Show Preview';
const BUTTON_TEXT_2 = 'Show Match';
const BUTTON_TEXT_3 = 'Start Match';

function findAndClickButtonByText(buttonText) {
  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    // Normalise the whitespace of the button's text content.
    // This replaces all sequences of whitespace (including newlines) with a single space.
    const normalizedText = button.textContent.replace(/\s+/g, ' ').trim();
    
    if (normalizedText === buttonText) {
      button.click();
      console.log(`Keyboard alias activated: button with text '${buttonText}' clicked!`);
      return;
    }
  }

  console.warn(`No button found with the text: '${buttonText}'`);
}

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  switch (event.key) {
    case '1':
      findAndClickButtonByText(BUTTON_TEXT_1);
      break;
    case '2':
      findAndClickButtonByText(BUTTON_TEXT_2);
      break;
    case '3':
      findAndClickButtonByText(BUTTON_TEXT_3);
      break;
    default:
      break;
  }
});