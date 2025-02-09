import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Motorcycle class that extends Vehicle class
class Motorcycle extends Vehicle {
  hasSidecar: boolean;
  wheels: Wheel[];

  // Constructor for the Motorcycle class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    hasSidecar: boolean,
    wheels: Wheel[],
    driveable: boolean
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, color, make, model, year, weight, topSpeed);
    this.hasSidecar = hasSidecar;
    this.wheels = hasSidecar ? [...wheels, new Wheel(17, "Michelin")] : wheels.length === 2 ? wheels : Array(2).fill(new Wheel(17, "Michelin"));
    this.started = driveable;
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class, Vehicle
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
    if (this.hasSidecar) {
      console.log(
        `Sidecar Wheel: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`
      );
    }
  }

  // Method to perform a wheelie
  wheelie(): void {
    if (this.hasSidecar) {
      console.log(`Motorcycle ${this.make} ${this.model} cannot perform a wheelie with a sidecar.`);
    } else if (this.currentSpeed > 0) {
      console.log(`Motorcycle ${this.make} ${this.model} is doing a wheelie!`);
    } else {
      console.log(`Motorcycle ${this.make} ${this.model} must be moving to perform a wheelie.`);
    }
  }
}

// Export the Motorcycle class as the default export
export default Motorcycle;
