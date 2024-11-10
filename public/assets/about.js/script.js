gsap.from(".content-section", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".content-section",
      start: "top 80%", // L'animation démarre lorsque 80% de la section est visible
      toggleActions: "play none none reverse"
    }
  });