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
`

container.appendChild(articleCard)

})

}

loadArticles()