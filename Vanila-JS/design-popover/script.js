document.addEventListener("DOMContentLoaded", () => {
  const popoverButton = document.getElementById("popoverButton");
  const popover = document.getElementById("popover");

  popoverButton.addEventListener("click", (e) => {
    e.stopPropagation();
    popover.style.display = popover.style.display === "flex" ? "none" : "flex";
  });

  popover.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target === popover) {
      popover.style.display = "none";
    }
  });
});
