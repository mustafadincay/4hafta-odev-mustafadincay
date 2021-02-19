import data from "./data.js";
import {
  searchMovieByTitle,
  makeBgActive,
  createRadioEl,
  findMovie,
  findGenre,
  createCheckEl,
} from "./helpers.js";

class MoviesApp {
  constructor(options) {
    const {
      root,
      searchInput,
      searchForm,
      yearHandler,
      yearSubmitter,
      movieYears,
      movieGenres,
      form_check,
      genreSubmitter,
      genreHandler,
    } = options;
    this.$tableEl = document.getElementById(root);
    this.$tbodyEl = this.$tableEl.querySelector("tbody");
    this.$searchInput = document.getElementById(searchInput);
    this.$searchForm = document.getElementById(searchForm);
    this.yearHandler = yearHandler;
    this.$yearSubmitter = document.getElementById(yearSubmitter);
    this.genreHandler = genreHandler;
    this.$genreSubmitter = document.getElementById(genreSubmitter);
    this.$movieYears = document.getElementById(movieYears);
    this.$movieGenres = document.getElementById(movieGenres);
    this.$form_check = document.getElementById(form_check);
  }

  createMovieEl(movie) {
    const { image, title, genre, year, id } = movie;
    return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`;
  }

  fillTable() {
    /* const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");*/
    const moviesArr = data
      .map((movie) => {
        return this.createMovieEl(movie);
      })
      .join("");
    this.$tbodyEl.innerHTML = moviesArr;
  }

  reset() {
    this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
      item.style.background = "transparent";
    });
  }

  handleSearch() {
    this.$searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.reset();
      const searchValue = this.$searchInput.value;
      data
        .filter((movie) => {
          return searchMovieByTitle(movie, searchValue);
        })
        .forEach(makeBgActive);
      this.$searchInput.value = "";
    });
  }

  fillYear() {
    const temp = findMovie(); //burdan benzersiz yıllar geliyor
    for (let i = 0; i < temp.uniq.length; i++) {
      let radioBtns = createRadioEl(
        "radio",
        `${data.year}`,
        `${data.year}${data.id}`,
        temp.uniq[i]
      ); //radio button oluşturuluyor
      let tempHTML = this.$movieYears; //DOM kısmı tutuluyor
      tempHTML.innerHTML += radioBtns;
    }
  }

  fillGenre() {
    const temp = findGenre(); //burdan benzersiz genreler geliyor
    for (let i = 0; i < temp.uniq.length; i++) {
      let genreBtns = createCheckEl(
        "checkbox",
        `${data.genre}`,
        `${data.genre}${data.id}`,
        temp.uniq[i]
      ); //checkbox oluşturuluyor
      let tempHTML = this.$movieGenres; //DOM kısmı tutuluyor
      tempHTML.innerHTML += genreBtns;
    }
  }

  newHandleYearFilter() {
    const temp = findMovie(); ////uniq yıllar geldi
    this.$yearSubmitter.addEventListener("click", () => {
      this.reset();
      const selectedYear = document.querySelector(
        `input[name='${this.yearHandler}']:checked`
      ).value;
      data
        .filter((movie) => {
          return movie.year === selectedYear;
        })
        .forEach(makeBgActive);
    });
  }

  handleGenreFilter() {
    const temp = findGenre(); //uniq genreler geldi
    this.$genreSubmitter.addEventListener("click", () => {
      this.reset();
      const selectedGenre = Array.from(
        document.querySelectorAll(`input[name='${this.genreHandler}']:checked`)
      ).map((selected) => selected.value);
      data
        .filter((movie) => selectedGenre.some((genre) => genre == movie.genre))
        .forEach(makeBgActive);
    });
  }

  init() {
    this.fillTable();
    this.handleSearch();
    this.newHandleYearFilter();
    //findMovie();
    //findGenre();
    this.fillYear();
    this.fillGenre();
    this.handleGenreFilter();
  }
}

let myMoviesApp = new MoviesApp({
  root: "movies-table",
  searchInput: "searchInput",
  searchForm: "searchForm",
  yearHandler: `${data.year}`,
  yearSubmitter: "yearSubmitter",
  movieYears: "movieYears",
  movieGenres: "movieGenres",
  form_check: "form_check",
  genreSubmitter: "genreSubmitter",
  genreHandler: `${data.genre}`,
});

myMoviesApp.init();
