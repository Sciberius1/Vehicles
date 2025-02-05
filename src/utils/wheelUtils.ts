import Wheel from "../classes/Wheel.js";

export function initializeWheels(
  wheels: Wheel[],
  expectedCount: number
): Wheel[] {
  if (wheels.length !== expectedCount) {
    return Array(expectedCount).fill(new Wheel());
  }
  return wheels;
}
