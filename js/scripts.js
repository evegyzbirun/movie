// Business Logic
function Cinema() {
  this.sessions = {};
  this.currentId = 0;
}

let tickets = new Cinema();

Cinema.prototype.addSession = function (session) {
  session.id = this.assignId();
  this.sessions[session.id] = session;
};

Cinema.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

Cinema.prototype.findSession = function (id) {
  if (this.sessions[id] != undefined) {
    return this.sessions[id];
  }
  return false;
};

Cinema.prototype.deleteSession = function (id) {
  if (this.sessions[id] === undefined) {
    return false;
  }
  delete this.sessions[id];
  return true;
};

// Business Logic lit of movies

function Movie(titles, times, age) {
  this.titles = titles;
  this.times = times;
  this.age = age;
}

let movieOne = new Movie("The Lost City", [10, 12], 18);
let movieTwo = new Movie("Jujutsu Kaisen 0 (Subbed)", [8, 14], 10);
let movieThree = new Movie("The Batman", [11, 14], 16);
let movieFour = new Movie("Sonic the Hedgehog 2", [13, 14], 0);

function Ticket(titles, times, price) {
  this.price = price;
  this.titles = titles;
  this.times = times;
}




function price(movieTime, age) {
  let price = 10;
  if (age >= 55) {
    price -= 2;
  } else if (age < 12) {
    price -= 5;
  }
  if (movieTime < 12) {
    price -= 1;
  } else {
    price += 1;
  }
  return price;
};


// User Interface Logic ---------

$(document).ready(function () {
  $(".movieone").children("h5").text(movieOne.titles);
  $(".first-movie-time-one").text(movieOne.times[0].toString() + ":00");
  $(".first-movie-time-two").text(movieOne.times[1].toString() + ":00");
  $(".movietwo").children("h5").text(movieTwo.titles);
  $(".second-movie-time-one").text(movieTwo.times[0].toString() + ":00");
  $(".second-movie-time-two").text(movieTwo.times[1].toString() + ":00");
  $(".moviethree").children("h5").text(movieThree.titles);
  $(".third-movie-time-one").text(movieThree.times[0].toString() + ":00");
  $(".third-movie-time-two").text(movieThree.times[1].toString() + ":00");

  $("form#new-movie").submit(function (event) {
    event.preventDefault();
    const age = parseInt($("#number").val());
    const movieTime = $('input[name="time"]:checked').val();
    let movie;
    let time;
    if (movieTime === "movieone-timeone") {
      movie = movieOne;
      time = movie.times[0];
    } else if (movieTime === "movieone-timetwo") {
      movie = movieOne;
      time = movie.times[1];
    } else if (movieTime === "movietwo-timeone") {
      movie = movieTwo;
      time = movie.times[0]
    } else if (movieTime === "movietwo-timetwo") {
      movie = movieTwo;
      time = movie.times[1]
    } else if (movieTime === "moviethree-timeone") {
      movie = movieThree;
      time = movie.times[0];
    } else {
      movie = movieThree;
      time = movie.times[1];
    }
    let ampm;
    if (time > 12) {
      ampm = "PM";
      time -= 12;
    } else {
      ampm = "AM";
    }


    if (movie.age > age) {
      $("#error").text("Too young to watch movie")
    } else {
      let pricenew = price(time, age);
      let newTicket = new Ticket(movie.titles, time, pricenew)
      tickets.addSession(newTicket);
      $("#show").show();
      $("#show").append("<p>Movie Title: " + newTicket.titles + "</p><p>" + "Showing: " + newTicket.times + ":00 " + ampm + "</p><p> Price: $" + newTicket.price + "</p>");





    }

  });

});