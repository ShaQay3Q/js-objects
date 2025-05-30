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

const renderMovies = (filter = "") => {
	const movieList = document.getElementById("movie-list");
	if (!movieList) return; // if element is not found

	// movies.length === 0
	// 	? movieList.classList.remove("visible")
	// 	: movieList.classList.add("visible");
	movieList.classList.toggle("visible", movies.length > 0);
	movieList.innerHTML = "";

	const fragment = document.createDocumentFragment(); // Create a temporary container
	const filteredMovies = !filter
		? movies
		: movies.filter((movie) => movie.info.movieTitle.includes(filter));

	filteredMovies.forEach((movie) => {
		const movieElement = document.createElement("li");
		// let text = movie.info.movieTitle + " - " + movie.info[extraName.value];
		// movieElement.textContent = text;
		//! check if a propertyName exists in an object
		if (!("info" in movie)) {
			console.log("inside if");
			return;
		}
		//! Obj Destructuring
		//! INFO must have same name as one of keys in the Object
		const { info, ...otherProps } = movie; // ...otherProps => collects the rest and gives a new object
		console.log(otherProps); // id
		const { movieTitle: mTitle } = info; // movieTitle assigns new name to title as property
		const { getFormattedTitle } = movie;

		let m = movie.getFormattedTitle();
		console.log("m: " + m);

		console.log("j: " + getFormattedTitle());

		// let text = mTitle;
		let text = getFormatedTitle();
		for (let key in info) {
			if (key !== "movieTitle") {
				text = text + ` - ${key}: ${info[key]}`;
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
		// storing data into an object
		info: {
			movieTitle: movieTitle.value,
			[extraName.value]: extraValue.value,
		},
		id: Math.random(),
		// loginc in the object
		getFormattedTitle: function () {
			//! this will only look for the "info" insode this object
			return this.info.movieTitle.toUpperCase();
		},
	};
	movies.push(newMovie);
	renderMovies();

	// Reset the fields
	clearInputs();
};

const searchMovieHandler = () => {
	// Validate input data
	const searchText = filterInput.value.trim();
	console.log(searchText);

	// if (searchText === "") {
	// 	renderMovies(movies); // Show all movies if search is empty
	// 	return;
	// }

	// let founds = movies.filter((movie) => {
	// 	console.log(movie);

	// 	// return movie.includes(searchText);
	// 	// if (movie.info.movieTitle.toLowerCase().includes(searchText)) {
	// 	// 	return true;
	// 	// }

	// 	// Check all extra properties
	// 	for (let key in movie.info) {
	// 		if (
	// 			key === movie.info.movieTitle.toLowerCase().includes(searchText) ||
	// 			key === searchText ||
	// 			movie.info[key].toLowerCase().includes(searchText)
	// 		) {
	// 			return true;
	// 		}
	// 	}

	// 	return false;
	// });
	// console.log(founds);

	// renderMovies(founds);
	renderMovies(searchText);
};

// Ensure inputs are cleared when the page loads
window.addEventListener("DOMContentLoaded", clearInputs);

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
