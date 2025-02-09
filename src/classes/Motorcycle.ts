import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

class Motorcycle extends Vehicle {
  hasSidecar: boolean;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    hasSidecar: boolean,
    wheels: Wheel[]
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.hasSidecar = hasSidecar;
    this.wheels = wheels.length === 2 ? wheels : Array(2).fill(new Wheel());
  }

  printDetails(): void {
    super.printDetails();
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Has Sidecar: ${this.hasSidecar}`);

    // Print details of the wheels
    console.log(
      `Front Wheel: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`
    );
    console.log(
      `Rear Wheel: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`
    );
  }

  // Method to perform a wheelie
  wheelie(): void {
    if (this.currentSpeed > 0) {
      console.log(`Motorcycle ${this.make} ${this.model} is doing a wheelie!`);
    } else {
      console.log(`Motorcycle ${this.make} ${this.model} must be moving to perform a wheelie.`);
    }
  }
}

export default Motorcycle;
