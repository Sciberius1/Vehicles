// import the Vehicle, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from "./Vehicle.js";
import Car from "./Car.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

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
    super(vin, color, make, model, year, weight, topSpeed);
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels.length === 4 ? wheels : Array(4).fill(new Wheel());
    this.towingCapacity = towingCapacity;
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck): void {
    if (vehicle === this) {
      console.log("The truck cannot tow itself.");
      return;
    }

    const make = vehicle.make;
    const model = vehicle.model;
    const weight = vehicle.weight;

    if (weight <= this.towingCapacity) {
      console.log(`The ${make} ${model} is being towed.`);
    } else {
      console.log(`The ${make} ${model} is too heavy to be towed.`);
    }
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
    console.log(`Number of Doors: ${this.numberOfDoors}`);
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log(`Wheels: ${this.wheels.map((wheel) => wheel.toString()).join(", ")}`);
  }
}

// Export the Truck class as the default export
export default Truck;
