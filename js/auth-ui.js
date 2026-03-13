import { supabase } from "./supabase.js"

const loginLink = document.getElementById("loginLink")
const registerLink = document.getElementById("registerLink")
const logoutLink = document.getElementById("logoutLink")
const createLink = document.getElementById("createLink")

async function checkAuth() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {

    loginLink.style.display = "none"
    registerLink.style.display = "none"

  } else {

    logoutLink.style.display = "none"
    createLink.style.display = "none"

  }

}

checkAuth()

logoutLink?.addEventListener("click", async () => {

  await supabase.auth.signOut()
  window.location.href = "index.html"

})