// el=document.getElementById(id);
// el.src=image1;

// el=document.getElementById(id);
// el.src=image2;
// el=document.getElementById(id);
// el.src=image3;
const target1=document.getElementById('imag1');
const target2=document.getElementById('imag2');
const target3=document.getElementById('imag3');

target1.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})

target2.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})

target3.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})