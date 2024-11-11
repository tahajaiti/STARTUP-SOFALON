
gsap.registerPlugin(ScrollTrigger);


const divs = document.querySelectorAll("main div");

const imgs = document.querySelectorAll("main img");


divs.forEach((div, index) => {
 
  const fromX = index % 2 === 0 ? 200 : -200; 

  gsap.fromTo(
    div,
    { x: fromX, opacity: 0 }, 
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: div, 
        start: "top 80%", 
        toggleActions: "play none none none",
      },
    }
  );
});



imgs.forEach((img, index) => {
  
  const fromX = index % 2 === 0 ? 200 : -200; 

  gsap.fromTo(
    img,
    { x: fromX, opacity: 0 }, 
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img, 
        start: "top 80%", 
        toggleActions: "play none none none", 
      },
    }
  );
});
