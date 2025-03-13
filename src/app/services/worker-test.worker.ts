/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  console.log('🚀 ~ addEventListener ~ data:', data);
  heavyTask();
  postMessage(`done "${data}" task`);
});

const heavyTask = () => {
  //do heavy loop
  for (let i = 0; i < 10000000000; i++) {}
};
