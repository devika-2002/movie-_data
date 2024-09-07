
let moviesName = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchButton");
let result = document.getElementById("results");

const displayMovieData = (data) => {
  if (data.Response === "True") {
    const { Title, Year, Genre, Director, Plot ,Language} = data;
    result.innerHTML = `
      <h2>${Title}</h2>
      <p><strong>Year:</strong> ${Year}</p>
      <p><strong>Genre:</strong> ${Genre}</p>
      <p><strong>Director:</strong> ${Director}</p>
      <p><strong>Plot:</strong> ${Plot}</p>
      <p><strong>Language:</strong> ${Language}</p>
    `;
  } else {
    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
  }
};

const getMovies = () => {
  let movies = moviesName.value;
  let url = `https://www.omdbapi.com/?t=${movies}&apikey=809f0cff`;

  if (movies.length === 0) {
    result.innerHTML = `<h3 class="msg">Please Enter a Movie Name</h3>`;
  } else {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const data = JSON.parse(request.responseText);
          console.log(data);
          displayMovieData(data);
        } else {
          console.log('Error:', request.status);
          result.innerHTML = `<h3 class="msg">An error occurred. Please try again later.</h3>`;
        }
      }
    };
    request.open("GET", url, true);
    request.send();
  }
};

searchBtn.addEventListener('click', getMovies);
