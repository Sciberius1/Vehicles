// Import necessary classes
import Wheel from "./Wheel.js";

// Define the Vehicle class
class Vehicle {
  // Declare properties of the Vehicle class
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  // Constructor for the Vehicle class
  constructor() {
    // Initialize properties of the Vehicle class
    this.vin = "";
    this.color = "";
    this.make = "";
    this.model = "";
    this.year = 0;
    this.weight = 0;
    this.topSpeed = 0;
    this.wheels = [];
  }

  // Method to print details of the Vehicle class
  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
  }
}

// Export the Vehicle class as the default export
export default Vehicle;
