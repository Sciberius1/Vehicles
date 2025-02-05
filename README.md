# Vehicle Builder CLI

## Description

This TypeScript command-line application allows users to create and manage different types of vehicles, including cars, trucks, and motorbikes. Users can perform various actions with the vehicles, such as starting, accelerating, decelerating, and more.


## Walkthrough Video

A walkthrough video demonstrating the functionality of the application can be found [here](<link-to-video>).


## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <project-directory>
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

To start the application, run:
```sh
npm start
```

Follow the prompts to create a new vehicle or select an existing vehicle, and then perform actions with the selected vehicle.

## Features

- Create and manage different types of vehicles: cars, trucks, and motorbikes.
- Perform various actions with the vehicles, such as starting, accelerating, decelerating, and more.
- Trucks can tow other vehicles.
- Motorbikes can perform wheelies.

## Classes and Interfaces

### Classes

- [`Car`](src/classes/Car.ts)
- [`Truck`](src/classes/Truck.ts)
- [`Motorbike`](src/classes/Motorbike.ts)
- [`Vehicle`](src/classes/Vehicle.ts)
- [`Wheel`](src/classes/Wheel.ts)
- [`Cli`](src/classes/Cli.ts)

### Interfaces

- [`AbleToTow`](src/interfaces/AbleToTow.ts)
- [`Driveable`](src/interfaces/Driveable.ts)

## Scripts

- `build`: Compiles the TypeScript code.
  ```sh
  npm run build
  ```
- `start`: Builds the project and starts the application.
  ```sh
  npm start
  ```
- `test`: Runs the tests (currently not implemented).
  ```sh
  npm test
  ```

## Dependencies

- `inquirer`: ^9.2.19
- `typescript`: ^5.5.0


## License

This project is licensed under the ISC License.
