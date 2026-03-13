import { supabase } from "./supabase.js"


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
<p>${article.body}</p>
<small>${article.category} • ${new Date(article.created_at).toLocaleDateString()}</small>
`

container.appendChild(articleCard)

})

}

loadArticles()