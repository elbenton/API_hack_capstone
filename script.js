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
   for (let i = 0; i < maxList; i++){ //for (let i = 0; i < responseJson.data.length; i++){  //for (let i = 0; i < responseJson.items.length; i++){
    // for each park object in the items
    //array, add a list item to the results
    //list with the park title, description,
    //and thumbnail
    $('#results-list').append(
      `<div class="park-name">
      <h3 class="panel-title">${responseJson.data[i].fullName}</h3>
    </div>
    <div class="park-description">
     <h4 class="panel-title">${responseJson.data[i].description}</h4>
     <p> <p>
     </div>
     <div class= "url">
     <a href=" ${responseJson.data[i].url}">Park Website</a>
     </div>
    </div>
  </div>`);
  }
  //display the results section
  $('#results').removeClass('hidden');
};


  function getRestaurants(query, maxResults) {
  const params = {
    user-key: apiKey,
    q: query,
    count: 10
  };
  const queryString = formatQueryParams(params)
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