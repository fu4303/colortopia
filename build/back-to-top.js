 // Gets top button
 var mybutton = document.getElementById("top-button");
  
 // Show button when the user scrolls
 window.onscroll = function() {scrollFunction()};
 
 function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
     mybutton.style.display = "block";
   } else {
     mybutton.style.display = "none";
   }
 }
 
 function topFunction() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
 }

 function ColorSectionFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 630;
  }