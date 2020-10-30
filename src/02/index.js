import { createMachine } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'active',
  states: {
    'active': {
      on: {
        CLICK: 'inactive'
      },
    },
    'inactive': {
      on: {
        CLICK: 'active'
      },
    }
  }
});

let currentState = machine.initialState;

function send(event) {
  currentState = machine.transition(currentState, event);

  elBox.dataset.state = currentState.value;
}

elBox.addEventListener('click', () => {
  send('CLICK');
});
