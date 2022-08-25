# particle-status
Node module to monitor the status of the components in the [Particle](https://www.particle.io/) Cloud [status page](https://status.particle.io).

## Installation
```bash
npm install particle-status
```

## Usage
Import the module:
```js
const particle = require('particle-status')
```

Define an array with the names (or the indexes) of the components to be monitored *([see Components](#components))*:
```js
// monitor Cellular Connectivity, REST API, Integrations

// use names of the components
components = [particle.CELLULAR_CONNECTIVITY, particle.REST_API, particle.INTEGRATIONS]

// use indexes of the components
components = [0, 2, 3]
```

It is also possible to monitor all the components:
```js
components = particle.ALL_COMPONENTS
```

Check the status of monitored components:
```js
particle.status(components, (err, status) => {
  if (err) {
    return
  }

  // do something with status object
  console.log(`operational: ${status.operational}`)
  console.log(`outages count: ${status.outage.length}`)
})
```

## Components
These are the components available in the Particle [status page](https://status.particle.io)

| Index | Component | Description |
| --- | --- | --- |
| 0 | CELLULAR_CONNECTIVITY | General reachability of devices such as Boron and Electron to and from the Particle Cloud over cellular networks |
| 1 | WIFI_CONNECIVITY | General reachability of devices such as Argon & Photon to and from the Particle Cloud over WiFi networks |
| 2 | REST_API | [api.particle.io](https://api.particle.io) endpoints not related to device reachability and SIM management, impacts to these endpoints are captured via Cellular Connectivity, Wifi Connectivity, and Telephony Providers components |
| 3 | INTEGRATIONS | Systems responsible for delivering events generated via `Particle.publish` to external systems such as Azure IoT, Google IoT, or custom http endpoints (webhooks) |
| 4 | MANAGEMENT_CONSOLE | Covers availability of Particle's primary device management interface at [https://console.particle.io](https://console.particle.io) |
| 5 | TELEPHONY_PROVIDERS | Connectivity of cellular devices and SIM state management |
| 6 | CUSTOMER_RESOURCES | Store, documentation, community forum, web-based IDE ([build.particle.io](https://build.particle.io)), main website |
| 7 | DEVELOPER_TOOLS | Particle Workbench and Particle CLI |

## Status format
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