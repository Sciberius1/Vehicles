// import the Vehicle, Wheel, and AbleToTow classes/interfaces
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";
import inquirer from 'inquirer';

// Truck class that extends Vehicle and implements AbleToTow
class Truck extends Vehicle implements AbleToTow {
  override vin: string;
  override color: string;
  override make: string;
  override model: string;
  override year: number;
  override weight: number;
  override topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;
  towedVehicle: Vehicle | null = null; // Add towedVehicle property

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number,
    driveable: boolean
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels.length === 4 ? wheels : Array(4).fill(new Wheel(20, "Goodyear"));
    this.towingCapacity = towingCapacity;
    this.started = driveable;
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Vehicle): void {
    if (!this.started) {
      console.log("The truck must be driveable to tow a vehicle.");
      return;
    }

    if (vehicle === this) {
      console.log("The truck cannot tow itself.");
      return;
    }

    if (vehicle.driveable) {
      const make = vehicle.make;
      const model = vehicle.model;
      const weight = vehicle.weight;

      if (weight <= this.towingCapacity) {
        this.towedVehicle = vehicle;
        vehicle.driveable = false;
        console.log(`The ${make} ${model} is being towed by this truck.`);
      } else {
        console.log(`The ${make} ${model} is too heavy to be towed.`);
      }
    } else {
      console.log("The vehicle is already being towed.");
    }
  }

  // Method to deliver the towed vehicle
  deliverTowedVehicle(): void {
    if (this.towedVehicle) {
      console.log(`The ${this.towedVehicle.make} ${this.towedVehicle.model} has been delivered.`);
      this.towedVehicle.driveable = true;
      this.towedVehicle = null;
    } else {
      console.log("No vehicle is being towed.");
    }
  }

  // Method to accelerate the truck
  override accelerate(change: number): void {
    // Check if the truck is started
    if (this.started) {
      if (this.currentSpeed + change > this.topSpeed) {
        console.log(`Cannot exceed top speed of ${this.topSpeed} mph`);
      } else {
        this.currentSpeed += change;
        console.log(`Truck accelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the truck first');
    }
  }

  // Method to decelerate the truck
  override decelerate(change: number): void {
    // Check if the truck is started
    if (this.started) {
      if (this.currentSpeed === 0) {
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'reverse',
              message: 'The truck is at 0 mph. Would you like to reverse instead?',
            },
          ])
          .then((answers) => {
            if (answers.reverse) {
              this.reverse();
            } else {
              console.log('The truck remains at 0 mph.');
            }
          });
      } else {
        this.currentSpeed -= change;
        console.log(`Truck decelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the truck first');
    }
  }

  // Method to stop the truck
  override stop(): void {
    this.currentSpeed = 0;
    console.log('Truck stopped');
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log(`Wheels:`);
    this.wheels.forEach((wheel, index) => {
      console.log(`  Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`);
    });
    if (this.towedVehicle) {
      console.log(`Currently towing: ${this.towedVehicle.make} ${this.towedVehicle.model}`);
    }
  }
}

// Export the Truck class as the default export
export default Truck;
