import { Toast } from "./Toast/toast.js";

Toast.init();

let showToastBtn = document.getElementById("show-toast-button");

showToastBtn.addEventListener("click", () => {
  Toast.show("success toast", "success", "top-right", 5);
});
