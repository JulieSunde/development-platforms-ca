import { supabase } from "./supabase.js"

const postForm = document.querySelector("#postForm")
const message = document.querySelector("#message")

postForm.addEventListener("submit", async function (e) {
  e.preventDefault()

  const title = postForm.title.value.trim()
  const category = postForm.category.value.trim()
  const content = postForm.content.value.trim()

  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      message.textContent = "You must be logged in to create an article"
      return
    }

    const { error } = await supabase
      .from("articles")
      .insert([{
        title,
        category,
        content,
        user_id: user.id
      }])

    if (error) {
      message.textContent = error.message
      return
    }

    message.textContent = "Article created!"

    postForm.reset()

    setTimeout(() => {
      window.location.href = "index.html"
    }, 1500)

  } catch (error) {
    console.error(error)
    message.textContent = "Something went wrong"
  }
})