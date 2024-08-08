// Esta es una funcion asincrona
const fetchJsonData = async (url) => {
  try {
    // hace un fetch con una url, solicitud https
    const response =  await fetch(url);
    
    // Revisa que no tenga errores
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Retorna el json
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const insertMenuData = (menuData) => {
  const menuContainer = document.getElementById('menu-data');
  
  if (!menuContainer) {
    console.error('Menu container not found');
    return;
  }

  const leftDiv = document.createElement('div');
  leftDiv.classList.add(`left`);

  const rightDiv = document.createElement('div');
  rightDiv.classList.add(`right`);
  menuData.forEach((item, index) => {

    const foodDiv = document.createElement('div');
    foodDiv.classList.add(`food-1`);
    
    const title = document.createElement('h3');
    title.textContent = item.name;
    
    const foodTxtDiv = document.createElement('div');
    foodTxtDiv.classList.add('food-txt');
    
    const description = document.createElement('p');
    description.textContent = item.description;
    
    const price = document.createElement('p');
    price.classList.add('precio');
    price.textContent = `$${item.price.toFixed(2)}`;
    
    
    foodTxtDiv.appendChild(description);
    foodTxtDiv.appendChild(price);
    foodDiv.appendChild(title);
    foodDiv.appendChild(foodTxtDiv);
    
     if (item.extraDescription) {

      const extraDescriptionDiv = document.createElement('div');
      extraDescriptionDiv.classList.add('extra-description-div');


      const extraDescription = document.createElement('p');
      extraDescription.classList.add('extra-description');
      extraDescription.textContent = item.extraDescription.text;

      const extraPrice = document.createElement('p');
      extraPrice.classList.add('extra-price');
      extraPrice.textContent = `$${item.extraDescription.price.toFixed(2)}`;

      extraDescriptionDiv.appendChild(extraDescription);
      extraDescriptionDiv.appendChild(extraPrice);

      foodDiv.appendChild(extraDescriptionDiv);

    }

    if (index % 2 === 0) {
      leftDiv.appendChild(foodDiv)
    } else {
      rightDiv.appendChild(foodDiv)
    }
    
  });
  menuContainer.appendChild(leftDiv);
  menuContainer.appendChild(rightDiv);
};

const insertLunchContainer = (lunchData) => {
  const lunchContainer = document.getElementById("lunch");
  if (!lunchContainer) {
    console.error('Menu container not found');
    return;
  }
   lunchData.forEach((item, index) => {
    const lunchDiv = document.createElement("div");
    lunchDiv.classList.add("lunch-1");
    
    const lunchTxt = document.createElement("div")
    lunchTxt.classList.add("lunch-txt")

    const lunchTitle = document.createElement('h3');
    lunchTitle.textContent = item.title;
    lunchTitle.classList.add("lunch-title")

    lunchDiv.appendChild(lunchTitle);

    item.options.forEach ((option) => {
      const optionContainer = document.createElement('div');
      optionContainer.classList.add('option-container');

      const optionName = document.createElement('p');
      optionName.textContent = option.name;

      const optionPrice = document.createElement('p');
      optionPrice.classList.add('lunch-price');
      optionPrice.textContent = `$${option.price.toFixed(2)}`;

      optionContainer.appendChild(optionName);
      optionContainer.appendChild(optionPrice);
      lunchTxt.appendChild(optionContainer);
  
      lunchDiv.appendChild(lunchTxt)
      lunchContainer.appendChild(lunchDiv)
  
     })
    

   })
}

const insertDrinkContainer = (drinkData) => {
  const drinkContainer = document.getElementById("drink")
  if (!drinkContainer) {
    console.error('Menu container not found');
    return;
  }

  drinkData.forEach((item, index) => {
   const drinkDiv = document.createElement("div");
   drinkDiv.classList.add("drink-1");
   
   const drinkTxt = document.createElement("div");
   drinkTxt.classList.add("drink-txt");

   const drinkTitle = document.createElement('h3');
   drinkTitle.textContent = item.title;
   drinkTitle.classList.add("drink-title");
   
   drinkDiv.appendChild(drinkTitle)
   drinkDiv.appendChild(drinkTxt)
   drinkContainer.appendChild(drinkDiv)

   if (item.another) {
    item.another.forEach((another) => {
      const anotherContainer = document.createElement('div');
      anotherContainer.classList.add('another-container');

      const anotherName = document.createElement("p");
      anotherName.textContent = another.name;

      const anotherPrice = document.createElement("p");
      anotherPrice.classList.add("another-price");
      anotherPrice.textContent = `$${another.price.toFixed(2)}`;

      anotherContainer.appendChild(anotherName);
      anotherContainer.appendChild(anotherPrice);
      drinkTxt.appendChild(anotherContainer);
    })
   } 
    else if (item.option) {
      item.option.forEach((option) => {
        const drinkOptionContainer = document.createElement('div');
         drinkOptionContainer.classList.add('drink-option');
         const optionName = document.createElement('p');
         optionName.textContent = option.name;

         const drinksizesContainerprime = document.createElement("div")
         drinksizesContainerprime.classList.add("drink-containerPrime")
   
   
         drinkOptionContainer.appendChild(optionName);
         drinkTxt.appendChild(drinkOptionContainer)
   
         option.price.forEach((price) => {
   
           const drinksizesContainer = document.createElement("div");
           drinksizesContainer.classList.add("drinksizes-container");

           const drinkSizes = document.createElement("p");
           drinkSizes.classList.add("drink-price")
           drinkSizes.textContent = price.tamaño;
   
           const drinkSizesPrice = document.createElement("p");
           drinkSizesPrice.classList.add("drink-price");
           drinkSizesPrice.textContent = `$${price.price.toFixed(2)}`;
   
           drinksizesContainer.appendChild(drinkSizes);
           drinksizesContainer.appendChild(drinkSizesPrice);
           drinksizesContainerprime.appendChild(drinksizesContainer)
         } )
         drinkOptionContainer.appendChild(drinksizesContainerprime);
      })
   
    }

  }) 
  

}

// const PRODUCTION_URL = "betahouserestaruante.com"
const PRODUCTION_URL = "http://127.0.0.1:5500/";
const url = `${PRODUCTION_URL}menu.json`;
fetchJsonData(url)
  .then(data => {
    if (data && data.menu) {
      insertMenuData(data.menu);
    }

    if (data && data.lunch) {
      insertLunchContainer(data.lunch)
    }

    if (data && data.drink) {
      insertDrinkContainer(data.drink)
    }

  }
)
