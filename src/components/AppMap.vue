<template>
  <div id="diagram-container">
    <div id="item_left" class="item" style="margin-left:70px;">
      <div>
        <p class="item-title">Devices</p>
      </div>
      <div class="table-container">
        <table class="table-style" >
          <col width="30%">
          <col width="50%">
          <col width="20%" align="right">
          <tr>
            <td>{{device.deviceNum}}</td>
            <td>Devices</td>
            <td></td>
          </tr>
          <tr>
            <td>{{device.msgSent}}</td>
            <td>Msgs Sent</td>
            <td></td>
          </tr>
          <tr>
            <td>{{device.latency}} ms</td>
            <td>Avg Latency</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <div id="item_middle" class="item" style="margin-left:150px;">
      <div>
        <p class="item-title">IoT Hub</p>
      </div>
      <div class="table-container">
        <table class="table-style">
          <col width="20%">
          <col width="60%">
          <col width="20%" align="right">
          <tr>
            <td>{{iotHub.msgIngress}}</td>
            <td>Msgs Ingress</td>
            <td></td>
          </tr>
          <tr>
            <td>{{iotHub.msgEgress}}</td>
            <td>Msgs Egress</td>
            <td></td>
          </tr>
          <tr>
            <td>{{iotHub.deviceConnected}}</td>
            <td>Devices Connected</td>
            <td></td>
          </tr>
          <tr>
            <td>{{iotHub.failures}}%</td>
            <td>Failures</td>
            <td>
              <div class="svg-style">
                <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false">
                  <g aria-hidden="true" role="presentation">
                    <circle cx="8" cy="8" r="8" aria-hidden="true" role="presentation" class="msportalfx-svg-c14" style="fill: green;"></circle>
                    <path d="M3.989 8.469L3.7 8.156a.207.207 0 0 1 .012-.293l.835-.772a.204.204 0 0 1 .289.012l2.296 2.462 3.951-5.06a.204.204 0 0 1 .289-.035l.903.697a.198.198 0 0 1 .035.285l-5.075 6.497-3.246-3.48z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: white;"></path>
                  </g>
                </svg>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="item_right" class="item" style="margin-left:150px;">
      <div>
        <p class="item-title">Stream Analytics</p>
      </div>
      <div class="table-container">
        <table class="table-style">
          <col width="20%">
          <col width="60%">
          <col width="20%"  align="right">
          <tr>
            <td>{{streamAnalytics.processedMessage}}</td>
            <td>Msgs Processed</td>
            <td></td>
          </tr>
          <tr>
            <td>{{streamAnalytics.latency}}</td>
            <td>Average Latency</td>
            <td></td>
          </tr>
          <tr>
            <td>{{streamAnalytics.failures}}%</td>
            <td>Failures</td>
            <td>
              <div class="svg-style">
                <svg viewBox="0 0 16 16" role="presentation" aria-hidden="true" focusable="false">
                  <g aria-hidden="true" role="presentation">
                    <circle cx="8" cy="8" r="8" aria-hidden="true" role="presentation" class="msportalfx-svg-c14" style="fill: green;"></circle>
                    <path d="M3.989 8.469L3.7 8.156a.207.207 0 0 1 .012-.293l.835-.772a.204.204 0 0 1 .289.012l2.296 2.462 3.951-5.06a.204.204 0 0 1 .289-.035l.903.697a.198.198 0 0 1 .035.285l-5.075 6.497-3.246-3.48z" aria-hidden="true" role="presentation" class="msportalfx-svg-c01" style="fill: white;"></path>
                  </g>
                </svg>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

var jsPlumb = require('jsplumb').jsPlumb

export default {
  name: 'test',
  data () {
    return {
      device: {deviceNum: 1, msgSent: 0, latency: 0},
      iotHub: {msgIngress: 1, msgEgress: 0, deviceConnected: 0, failures: 0},
      streamAnalytics: {processedMessage: 1, latency: 0, failures: 0},
      msg: 'Diagnostics Settings'
    }
  },
  beforeDestroy () {
    jsPlumb.detachEveryConnection()
  },
  mounted () {
    jsPlumb.ready(function () {
      jsPlumb.connect({
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

      jsPlumb.connect({
        paintStyle: {
          stroke: '#999',
          strokeWidth: 1
        },
        source: 'item_middle',
        target: 'item_right',
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
      jsPlumb.on(window, 'resize', jsPlumb.repaintEverything)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#diagram-container {
  padding: 20px;
  width: 1100px;
  height: 200px;
  border: 1px solid #d0d0d0;
  min-width: 1100px;
  text-align: left;
  margin: auto;
}

.item {
  height: 120px;
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
  margin: auto;
}

.table-container {
  height: 70%;
  position: relative;
  margin: 0 4px;
}

.table-style {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
}
</style>

