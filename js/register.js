import { supabase } from "./supabase.js";

const registerForm = document.querySelector("#registerForm");
const message = document.querySelector("#message");
const button = registerForm.querySelector("button");

registerForm.addEventListener("submit", async function (e) {

  e.preventDefault();

  button.disabled = true;

  const email = registerForm.email.value.trim();
  const password = registerForm.password.value;

  try {

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      message.textContent = error.message;
      button.disabled = false;
      return;
    }

    if (data.user) {
      message.textContent = "Registration successful! Check your email to confirm your account.";
      registerForm.reset();
    }

  } catch (error) {
    console.log(error);
    message.textContent = "Something went wrong. Please try again.";
    button.disabled = false;
  }

});