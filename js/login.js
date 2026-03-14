import { supabase } from "./supabase.js";

const loginForm = document.querySelector("#loginForm");
const message = document.querySelector("#message");

loginForm.addEventListener("submit", async function (e) {

  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.textContent = error.message;
      return;
    }

    if (data.user) {
      message.textContent = "Login successful!";
      window.location.href = "index.html";
    }

  } catch (error) {
    console.log(error);
    message.textContent = "Something went wrong. Please try again.";

  }

});