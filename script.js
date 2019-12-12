'use strict';

// put your own value below!
const apiKey = 'EDemi4aH7fywTDZuu7t8wFCy5436bp6cA7nPEUzP';
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
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

function getParks(query, maxResults) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: 10
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

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
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-state-search').val();//    const searchTerm = $('#js-search-term').val();
    console.log(searchTerm);
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
    console.log('watchForm');
  });
}

//$(watchForm);
$( document ).ready(function() {
    watchForm();
});






/*Your team is working on an app that will help folks plan a vacation. You've been assigned to work on one feature for the app: to display a list of national parks in an area.


    Review The National Parks Services API documentation and create an API key. https://www.nps.gov/subjects/developer/get-started.htm

    Review the API Guide on Authentication for ways to pass your API key as part of the request.
    https://www.nps.gov/subjects/developer/guides.htm

    Review the /parks endpoint and data model to understand how it works.
    Endpoint: https://www.nps.gov/subjects/developer/api-documentation.htm#/parks/getPark
    Data model: https://www.nps.gov/subjects/developer/api-documentation.htm#/definitions/Park

    Create a new app and push it to GitHub.
    When you're done, submit the link to your GitHub repo at the bottom of the page.

    Requirements:
        The user must be able to search for parks in one or more states.
        The user must be able to set the max number of results, with a default of 10.
        The search must trigger a call to NPS's API.
        The parks in the given state must be displayed on the page. Include at least:
            Full name
            Description
            Website URL
        The user must be able to make multiple searches and see only the results for the current search.

As a stretch goal, try adding the park's address to the results.

This exercise should take about an hour to complete. If you're having trouble, attend a Q&A session or reach out on Slack for help.*/
