// import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorcycle from "./classes/Motorcycle.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// create an array of vehicles
const vehicles = [];

// create a truck
const truck1 = new Truck(
  Cli.generateVin(),
  "red",
  "Ford",
  "F-150",
  2021,
  5000,
  120,
  [new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear")],
  10000,
  true
);

// create a car
const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  [new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone")],
  true
);

// create a motorcycle
const motorcycle1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorcycle1 = new Motorcycle(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  false,
  motorcycle1Wheels,
  true
);

// push vehicles to array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorcycle1);

// create a new instance of the Cli class
const cli = new Cli(vehicles);

// start the cli
cli.startCli();
