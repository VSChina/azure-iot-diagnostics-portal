<template>
  <div id="diagram-container">
    <div class="item-container">
      <div id="item_left" class="item">
        <div>
          <p class="item-title">Devices</p>
        </div>
        <div class="table-container">
          <table class="item-left-table" >
            <col width="30%">
            <col width="60%">
            <col width="20" align="right">
            <tr>
              <td>{{isNaN(device.registeredNum) ? "-" : device.registeredNum}}</td>
              <td>Registered Devices</td>
              <td></td>
            </tr>
            <tr>
              <td>{{isNaN(device.connectedNum) ? "-" : device.connectedNum}}</td>
              <td>Connected Devices</td>
              <td></td>
            </tr>

          </table>
        </div>
      </div>
      <div id="item_middle" class="item">
        <div>
          <p class="item-title">IoT Hub</p>
        </div>
        <div class="table-container">
          <table class="item-middle-table">
            <col width="45%">
            <col width="50%">
            <col width="20%" align="right">
            <tr>
              <td>{{isNaN(iotHub.msgReceived) ? "-" : iotHub.msgReceived}}</td>
              <td>Msgs Received</td>
              <td></td>
            </tr>
            <tr>
              <td>{{isNaN(iotHub.latency) ? "-" : iotHub.latency+" ms"}}</td>
              <td>Avg Latency</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>

      <div id="item_group" class="vcontainer" >
        <div id="item_stream" class="item" v-show="showSA === true">
          <div>
            <p class="item-title">Stream Analytics</p>
          </div>
          <div class="table-container">
            <table class="item-right-table">
              <col width="45%">
              <col width="50%">
              <col width="20%" align="right">
              <tr>
                <td>{{isNaN(streamAnalytics.processedMessage) ? "-" : streamAnalytics.processedMessage + streamAnalytics.failures}}</td>
                <td>Msgs Processed</td>
                <td></td>
              </tr>
              <tr>
                <td>{{isNaN(streamAnalytics.latency) ? "-" : streamAnalytics.latency + " ms"}}</td>
                <td>Avg Latency</td>
                <td></td>
              </tr>
              <tr>
                <td>{{isNaN(streamAnalytics.failurePercentage) ? "-" : streamAnalytics.failurePercentage + "%"}}</td>
                <td>Failures</td>
                <td>
                  <div class="svg-style">

                    <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" v-if="streamAnalytics.failurePercentage < 5">
                      <g aria-hidden="true" role="presentation">
                        <circle cx="8" cy="8" r="8" aria-hidden="true" role="presentation" class="msportalfx-svg-c14" style="fill: green;"></circle>
                        <path d="M3.989 8.469L3.7 8.156a.207.207 0 0 1 .012-.293l.835-.772a.204.204 0 0 1 .289.012l2.296 2.462 3.951-5.06a.204.204 0 0 1 .289-.035l.903.697a.198.198 0 0 1 .035.285l-5.075 6.497-3.246-3.48z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: white;"></path>
                      </g>
                    </svg>

                    <svg viewBox="0 0 9 9" role="presentation" aria-hidden="true" focusable="false" v-else-if="streamAnalytics.failurePercentage < 20">
                      <g aria-hidden="true" role="presentation">
                        <path d="M8.267 8H.733c-.6 0-.916-.623-.62-1.129L2.014 3.53 3.896.384c.302-.507.903-.514 1.197-.008L7.001 3.65l1.882 3.229C9.183 7.383 8.881 8 8.267 8z" aria-hidden="true" role="presentation" class="msportalfx-svg-c10" style="fill: #ff8c00;"></path>
                        <circle cx="4.5" cy="6.178" r="0.615" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></circle>
                        <path d="M4.623 2.428H3.98l.164 2.85h.774l.165-2.85z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></path>
                      </g>
                    </svg>

                    <svg viewBox="0 0 9 9" role="presentation" aria-hidden="true" focusable="false" v-else>
                      <g aria-hidden="true" role="presentation">
                        <circle cx="4.5" cy="4.5" r="4.5" aria-hidden="true" role="presentation" class="msportalfx-svg-c22" style="fill: #e81123;"></circle>
                        <circle cx="4.5" cy="6.438" r="0.697" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></circle>
                        <path d="M4.604 2.186h-.729l.186 3.232h.878l.186-3.232z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></path>
                      </g>
                    </svg>

                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div id="item_function" class="item" v-show="showFunc === true">
          <div>
            <p class="item-title">Function App</p>
          </div>
          <div class="table-container">
            <table class="item-right-table">
              <col width="45%">
              <col width="50%">
              <col width="20%" align="right">
              <tr>
                <td>{{isNaN(functionApp.processedMessage) ? "-" : functionApp.processedMessage+functionApp.failures}}</td>
                <td>Msgs Processed</td>
                <td></td>
              </tr>
              <tr>
                <td>{{isNaN(functionApp.latency) ? "-" : functionApp.latency+" ms"}}</td>
                <td>Avg Latency</td>
                <td></td>
              </tr>
              <tr>
                <td>{{isNaN(functionApp.failurePercentage) ? "-" : functionApp.failurePercentage + "%"}}</td>
                <td>Failures</td>
                <td>
                  <div class="svg-style">

                    <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false" v-if="functionApp.failurePercentage < 5">
                      <g aria-hidden="true" role="presentation">
                        <circle cx="8" cy="8" r="8" aria-hidden="true" role="presentation" class="msportalfx-svg-c14" style="fill: green;"></circle>
                        <path d="M3.989 8.469L3.7 8.156a.207.207 0 0 1 .012-.293l.835-.772a.204.204 0 0 1 .289.012l2.296 2.462 3.951-5.06a.204.204 0 0 1 .289-.035l.903.697a.198.198 0 0 1 .035.285l-5.075 6.497-3.246-3.48z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: white;"></path>
                      </g>
                    </svg>

                    <svg viewBox="0 0 9 9" role="presentation" aria-hidden="true" focusable="false" v-else-if="functionApp.failurePercentage < 20">
                      <g aria-hidden="true" role="presentation">
                        <path d="M8.267 8H.733c-.6 0-.916-.623-.62-1.129L2.014 3.53 3.896.384c.302-.507.903-.514 1.197-.008L7.001 3.65l1.882 3.229C9.183 7.383 8.881 8 8.267 8z" aria-hidden="true" role="presentation" class="msportalfx-svg-c10" style="fill: #ff8c00;"></path>
                        <circle cx="4.5" cy="6.178" r="0.615" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></circle>
                        <path d="M4.623 2.428H3.98l.164 2.85h.774l.165-2.85z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></path>
                      </g>
                    </svg>

                    <svg viewBox="0 0 9 9" role="presentation" aria-hidden="true" focusable="false" v-else>
                      <g aria-hidden="true" role="presentation">
                        <circle cx="4.5" cy="4.5" r="4.5" aria-hidden="true" role="presentation" class="msportalfx-svg-c22" style="fill: #e81123;"></circle>
                        <circle cx="4.5" cy="6.438" r="0.697" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></circle>
                        <path d="M4.604 2.186h-.729l.186 3.232h.878l.186-3.232z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: #fff;"></path>
                      </g>
                    </svg>

                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="component-checkbox">
        <input type="checkbox" v-model="showSA">Show Stream Analytics<br>
        <input type="checkbox" v-model="showFunc">Show Function App<br>
      </div>

      <div class="select">
        <label for="selected">Timespan</label>
        <select class="form-control" v-model="selected" @change="updateMetricsParam()">
          <option value="PT10M">10 Minutes</option>
          <option value="PT1H">1 Hour</option>
          <option value="PT24H">24 Hour</option>
          <option value="P7D">7 Day</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
class AppMapAutoUpdator {
  constructor (callInterval) {
    this.callInterval = callInterval
    this.deviceInfoInterval = callInterval
    this.d2cPath = 'customMetrics/D2CLatency'
    this.saPath = 'customMetrics/StreamJobLatency'
    this.d2cLatencyParam = null
    this.d2cLatencyCallback = null
    this.mertricsParam = null
    this.saLatencyCallback = null
    this.deviceInfoParam = null
    this.deviceInfoCallback = null
  }
  getMetrics (param, callback) {
    $.ajax({
      url: `/metric/get/${param}?time=${Date.now()}`,
      datatype: 'json',
      success: function (data) {
        callback(data)
      },
      complete: () => {
        if (this.enabled) {
          setTimeout(() => {
            if (this.mertricsParam && this.mertricsCallback) {
              this.getMetrics(this.mertricsParam, this.mertricsCallback)
            }
          }, this.callInterval)
        }
      }
    })
  }
  getDeviceInfo (callback) {
    $.ajax({
      url: `/device/get_total?time=${Date.now()}`,
      datatype: 'json',
      success: function (data) {
        callback(data)
      },
      complete: () => {
        if (this.enabled) {
          setTimeout(() => {
            if (this.deviceInfoCallback) {
              this.getDeviceInfo(this.deviceInfoCallback)
            }
          }, this.callInterval)
        }
      }
    })
  }
  updateMetricsParam (param) {
    this.mertricsParam = param
  }
  setMetricsCallBack (param, callback) {
    this.mertricsParam = param
    this.mertricsCallback = callback
  }
  setDeviceInfoCallback (callback) {
    this.deviceInfoCallback = callback
  }
  startAll () {
    var that = this
    this.enabled = true
    if (that.mertricsParam && that.mertricsCallback) {
      that.getMetrics(that.mertricsParam, that.mertricsCallback)
    }
    if (that.deviceInfoCallback) {
      that.getDeviceInfo(that.deviceInfoCallback)
    }
  }
  stopAll () {
    this.enabled = false
  }
};

var updator = new AppMapAutoUpdator(2000)
export default {
  name: 'appMap',
  data () {
    return {
      device: { registeredNum: 0, connectedNum: 0 },
      iotHub: { latency: 0, msgReceived: 0 },
      streamAnalytics: { processedMessage: 0, latency: 0, failures: 0, failurePercentage: 0 },
      selected: 'PT10M',
      functionApp: { processedMessage: 0, latency: 0, failures: 0, failurePercentage: 0 },
      showFunc: localStorage.getItem('showFunc') ? localStorage.getItem('showFunc') === 'true' : true,
      showSA: localStorage.getItem('showSA') ? localStorage.getItem('showFunc') === 'true' : true,
      jsPlumb: require('jsplumb').jsPlumb
    }
  },
  watch: {
    'showFunc': function (val, oldVal) {
      setTimeout(function () {
        if (val) {
          this.jsPlumb.show('item_function')
        } else {
          this.jsPlumb.hide('item_function')
        }
        this.jsPlumb.repaintEverything()
      }, 0)
      localStorage.setItem('showFunc', val)
    },
    'showSA': function (val, oldVal) {
      setTimeout(function () {
        if (val) {
          this.jsPlumb.show('item_stream')
        } else {
          this.jsPlumb.hide('item_stream')
        }
        this.jsPlumb.repaintEverything()
      }, 0)
      localStorage.setItem('showSA', val)
    }
  },
  beforeDestroy () {
    updator.stopAll()
    this.jsPlumb.deleteEveryConnection()
    location.reload()
  },
  methods: {
    updateMetricsParam: function () {
      updator.updateMetricsParam(`timespan=${this.selected}`)
    }
  },
  mounted () {
    var that = this
    updator.setMetricsCallBack(`timespan=${this.selected}`, function (data) {
      var percentage
      that.iotHub.latency = data.d2c_avg === null ? '-' : data.d2c_avg
      that.iotHub.msgReceived = data.d2c_count

      that.streamAnalytics.latency = data.sa_avg === null ? '-' : data.sa_avg
      that.streamAnalytics.processedMessage = data.sa_count
      that.streamAnalytics.failures = data.sa_failure_count

      percentage = 0
      if (that.streamAnalytics.processedMessage + that.streamAnalytics.failures !== 0) {
        percentage = (that.streamAnalytics.failures / (that.streamAnalytics.processedMessage + that.streamAnalytics.failures) * 100).toFixed(2)
      }
      that.streamAnalytics.failurePercentage = percentage

      that.functionApp.latency = data.func_avg === null ? '-' : data.func_avg
      that.functionApp.processedMessage = data.func_count
      that.functionApp.failures = data.func_failure_count

      percentage = 0
      if (that.functionApp.processedMessage + that.functionApp.failures !== 0) {
        percentage = (that.functionApp.failures / (that.functionApp.processedMessage + that.functionApp.failures) * 100).toFixed(2)
      }
      that.functionApp.failurePercentage = percentage
    })
    updator.setDeviceInfoCallback(function (data) {
      that.device.connectedNum = data.connected
      that.device.registeredNum = data.registered
    })
    updator.startAll()
    this.jsPlumb.ready(function () {
      that.jsPlumb.Defaults.Container = document.getElementById('diagram-container')
      console.log('ready')
      that.jsPlumb.connect({
        paintStyle: {
          stroke: '#999',
          strokeWidth: 1
        },
        source: 'item_left',
        target: 'item_middle',
        anchor: ['Left', 'Right'],
        endpoint: ['Blank', {
          radius: 2
        }],
        connector: ['Straight'],
        overlays: [
          ['Arrow', {
            location: 1,
            width: 12,
            length: 12
          }],
          ['Label', {
            label: '',
            cssClass: 'label-class'
          }]
        ]
      })

      that.jsPlumb.connect({
        paintStyle: {
          stroke: '#999',
          strokeWidth: 1
        },
        source: 'item_middle',
        target: 'item_stream',
        anchor: ['Left', 'Right'],
        endpoint: ['Blank', {
          radius: 2
        }],
        connector: ['Straight'],
        overlays: [
          ['Arrow', {
            location: 1,
            width: 12,
            length: 12
          }],
          ['Label', {
            label: '',
            cssClass: 'label-class'
          }]
        ]
      })

      that.jsPlumb.connect({
        paintStyle: {
          stroke: '#999',
          strokeWidth: 1
        },
        source: 'item_middle',
        target: 'item_function',
        anchor: ['Left', 'Right'],
        endpoint: ['Blank', {
          radius: 2
        }],
        connector: ['Flowchart'],
        overlays: [
          ['Arrow', {
            location: 1,
            width: 12,
            length: 12
          }],
          ['Label', {
            label: '',
            cssClass: 'label-class'
          }]
        ]
      })

      if (document.getElementById('item_function').style.display === 'none') {
        that.jsPlumb.hide('item_function')
      }
      if (document.getElementById('item_stream').style.display === 'none') {
        that.jsPlumb.hide('item_stream')
      }

      that.jsPlumb.on(window, 'resize', that.jsPlumb.repaintEverything)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#diagram-container {
  padding: 20px;
  width: 1100px;
  min-height: 200px;
  border: 1px solid #d0d0d0;
  min-width: 1100px;
  text-align: left;
  margin: auto;
}
#item_left {
  margin-left: 70px;
  bottom: 10px;
}
.select{
  width: 150px;
  float: right;
  margin-top: 60px;
}
.item-left-table{
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
#item_middle {
  margin-left: 150px;
}
.item-middle-table{
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
#item_stream {
  margin-left: 150px;
  margin-bottom: 20px;
}
#item_function {
  margin-left: 150px;
  margin-bottom: 20px;
}
.item-right-table{
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
}
.item {
  height: 100px;
  width: 200px;
  border: 1px solid #d0d0d0;
  float: left;
  background-color: #F8F8F8;
  font-size: 12px;
}
.item-title {
  margin: 5px 0;
  text-align: center;
  border-bottom: 1px solid #d0d0d0;
  color: #8b66ac;
  font-size: 16px;
}
.label-class {
  padding-bottom: 20px;
}
.svg-style {
  width: 15px;
  height: 15px;
  margin: auto;
}
.table-container {
  height: 70%;
  position: relative;
  margin: 0 4px;
}

.vcontainer {
    min-height: 10em;
    display: table-cell;
    vertical-align: middle;
}

.item-container{
    overflow:hidden;
    width: 100%;
    margin-bottom: 20px;
    min-height: 240px;
}

</style>
