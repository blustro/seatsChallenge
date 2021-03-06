const createAvailableSeat = () => {
  let availableSeats = [];

  for (let i = 0; i < 20; i++) {
    const getAlphabet = (i + 10).toString(36).toUpperCase();
    for (let j = 0; j < 100; j++) {
      const has0 = j < 9 ? `0${j + 1}` : j + 1;
      availableSeats.push(`${getAlphabet}${has0}`);
    }
  }
  return availableSeats;
};

let availableSeatList = createAvailableSeat();
let reservedSeats = [];
let rejectedBookings = [];
let isGroupBooked = [];
let isSeatBooked = [];

// ===========================
const processBooking = (booking) => {
  const NEXT_SEAT = 1;
  const MAX_ROW_SIZE = 100;

  if (
    booking.preferredSeat.slice(1) > MAX_ROW_SIZE ||
    booking.bookingSize < 1 ||
    booking.bookingSize > 5
  ) {
    rejectedBookings.push("Rejected Booking");
    return;
  }

  // if (parseInt(booking.preferredSeat.slice(1)) >= 38) {
  //   console.log(booking);
  // }

  if (isSeatAlreadyReserved(booking)) {
    const suggestion = {
      ...booking,
      preferredSeat: changePreferredSeat(booking, NEXT_SEAT),
    };

    processBooking(suggestion);
  } else {
    if (checkPreviousSeatReserved(booking)) {
      const covidSpace = {
        ...booking,
        preferredSeat: changePreferredSeat(booking, NEXT_SEAT),
      };
      createNewSeatReservation(covidSpace);
    } else createNewSeatReservation(booking);
  }
};

const isSeatAlreadyReserved = (booking) => {
  let isSeatReserved = false;
  const SEAT_GAP = 2;

  for (let index = 0; index < booking.bookingSize + SEAT_GAP; index++) {
    if (
      reservedSeats.filter((reservedSeat) => {
        return reservedSeat === changePreferredSeat(booking, index);
      }).length > 0
    ) {
      isSeatReserved = true;
      break;
    }
  }
  return isSeatReserved;
};

const changePreferredSeat = (booking, newBookingSize) => {
  if (booking && booking.preferredSeat) {
    return `${booking.preferredSeat.slice(0, 1)}${
      parseInt(booking.preferredSeat.slice(1)) + newBookingSize
    }`;
  }
};

const checkPreviousSeatReserved = (booking) => {
  return (
    reservedSeats.filter(
      (reservedSeat) => reservedSeat === changeToPreviousSeatReserved(booking)
    ).length > 0
  );
};

const changeToPreviousSeatReserved = (booking) => {
  if (
    booking &&
    booking.preferredSeat &&
    parseInt(booking.preferredSeat.slice(1)) > 0
  ) {
    return `${booking.preferredSeat.slice(0, 1)}${
      parseInt(booking.preferredSeat.slice(1)) - 1
    }`;
  }
};

const createNewSeatReservation = (booking) => {
  reservedSeats.push(`${booking.preferredSeat}`.replace(/\n.*$/gi, ""));
  reservedSeats.sort();
  console.log(`${booking.preferredSeat}:${booking.bookingName}`);

  booking.bookingSize > 2
    ? isGroupBooked.push("Groups")
    : isSeatBooked.push("Seat");

  if (booking.bookingSize > 0) reservationNextSeats(booking);
  removeSeatInAvailableSeatList(booking.preferredSeat);
};

const reservationNextSeats = (booking) => {
  for (let index = 1; index < booking.bookingSize; index++) {
    const newBooking = {
      ...booking,
      preferredSeat: changePreferredSeat(booking, index),
      bookingSize: booking.bookingSize - index,
    };

    if (isSeatAvailable(newBooking.preferredSeat)) {
      createNewSeatReservation(newBooking);
    }
  }
};

const removeSeatInAvailableSeatList = (preferredSeat) => {
  if (preferredSeat)
    availableSeatList = availableSeatList.filter(
      (availableSeat) => availableSeat !== preferredSeat
    );
};

const isSeatAvailable = (preferredSeat) => {
  return (
    availableSeatList.filter((availableSeat) => availableSeat === preferredSeat)
      .length > 0
  );
};

const suggestNewSeatReservation = (booking) => {
  const newBooking = {
    ...booking,
    preferredSeat: changePreferredSeat(booking, 2),
  };
  const seatAvailable = isSeatAvailable(changePreferredSeat(newBooking, 2));

  if (seatAvailable) {
    processBooking(newBooking);
  }
};

const bookings = [
  {
    bookingNumber: 1,
    bookingName: "Fields",
    bookingSize: 3,
    preferredSeat: "O40",
  },
  {
    bookingNumber: 2,
    bookingName: "Carson",
    bookingSize: 3,
    preferredSeat: "A04",
  },
  {
    bookingNumber: 3,
    bookingName: "Santos",
    bookingSize: 1,
    preferredSeat: "R98",
  },
  {
    bookingNumber: 4,
    bookingName: "Christensen",
    bookingSize: 3,
    preferredSeat: "P25",
  },
  {
    bookingNumber: 5,
    bookingName: "James",
    bookingSize: 2,
    preferredSeat: "G66",
  },
  {
    bookingNumber: 6,
    bookingName: "Holloway",
    bookingSize: 5,
    preferredSeat: "H44",
  },
  {
    bookingNumber: 7,
    bookingName: "Farmer",
    bookingSize: 5,
    preferredSeat: "C01",
  },
  {
    bookingNumber: 8,
    bookingName: "Coffey",
    bookingSize: 1,
    preferredSeat: "N51",
  },
  {
    bookingNumber: 9,
    bookingName: "Mckenzie",
    bookingSize: 7,
    preferredSeat: "I84",
  },
  {
    bookingNumber: 10,
    bookingName: "Holman",
    bookingSize: 4,
    preferredSeat: "I29",
  },
  {
    bookingNumber: 11,
    bookingName: "Guzman",
    bookingSize: 1,
    preferredSeat: "T01",
  },
  {
    bookingNumber: 12,
    bookingName: "Holcomb",
    bookingSize: 4,
    preferredSeat: "H41",
  },
  {
    bookingNumber: 13,
    bookingName: "Norton",
    bookingSize: 5,
    preferredSeat: "I65",
  },
  {
    bookingNumber: 14,
    bookingName: "Barrett",
    bookingSize: 2,
    preferredSeat: "I67",
  },
  {
    bookingNumber: 15,
    bookingName: "Lyons",
    bookingSize: 5,
    preferredSeat: "A66",
  },
  {
    bookingNumber: 16,
    bookingName: "Hawkins",
    bookingSize: 1,
    preferredSeat: "F30",
  },
  {
    bookingNumber: 17,
    bookingName: "Decker",
    bookingSize: 2,
    preferredSeat: "B32",
  },
  {
    bookingNumber: 18,
    bookingName: "Harding",
    bookingSize: 2,
    preferredSeat: "P71",
  },
  {
    bookingNumber: 19,
    bookingName: "Mcneil",
    bookingSize: 3,
    preferredSeat: "H43",
  },
  {
    bookingNumber: 20,
    bookingName: "Marquez",
    bookingSize: 3,
    preferredSeat: "J73",
  },
  {
    bookingNumber: 21,
    bookingName: "Pope",
    bookingSize: 1,
    preferredSeat: "E30",
  },
  {
    bookingNumber: 22,
    bookingName: "Mcmahon",
    bookingSize: 3,
    preferredSeat: "E61",
  },
  {
    bookingNumber: 23,
    bookingName: "Booker",
    bookingSize: 3,
    preferredSeat: "M77",
  },
  {
    bookingNumber: 24,
    bookingName: "Callahan",
    bookingSize: 1,
    preferredSeat: "S61",
  },
  {
    bookingNumber: 25,
    bookingName: "Wolf",
    bookingSize: 3,
    preferredSeat: "Q90",
  },
  {
    bookingNumber: 26,
    bookingName: "Hicks",
    bookingSize: 1,
    preferredSeat: "M48",
  },
  {
    bookingNumber: 27,
    bookingName: "Delgado",
    bookingSize: 5,
    preferredSeat: "G80",
  },
  {
    bookingNumber: 28,
    bookingName: "Briggs",
    bookingSize: 2,
    preferredSeat: "L36",
  },
  {
    bookingNumber: 29,
    bookingName: "Allison",
    bookingSize: 4,
    preferredSeat: "Q98",
  },
  {
    bookingNumber: 30,
    bookingName: "Ramos",
    bookingSize: 8,
    preferredSeat: "H70",
  },
  {
    bookingNumber: 31,
    bookingName: "Delgado",
    bookingSize: 3,
    preferredSeat: "J48",
  },
  {
    bookingNumber: 32,
    bookingName: "Waller",
    bookingSize: 5,
    preferredSeat: "A69",
  },
  {
    bookingNumber: 33,
    bookingName: "Jarvis",
    bookingSize: 4,
    preferredSeat: "P63",
  },
  {
    bookingNumber: 34,
    bookingName: "Mcconnell",
    bookingSize: 4,
    preferredSeat: "S01",
  },
  {
    bookingNumber: 35,
    bookingName: "Stewart",
    bookingSize: 1,
    preferredSeat: "G24",
  },
  {
    bookingNumber: 36,
    bookingName: "Ortega",
    bookingSize: 5,
    preferredSeat: "Q27",
  },
  {
    bookingNumber: 37,
    bookingName: "Marsh",
    bookingSize: 2,
    preferredSeat: "R72",
  },
  {
    bookingNumber: 38,
    bookingName: "Witt",
    bookingSize: 1,
    preferredSeat: "K97",
  },
  {
    bookingNumber: 39,
    bookingName: "Kirby",
    bookingSize: 4,
    preferredSeat: "C69",
  },
  {
    bookingNumber: 40,
    bookingName: "Reeves",
    bookingSize: 4,
    preferredSeat: "G92",
  },
  {
    bookingNumber: 41,
    bookingName: "Solis",
    bookingSize: 2,
    preferredSeat: "J26",
  },
  {
    bookingNumber: 42,
    bookingName: "Cross",
    bookingSize: 4,
    preferredSeat: "G04",
  },
  {
    bookingNumber: 43,
    bookingName: "Burt",
    bookingSize: 1,
    preferredSeat: "F12",
  },
  {
    bookingNumber: 44,
    bookingName: "Oliver",
    bookingSize: 1,
    preferredSeat: "G33",
  },
  {
    bookingNumber: 45,
    bookingName: "Compton",
    bookingSize: 3,
    preferredSeat: "D97",
  },
  {
    bookingNumber: 46,
    bookingName: "Mccall",
    bookingSize: 3,
    preferredSeat: "R24",
  },
  {
    bookingNumber: 47,
    bookingName: "Nguyen",
    bookingSize: 3,
    preferredSeat: "P15",
  },
  {
    bookingNumber: 48,
    bookingName: "Hampton",
    bookingSize: 1,
    preferredSeat: "F52",
  },
  {
    bookingNumber: 49,
    bookingName: "Flynn",
    bookingSize: 2,
    preferredSeat: "T72",
  },
  {
    bookingNumber: 50,
    bookingName: "Bruce",
    bookingSize: 5,
    preferredSeat: "F53",
  },
  {
    bookingNumber: 51,
    bookingName: "Salinas",
    bookingSize: 1,
    preferredSeat: "F61",
  },
  {
    bookingNumber: 52,
    bookingName: "Harvey",
    bookingSize: 4,
    preferredSeat: "J51",
  },
  {
    bookingNumber: 53,
    bookingName: "Kirkland",
    bookingSize: 2,
    preferredSeat: "S75",
  },
  {
    bookingNumber: 54,
    bookingName: "Coleman",
    bookingSize: 1,
    preferredSeat: "H94",
  },
  {
    bookingNumber: 55,
    bookingName: "Petersen",
    bookingSize: 3,
    preferredSeat: "N07",
  },
  {
    bookingNumber: 56,
    bookingName: "Foster",
    bookingSize: 5,
    preferredSeat: "H03",
  },
  {
    bookingNumber: 57,
    bookingName: "Reid",
    bookingSize: 3,
    preferredSeat: "K64",
  },
  {
    bookingNumber: 58,
    bookingName: "Chase",
    bookingSize: 5,
    preferredSeat: "K89",
  },
  {
    bookingNumber: 59,
    bookingName: "Barrera",
    bookingSize: 8,
    preferredSeat: "N79",
  },
  {
    bookingNumber: 60,
    bookingName: "Maynard",
    bookingSize: 1,
    preferredSeat: "N02",
  },
  {
    bookingNumber: 61,
    bookingName: "Prince",
    bookingSize: 4,
    preferredSeat: "F04",
  },
  {
    bookingNumber: 62,
    bookingName: "Gomez",
    bookingSize: 3,
    preferredSeat: "H48",
  },
  {
    bookingNumber: 63,
    bookingName: "Joyce",
    bookingSize: 1,
    preferredSeat: "S12",
  },
  {
    bookingNumber: 64,
    bookingName: "Nielsen",
    bookingSize: 1,
    preferredSeat: "O69",
  },
  {
    bookingNumber: 65,
    bookingName: "Gonzales",
    bookingSize: 4,
    preferredSeat: "M83",
  },
  {
    bookingNumber: 66,
    bookingName: "Hurst",
    bookingSize: 3,
    preferredSeat: "H31",
  },
  {
    bookingNumber: 67,
    bookingName: "Donaldson",
    bookingSize: 2,
    preferredSeat: "P89",
  },
  {
    bookingNumber: 68,
    bookingName: "Flores",
    bookingSize: 4,
    preferredSeat: "C98",
  },
  {
    bookingNumber: 69,
    bookingName: "Cabrera",
    bookingSize: 3,
    preferredSeat: "O10",
  },
  {
    bookingNumber: 70,
    bookingName: "Contreras",
    bookingSize: 2,
    preferredSeat: "J02",
  },
  {
    bookingNumber: 71,
    bookingName: "Harrell",
    bookingSize: 2,
    preferredSeat: "R39",
  },
  {
    bookingNumber: 72,
    bookingName: "Barrera",
    bookingSize: 1,
    preferredSeat: "R53",
  },
  {
    bookingNumber: 73,
    bookingName: "Kramer",
    bookingSize: 2,
    preferredSeat: "L88",
  },
  {
    bookingNumber: 74,
    bookingName: "Merritt",
    bookingSize: 1,
    preferredSeat: "I03",
  },
  {
    bookingNumber: 75,
    bookingName: "Coffey",
    bookingSize: 4,
    preferredSeat: "E99",
  },
  {
    bookingNumber: 76,
    bookingName: "Moore",
    bookingSize: 4,
    preferredSeat: "N84",
  },
  {
    bookingNumber: 77,
    bookingName: "Burch",
    bookingSize: 4,
    preferredSeat: "K82",
  },
  {
    bookingNumber: 78,
    bookingName: "Haynes",
    bookingSize: 5,
    preferredSeat: "O24",
  },
  {
    bookingNumber: 79,
    bookingName: "Higgins",
    bookingSize: 3,
    preferredSeat: "F88",
  },
  {
    bookingNumber: 80,
    bookingName: "Delacruz",
    bookingSize: 5,
    preferredSeat: "T81",
  },
  {
    bookingNumber: 81,
    bookingName: "Mcbride",
    bookingSize: 1,
    preferredSeat: "J33",
  },
  {
    bookingNumber: 82,
    bookingName: "Galloway",
    bookingSize: 1,
    preferredSeat: "A46",
  },
  {
    bookingNumber: 83,
    bookingName: "Ramos",
    bookingSize: 3,
    preferredSeat: "A82",
  },
  {
    bookingNumber: 84,
    bookingName: "Singleton",
    bookingSize: 2,
    preferredSeat: "O35",
  },
  {
    bookingNumber: 85,
    bookingName: "Nichols",
    bookingSize: 5,
    preferredSeat: "D19",
  },
  {
    bookingNumber: 86,
    bookingName: "Valdez",
    bookingSize: 5,
    preferredSeat: "H24",
  },
  {
    bookingNumber: 87,
    bookingName: "Zamora",
    bookingSize: 4,
    preferredSeat: "P58",
  },
  {
    bookingNumber: 88,
    bookingName: "Owen",
    bookingSize: 7,
    preferredSeat: "F20",
  },
  {
    bookingNumber: 89,
    bookingName: "Morales",
    bookingSize: 3,
    preferredSeat: "M91",
  },
  {
    bookingNumber: 90,
    bookingName: "Parsons",
    bookingSize: 3,
    preferredSeat: "P24",
  },
  {
    bookingNumber: 91,
    bookingName: "Levine",
    bookingSize: 4,
    preferredSeat: "P80",
  },
  {
    bookingNumber: 92,
    bookingName: "Blackburn",
    bookingSize: 1,
    preferredSeat: "M07",
  },
  {
    bookingNumber: 93,
    bookingName: "Contreras",
    bookingSize: 3,
    preferredSeat: "D16",
  },
  {
    bookingNumber: 94,
    bookingName: "Hubbard",
    bookingSize: 5,
    preferredSeat: "E14",
  },
  {
    bookingNumber: 95,
    bookingName: "Simpson",
    bookingSize: 3,
    preferredSeat: "H39",
  },
  {
    bookingNumber: 96,
    bookingName: "Baldwin",
    bookingSize: 3,
    preferredSeat: "A48",
  },
  {
    bookingNumber: 97,
    bookingName: "Decker",
    bookingSize: 5,
    preferredSeat: "H02",
  },
  {
    bookingNumber: 98,
    bookingName: "Dillon",
    bookingSize: 2,
    preferredSeat: "T31",
  },
  {
    bookingNumber: 99,
    bookingName: "Giles",
    bookingSize: 4,
    preferredSeat: "C08",
  },
  {
    bookingNumber: 100,
    bookingName: "Mitchell",
    bookingSize: 4,
    preferredSeat: "S27",
  },
  {
    bookingNumber: 101,
    bookingName: "Payne",
    bookingSize: 3,
    preferredSeat: "G29",
  },
  {
    bookingNumber: 102,
    bookingName: "Sherman",
    bookingSize: 4,
    preferredSeat: "J36",
  },
  {
    bookingNumber: 103,
    bookingName: "Boyle",
    bookingSize: 2,
    preferredSeat: "M33",
  },
  {
    bookingNumber: 104,
    bookingName: "Miles",
    bookingSize: 2,
    preferredSeat: "P84",
  },
  {
    bookingNumber: 105,
    bookingName: "Branch",
    bookingSize: 6,
    preferredSeat: "R54",
  },
  {
    bookingNumber: 106,
    bookingName: "Williamson",
    bookingSize: 2,
    preferredSeat: "H45",
  },
  {
    bookingNumber: 107,
    bookingName: "Barr",
    bookingSize: 4,
    preferredSeat: "I86",
  },
  {
    bookingNumber: 108,
    bookingName: "Dawson",
    bookingSize: 5,
    preferredSeat: "O07",
  },
  {
    bookingNumber: 109,
    bookingName: "Vasquez",
    bookingSize: 4,
    preferredSeat: "N89",
  },
  {
    bookingNumber: 110,
    bookingName: "Norris",
    bookingSize: 4,
    preferredSeat: "C83",
  },
  {
    bookingNumber: 111,
    bookingName: "Morris",
    bookingSize: 4,
    preferredSeat: "M32",
  },
  {
    bookingNumber: 112,
    bookingName: "Robinson",
    bookingSize: 3,
    preferredSeat: "P33",
  },
  {
    bookingNumber: 113,
    bookingName: "Reeves",
    bookingSize: 3,
    preferredSeat: "J47",
  },
  {
    bookingNumber: 114,
    bookingName: "Knox",
    bookingSize: 5,
    preferredSeat: "F67",
  },
  {
    bookingNumber: 115,
    bookingName: "Cash",
    bookingSize: 5,
    preferredSeat: "B47",
  },
  {
    bookingNumber: 116,
    bookingName: "Valenzuela",
    bookingSize: 5,
    preferredSeat: "P53",
  },
  {
    bookingNumber: 117,
    bookingName: "Pitts",
    bookingSize: 2,
    preferredSeat: "D40",
  },
  {
    bookingNumber: 118,
    bookingName: "Lee",
    bookingSize: 2,
    preferredSeat: "Q77",
  },
  {
    bookingNumber: 119,
    bookingName: "Crane",
    bookingSize: 5,
    preferredSeat: "O23",
  },
  {
    bookingNumber: 120,
    bookingName: "Stark",
    bookingSize: 3,
    preferredSeat: "E76",
  },
  {
    bookingNumber: 121,
    bookingName: "Joseph",
    bookingSize: 1,
    preferredSeat: "D33",
  },
  {
    bookingNumber: 122,
    bookingName: "Gibson",
    bookingSize: 4,
    preferredSeat: "L33",
  },
  {
    bookingNumber: 123,
    bookingName: "Bailey",
    bookingSize: 3,
    preferredSeat: "R98",
  },
  {
    bookingNumber: 124,
    bookingName: "Brennan",
    bookingSize: 5,
    preferredSeat: "N86",
  },
  {
    bookingNumber: 125,
    bookingName: "Vega",
    bookingSize: 5,
    preferredSeat: "P81",
  },
  {
    bookingNumber: 126,
    bookingName: "Blankenship",
    bookingSize: 5,
    preferredSeat: "H88",
  },
  {
    bookingNumber: 127,
    bookingName: "Cross",
    bookingSize: 5,
    preferredSeat: "J17",
  },
  {
    bookingNumber: 128,
    bookingName: "Holden",
    bookingSize: 5,
    preferredSeat: "A40",
  },
  {
    bookingNumber: 129,
    bookingName: "Cardenas",
    bookingSize: 2,
    preferredSeat: "F03",
  },
  {
    bookingNumber: 130,
    bookingName: "Valenzuela",
    bookingSize: 3,
    preferredSeat: "T12",
  },
  {
    bookingNumber: 131,
    bookingName: "Banks",
    bookingSize: 4,
    preferredSeat: "I14",
  },
  {
    bookingNumber: 132,
    bookingName: "Maynard",
    bookingSize: 5,
    preferredSeat: "J20",
  },
  {
    bookingNumber: 133,
    bookingName: "Bailey",
    bookingSize: 1,
    preferredSeat: "R27",
  },
  {
    bookingNumber: 134,
    bookingName: "Gamble",
    bookingSize: 2,
    preferredSeat: "R84",
  },
  {
    bookingNumber: 135,
    bookingName: "Compton",
    bookingSize: 3,
    preferredSeat: "O24",
  },
  {
    bookingNumber: 136,
    bookingName: "Burch",
    bookingSize: 4,
    preferredSeat: "P32",
  },
  {
    bookingNumber: 137,
    bookingName: "Santos",
    bookingSize: 2,
    preferredSeat: "D87",
  },
  {
    bookingNumber: 138,
    bookingName: "Haney",
    bookingSize: 3,
    preferredSeat: "S13",
  },
  {
    bookingNumber: 139,
    bookingName: "Bush",
    bookingSize: 3,
    preferredSeat: "Q48",
  },
  {
    bookingNumber: 140,
    bookingName: "Ratliff",
    bookingSize: 1,
    preferredSeat: "F33",
  },
  {
    bookingNumber: 141,
    bookingName: "Slater",
    bookingSize: 2,
    preferredSeat: "K71",
  },
  {
    bookingNumber: 142,
    bookingName: "Conrad",
    bookingSize: 3,
    preferredSeat: "O08",
  },
  {
    bookingNumber: 143,
    bookingName: "Payne",
    bookingSize: 1,
    preferredSeat: "B35",
  },
  {
    bookingNumber: 144,
    bookingName: "Weber",
    bookingSize: 1,
    preferredSeat: "H28",
  },
  {
    bookingNumber: 145,
    bookingName: "Whitehead",
    bookingSize: 4,
    preferredSeat: "D85",
  },
  {
    bookingNumber: 146,
    bookingName: "Noel",
    bookingSize: 4,
    preferredSeat: "N72",
  },
  {
    bookingNumber: 147,
    bookingName: "Kennedy",
    bookingSize: 3,
    preferredSeat: "P04",
  },
  {
    bookingNumber: 148,
    bookingName: "Estes",
    bookingSize: 8,
    preferredSeat: "T49",
  },
  {
    bookingNumber: 149,
    bookingName: "Dejesus",
    bookingSize: 2,
    preferredSeat: "S10",
  },
  {
    bookingNumber: 150,
    bookingName: "Sanford",
    bookingSize: 5,
    preferredSeat: "D69",
  },
  {
    bookingNumber: 151,
    bookingName: "English",
    bookingSize: 1,
    preferredSeat: "K68",
  },
  {
    bookingNumber: 152,
    bookingName: "Garcia",
    bookingSize: 3,
    preferredSeat: "E67",
  },
  {
    bookingNumber: 153,
    bookingName: "Bonner",
    bookingSize: 5,
    preferredSeat: "B41",
  },
  {
    bookingNumber: 154,
    bookingName: "Knowles",
    bookingSize: 4,
    preferredSeat: "L80",
  },
  {
    bookingNumber: 155,
    bookingName: "Maldonado",
    bookingSize: 5,
    preferredSeat: "F42",
  },
  {
    bookingNumber: 156,
    bookingName: "Cherry",
    bookingSize: 1,
    preferredSeat: "T01",
  },
  {
    bookingNumber: 157,
    bookingName: "Zamora",
    bookingSize: 5,
    preferredSeat: "P84",
  },
  {
    bookingNumber: 158,
    bookingName: "Bates",
    bookingSize: 3,
    preferredSeat: "A38",
  },
  {
    bookingNumber: 159,
    bookingName: "Velez",
    bookingSize: 3,
    preferredSeat: "H14",
  },
  {
    bookingNumber: 160,
    bookingName: "Lang",
    bookingSize: 5,
    preferredSeat: "I66",
  },
  {
    bookingNumber: 161,
    bookingName: "Ayala",
    bookingSize: 1,
    preferredSeat: "D26",
  },
  {
    bookingNumber: 162,
    bookingName: "Whitney",
    bookingSize: 5,
    preferredSeat: "P01",
  },
  {
    bookingNumber: 163,
    bookingName: "Oconnor",
    bookingSize: 4,
    preferredSeat: "D07",
  },
  {
    bookingNumber: 164,
    bookingName: "Franklin",
    bookingSize: 5,
    preferredSeat: "K54",
  },
  {
    bookingNumber: 165,
    bookingName: "Greer",
    bookingSize: 6,
    preferredSeat: "C24",
  },
  {
    bookingNumber: 166,
    bookingName: "Mejia",
    bookingSize: 2,
    preferredSeat: "Q86",
  },
  {
    bookingNumber: 167,
    bookingName: "Lamb",
    bookingSize: 1,
    preferredSeat: "A28",
  },
  {
    bookingNumber: 168,
    bookingName: "Mann",
    bookingSize: 2,
    preferredSeat: "I91",
  },
  {
    bookingNumber: 169,
    bookingName: "Miranda",
    bookingSize: 2,
    preferredSeat: "E89",
  },
  {
    bookingNumber: 170,
    bookingName: "Carson",
    bookingSize: 3,
    preferredSeat: "Q77",
  },
  {
    bookingNumber: 171,
    bookingName: "Maldonado",
    bookingSize: 4,
    preferredSeat: "C80",
  },
  {
    bookingNumber: 172,
    bookingName: "Petty",
    bookingSize: 5,
    preferredSeat: "M86",
  },
  {
    bookingNumber: 173,
    bookingName: "Phelps",
    bookingSize: 5,
    preferredSeat: "E79",
  },
  {
    bookingNumber: 174,
    bookingName: "Santana",
    bookingSize: 4,
    preferredSeat: "T58",
  },
  {
    bookingNumber: 175,
    bookingName: "Villarreal",
    bookingSize: 2,
    preferredSeat: "D36",
  },
  {
    bookingNumber: 176,
    bookingName: "Rollins",
    bookingSize: 3,
    preferredSeat: "M45",
  },
  {
    bookingNumber: 177,
    bookingName: "Montoya",
    bookingSize: 5,
    preferredSeat: "B40",
  },
  {
    bookingNumber: 178,
    bookingName: "Coffey",
    bookingSize: 2,
    preferredSeat: "K57",
  },
  {
    bookingNumber: 179,
    bookingName: "Moss",
    bookingSize: 1,
    preferredSeat: "Q29",
  },
  {
    bookingNumber: 180,
    bookingName: "Jackson",
    bookingSize: 5,
    preferredSeat: "O56",
  },
  {
    bookingNumber: 181,
    bookingName: "Lawson",
    bookingSize: 1,
    preferredSeat: "K04",
  },
  {
    bookingNumber: 182,
    bookingName: "Perez",
    bookingSize: 4,
    preferredSeat: "R16",
  },
  {
    bookingNumber: 183,
    bookingName: "Wright",
    bookingSize: 2,
    preferredSeat: "Q19",
  },
  {
    bookingNumber: 184,
    bookingName: "Schneider",
    bookingSize: 6,
    preferredSeat: "C72",
  },
  {
    bookingNumber: 185,
    bookingName: "Barton",
    bookingSize: 3,
    preferredSeat: "P75",
  },
  {
    bookingNumber: 186,
    bookingName: "Romero",
    bookingSize: 1,
    preferredSeat: "B36",
  },
  {
    bookingNumber: 187,
    bookingName: "Gross",
    bookingSize: 2,
    preferredSeat: "I78",
  },
  {
    bookingNumber: 188,
    bookingName: "West",
    bookingSize: 5,
    preferredSeat: "S16",
  },
  {
    bookingNumber: 189,
    bookingName: "Lee",
    bookingSize: 1,
    preferredSeat: "D35",
  },
  {
    bookingNumber: 190,
    bookingName: "Gill",
    bookingSize: 2,
    preferredSeat: "F49",
  },
  {
    bookingNumber: 191,
    bookingName: "Wilkinson",
    bookingSize: 1,
    preferredSeat: "Q59",
  },
  {
    bookingNumber: 192,
    bookingName: "Burton",
    bookingSize: 4,
    preferredSeat: "J49",
  },
  {
    bookingNumber: 193,
    bookingName: "Talley",
    bookingSize: 4,
    preferredSeat: "A74",
  },
  {
    bookingNumber: 194,
    bookingName: "Dejesus",
    bookingSize: 3,
    preferredSeat: "P28",
  },
  {
    bookingNumber: 195,
    bookingName: "Mathews",
    bookingSize: 4,
    preferredSeat: "P08",
  },
  {
    bookingNumber: 196,
    bookingName: "Hernandez",
    bookingSize: 5,
    preferredSeat: "D33",
  },
  {
    bookingNumber: 197,
    bookingName: "Duffy",
    bookingSize: 1,
    preferredSeat: "A99",
  },
  {
    bookingNumber: 198,
    bookingName: "Cortez",
    bookingSize: 5,
    preferredSeat: "N01",
  },
  {
    bookingNumber: 199,
    bookingName: "Gibbs",
    bookingSize: 1,
    preferredSeat: "T60",
  },
  {
    bookingNumber: 200,
    bookingName: "Gray",
    bookingSize: 3,
    preferredSeat: "G33",
  },
  {
    bookingNumber: 201,
    bookingName: "Heath",
    bookingSize: 5,
    preferredSeat: "D11",
  },
  {
    bookingNumber: 202,
    bookingName: "Gilmore",
    bookingSize: 3,
    preferredSeat: "L51",
  },
  {
    bookingNumber: 203,
    bookingName: "Mckay",
    bookingSize: 1,
    preferredSeat: "R06",
  },
  {
    bookingNumber: 204,
    bookingName: "Martinez",
    bookingSize: 4,
    preferredSeat: "H29",
  },
  {
    bookingNumber: 205,
    bookingName: "Mooney",
    bookingSize: 4,
    preferredSeat: "G68",
  },
  {
    bookingNumber: 206,
    bookingName: "Rios",
    bookingSize: 3,
    preferredSeat: "E46",
  },
  {
    bookingNumber: 207,
    bookingName: "Callahan",
    bookingSize: 4,
    preferredSeat: "O89",
  },
  {
    bookingNumber: 208,
    bookingName: "Douglas",
    bookingSize: 5,
    preferredSeat: "P84",
  },
  {
    bookingNumber: 209,
    bookingName: "Kirkland",
    bookingSize: 7,
    preferredSeat: "Q18",
  },
  {
    bookingNumber: 210,
    bookingName: "Mercer",
    bookingSize: 4,
    preferredSeat: "E53",
  },
  {
    bookingNumber: 211,
    bookingName: "Ruiz",
    bookingSize: 4,
    preferredSeat: "M49",
  },
  {
    bookingNumber: 212,
    bookingName: "Bright",
    bookingSize: 1,
    preferredSeat: "M49",
  },
  {
    bookingNumber: 213,
    bookingName: "Jensen",
    bookingSize: 1,
    preferredSeat: "I29",
  },
  {
    bookingNumber: 214,
    bookingName: "Middleton",
    bookingSize: 4,
    preferredSeat: "P36",
  },
  {
    bookingNumber: 215,
    bookingName: "Mathis",
    bookingSize: 3,
    preferredSeat: "S37",
  },
  {
    bookingNumber: 216,
    bookingName: "Wise",
    bookingSize: 2,
    preferredSeat: "N85",
  },
  {
    bookingNumber: 217,
    bookingName: "Tillman",
    bookingSize: 4,
    preferredSeat: "B36",
  },
  {
    bookingNumber: 218,
    bookingName: "Randall",
    bookingSize: 2,
    preferredSeat: "K72",
  },
  {
    bookingNumber: 219,
    bookingName: "Bell",
    bookingSize: 1,
    preferredSeat: "P72",
  },
  {
    bookingNumber: 220,
    bookingName: "Knapp",
    bookingSize: 4,
    preferredSeat: "A56",
  },
  {
    bookingNumber: 221,
    bookingName: "Myers",
    bookingSize: 1,
    preferredSeat: "B07",
  },
  {
    bookingNumber: 222,
    bookingName: "Sweet",
    bookingSize: 3,
    preferredSeat: "A85",
  },
  {
    bookingNumber: 223,
    bookingName: "Mejia",
    bookingSize: 3,
    preferredSeat: "N91",
  },
  {
    bookingNumber: 224,
    bookingName: "Meadows",
    bookingSize: 4,
    preferredSeat: "G64",
  },
  {
    bookingNumber: 225,
    bookingName: "Chapman",
    bookingSize: 4,
    preferredSeat: "M38",
  },
  {
    bookingNumber: 226,
    bookingName: "Lara",
    bookingSize: 5,
    preferredSeat: "Q87",
  },
  {
    bookingNumber: 227,
    bookingName: "Patterson",
    bookingSize: 2,
    preferredSeat: "C51",
  },
  {
    bookingNumber: 228,
    bookingName: "Strong",
    bookingSize: 4,
    preferredSeat: "M65",
  },
  {
    bookingNumber: 229,
    bookingName: "Solomon",
    bookingSize: 5,
    preferredSeat: "F22",
  },
  {
    bookingNumber: 230,
    bookingName: "Dean",
    bookingSize: 5,
    preferredSeat: "R02",
  },
  {
    bookingNumber: 231,
    bookingName: "Nieves",
    bookingSize: 4,
    preferredSeat: "R65",
  },
  {
    bookingNumber: 232,
    bookingName: "Rogers",
    bookingSize: 4,
    preferredSeat: "A12",
  },
  {
    bookingNumber: 233,
    bookingName: "Barker",
    bookingSize: 2,
    preferredSeat: "G09",
  },
  {
    bookingNumber: 234,
    bookingName: "Everett",
    bookingSize: 1,
    preferredSeat: "D84",
  },
  {
    bookingNumber: 235,
    bookingName: "Castro",
    bookingSize: 5,
    preferredSeat: "K71",
  },
  {
    bookingNumber: 236,
    bookingName: "Barr",
    bookingSize: 4,
    preferredSeat: "S90",
  },
  {
    bookingNumber: 237,
    bookingName: "Stein",
    bookingSize: 1,
    preferredSeat: "K58",
  },
  {
    bookingNumber: 238,
    bookingName: "Burks",
    bookingSize: 3,
    preferredSeat: "R83",
  },
  {
    bookingNumber: 239,
    bookingName: "Glass",
    bookingSize: 5,
    preferredSeat: "S88",
  },
  {
    bookingNumber: 240,
    bookingName: "Fernandez",
    bookingSize: 2,
    preferredSeat: "I25",
  },
  {
    bookingNumber: 241,
    bookingName: "Walter",
    bookingSize: 3,
    preferredSeat: "H95",
  },
  {
    bookingNumber: 242,
    bookingName: "Salinas",
    bookingSize: 1,
    preferredSeat: "O09",
  },
  {
    bookingNumber: 243,
    bookingName: "Snyder",
    bookingSize: 3,
    preferredSeat: "R12",
  },
  {
    bookingNumber: 244,
    bookingName: "Hill",
    bookingSize: 4,
    preferredSeat: "C97",
  },
  {
    bookingNumber: 245,
    bookingName: "Burnett",
    bookingSize: 2,
    preferredSeat: "F57",
  },
  {
    bookingNumber: 246,
    bookingName: "Macias",
    bookingSize: 1,
    preferredSeat: "R34",
  },
  {
    bookingNumber: 247,
    bookingName: "Adkins",
    bookingSize: 1,
    preferredSeat: "I78",
  },
  {
    bookingNumber: 248,
    bookingName: "Hickman",
    bookingSize: 4,
    preferredSeat: "F35",
  },
  {
    bookingNumber: 249,
    bookingName: "Raymond",
    bookingSize: 3,
    preferredSeat: "Q02",
  },
  {
    bookingNumber: 250,
    bookingName: "Rosario",
    bookingSize: 2,
    preferredSeat: "Q66\n",
  },
];

const proccessAllBookings = () => {
  for (const key in bookings) {
    if (Object.hasOwnProperty.call(bookings, key)) {
      const booking = bookings[key];
      // if (booking.preferredSeat.startsWith("A")) {
      //   processBooking(booking);
      // }
      processBooking(booking);
    }
  }

  console.log(reservedSeats);
};

proccessAllBookings();
