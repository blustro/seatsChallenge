document.querySelector(
  ".remaining"
).textContent = `Available Seats: ${availableSeatList.length}`;

function generateGrid(ROWS, COLUMNS) {
  const table = document.querySelector(".table");

  for (let i = 0; i < ROWS; i++) {
    const getAlphabet = (i + 10).toString(36).toUpperCase();
    table.insertAdjacentHTML(
      "beforeend",
      `<div class="row">${getAlphabet}</div>`
    );
  }
  const getRows = document.querySelectorAll(".table > div");

  [...getRows].forEach((row) => {
    const getLetter = row.textContent;

    for (let j = 0; j < COLUMNS; j++) {
      const number = j < 10 ? `0${j + 1}` : `${j + 1}`;
      const seat = `${getLetter}${number}`;
      const booked = checkBooked(seat);
      if (booked) {
        row.insertAdjacentHTML(
          "beforeend",
          `<div class="column" style="color: red">${seat}</div>`
        );
      } else {
        row.insertAdjacentHTML(
          "beforeend",
          `<div class="column">${seat}</div>`
        );
      }
    }
  });
}

const checkBooked = (seat) => {
  for (const isBooked of reservedSeats) {
    if (seat === isBooked) {
      return true;
    }
  }
};

generateGrid(20, 100);
