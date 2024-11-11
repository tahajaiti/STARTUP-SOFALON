// Enregistre le plugin ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Sélectionne toutes les images dans les sections pour l'animation au scroll
const images = document.querySelectorAll("main img");

// Applique une animation à chaque image avec ScrollTrigger
images.forEach((image) => {
  gsap.fromTo(
    image,
    { x: -200, opacity: 0 }, // état de départ : hors de l'écran à gauche et invisible
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image, // déclenche l'animation lorsque l'image entre dans la vue
        start: "top 80%", // commence l'animation quand le haut de l'image atteint 80% de la hauteur de la fenêtre
        toggleActions: "play none none none", // lance l'animation et ne la rejoue pas quand on quitte la zone de vue
      },
    }
  );
});
