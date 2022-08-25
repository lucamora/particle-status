const phin = require('phin').unpromisified
const PARTICLE_STATUS_URL = 'https://status.particle.io/index.json'

class Particle {
  // define components constants
  static CELLULAR_CONNECTIVITY = 0
  static WIFI_CONNECIVITY = 1
  static REST_API = 2
  static INTEGRATIONS = 3
  static MANAGEMENT_CONSOLE = 4
  static TELEPHONY_PROVIDERS = 5
  static CUSTOMER_RESOURCES = 6
  static DEVELOPER_TOOLS = 7

  // constant to monitor all components
  static ALL_COMPONENTS = [
    this.CELLULAR_CONNECTIVITY,
    this.WIFI_CONNECIVITY,
    this.REST_API,
    this.INTEGRATIONS,
    this.MANAGEMENT_CONSOLE,
    this.TELEPHONY_PROVIDERS,
    this.CUSTOMER_RESOURCES,
    this.DEVELOPER_TOOLS
  ]

  /**
   * Monitor the status of the requested components of the Particle Cloud status page
   * @param {*} components list of components to be monitored
   * @param {*} cb function called after the process completed
   */
  static status (components, cb) {
    // check if 'components' parameter is of the correct type
    if (!components || !Array.isArray(components)) {
      return cb(new Error('"components" parameter should be an array'))
    }

    phin({
      url: PARTICLE_STATUS_URL,
      parse: 'json',
      timeout: 4000
    }, (err, res) => {
      if (err) {
        return cb((err instanceof Error) ? err : new Error(err))
      }

      // check status code and response error
      if (res.statusCode !== 200 || res.body.error) {
        const e = new Error('Response error with status ' + res.statusCode)
        e.body = res.body
        return cb(e)
      }

      const status = {
        operational: true,
        components: {
          operational: [],
          outage: [],
          minor: []
        }
      }

      for (let i = 0; i < res.body.components.length; i++) {
        if (components.includes(i)) {
          const component = res.body.components[i]

          const operational = component.status !== 'outage'

          if (!operational) {
            status.operational = false
          }

          let list = 'outage'
          if (component.status === 'operational') {
            list = 'operational'
          } else if (component.status === 'degraded_performance') {
            list = 'minor'
          }

          status.components[list].push({
            status: component.status,
            name: component.name
          })
        }
      }

      cb(null, status)
    })
  }
}

module.exports = Particle
