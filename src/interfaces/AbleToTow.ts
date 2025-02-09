// import the classes
import Truck from "../classes/Truck.js";
import Car from "../classes/Car.js";

// define the interface
interface AbleToTow {
    // declare the properties
    towingCapacity: number;
    // tow method takes a truck as an argument
    tow(vehicle: Truck): void;
}

// export the interface
export default AbleToTow;
