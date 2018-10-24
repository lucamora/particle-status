# particle-status
Node module to check Particle Cloud status

## Install the module
#### NPM
```bash
npm install particle-status
```

#### Yarn
```bash
yarn install particle-status
```

## Select components to be monitored
Pass an array with the indexes of components you want to monitor.
```javascript
const particle = require('particle-status');

// monitor build.particle.io, console.particle.io, Device Service
particle.monitor([2, 3, 7]);
```

### Components indexes
These are the components available in the [Particle status page](https://status.particle.io)


| Index | Component | Description |
| --- | --- | --- |
| 0 | community.particle.io | Community Discussion Site and Forums |
| 1 | www.particle.io | Particle main website |
| 2 | build.particle.io | The web-based IDE, where users can write code and flash their devices |
| 3 | console.particle.io | Tools to manage devices and the data they produce |
| 4 | api.particle.io | The RESTful API used to communicate with connected devices |
| 5 | docs.particle.io | Documentation |
| 6 | login.particle.io | Single sign on for Particle web apps |
| 7 | Device Service | This is what a Particle device connects to when it has an Internet connection |
| 8 | Compile Service | The service that verifies and compiles firmware |
| 9 | Mobile carriers | The cellular network providers for Particle SIMs |
| 10 | Webhooks | Integration with custom services |
| 11 | Ecommerce stores | The retail and wholesale store where to buy Particle hardware |



## Check the status of monitored components
```javascript
particle.status((err, status) => {
	if (err) {
		return;
	}

	// do something with status object
	console.log(status['operational']);
});
```

The `status` object contains two fields:
- `operational`: determine if every monitored component is operational
- `components`: contains two arrays (`operational` and `outage`) with the components that are operational or affected by the outage

### Example with all systems operational
```json
{
	"operational": true,
	"components": {
		"operational": [
			{
				"status": "operational",
				"name": "api.particle.io"
			},
			{
				"status": "operational",
				"name": "Mobile carriers"
			},
			{
				"status": "operational",
				"name": "Webhooks"
			}
		],
		"outage": []
	}
}
```


### Example with some monitored system affected by the outage
```json
{
	"operational": false,
	"components": {
		"operational": [
			{
				"status": "operational",
				"name": "Mobile carriers"
			}
		],
		"outage": [
			{
				"status": "outage",
				"name": "api.particle.io"
			},
			{
				"status": "outage",
				"name": "Webhooks"
			}
		]
	}
}
```