import { clearStorage } from "../../utils/storage.js";

export function logoutButtonListener() {
  const logoutButton = document.querySelector("#logoutButton");
  console.log(logoutButton);
  const base = import.meta.env.BASE_URL;

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearStorage();
      window.location.href = `${base}login/`;
    });
  }
}
