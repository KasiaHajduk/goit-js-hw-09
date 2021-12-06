import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return (new Promise((resolve, reject) => {
      setTimeout(() => { resolve({ position, delay }); }, delay);
    }));
  } else {
    // Reject
    return (new Promise((resolve, reject) => {
      setTimeout(() => { reject({ position, delay }); }, delay);
    }));
  }
}

const btn = document.querySelector('[type="submit"]');


btn.addEventListener("click", event => {
  event.preventDefault();
  let delayNumber = document.querySelector('[name="delay"]').valueAsNumber;
  let stepNumber = document.querySelector('[name="step"]').valueAsNumber;
  let amountNumber = document.querySelector('[name="amount"]').valueAsNumber;

  console.log(delayNumber);
  console.log(stepNumber);
  console.log(amountNumber);
  let delay = delayNumber;

  for (let position = 1; position <= amountNumber; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepNumber;
  }
}
);