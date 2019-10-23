function show_more() {
  var morePara = document.getElementById('more');
  if (morePara == null) {
    throw new ReferenceError("HTML document missing element with id #more", "show_more.js", 4);
  }
  var moreBtn = document.getElementById('moreBtn');
  if (moreBtn == null) {
    throw new ReferenceError("HTML document missing button with id #moreBtn", "show_more.js", 7);
  }
  if (morePara.style.display == "none" || morePara.style.display == "") { // check "" in case display attr not set yet
    morePara.style.display = "inline";
    moreBtn.innerHTML = "Show less..."
  } else {
    morePara.style.display = "none";
    moreBtn.innerHTML = "Show more.."
  }
}
