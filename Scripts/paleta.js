(() => {
  let body = document.querySelector("body");
  let main = document.querySelector("main");
  let headerPage = document.querySelector("header");
  let nav = document.querySelector("nav");
  let sections = document.querySelectorAll("section");
  let asides = document.querySelectorAll("aside");
  let articles = document.querySelectorAll("article");
  let divs = document.querySelectorAll("div");
  let h1 = document.querySelectorAll("h1");
  let h2 = document.querySelectorAll("h2");
  let h3 = document.querySelectorAll("h3");
  let spans = document.querySelectorAll("span");
  let links = document.querySelectorAll("a");
  let inputs = document.querySelectorAll("input");
  let tables = document.querySelectorAll("table");

  body.style.backgroundColor = "#131313";
  body.style.color = "#FFFFFF";
  body.style.fontFamily = "Roboto, sans-serif";

  if (main) {
    main.style.backgroundColor = "#131313";
    main.style.color = "#FFFFFF";
    main.style.fontFamily = "Roboto, sans-serif";
  }

  if (nav) {
    nav.style.backgroundColor = "#131313";
    nav.style.color = "#FFFFFF";
    nav.style.fontFamily = "Roboto, sans-serif";
  }

  if (headerPage) {
    headerPage.style.backgroundColor = "#131313";
    headerPage.style.color = "#FFFFFF";
    headerPage.style.fontFamily = "Roboto, sans-serif";
  }

  if(sections){
    sections.forEach(function (s) {
    s.style.backgroundColor = "#232323"; // Cambia el color a rojo
    s.style.color = "#FFFFFF";
  });}

  if(asides){
    asides.forEach(function (a) {
    a.style.backgroundColor = "#232323"; // Cambia el color a rojo
    a.style.color = "#FFFFFF";
  });}

  if(articles){
    articles.forEach(function (a) {
    a.style.backgroundColor = "#232323"; // Cambia el color a rojo
    a.style.color = "#FFFFFF";
  });}

  if(divs){
    divs.forEach(function (d) {
    d.style.backgroundColor = "#232323"; // Cambia el color a rojo
    d.style.color = "#FFFFFF";
  });}

  if(spans){
    spans.forEach(function (s) {
    //s.style.backgroundColor = "#232323"; // Cambia el color a rojo
    s.style.color = "#ECFCC7";
  });}

  if(h1){
    h1.forEach(function (h) {
    h.style.color = "#ECFCC7";
    //h.style.color = "ECFCC7";
    h.style.fontWeight = "bold";
  });
}

  if(h2){
    h2.forEach(function (h) {
    h.style.color = "#9DC1CE";
    h.style.fontWeight = "bold";
  });}

  if(h3){
    h3.forEach(function (h) {
    h.style.color = "#F3F0F1";
    h.style.fontWeight = "bold";
  });}

  if(links){
    links.forEach(function (ax) {
    ax.style.color = "D0FFFB";
    ax.style.fontWeight = "bold";
  });
}

  if(inputs){
    inputs.forEach(function (i) {
    i.style.backgroundColor = "gray";
    i.style.color = "#9DC1CE";
    //i.style.fontWeight = "bold";
  });
}

  if(tables){
    tables.forEach(function (t) {
    t.style.backgroundColor = "B0C4DE";
    t.style.color = "#131313";
    //i.style.fontWeight = "bold";
  });
}

  /*adds.forEach(function (a) {
    a.remove();
  });*/
})();
