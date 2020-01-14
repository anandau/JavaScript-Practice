const person = {
    name: 'srk',
    age: 24,
    city: 'ajmer'
}

export default person;

export async function callForHelp() {
    console.log('call');
    const superman = await import('./onDemand.js');
    console.log(superman.iNeedYou());
}

