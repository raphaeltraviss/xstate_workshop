import { createMachine, assign, interpret } from 'xstate';

const elBox = document.querySelector('#box');
const elBody = document.body;


const machine = createMachine({
  initial: 'idle',
  context: {
    // Sets the rendered position of the DOM el, in <body>
    // coord space
    x: 0,
    y: 0,
    // Sets the relative rendered offset from X/Y
    dx: 0,
    dy: 0,
    // The remembered point where we clicked the box; used to calculate the 
    // delta/offset... in <body> coord space
    px: 0,
    py: 0,
  },
  states: {
    idle: {
      on: {
        mousedown: {
          target: 'dragging',
          actions: ['setPoint'],
        },
      },
    },
    dragging: {
      on: {
        mousemove: {
          target: 'dragging',
          internal: true,
          actions: ['setDelta' ],
        },
        mouseup: {
          target: 'idle',
          actions: ['setPosition']
        },
      },
    },
  },
},
{
  actions: {
    setPoint: assign({
      px: (ctx, ev) => ev.clientX,
      py: (ctx, ev) => ev.clientY,
    }),
    setDelta: assign({
      dx: (ctx, ev) => ev.clientX - ctx.px,
      dy: (ctx, ev) => ev.clientY - ctx.py,
    }),
    setPosition: assign({
      x: (ctx, ev) => ctx.x + ctx.dx,
      y: (ctx, ev) => ctx.y + ctx.dy,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0,
    }),
  }
});

const service = interpret(machine);

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.context);

    elBox.dataset.state = state.value;

//    elBox.style.setProperty('--dx', state.context.dx);
 //   elBox.style.setProperty('--dy', state.context.dy);
    elBox.style.setProperty('--x', state.context.x);
    elBox.style.setProperty('--y', state.context.y);
  }
});

service.start();

elBox.addEventListener('mousedown', service.send);
elBody.addEventListener('mousemove', service.send);
elBody.addEventListener('mouseup', service.send);

