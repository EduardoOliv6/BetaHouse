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

// const PRODUCTION_URL = "betahouserestaruante.com"
const PRODUCTION_URL = "http://127.0.0.1:5500/";
const url = `${PRODUCTION_URL}menu.json`;
fetchJsonData(url)
  .then(data => {
    if (data && data.menu) {
      insertMenuData(data.menu);
    }
  })