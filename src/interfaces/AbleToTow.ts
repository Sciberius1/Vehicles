// import the Vehicle class
import Vehicle from "../classes/Vehicle.js";

// define the interface
interface AbleToTow {
    // declare the properties
    towingCapacity: number;
    // tow method takes a vehicle as an argument
    tow(vehicle: Vehicle): void;
}

// export the interface
export default AbleToTow;
