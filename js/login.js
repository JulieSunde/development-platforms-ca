import { supabase } from "./supabase.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      console.log("user", data.user);
      console.log("session", data.session);
      loaction.href = "/index.html"
    }
  } catch (error) {
    console.log(error)
    message.textContent = "Something went wrong. Please try again";
  }
});