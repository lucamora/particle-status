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
Pass an array with the named constants (or the indexes) of the components you want to monitor.
```javascript
const Particle = require('particle-status');
const particle = Particle([Particle.BUILD, Particle.CONSOLE, Particle.DEVICE_SERVICE]);
```

It is also possible to select which components to monitor after the initialization of the client.
```javascript
// monitor build.particle.io, console.particle.io, Device Service
particle.monitor([2, 3, 7]);
// same as
particle.monitor([Particle.BUILD, Particle.CONSOLE, Particle.DEVICE_SERVICE]);
```

### Components indexes
These are the components available in the [Particle status page](https://status.particle.io)


| Index | Constant | Component | Description |
| --- | --- | --- | --- |
| 0 | COMMUNITY | community.particle.io | Community Discussion Site and Forums |
| 1 | WEBSITE | www.particle.io | Particle main website |
| 2 | BUILD | build.particle.io | The web-based IDE, where users can write code and flash their devices |
| 3 | CONSOLE | console.particle.io | Tools to manage devices and the data they produce |
| 4 | API | api.particle.io | The RESTful API used to communicate with connected devices |
| 5 | DOCS | docs.particle.io | Documentation |
| 6 | LOGIN | login.particle.io | Single sign on for Particle web apps |
| 7 | DEVICE_SERVICE | Device Service | This is what a Particle device connects to when it has an Internet connection |
| 8 | COMPILE_SERVICE | Compile Service | The service that verifies and compiles firmware |
| 9 | MOBILE_CARRIERS | Mobile carriers | The cellular network providers for Particle SIMs |
| 10 | WEBHOOKS | Webhooks | Integration with custom services |
| 11 | STORE | Ecommerce stores | The retail and wholesale store where to buy Particle hardware |



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
- `components`: contains three arrays (`operational`, `outage` and `minor`) with the components that are operational or affected by major or minor outages

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
		"outage": [],
		"minor": []
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
		],
		"minor": []
	}
}
```