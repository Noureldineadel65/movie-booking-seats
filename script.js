const screen = document.querySelector(".screen");
const seatsNumber = document.getElementById("movie-number");
const total = document.getElementById("total");
const checkout = document.getElementById("checkout");
const moviesSelected = {};
function fakeSubmit() {
	const div = document.createElement("div");
	div.className = "center";
	console.log(document.querySelector("h1"));
	document.querySelector("h1").insertAdjacentElement("afterend", div);
	div.innerHTML = `<img src="./Eclipse-1s-200px.svg" alt="" class="animated bounceIn loading">`;
	setTimeout(() => {
		document.querySelector(".loading").classList.remove("bounceIn");
		document.querySelector(".loading").classList.add("bounceOut");
		setTimeout(() => {
			div.innerHTML = `<i class="fas fa-check animated bounceIn"></i>`;
			setTimeout(() => {
				document
					.querySelector(".fa-check")
					.classList.remove("bounceIn");
				document.querySelector(".fa-check").classList.add("bounceOut");
				setTimeout(() => {
					div.innerHTML = `<h2 class="animated bounceIn">Thanks for purchasing! Hope you have an amazing time <i class="fas fa-smile"></i></h2>`;
				}, 1000);
			}, 1000);
		}, 1000);
	}, 3000);
}
function setPrices() {
	const movies = document.querySelectorAll(".movie");
	movies.forEach(movie => {
		movie.textContent = `${movie.textContent} ($${movie.dataset.value})`;
	});
}
function removeSeat(seat) {
	seat.classList.remove("selected");
}

function updateSeats() {
	const selectedSeats = document.querySelectorAll(".seats .seat.selected");
	seatsNumber.textContent = selectedSeats.length;
	total.textContent = `$${+selectedSeats.length * +moviesSelected.price}`;
	if (selectedSeats.length) {
		checkout.classList.remove("bounceOut");
		checkout.classList.add("bounceIn");
		checkout.style.display = "block";
	} else {
		checkout.classList.remove("bounceIn");
		checkout.classList.add("bounceOut");
		setTimeout(() => {
			checkout.style.display = "none";
		}, 1000);
	}
}
function createError(
	error = `Aw! <i class="fas fa-sad-tear"></i> Sorry no seats are available.`
) {
	const static =
		"https://thumbs.dreamstime.com/b/tv-damage-television-static-noise-bad-sync-channel-rgb-lcd-screen-poor-broadcast-signal-reception-as-analogue-57853682.jpg";
	screen.style.background = `url(${static})`;
	screen.style.boxShadow = "none";
	const noSeats = document.createElement("p");
	noSeats.className = "noseats";
	noSeats.innerHTML = error;
	screen.insertAdjacentElement("afterend", noSeats);
	setTimeout(() => {
		location.reload();
	}, 1000);
}
function getRandomSeats() {
	if (moviesSelected.name) {
		const seats = Array.from(document.querySelectorAll(".seats .seat"));
		if (Math.random() >= 0.9) {
			createError();
			seats.forEach(seat => (seat.className = "seat occupied"));
		} else {
			seats.forEach(seat => {
				const className =
					Math.random() >= 0.6 ? "seat occupied" : "seat";
				seat.className = className;
			});
		}
	}
}
function handleMovieSelection(e) {
	if (e.target.classList.contains("movie")) {
		const name = e.target.textContent.split(" ")[0];
		const price = e.target.dataset.value;
		moviesSelected.name = name;
		moviesSelected.price = price;
		getRandomSeats();
	}
}
function addSeat(seat) {
	seat.classList.add("selected");
}
function handleSelecting(e) {
	const classes = e.target.classList;
	if (classes.contains("seat") && !classes.contains("occupied")) {
		if (moviesSelected.name) {
			const targetSeat = e.target;
			if (targetSeat.classList.contains("selected")) {
				removeSeat(targetSeat);
			} else {
				addSeat(targetSeat);
			}
			updateSeats();
		}
	}
}
function init() {
	getRandomSeats();
	setPrices();
	document.getElementById("checkout").addEventListener("click", () => {
		document
			.querySelector(".container")
			.classList.add("animated", "zoomOut");
		setTimeout(() => {
			document.querySelector(".container").style.display = "none";
			fakeSubmit();
		}, 1000);
	});
	document
		.querySelector(".value-list")
		.addEventListener("click", handleMovieSelection);
	document.querySelector(".seats").addEventListener("click", handleSelecting);
}
init();
