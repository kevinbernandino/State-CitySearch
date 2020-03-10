const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];  // creates cities to equal our constat

fetch(endpoint)     // creates an endpoint to an array for the cities from the url
    .then(blob => blob.json())         // creates the array
    .then(data => cities.push(...data))     // pushes the cities into data to list in array

function findMatches(wordToMatch, cities){  // a function to match cities to whatever is typed into the search bar
    return cities.filter(place => { 
        const regex = new RegExp(wordToMatch, 'gi'); // const to search through all the cities and states search
        return place.city.match(regex) || place.state.match(regex) // return the matched cities or state when one or both statements are true
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi'); // create a regex value
        const cityName = place.city.replace(regex, `<span class = "hl">${this.value}</span>`); // replace the regex value for the city name the user has searched for
        const stateName = place.state.replace(regex, `<span class = "hl">${this.value}</span>`); // replace the regex value for the state name the user has searched for
        return `
        <li>
        <span class = "name">${cityName}, ${stateName}</span>
        <span class = "population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

