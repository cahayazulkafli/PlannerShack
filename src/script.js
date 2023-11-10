// Variable to store the currently displayed recipe details
let currentDetailsId = null;

// Function to perform a recipe search based on user input
function searchRecipe() {
  // Get the value of the search input
  const searchInput = document.getElementById('searchInput').value;

  // Check if the input is not empty
  if (searchInput.trim() !== '') {
    // Construct the API URL for recipe search
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    // Fetch data from the API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Display the retrieved recipes
        displayRecipes(data.meals);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } else {
    // Alert the user if the search input is empty
    alert('Please enter a keyword to search for recipes.');
  }
}

// Function to display a list of recipes
function displayRecipes(meals) {
  // Get the recipe list container
  const recipeList = document.getElementById('recipeList');
  // Clear the previous content
  recipeList.innerHTML = '';

  if (meals) {
    // Loop through each meal and create a recipe card
    meals.forEach(meal => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe-card';
      recipeCard.addEventListener('click', () => showDetails(meal.idMeal));

      const recipeTitle = document.createElement('h3');
      recipeTitle.textContent = meal.strMeal;

      const recipeImage = document.createElement('img');
      recipeImage.src = meal.strMealThumb;
      recipeImage.alt = meal.strMeal;

      // Append title and image to the recipe card
      recipeCard.appendChild(recipeTitle);
      recipeCard.appendChild(recipeImage);
      // Append the recipe card to the recipe list
      recipeList.appendChild(recipeCard);
    });

    // Show details for the first meal in the list
    if (meals.length > 0) {
      showDetails(meals[0].idMeal);
    }
  } else {
    // Display a message if no recipes are found
    recipeList.innerHTML = '<p>No recipes found. Try a different keyword.</p>';
  }

  // Hide the recipe details section
  document.getElementById('recipeDetails').style.display = 'none';
}

// Function to display detailed information about a recipe
function showDetails(mealId) {
  // Update the currently displayed details id
  currentDetailsId = mealId;

  // Construct the API URL for recipe details
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  // Fetch details for the specified recipe
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display the detailed information
      displayDetails(data.meals[0]);
    })
    .catch(error => {
      console.error('Error fetching details:', error);
    });
}

// Function to display detailed information about a recipe
function displayDetails(meal) {
  // Get the details content container
  const detailsContent = document.getElementById('detailsContent');
  // Clear the previous content
  detailsContent.innerHTML = '';

  // Create elements for title and image
  const recipeTitle = document.createElement('h2');
  recipeTitle.textContent = meal.strMeal;

  const recipeImage = document.createElement('img');
  recipeImage.src = meal.strMealThumb;
  recipeImage.alt = meal.strMeal;

  // Create a list for ingredients
  const ingredientsList = document.createElement('ul');
  ingredientsList.innerHTML = '<h4>Ingredients:</h4>';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      // Create list items for each ingredient
      const listItem = document.createElement('li');
      listItem.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(listItem);
    }
  }

  // Create a paragraph for instructions
  const instructions = document.createElement('p');
  instructions.innerHTML = `<h4>Instructions:</h4>${meal.strInstructions}`;

  // Create a link to the recipe source
  const recipeLink = document.createElement('a');
  recipeLink.href = meal.strSource;
  recipeLink.textContent = 'Link to Recipe';

  // Append elements to the details content
  detailsContent.appendChild(recipeTitle);
  detailsContent.appendChild(recipeImage);
  detailsContent.appendChild(ingredientsList);
  detailsContent.appendChild(instructions);
  detailsContent.appendChild(recipeLink);

  // Hide the recipe list and show the recipe details
  document.getElementById('recipeList').style.display = 'none';
  document.getElementById('recipeDetails').style.display = 'block';
}

// Function to go back to the recipe list view
function goBack() {
  // Hide the recipe details and show the recipe list
  document.getElementById('recipeDetails').style.display = 'none';
  document.getElementById('recipeList').style.display = 'block';
  // Reset the current details id
  currentDetailsId = null;
}

// Event listener for the Enter key in the search input
document.getElementById('searchInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    // Perform a recipe search when Enter key is pressed
    searchRecipe();
  }
});

// Event listener for the popstate event (e.g., browser back button)
window.addEventListener('popstate', function(event) {
  // Go back to the recipe list view if details are currently displayed
  if (currentDetailsId) {
    goBack();
  }
});

// Function to navigate to the CRUD page
function goToCRUD() {
  window.location.href = 'CRUD/index.html';
}
