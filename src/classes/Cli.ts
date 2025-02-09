// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Wheel from "./Wheel.js";
import Motorcycle from "./Motorcycle.js";

// define the Cli class
class Cli {
  // update the vehicles property to accept Truck and Motorcycle objects as well
  vehicles: (Car | Truck | Motorcycle)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // Update the constructor to accept Truck and Motorcycle objects as well
  constructor(vehicles: (Car | Truck | Motorcycle)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          // Update the choices array to include Truck and Motorcycle
          choices: ['Car', 'Truck', 'Motorcycle'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        } else if (answers.vehicleType === 'Motorcycle') {
          // create a motorcycle
          this.createMotorcycle();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'confirm', name: 'driveable', message: 'Is the vehicle driveable?' },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone"), new Wheel(18, "Bridgestone")],
          answers.driveable
        );
        car.started = answers.driveable;
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
        { type: 'confirm', name: 'driveable', message: 'Is the vehicle driveable?' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear"), new Wheel(20, "Goodyear")],
          parseInt(answers.towingCapacity),
          answers.driveable
        );
        truck.started = answers.driveable;
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();
      });
  }

  // method to create a motorcycle
  createMotorcycle(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'confirm', name: 'hasSidecar', message: 'Does it have a sidecar?' },
        { type: 'confirm', name: 'driveable', message: 'Is the vehicle driveable?' },
      ])
      .then((answers) => {
        const wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
        if (answers.hasSidecar) {
          wheels.push(new Wheel(17, "Michelin"));
        }
        const motorcycle = new Motorcycle(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          answers.hasSidecar,
          wheels,
          answers.driveable
        );
        motorcycle.started = answers.driveable;
        // push the motorcycle to the vehicles array
        this.vehicles.push(motorcycle);
        // set the selectedVehicleVin to the vin of the motorcycle
        this.selectedVehicleVin = motorcycle.vin;
        // perform actions on the motorcycle
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles
            .filter(vehicle => vehicle !== truck) // filter out the truck itself
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = answers.vehicleToTow;
        if (vehicleToTow.weight <= truck.towingCapacity) {
          truck.tow(vehicleToTow);
        } else {
          console.log(`The ${vehicleToTow.make} ${vehicleToTow.model} is too heavy to be towed by this truck.`);
        }
        this.performActions();
      });
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          // add options to tow and wheelie
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow a vehicle',
            'Perform a wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
          if (selectedVehicle) {
            selectedVehicle.printDetails();
          } else {
            console.log('Vehicle not found.');
          }
        } else if (answers.action === 'Tow a vehicle') {
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin && this.vehicles[i] instanceof Truck) {
              if (this.vehicles[i].started) {
                this.findVehicleToTow(this.vehicles[i] as Truck);
              } else {
                console.log('Only driveable trucks can tow a vehicle.');
              }
              return;
            }
          }
        } else {
          // find the selected vehicle
          const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
          if (selectedVehicle instanceof Car || selectedVehicle instanceof Motorcycle) {
            if (answers.action === 'Start vehicle') {
              selectedVehicle.start();
            } else if (answers.action === 'Accelerate 5 MPH') {
              selectedVehicle.accelerate(5);
            } else if (answers.action === 'Decelerate 5 MPH') {
              selectedVehicle.decelerate(5);
            } else if (answers.action === 'Stop vehicle') {
              selectedVehicle.stop();
            } else if (answers.action === 'Turn right') {
              selectedVehicle.turn('right');
            } else if (answers.action === 'Turn left') {
              selectedVehicle.turn('left');
            } else if (answers.action === 'Reverse') {
              selectedVehicle.reverse();
            } else if (answers.action === 'Perform a wheelie' && selectedVehicle instanceof Motorcycle && !selectedVehicle.hasSidecar) {
              selectedVehicle.wheelie();
            } else {
              console.log('Only Motorcycles without a sidecar can perform wheelies.');
            }
          } else {
            console.log('Only Motorcycles without a sidecar can perform wheelies.');
          }
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;
