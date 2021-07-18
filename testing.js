const bookings = [
  { bookingNumber: 1, bookingName: "BLÁ", bookingSize: 1, preferredSeat: "A1" },
  { bookingNumber: 2, bookingName: "LOL", bookingSize: 5, preferredSeat: "B2" },
  {
    bookingNumber: 3,
    bookingName: "HUE",
    bookingSize: 7,
    preferredSeat: "C88",
  },
];

const getBookings = bookings.map((booking) => booking.bookingSize);
const isValidBooking = bookings.filter(
  (booking) => booking.bookingSize >= 1 && booking.bookingSize <= 5
);

const reservas = [
  {
    name: "O",
    number: 40,
    numberReservation: 3,
  },
  {
    name: "A",
    number: 4,
    numberReservation: 3,
  },
  {
    name: "R",
    number: 98,
    numberReservation: 1,
  },
];

const linhas = [];

console.log(isValidBooking);

function generateGrid(ROWS, COLUMNS) {
  const table = document.querySelector(".table");

  for (let i = 0; i < ROWS; i++) {
    const getAlphabet = (i + 10).toString(36).toUpperCase();

    var linha = {
      linha_name: getAlphabet,
      colunas: [],
    };

    for (let j = 0; j < COLUMNS; j++) {
      const seat = `${getLetter}${j + 1}`;
      const booked = checkBooked(seat);

      linha.colunas.push({
        numero: j,
        booked: booked,
      });
    }
  }

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
      const seat = `${getLetter}${j + 1}`;
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

function checkBooked(seat) {
  for (const [key, reserva] of Object.entries(reservas)) {
    for (let i = 0; i < reserva.numberReservation; i++) {
      if (seat == `${reserva.name}${reserva.number + i}`) {
        console.log(`Assento reservado ${seat}`);
        return true;
      }
    }
  }

  return false;
}

generateGrid(20, 100);

const getSeatData = bookings.map((booking) => booking.preferredSeat);
const getSeats = document.querySelectorAll(".table > div > div");
[...getSeats].forEach((seat) => {
  const getSeatContent = seat.textContent;
});
const findSeat = bookings.filter(
  (booking) => booking.preferredSeat === "G[23]"
);
// console.log(findSeat);
