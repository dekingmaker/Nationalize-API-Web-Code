var searchButton=document.getElementById("search-button");
var inputName=document.getElementById("enterName");
var searchResultsContainer= document.getElementById("search-results-container");
var searchFilterInput = document.getElementById('search-filter');





searchButton.addEventListener("click",async function(event){
    var enteredName=inputName.value;
   console.log('Search button clicked. Entered name:',enteredName);
  try {
  var  nationalities= await fetchNationalities(enteredName);
  
  console.log('Fetched nationalities:', nationalities);
  
  var topCountries = nationalities.country.splice(0,2);
  
      
      // Clear any existing search results
      searchResultsContainer.innerHTML = '';
      
      // Create and append HTML elements for each country and probability
      topCountries.forEach(function(country) {
        var countryName = country.country_id;
        var probability = country.probability.toFixed(2);
        
        var countryElement = document.createElement('p');
        countryElement.textContent = 'Country: ' + countryName;
        
       var probabilityElement = document.createElement('p');
        probabilityElement.textContent = 'Probability: ' + probability;
        
        searchResultsContainer.appendChild(countryElement);
        searchResultsContainer.appendChild(probabilityElement);
     });
    
  }
   catch(error){
    console.log('Error fetching nationalities:',error.message);
}
});

searchFilterInput.addEventListener('input',function(event){
    var filterVal= event.target.value;
    var filterValue=filterVal.toLowerCase();
    

    var countryElements=searchResultsContainer.querySelectorAll('p:first-of-type');
    countryElements.forEach(function(countryElement){
        var countryName=countryElement.textContent.toLowerCase();
        if (countryName.includes(filterValue)) {
            highlightText(countryElement, filterValue);
          } else {
            resetTextHighlight(countryElement);
          }

    });

});


async function fetchNationalities(name){
    var response = await fetch('https://api.nationalize.io?name=' + encodeURIComponent(name));
    if(!response.ok){
        throw new Error('Failed to fetch nationalities');


    }
    var data = await response.json();

   return data;
   

}
function highlightText(element, filterValue) {
    var regex = new RegExp('(' + filterValue + ')', 'gi');
    element.innerHTML = element.textContent.replace(regex, '<mark>$1</mark>');
  }

  function resetTextHighlight(element) {
    element.innerHTML = element.textContent;
  }