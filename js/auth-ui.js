import { supabase } from "./supabase.js";
import { logout } from "./auth.js";

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const logoutLink = document.getElementById("logoutLink");
const createLink = document.getElementById("createLink");

async function updateNav() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
  } else {
    logoutLink.style.display = "none";
    createLink.style.display = "none";
  }

}

updateNav();

supabase.auth.onAuthStateChange((event, session) => {
  updateNav();
});

logoutLink?.addEventListener("click", async (e) => {
  e.preventDefault();
  await logout();
});