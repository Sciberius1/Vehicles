import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import inquirer from 'inquirer';

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

  // Method to accelerate the motorcycle
  override accelerate(change: number): void {
    // Check if the motorcycle is started
    if (this.started) {
      if (this.currentSpeed + change > this.topSpeed) {
        console.log(`Cannot exceed top speed of ${this.topSpeed} mph`);
      } else {
        this.currentSpeed += change;
        console.log(`Motorcycle accelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the motorcycle first');
    }
  }

  // Method to decelerate the motorcycle
  override decelerate(change: number): void {
    // Check if the motorcycle is started
    if (this.started) {
      if (this.currentSpeed === 0) {
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'reverse',
              message: 'The motorcycle is at 0 mph. Would you like to reverse instead?',
            },
          ])
          .then((answers) => {
            if (answers.reverse) {
              this.reverse();
            } else {
              console.log('The motorcycle remains at 0 mph.');
            }
          });
      } else {
        this.currentSpeed -= change;
        console.log(`Motorcycle decelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the motorcycle first');
    }
  }

  // Method to stop the motorcycle
  override stop(): void {
    this.currentSpeed = 0;
    console.log('Motorcycle stopped');
  }

  // Method to reverse the motorcycle
  override reverse(): void {
    // Check if the motorcycle is started and stopped
    if (this.started && this.currentSpeed === 0) {
      if (this.wheels.length < 3) {
        console.log('Motorcycles with less than 3 wheels cannot be reversed.');
      } else {
        console.log('Motorcycle reversed');
      }
    } else if (!this.started) {
      console.log('Start the motorcycle first');
    } else {
      console.log('Stop the motorcycle before reversing');
    }
  }
}

// Export the Motorcycle class as the default export
export default Motorcycle;
