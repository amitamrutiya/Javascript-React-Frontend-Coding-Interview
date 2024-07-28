const gridContainer = document.querySelector(".gridContainer");
let empties;
let fill;
let chooseFile;
let selected;
let swapElement;
let doesExist;
let parentOfFill;

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const emptyBox = document.createElement("div");
    const addIcon = document.createElement("div");
    const file = document.createElement("input");
    emptyBox.className = "empty";
    addIcon.className = "addIcon";
    addIcon.innerText = "+";
    file.type = "file";
    file.className = "file";
    gridContainer.appendChild(emptyBox);
    emptyBox.appendChild(addIcon);
    emptyBox.appendChild(file);

    file.addEventListener("change", function () {
      getImgData(file, emptyBox);
    });
  }
}

empties = document.querySelectorAll(".empty");
chooseFile = document.querySelectorAll(".file");

const getImgData = (file, emptyBox) => {
  const getFile = file.files[0];
  const image = document.createElement("img");
  const fill = document.createElement("div");
  emptyBox.appendChild(fill);

  image.className = "image";
  fill.className = "fill";
  addDeleteIcon(fill, file);
  const reader = new FileReader();
  reader.onloadend = function () {
    image.src = reader.result;
  };
  if (getFile) {
    reader.readAsDataURL(getFile);
    fill.appendChild(image);
    fill.addEventListener("dragstart", dragStart);
    fill.addEventListener("dragend", dragEnd);
  }
};

const onDeleteBtnClick = (fill, file) => {
  fill.remove();
  file.value = "";
};

const addDeleteIcon = (fill, file) => {
  const deleteIcon = document.createElement("div");
  deleteIcon.addEventListener("click", () => onDeleteBtnClick(fill, file));
  deleteIcon.innerText = "X";
  deleteIcon.className = "delete";
  fill.appendChild(deleteIcon);
};

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  selected = this;
  parentOfFill = selected.parentNode;
  this.className += " hold";
  setTimeout(() => {
    return (this.style.visibility = "hidden");
  }, 0);
}

function dragOver(e) {
  e.preventDefault();
  if (!this.className.includes("hovered")) {
    this.className += " hovered";
  }
}

function dragEnter(e) {
  e.preventDefault();

  if (this.querySelector(".fill") !== null) {
    doesExist = true;
    const elements = this.querySelectorAll(".fill");
    swapElement = elements[0];
  } else {
    doesExist = false;
  }
}

function dragLeave() {
  this.className = "empty";
}

function dragDrop() {
  this.className = "empty";
  selected.style.visibility = "visible";
  if (doesExist) {
    parentOfFill.append(swapElement);
  }
  parentOfFill.children[1].value = "";
  this.append(selected);
}

function dragEnd() {
  this.className = "fill";
  if (selected.style.visibility === "hidden") {
    selected.style.visibility = "visible";
  }
}
