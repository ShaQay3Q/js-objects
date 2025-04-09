const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movieTitle = document.getElementById("title");
const extraName = document.getElementById("extra-name");
const extraValue = document.getElementById("extra-value");
const filterInput = document.getElementById("filter-title");

const clearInputs = () => {
	movieTitle.value = "";
	extraName.value = "";
	extraValue.value = "";
	filterInput.value = "";
};

const movies = [];

const renderMovies = (movieArr) => {
	const movieList = document.getElementById("movie-list");
	if (!movieList) return; // if element is not found

	// movies.length === 0
	// 	? movieList.classList.remove("visible")
	// 	: movieList.classList.add("visible");
	movieList.classList.toggle("visible", movieArr.length > 0);
	movieList.innerHTML = "";

	const fragment = document.createDocumentFragment(); // Create a temporary container
	movieArr.forEach((movie) => {
		const movieElement = document.createElement("li");
		// let text = movie.info.movieTitle + " - " + movie.info[extraName.value];
		// movieElement.textContent = text;
		let text = movie.info.movieTitle;
		for (let key in movie.info) {
			if (key !== "movieTitle") {
				text = text + ` - ${key}: ${movie.info[key]}`;
			}
		}
		movieElement.textContent = text;
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
	renderMovies(movies);

	// Reset the fields
	clearInputs();
};

const searchMovieHandler = () => {
	// Validate input data
	const searchText = filterInput.value.trim().toLowerCase();
	if (searchText === "") {
		renderMovies(movies); // Show all movies if search is empty
		return;
	}

	let founds = movies.filter((movie) => {
		// if (movie.info.movieTitle.toLowerCase().includes(searchText)) {
		// 	return true;
		// }

		// Check all extra properties
		for (let key in movie.info) {
			if (
				key === movie.info.movieTitle.toLowerCase().includes(searchText) ||
				key === searchText ||
				movie.info[key].toLowerCase().includes(searchText)
			) {
				return true;
			}
		}

		return false;
	});
	console.log(founds);

	renderMovies(founds);
};

// Ensure inputs are cleared when the page loads
window.addEventListener("DOMContentLoaded", clearInputs);

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
