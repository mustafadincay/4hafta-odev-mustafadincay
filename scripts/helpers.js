import data from "./data.js";
export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
};

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background =
    "#d7f0f7";
};

//radiobuttons veya checkbox oluşturma
export const createEl = (type, name, id, value) => {
  return `  
  <div class="form-check">
  <input class="form-check-input" type="${type}" name="${name}" id="${name}${id}" value="${value}">
  <label class="form-check-label" for="year${id}"> ${value} </label>
  </div>`;
};

export const getValues = (type) => {
  let arr = [];
  let uniq = [];
  data.map((movie) => {
    arr.push(movie[type]);
    uniq = [...new Set(arr)].reverse();
  });
  return {
    uniq,
  };
};
