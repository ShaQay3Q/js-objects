const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movieTitle = document.getElementById("title");
const extraName = document.getElementById("extra-name");
const extraValue = document.getElementById("extra-value");

const clearInputs = () => {
	movieTitle.value = "";
	extraName.value = "";
	extraValue.value = "";
};

const movies = [];

const renderMovies = () => {
	const movieList = document.getElementById("movie-list");
	if (!movieList) return; // if element is not found

	// movies.length === 0
	// 	? movieList.classList.remove("visible")
	// 	: movieList.classList.add("visible");
	movieList.classList.toggle("visible", movies.length > 0);
	movieList.innerHTML = "";

	const fragment = document.createDocumentFragment(); // Create a temporary container
	movies.forEach((movie) => {
		const movieElement = document.createElement("li");
		movieElement.textContent = movie.info.movieTitle;
		fragment.append(movieElement);
	});
	movieList.append(fragment);
};

const addMovieHandler = () => {
	// Validate input data
	if (
		movieTitle.value.trim() === "" ||
		extraName.value.trim() === "" ||
		extraValue.value.trim() === ""
	) {
		return;
	}

	const newMovie = {
		info: {
			movieTitle: movieTitle.value,
			[extraName.value]: extraValue.value,
		},
		id: Math.random(),
	};
	movies.push(newMovie);
	renderMovies();

	// Reset the fields
	clearInputs();
};

const searchHandler = () => {
	console.log("search");
};

// Ensure inputs are cleared when the page loads
window.addEventListener("DOMContentLoaded", clearInputs);

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchHandler);
