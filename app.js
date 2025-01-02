async function getRecipes() {
  const main = document.querySelector("main");
  const url = "http://localhost:3030/jsonstore/cookbook/recipes";

  try {
    const response = await fetch(url);

    if (response.ok == false) {
      const message = await response.json();
      throw new Error(message);
    }
    const recipes = await response.json();
    console.log(recipes);

    const values = Object.values(recipes);
    console.log(values);

    values.forEach((value) => {
      const recipeCard = document.createElement("article");
      recipeCard.className = "preview";

      recipeCard.innerHTML = `
      <div class="title">
                <h2>${value.name}</h2>
            </div>
            <div class="small">
                <img src="${value.img}">
            </div>
      `;

      main.appendChild(recipeCard);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

getRecipes();
