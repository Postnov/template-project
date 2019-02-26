console.log('i am work!', 'Change this message in "src/js/partails/common.js"');


// This template support es6 syntax

    // let, destructurization
    let arr = ['Postnov', 'Daniil'];

    let [firstName, lastName] = arr;
    console.log('Author this template: ', firstName, lastName);

    // const, template string
    const str = `Hello, i am ${firstName} ${lastName} from console and arrow function`;

    // arrow functions
    let func = (message) => {
        console.log(message);
    }

    func(str);




