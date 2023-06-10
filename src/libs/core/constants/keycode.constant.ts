export const KEYBOARD = {
  ENTER: {
    code: 'Enter',
    keyCode: '13',
  },
  BACKSPACE: {
    code: 'Backspace',
    keyCode: '8',
  },
  SPACE: {
    code: 'Space',
    keyCode: '32',
  },
  ARROW_UP: {
    code: 'ArrowUp',
    keyCode: '38',
  },
  ARROW_DOWN: {
    code: 'ArrowDown',
    keyCode: '40',
  },
  ARROW_LEFT: {
    code: 'ArrowLeft',
    keyCode: '37',
  },
  ARROW_RIGHT: {
    code: 'ArrowRight',
    keyCode: '39',
  },
  PERIOD: {
    code: '.',
    keyCode: '190',
  },
  TAB: {
    code: 'Tab',
    keyCode: 'Tab',
  },
  ESC: {
    code: 'Escape',
    keyCode: 'Escape',
  },
};

export const NOT_IGNORED_KEY = [
  KEYBOARD.ARROW_UP.code,
  KEYBOARD.ARROW_DOWN.code,
  KEYBOARD.ARROW_LEFT.code,
  KEYBOARD.ARROW_RIGHT.code,
  KEYBOARD.BACKSPACE.code,
  KEYBOARD.TAB.code,
];
