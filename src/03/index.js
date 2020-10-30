import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'inactive',
  states: {
    'inactive': {
      on: {
        CLICK_ON: 'active'
      },
    },
    'active': {
      on: {
        CLICK_OFF: 'inactive'
      },
    }
  }
});

// Create a service using interpret(...)
const service = interpret(machine);


service.onTransition(state => {
  elBox.dataset.state = state.value;
});

service.start();

elBox.addEventListener('mousedown', (event) => {
  service.send('CLICK_ON');
});

elBox.addEventListener('mouseup', (event) => {
  service.send('CLICK_OFF');
});
