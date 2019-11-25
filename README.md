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

After the run of the simulation it will print the utilization of each queue.

```shell
Utilization [
  { queue: 'F1', utilization: [ 31078.2351, 24259.7272 ] },
  {
    queue: 'F2',
    utilization: [ 2.3353, 3.0115, 7.1035, 1006.5378, 30194.8817, 24124.0925 ]
  },
  {
    queue: 'F3',
    utilization: [
        10.6878,    3.0115,
         3.0115,    3.0115,
         3.0115,    5.7395,
         6.3065, 9364.1785,
      45939.004
    ]
  }
]
```

## Assignment 1
To execute the example provided by the Professor, you have to use the `./files/simulator_test1.json` config file. This config file creates the environment described [here](./files/Modelo.pdf).

If you want to use the 100.000 random numbers already generated, you have to execute the following command:

```shell
$ node ./dist/index.js run ./files/simulator_test1.json useRandom
```

After the simulation ends the result will be this:

```shell
Utilization [
  {
    queue: 'F1',
    utilization: [ 23347.2762, 23272.8805, 1751.8581, 97.1217 ]
  },
  {
    queue: 'F2',
    utilization: [
      2358.7992,
      1277.1243,
      8201.5597,
      10332.9626,
      15197.5878,
      11101.1029
    ]
  },
  {
    queue: 'F3',
    utilization: [
      16060.9195,   120.796,
        222.4053,  128.9999,
        229.6957,  112.8052,
        342.1369, 3416.2132,
      27835.1648
    ]
  }
]
```

If you don't want to use the 100.00 random numbers provided in the config file, the following command must be executed:

```shell
$ node ./dist/index.js run ./files/simulator_test1.json
```

The result of the simulation can be something like this:

```shell
Utilization [
  {
    queue: 'F1',
    utilization: [ 42161.0412, 28436.7862, 740.7105, 0.0081 ]
  },
  {
    queue: 'F2',
    utilization: [ 1502.3789, 752.0714, 34865.4388, 34218.6569, 0, 0 ]
  },
  {
    queue: 'F3',
    utilization: [ 67593.9159, 1, 1, 0.5, 0.5, 1, 1.0062, 341.9743, 3397.6496 ]
  }
] 
```

## Assignment 2
a mudanca realizada foi trocar o tamanho da fila 1 de 20 para 7, porque o tempo de chegada de eventos é bastante disperso mas o tempo de servico é bem rapido.
