import { createMachine, interpret } from 'xstate';

const elBox = document.querySelector('#box');

const setPoint = (context, event) => {
  const x = event.clientX;
  const y = event.clientY;

  elBox.dataset.point = `${x},${y}`;
};

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'dragging',
          actions: ['setPoint']
        },
      },
    },
    dragging: {
      on: {
        mouseup: {
          target: 'idle',
          actions: ['setPoint']
        },
      },
    },
  },
},
{
  actions: {
    setPoint
  }
});

const service = interpret(machine);

service.onTransition((state) => {
  console.log(state);

  elBox.dataset.state = state.value;
});

service.start();

elBox.addEventListener('mousedown', (event) => {
  service.send(event);
});

elBox.addEventListener('mouseup', (event) => {
  service.send(event);
});
