import { supabase } from "./supabase.js";

const { data: { user } } = await supabase.auth.getUser();
const container = document.getElementById("articlesContainer");

async function loadArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    container.innerHTML = "<p>Could not load articles.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(article => {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article");

    articleCard.innerHTML = `
      <h3 class="title">${article.title}</h3>
      <h4 class="category">${article.category ?? "General"}</h4>
      <p class="content">${article.content}</p>
      <p class="author">Posted by: ${article.user_id.slice(0, 8)}</p>
      <small>${new Date(article.created_at).toLocaleDateString()}</small>
    `;

    if (user && user.id === article.user_id) {

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      articleCard.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      articleCard.appendChild(deleteBtn);

      editBtn.addEventListener("click", () => {

        const titleEl = articleCard.querySelector(".title");
        const categoryEl = articleCard.querySelector(".category");
        const contentEl = articleCard.querySelector(".content");

     const titleInput = document.createElement("input");
        titleInput.value = titleEl.textContent;
        titleInput.classList.add("edit-title");

    const categoryInput = document.createElement("input");
    categoryInput.value =
    categoryEl.textContent === "General" ? "" : categoryEl.textContent;
    categoryInput.classList.add("edit-category");

    const contentInput = document.createElement("textarea");
    contentInput.value = contentEl.textContent;
    contentInput.classList.add("edit-content");
        articleCard.replaceChild(titleInput, titleEl);
        articleCard.replaceChild(categoryInput, categoryEl);
        articleCard.replaceChild(contentInput, contentEl);

        editBtn.textContent = "Save";

        editBtn.addEventListener("click", async () => {

          const newTitle = titleInput.value.trim();
          const newCategory = categoryInput.value.trim() || null;
          const newContent = contentInput.value.trim();

          const { error } = await supabase
            .from("articles")
            .update({
              title: newTitle,
              category: newCategory,
              content: newContent
            })
            .eq("id", article.id);

          if (error) return alert(error.message);

          titleEl.textContent = newTitle;
          categoryEl.textContent = newCategory ?? "General";
          contentEl.textContent = newContent;

          articleCard.replaceChild(titleEl, titleInput);
          articleCard.replaceChild(categoryEl, categoryInput);
          articleCard.replaceChild(contentEl, contentInput);

          editBtn.textContent = "Edit";

        }, { once: true });

      });


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

    container.appendChild(articleCard);
  });
}

loadArticles();