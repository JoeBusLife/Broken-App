### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?  
  Promises, async functions, await and callbacks

- What is a Promise?  
  A Promise is a proxy for a value not necessarily known when the promise is created.

- What are the differences between an async function and a regular function?  
  async allow asynchronous code in combination with await, avoiding the need to explicitly configure promise chains.

- What is the difference between Node.js and Express.js?  
  Express.js is a framework based on Node.js which is used for building a web-application

- What is the error-first callback pattern?  
  Error form asynchronous operation is passed into a callback as the first parameter

- What is middleware?  
  Allows you to inject code into every request or a certain set of requests that are called. Allows consolidation of code.

- What does the `next` function do?  
  Allows the next function/middleware to run.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)  
  Running one request after another rather than simultaneously. No handling of failed requests. Variable could hold something else than what the name implies.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
