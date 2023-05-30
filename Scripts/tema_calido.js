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

  body.style.backgroundColor = "#E2B378";
  body.style.color = "#111111";
  body.style.fontFamily = "Roboto, sans-serif";

  if (main) {
    main.style.backgroundColor = "#E2B378";
    main.style.color = "#111111";
    main.style.fontFamily = "Roboto, sans-serif";
  }

  if (nav) {
    nav.style.backgroundColor = "#E2B378";
    nav.style.color = "#111111";
    nav.style.fontFamily = "Roboto, sans-serif";
  }

  if (headerPage) {
    headerPage.style.backgroundColor = "#E2B378";
    headerPage.style.color = "#111111";
    headerPage.style.fontFamily = "Roboto, sans-serif";
  }

  if(sections){
    sections.forEach(function (s) {
    s.style.backgroundColor = "#E2B378"; // Cambia el color a rojo
    s.style.color = "#111111";
  });}

  if(asides){
    asides.forEach(function (a) {
    a.style.backgroundColor = "#E2B378"; // Cambia el color a rojo
    a.style.color = "#111111";
  });}

  if(articles){
    articles.forEach(function (a) {
    a.style.backgroundColor = "#E2B378"; // Cambia el color a rojo
    a.style.color = "#111111";
  });}

  if(divs){
    divs.forEach(function (d) {
    d.style.backgroundColor = "#E2B378"; // Cambia el color a rojo
    d.style.color = "#111111";
  });}

  if(spans){
    spans.forEach(function (s) {
    //s.style.backgroundColor = "#111111"; // Cambia el color a rojo
    s.style.color = "#1B1B1B";
  });}

  if(h1){
    h1.forEach(function (h) {
    h.style.color = "#111111";
    //h.style.color = "ECFCC7";
    h.style.fontWeight = "bold";
  });
}

  if(h2){
    h2.forEach(function (h) {
    h.style.color = "#111111";
    h.style.fontWeight = "bold";
  });}

  if(h3){
    h3.forEach(function (h) {
    h.style.color = "#111111";
    h.style.fontWeight = "bold";
  });}

  if(links){
    links.forEach(function (ax) {
    ax.style.color = "E2B378";
    ax.style.fontWeight = "bold";
  });
}

  if(inputs){
    inputs.forEach(function (i) {
    i.style.backgroundColor = "1B1B1B";
    i.style.color = "#9DC1CE";
    //i.style.fontWeight = "bold";
  });
}

  if(tables){
    tables.forEach(function (t) {
    t.style.backgroundColor = "1B1B1B";
    t.style.color = "#111111";
    //i.style.fontWeight = "bold";
  });
}

  /*adds.forEach(function (a) {
    a.remove();
  });*/
})();
