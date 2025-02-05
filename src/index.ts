import inquirer from 'inquirer';
// import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// create an array of vehicles
const vehicles = [];

const truck1 = new Truck(Cli.generateVin(),"red", "Ford", "F-150", 2021, 5000, 120, [], 10000);

// will use default wheels
const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  []
);

const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);

// push vehicles to array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// create a new instance of the Cli class
const cli = new Cli(vehicles);

// start the cli
cli.startCli();

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Create new vehicle', 'Select existing vehicle', 'Exit'],
    },
  ]);

  if (action === 'Create new vehicle') {
    const { vehicleType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'vehicleType',
        message: 'What type of vehicle would you like to create?',
        choices: ['Car', 'Truck', 'Motorbike'],
      },
    ]);

    let vehicle;
    if (vehicleType === 'Car') {
      vehicle = new Car();
    } else if (vehicleType === 'Truck') {
      vehicle = new Truck();
    } else if (vehicleType === 'Motorbike') {
      vehicle = new Motorbike();
    }

    await vehicle.collectDetails();
    // ...existing code to use the created vehicle...
  } else if (action === 'Select existing vehicle') {
    // ...existing code to select and use an existing vehicle...
  }
}

main();
