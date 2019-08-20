# Event Based Queue Simulator
This is an assignment of the Simulation and Analytical Methods class.

## Instructions

### Installation
Must have installed `Node JS >= 8.0.0`. If you don't have Node JS installed go to [Installation via package manager](https://nodejs.org/en/download/package-manager/).

After installing Node JS, go to the project directory:

```shell
$ cd ./event-based-simulator
```

Run the command to install all dependencies and build the simulator files:

```shell
$ npm run install:build
```

### Configuration Files
The configuration file must be a JSON file and with the following structure:

```json
{
  "arrivals": {
    "F1": 3.0 // First arrival of the queue
  },
  "queues": [ // List of queues to create
    {
      "name": "F1", // Name of the queue
      "servers": 1, // Number of servers of the queue
      "capacity": 5, // Capacity of the queue
      "arrival": { // Min/Max arrival time of the queue
        "min": 2.0,
        "max": 4.0
      },
      "service": { // Min/Max service of the queue
        "min": 3.0,
        "max": 5.0
      }
    }
  ],
  "rndNumbers": [ // List of random numbers to be used in the simulation
    0.3276,
    0.8851,
    0.1643,
    0.5542,
    0.6813,
    0.7221,
    0.9881
  ]
}
```

**Observations:** 
- To use the `rndNumbers` property of the configuration file you MUST pass a command line argument `useRandom` in the runner command.
- For now the simulation will only consider the `first` defined queue in the queue list.

### Running
After installing and building the project you can run the simulator with the following command:

```shell
$ node ./dist/index.js run <path_to_config_file_json>
```

To use the `rndNumbers` the command will be like:

```shell
$ node ./dist/index.js run <path_to_config_file_json> useRandom
```

**If the `rndNumbers` argument isn't provided the simulation will run with 100.000 random numbers**.

After the run of the simulation it will print the quantity of time the queue was with each occupied capacity and the final time of the simulation.

```shell
$ Times: [ 3, 7.0272, 13.7976, 13.8068, 61937.8212, 104563.23 ]
$ Final Time: 166538.6828
```
