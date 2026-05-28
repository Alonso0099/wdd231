//const getString = window.location.search;
//console.log(getString);


const myInfo = new URLSearchParams(window.location.search);
console.log(myInfo);

console.log(myInfo.get('first'));
console.log(myInfo.get('last'));
console.log(myInfo.get('ordinance'));
console.log(myInfo.get('date'));
console.log(myInfo.get('location'));
console.log(myInfo.get('phone'));
console.log(myInfo.get('email'));

document.querySelector('#results').innerHTML = `
<p>Confirmation appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
<p>Ordinance: ${myInfo.get('ordinance')} </p>
<p>Date: ${myInfo.get('date')} </p>
<p>Location: ${myInfo.get('location')}</p>
<p>Phone: ${myInfo.get('phone')}</p>
<p>Email: ${myInfo.get('email')}</p>
`;
