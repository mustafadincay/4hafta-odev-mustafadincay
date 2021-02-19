import data from "./data.js";
export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
};

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background =
    "#d7f0f7";
};

//radiobuttons oluşturma
export const createRadioEl = (type, name, id, value) => {
  return `  
  <div class="form-check">
  <input class="form-check-input" type="${type}" name="${name}" id="${name}${id}" value="${value}">
  <label class="form-check-label"> ${value} </label>
  </div>`;
};

///checkbox oluşturma
export const createCheckEl = (type, name, id, value) => {
  return `
  <div class="form-check">
    <input class="form-check-input" type="${type}" name="${name}" id="${name}${id} "value="${value}">
      <label class="form-check-label">
      ${value}
      </label>
  </div>`;
};
//tekrar etmeyen yılları bulmak için yapılan fonksiyon
export const findMovie = () => {
  let arr = [];
  let uniq = [];
  data.map((movie) => {
    arr.push(movie.year);
    uniq = [...new Set(arr)];
  });
  return {
    uniq,
  };
};

//tekrar etmeyen genreleri bulmak için yapılan fonksiyon
export const findGenre = () => {
  let arr = [];
  let uniq = [];
  data.map((movie) => {
    arr.push(movie.genre);
    uniq = [...new Set(arr)];
  });
  return {
    uniq,
  };
};
