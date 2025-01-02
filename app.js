const main = document.querySelector("main");

async function getRecipes() {
  const url = "http://localhost:3030/jsonstore/cookbook/recipes";

  main.replaceChildren();
  try {
    const response = await fetch(url);

    if (response.ok == false) {
      const message = await response.json();
      throw new Error(message);
    }
    const recipes = await response.json();

    const values = Object.values(recipes);

    values.forEach((value) => {
      const recipeCard = document.createElement("article");
      recipeCard.className = "preview";
      recipeCard.dataset.id = value._id;

      recipeCard.innerHTML = `
      <div class="title">
                <h2>${value.name}</h2>
            </div>
            <div class="small">
                <img src="${value.img}">
            </div>
      `;

      recipeCard.addEventListener("click", async (event) => {
        const recipeId = event.currentTarget.dataset.id;
        const url = `http://localhost:3030/jsonstore/cookbook/details/${recipeId}`;

        try {
          const response = await fetch(url);

          if (response.ok == false) {
            const message = await response.json();
            throw new Error(message);
          }

          const recipeDetails = await response.json();

          main.innerHTML = `
    <article>
        <h2>${recipeDetails.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${recipeDetails.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipeDetails.ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipeDetails.steps.map((step) => `<p>${step}</p>`).join("")}
        </div>
    </article>
  `;
        } catch (error) {
          console.log(error.message);
        }
      });

      main.appendChild(recipeCard);
    });
  } catch (error) {
    console.log(error.message);
  }
}

getRecipes();
