// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import inquirer from 'inquirer';

// Car class that extends Vehicle class
class Car extends Vehicle {
  override vin: string;
  override color: string;
  override make: string;
  override model: string;
  override year: number;
  override weight: number;
  override topSpeed: number;
  override driveable: boolean;
  wheels: Wheel[];

  // Constructor for the Car class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    driveable: boolean
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, color, make, model, year, weight, topSpeed);

    // Initialize properties of the Car class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels.length === 4 ? wheels : Array(4).fill(new Wheel(18, "Bridgestone"));
    this.driveable = driveable;
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class, Vehicle
    super.printDetails();

    // Print details of the Car class
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    // Print details of the wheels
    console.log(
      `Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`
    );
    console.log(
      `Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`
    );
    console.log(
      `Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`
    );
    console.log(
      `Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`
    );
  }

  // Method to accelerate the car
  override accelerate(change: number): void {
    // Check if the car is started
    if (this.started) {
      if (this.currentSpeed + change > this.topSpeed) {
        console.log(`Cannot exceed top speed of ${this.topSpeed} mph`);
      } else {
        this.currentSpeed += change;
        console.log(`Car accelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the car first');
    }
  }

  // Method to decelerate the car
  override decelerate(change: number): void {
    // Check if the car is started
    if (this.started) {
      if (this.currentSpeed === 0) {
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'reverse',
              message: 'The car is at 0 mph. Would you like to reverse instead?',
            },
          ])
          .then((answers) => {
            if (answers.reverse) {
              this.reverse();
            } else {
              console.log('The car remains at 0 mph.');
            }
          });
      } else {
        this.currentSpeed -= change;
        console.log(`Car decelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the car first');
    }
  }

  // Method to stop the car
  override stop(): void {
    this.currentSpeed = 0;
    console.log('Car stopped');
  }
}

// Export the Car class as the default export
export default Car;
