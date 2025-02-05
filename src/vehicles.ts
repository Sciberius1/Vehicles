import inquirer from 'inquirer';

class Vehicle {
  // ...existing code...
  async collectDetails() {
    // ...existing code...
  }
  // ...existing code...
}

class Car extends Vehicle {
  // ...existing code...
}

class Truck extends Vehicle {
  async collectDetails() {
    await super.collectDetails();
    const { loadCapacity } = await inquirer.prompt([
      {
        type: 'input',
        name: 'loadCapacity',
        message: 'Enter the load capacity of the truck:',
      },
    ]);
    this.loadCapacity = loadCapacity;
  }

  performAction() {
    console.log(`The truck is carrying a load of ${this.loadCapacity}`);
  }
}

class Motorbike extends Vehicle {
  async collectDetails() {
    await super.collectDetails();
    const { hasSidecar } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'hasSidecar',
        message: 'Does the motorbike have a sidecar?',
      },
    ]);
    this.hasSidecar = hasSidecar;
  }

  performAction() {
    console.log(`The motorbike ${this.hasSidecar ? 'has' : 'does not have'} a sidecar.`);
  }
}

export { Car, Truck, Motorbike };
