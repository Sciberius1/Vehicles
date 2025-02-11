// import Driveable interface
import Driveable from '../interfaces/Driveable.js';
import inquirer from 'inquirer';

// Vehicle class that implements Driveable interface
class Vehicle implements Driveable {
  // Declare properties of the Vehicle class
  started: boolean;
  currentSpeed: number;
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  driveable: boolean; // Add driveable property
  towedBy?: Vehicle; // Add towedBy property

  // Constructor for the Vehicle class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number
  ) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.started = false;
    this.currentSpeed = 0;
    this.driveable = false; // Initialize driveable property
  }

  // Method to print vehicle details
  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
    console.log(`Is it driveable? ${this.driveable}`);
    if (this.towedBy) {
      console.log(`Currently being towed by: ${this.towedBy.make} ${this.towedBy.model}`);
    }
  }

  // Method to start the vehicle
  start(): void {
    this.started = true;
    console.log('Vehicle started');
  }

  // Method to accelerate the vehicle
  accelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      if (this.currentSpeed + change > this.topSpeed) {
        console.log(`Cannot exceed top speed of ${this.topSpeed} mph`);
      } else {
        this.currentSpeed += change;
        console.log(`Vehicle accelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to decelerate the vehicle
  decelerate(change: number): void {
    // Check if the vehicle is started
    if (this.started) {
      if (this.currentSpeed === 0) {
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'reverse',
              message: 'The vehicle is at 0 mph. Would you like to reverse instead?',
            },
          ])
          .then((answers) => {
            if (answers.reverse) {
              this.reverse();
            } else {
              console.log('The vehicle remains at 0 mph.');
            }
          });
      } else {
        this.currentSpeed -= change;
        console.log(`Vehicle decelerated to ${this.currentSpeed} mph`);
      }
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to stop the vehicle
  stop(): void {
    this.currentSpeed = 0;
    console.log('Vehicle stopped');
  }

  // Method to turn the vehicle
  turn(direction: string): void {
    // Check if the vehicle is started
    if (this.started) {
      console.log(`Vehicle turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  // Method to reverse the vehicle
  reverse(): void {
    // Check if the vehicle is started and stopped
    if (this.started && this.currentSpeed === 0) {
      console.log('Vehicle reversed');
    } else if (!this.started) {
      console.log('Start the vehicle first');
    } else {
      console.log('Stop the vehicle before reversing');
    }
  }
}

// Export the Vehicle class
export default Vehicle;
