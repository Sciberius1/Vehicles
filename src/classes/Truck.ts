// Import the Vehicle, Wheel, AbleToTow, and Driveable classes/interfaces
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";
import Driveable from "../interfaces/Driveable.js";
import { initializeWheels } from "../utils/wheelUtils.js";

// Extend the Vehicle class to create the Truck class and implement the AbleToTow and Driveable interfaces
class Truck extends Vehicle implements AbleToTow, Driveable {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;
  started: boolean;
  currentSpeed: number;

  // Constructor for the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super();
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = initializeWheels(wheels, 4);
    this.towingCapacity = towingCapacity;
    this.started = false;
    this.currentSpeed = 0;
  }

  // Method to start the truck
  start(): void {
    this.started = true;
    console.log(`${this.make} ${this.model} started.`);
  }

  // Method to accelerate the truck
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(
        `${this.make} ${this.model} accelerated to ${this.currentSpeed} mph.`
      );
    } else {
      console.log(`${this.make} ${this.model} is not started.`);
    }
  }

  // Method to decelerate the truck
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed = Math.max(0, this.currentSpeed - change);
      console.log(
        `${this.make} ${this.model} decelerated to ${this.currentSpeed} mph.`
      );
    } else {
      console.log(`${this.make} ${this.model} is not started.`);
    }
  }

  // Method to stop the truck
  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log(`${this.make} ${this.model} stopped.`);
  }

  // Method to turn the truck
  turn(direction: string): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} turned ${direction}.`);
    } else {
      console.log(`${this.make} ${this.model} is not started.`);
    }
  }

  // Method to reverse the truck
  reverse(): void {
    if (this.started) {
      console.log(`${this.make} ${this.model} is reversing.`);
    } else {
      console.log(`${this.make} ${this.model} is not started.`);
    }
  }

  // Method to check if the truck is driveable
  isDriveable(): boolean {
    return this.started && this.currentSpeed > 0;
  }

  // Method to tow another truck
  tow(vehicle: Truck): void {
    if (!this.isDriveable()) {
      console.log(
        "This truck is not driveable and cannot tow another vehicle."
      );
      return;
    }

    const vehicleDetails = `${vehicle.make} ${vehicle.model}`;
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicleDetails}`);
    } else {
      console.log(`${vehicleDetails} is too heavy to be towed`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log(`Wheels: ${this.wheels.length}`);
    console.log(`Driveable: ${this.isDriveable()}`);
  }
}

// Export the Truck class as the default export
export default Truck;
