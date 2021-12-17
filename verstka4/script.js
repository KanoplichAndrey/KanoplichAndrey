const target1=document.getElementById('imag1');
const target2=document.getElementById('imag2');
const target3=document.getElementById('imag3');
const target4=document.getElementById('imag4');
const target5=document.getElementById('imag5');
const target6=document.getElementById('imag6');
// const target7=document.getElementById('imag7');
// const target8=document.getElementById('imag8');
// const target9=document.getElementById('imag9');
// const target10=document.getElementById('imag10');
// const target11=document.getElementById('imag11');
// const target12=document.getElementById('imag12');
// const target13=document.getElementById('imag13');
// const target14=document.getElementById('imag14');


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

target4.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})

target5.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})

target6.addEventListener('mouseover', (e) => {
    console.log(e.target)
    const src = e.target.src;
    const el = document.querySelector('#big');
    el.src = src
})

// target7.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target8.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target9.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target10.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target11.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target12.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target13.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })

// target14.addEventListener('mouseover', (e) => {
//     console.log(e.target)
//     const src = e.target.src;
//     const el = document.querySelector('#big');
//     el.src = src
// })


$(document).ready(function(){
	$('.wrap-slider').slick({
        infinite: true,
        useTransform: true,
        slidesToShow: 3,
        //количество слайдов, которые выводятся на экране
        slidesToScroll: 1,
        // fade: true,
  //количество слайдов, которые перелистываются за один раз
		
        // centerMode: true,
        //центруем текущий слайд
        // centerPadding: '60px',
        // variableWidth: true,
        transform: false,
        arrows:true,
		// dots:true,
		// slidesToShow:3,
        // infinite: true,
        // slidesToScroll: 1,
		// autoplay:true,
		// speed:1000,
		// autoplaySpeed:800,
		// responsive:[
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
        //             slidesToShow: 3,
        //             infinite: true,
        //             slidesToScroll: 1,
        //             variableWidth: true
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 550,
		// 		settings: {
		// 			slidesToShow:1,
        //              arrows: true,
        //             variableWidth: true,
		// 		}
		// 	}
		// ]
	});
});; 


$('.slide3').slick({
    infinite: true,
    arrows:true,
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay:true,
    // speed:1000,
    // autoplaySpeed:30000,
    
    // transform: true,
    // arrows:true,
    variableWidth: true,
  });

  $(document).ready(function(){
	$('.wrap-slide4').slick({
        infinite: true,
        useTransform: true,
        slidesToShow: 3,
        //количество слайдов, которые выводятся на экране
        slidesToScroll: 1,
        // fade: true,
  //количество слайдов, которые перелистываются за один раз
		
        // centerMode: true,
        //центруем текущий слайд
        // centerPadding: '60px',
        // variableWidth: true,
        // transform: false,
        arrows:false,
		// dots:true,
		// slidesToShow:3,
        // infinite: true,
        // slidesToScroll: 1,
		autoplay:true,
		speed:1000,
		autoplaySpeed:800,
		// responsive:[
		// 	{
		// 		breakpoint: 768,
		// 		settings: {
        //             slidesToShow: 3,
        //             infinite: true,
        //             slidesToScroll: 1,
        //             variableWidth: true
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 550,
		// 		settings: {
		// 			slidesToShow:1,
        //              arrows: true,
        //             variableWidth: true,
		// 		}
		// 	}
		// ]
	});
}); 


// $('.slide3').slick({
//     infinite: true,
//     arrows:true,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     // autoplay:true,
//     // speed:1000,
//     // autoplaySpeed:30000,
    
//     // transform: true,
//     // arrows:true,
//     variableWidth: true,
//   })

//   $(document).ready(function() {
	$('.logo1,.menu-burger').click(function(event){
        $('.logo1,.nav-flex').toggleClass('active');
     
	});
// }); 
