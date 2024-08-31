import EventEmitter from 'events';

class CargoEventEmitter extends EventEmitter {}

const cargoEventEmitter = new CargoEventEmitter();


cargoEventEmitter.on('cargoUpdated', (cargo) => {
    console.log(`Cargo updated: ${JSON.stringify(cargo)}`);
});


export default cargoEventEmitter;
