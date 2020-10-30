import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const machine = createMachine({
  initial: 'inactive',
  states: {
    'inactive': {
      on: {
        mousedown: 'active'
      },
    },
    'active': {
      on: {
        mouseup: 'inactive'
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

const forward = event => service.send(event);

elBox.addEventListener('mousedown', forward);
elBox.addEventListener('mouseup', forward);
