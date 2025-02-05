// Import the Truck class
import Truck from "../classes/Truck.js";

// Define the interface
interface AbleToTow {
  // Declare the properties
  towingCapacity: number;
  // Tow method takes a Truck as an argument
  tow(vehicle: Truck): void;
}

// Export the interface
export default AbleToTow;
