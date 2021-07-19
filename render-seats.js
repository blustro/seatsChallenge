document.querySelector(
  ".remaining"
).textContent = `Available Seats: ${availableSeatList.length}`;

document.querySelector(
  ".rejected"
).textContent = `Rejected Bookings: ${rejectedBookings.length}`;

document.querySelector(
  ".groups"
).textContent = `Groups Booked: ${isGroupBooked.length}`;

document.querySelector(
  ".seats"
).textContent = `Seats Booked: ${isSeatBooked.length}`;

function generateGrid(ROWS, COLUMNS) {
  const table = document.querySelector(".table");

  for (let i = 0; i < ROWS; i++) {
    const getLetter = (i + 10).toString(36).toUpperCase();
    table.insertAdjacentHTML(
      "beforeend",
      `<div class="row" data-row="${getLetter}"></div>`
    );
  }
  const getRows = document.querySelectorAll(".table > div");

  [...getRows].forEach((row) => {
    for (let j = 0; j < COLUMNS; j++) {
      const getLetter = row.dataset.row;

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
