'use strict'

//zomato
const apiKey = '305878bf68ba67d5c88f083becf43626';
const searchURL = 'https://developers.zomato.com/api/v2.1/cities';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#zomato-results-list').empty();
  // iterate through the items array
  let maxList = responseJson.data.length;
  if(maxList > maxResults) maxList = maxResults;
  //console.log(maxList);
   for (let i = 0; i < maxList; i++){
    $('#zomato-results-list').append(
      `<div class="restaurant-name">
        <h3 class="restaurantsJs">${responseJson.data[i].fullName}</h3>
      </div>
      <div class= "url">
        <a href=" ${responseJson.data[i].url}">Restaurants</a>
       </div>`);
  }
  //display the results section
  $('#results').removeClass('hidden');
};


  function getRestaurants(query, maxResults=10) {
  const params = {
    "user-key": apiKey,
    q: query,
    count: 10
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    console.log('Button clicked');
    const searchTerm = $('#location-search').val();
    const maxResults = 10; 
    getRestaurants(searchTerm, maxResults); 
  });
}

$(watchForm);
