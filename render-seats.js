const table = document.querySelector(".table");

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

      const number = j < 9 ? `0${j + 1}` : `${j + 1}`;
      const seat = `${getLetter}${number}`;
      const booked = checkBooked(seat);
      if (booked) {
        row.insertAdjacentHTML(
          "beforeend",
          `<div class="column" style="color: red; cursor: not-allowed">${seat}</div>`
        );
      } else {
        row.insertAdjacentHTML(
          "beforeend",
          `<div class="column" data-seat="${seat}" onclick="openModal('${seat}')">${seat}</div>`
        );
      }
    }
  });
}

const addNewSeat = () => {
  const preferredSeat = document.querySelector("#selectedSeat").textContent;
  const bookingName = document.getElementById("bookingName").value;
  const bookingSize = parseInt(document.getElementById("bookingSize").value);
  const bookingNumber = Math.floor(Math.random() * (350 - 300 + 1)) + 300;

  processBooking({
    bookingNumber: bookingNumber,
    bookingName: bookingName,
    bookingSize: bookingSize,
    preferredSeat: preferredSeat,
  });

  table.innerHTML = "";

  generateGrid(20, 100);
};

const openModal = (getSeatNumber) => {
  document.querySelector(".modal").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  document.querySelector("#selectedSeat").textContent = getSeatNumber;
  closeModal();
};

const closeModal = () => {
  document.querySelector(".overlay").addEventListener("click", function (e) {
    e.preventDefault;
    e.target.style.display = "none";
    document.querySelector(".modal").style.display = "none";
  });
};

const checkBooked = (seat) => {
  for (const isBooked of reservedSeats) {
    if (seat === isBooked) {
      return true;
    }
  }
};

generateGrid(20, 100);
