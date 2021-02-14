const btns = document.querySelectorAll(".col__btn");
const keyCodeColumns = [ 49, 50, 51, 52, 53 ];
const hexes = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E" ];

let getColor = () => {
  let color = '';
  for (let i = 0; i < 6; i++) {
    let index = parseInt(Math.random() * hexes.length);
    let char = hexes[index];
    color += char;
  };
  return `#${color}`;
};

let setColumnColor = (columnEl) => {
  var color = getColor();
  
  columnEl.style.setProperty("background-color", color);

  var titleEl = columnEl.querySelector(".col__title");
  titleEl.innerText = color;
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    setColumnColor(this.parentNode);
  }, false);
  //Set initial
  setColumnColor(btns[i].parentNode);
};

let getColumnFromIndex = (index=0) => {
  index = parseInt(index);
  return btns[index].parentNode;
};

document.addEventListener("keypress", function onPress(event) {
  var index = keyCodeColumns.indexOf(event.keyCode);
  if (event.keyCode == "32") { //space
    for (let i = 0; i < btns.length; i++) {
      setColumnColor(getColumnFromIndex(i));
    };
  }
  else if (index > -1) {
    setColumnColor(getColumnFromIndex(index));
  }
});