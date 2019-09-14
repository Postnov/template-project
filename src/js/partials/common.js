// This template support es6 syntax

// let, destructurization
let arr = ['Postnov', 'Daniil'],
  [firstName, lastName] = arr,
  func = (message) => console.log(message);

// const, template string
const str = `Hello, i am ${firstName} ${lastName} from console and arrow function`;
