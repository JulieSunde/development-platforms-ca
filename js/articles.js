import { supabase } from "./supabase.js"

const { data: { user } } = await supabase.auth.getUser()
const container = document.getElementById("articlesContainer")

async function loadArticles() {

const { data, error } = await supabase
.from("articles")
.select("*")
.order("created_at", { ascending: false })

if (error) {
container.innerHTML = "<p>Could not load articles.</p>"
return
}

container.innerHTML = ""

data.forEach(article => {

const articleCard = document.createElement("div")
articleCard.classList.add("article")

articleCard.innerHTML = `
<h3>${article.title}</h3>
<h4>${article.category ?? "General"}</h4>
<p>${article.content}</p>
<p class="author">Posted by: ${article.user_id.slice(0,8)}</p>
<small>${new Date(article.created_at).toLocaleDateString()}</small>

${user && user.id === article.user_id 
  ? `
    <a href="edit.html?id=${article.id}" class="edit-btn">Edit</a>
    <button class="delete-btn" data-id="${article.id}">Delete</button>
    `
  : ""}
`
if (user && user.id === article.user_id) {
  const deleteBtn = articleCard.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this article?")) {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", article.id);

      if (error) {
        alert("Error deleting: " + error.message);
      } else {
        articleCard.remove(); 
      }
    }
  });
}

container.appendChild(articleCard)

})

}

loadArticles()