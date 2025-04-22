const BASEURL = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGQwNWQ1YzU1MTM2NDk5ODRmZDFlNDA5M2MxMTJhZSIsIm5iZiI6MTc0NDI4MjQ4NC4wLCJzdWIiOiI2N2Y3YTM3M2VhODBkODUxNzU5OTVlZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NRl298Ng6g8UT-202bWI5shqvk1BUJmXzlIjd0zcIPA";
const list = document.getElementById("list");

let language = "es-ES";

let page = 0;

getMovies();

function getMovies(reset = false) {
    if (reset) {
        page = 1;
        list.innerHTML = "";
    } else {
        page += 1;
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(
        `${BASEURL}/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=popularity.desc`,
        options
    )
        // Primer then -> convertir a JSON
        .then((res) => res.json())
        // Segundo -> hacer lo que quiera con el JSON
        .then((res) => {
            // Deconstrucción
            const { results, page, total_pages, total_results } = res; // == const results = res.results;

            results.forEach((movie) => {
                const { title, overview, poster_path } = movie;

                list.innerHTML += `
                    <div
                    class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 pb-2">
                    <div class="relative pb-[150%]">
                        <img src="${imageBaseUrl}${poster_path}" alt="${title}" class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                        <h1 class="text-xl font-bold text-gray-800 mb-2 px-4 py-2">${title}</h1>
                        <p class="text-sm text-gray-700 mb-3 px-6">${overview}</p>
                    </div>
                `;
            });
        })
        .catch((err) => console.error(err));
}

document.getElementById('language').addEventListener('change', function (event) {
    const selectedLanguage = event.target.value;
    console.log("Idioma seleccionado", selectedLanguage);

    language = selectedLanguage;
    getMovies(true);
})
