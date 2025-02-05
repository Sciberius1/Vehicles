// Definition of the Driveable interface
interface Driveable {
  // Declare the properties
  started: boolean;
  currentSpeed: number;
  // Declare the methods
  start(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  stop(): void;
  turn(direction: string): void;
  reverse(): void;
  isDriveable(): boolean;
}

// Export the Driveable interface
export default Driveable;
