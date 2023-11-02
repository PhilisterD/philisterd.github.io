const APIURL = "https://api.themoviedb.org/3/discover/movie?language=zh&api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const SEARCHIDAPI = "https://api.themoviedb.org/3/movie/{id}?language=zh-CN&api_key=04c35731a5ee918f014970082a0088b1"


const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");
const fileName = 'data.json';
// initially get fav movies

const ids = [575264, 912908, 298618, 252822, 882569, 335977, 763165, 1018332, 856289, 1112175]
// showMovies(data)
getMoviesList();

async function replaceId(ids) {
  const newUrls = ids.map((id) => {
    return SEARCHIDAPI.replace("{id}", id);
  });
  return newUrls;
}

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

async function getMoviesList() {
    const respData = [];
    const urllist = await replaceId(ids);
    for (const url of urllist) {
        const resp = await fetch(url);
        const data = await resp.json();
        respData.push(data);
    }
    console.log(respData);
    showMovies(respData);
}

function getJson() {
    $.ajax({
        type: "GET",
        url: "data.json",
        'async':false,
        dataType: "json",
        success: (res) => {
            getdata = res
        }
    })
}

function showMovies(movies) {
    
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
