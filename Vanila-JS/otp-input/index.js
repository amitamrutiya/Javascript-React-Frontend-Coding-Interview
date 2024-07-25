const inputs = document.getElementById("inputs");

inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;

  if (isNaN(val)) {
    target.value = "";
    return;
  }

  if (val != "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    target.value = "";
    const prev = target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
    return;
  }
});

inputs.addEventListener("paste", function (e) {
  e.preventDefault();
  const data = e.clipboardData.getData("text");
  const dataArr = data.split("");

  let target = e.target;
  target.value = "";

  dataArr.forEach((val) => {
    if (!isNaN(val)) {
      target.value = val;
      const next = target.nextElementSibling;
      if (next) {
        target = next;
      }
    }
  });
});
