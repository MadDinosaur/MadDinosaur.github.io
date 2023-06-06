let slideIndex = [1, 1, 1, 1, 1, 1, 1, 1,1,1,1];
/* Class the members of each slideshow group with different CSS classes */
let slideId = ["gizmo-quest-slides", "umbrella-slides", "break-in-slides", "astronomical-war-slides", "woolf-slides", "dont-cross-streams-slides", "at-hack-slides", "yes-we-can-slides", "four-corner-slides", "metsys-code-slides", "datattack-slides"]
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2);
showSlides(1, 3);
showSlides(1, 4);
showSlides(1, 5);
showSlides(1, 6);
showSlides(1, 7);
showSlides(1, 8);
showSlides(1, 9);
showSlides(1,10);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) { slideIndex[no] = 1 }
  if (n < 1) { slideIndex[no] = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}
