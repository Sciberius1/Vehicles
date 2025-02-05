import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  startCli(): void {
    this.chooseVehicle();
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin
            };
          })
        }
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"]
        }
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" }
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
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity"
        }
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
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "frontWheelDiameter",
          message: "Enter Front Wheel Diameter"
        },
        {
          type: "input",
          name: "frontWheelBrand",
          message: "Enter Front Wheel Brand"
        },
        {
          type: "input",
          name: "rearWheelDiameter",
          message: "Enter Rear Wheel Diameter"
        },
        {
          type: "input",
          name: "rearWheelBrand",
          message: "Enter Rear Wheel Brand"
        }
      ])
      .then((answers) => {
        const frontWheel = new Wheel(
          parseInt(answers.frontWheelDiameter),
          answers.frontWheelBrand
        );
        const rearWheel = new Wheel(
          parseInt(answers.rearWheelDiameter),
          answers.rearWheelBrand
        );
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin) // Exclude the truck itself
            .map((vehicle) => {
              return {
                name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                value: vehicle
              };
            })
        }
      ])
      .then((answers) => {
        const vehicleToTow = answers.vehicleToTow;
        if (vehicleToTow.vin === truck.vin) {
          console.log(
            "The truck cannot tow itself. Please select another vehicle."
          );
        } else if (vehicleToTow.weight > truck.towingCapacity) {
          console.log(
            `The truck cannot tow ${vehicleToTow.make} ${vehicleToTow.model} because it exceeds the towing capacity.`
          );
        } else {
          truck.tow(vehicleToTow);
          console.log(
            `The truck is now towing ${vehicleToTow.make} ${vehicleToTow.model}`
          );
        }
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow a vehicle",
            "Perform a wheelie",
            "Select or create another vehicle",
            "Exit"
          ]
        }
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );
        if (!selectedVehicle) {
          console.log("No vehicle selected.");
          return;
        }

        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Tow a vehicle":
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
            } else {
              console.log("Only trucks can tow vehicles.");
            }
            break;
          case "Perform a wheelie":
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.performWheelie();
            } else {
              console.log("Only motorbikes can perform a wheelie.");
            }
            break;
          case "Select or create another vehicle":
            this.chooseVehicle();
            break;
          case "Exit":
            this.exit = true;
            break;
          default:
            console.log("Invalid action.");
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }
}

// Export the Cli class as the default export
export default Cli;
