<template>
  <div class="setting">
    <h1>{{ msg }}</h1>
    <div>
      <form>
        <div class="form-group">
          <div class="col-xs-6 col-xs-offset-3">
            <label for="connectionString">Connection String</label>
            <input type="text" class="form-control" id="connectionString" v-model="connectionString" placeholder="HostName=<my-hub>.azure-devices.net;SharedAccessKeyName=<my-policy>;SharedAccessKey=<my-policy-key>">
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-3 col-xs-offset-3">
            <label for="status">Status</label>
            <input type="text" class="form-control" id="status" v-model="status" placeholder="status">
          </div>
          <div class="col-xs-3">
            <label for="sample">Sample</label>
            <input type="text" class="form-control" id="sample" v-model="sample" placeholder="sample">
          </div>
        </div>
        <div class="update col-xs-6 col-xs-offset-3">
          <button v-on:click="updateSetting">Update</button>
        </div>
      </form>
    </div>
    <div class="result col-xs-6 col-xs-offset-3">
      <div>
        {{ result }}
      </div>
      <pre v-if="detailedResult">
        {{ detailedResult }}
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Diagnostics Settings',
      connectionString: 'HostName=iot-hub-hendry.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=FE98m4TB4e5J/RzCpgtMV8+WXiXuZeRnBN8WzlaZTJQ=',
      status: 'true',
      sample: '30',
      result: '',
      detailedResult: ''
    }
  },
  methods: {
    updateSetting: function () {
      this.result = 'Start updating diagnostics settings...'
      $.get(`https://zhqqi-diagnostic-rest.azurewebsites.net/job/trigger?diag_enable=${this.status}&diag_rate=${this.sample}&connection_string=${encodeURIComponent(this.connectionString)}`)
        .done((data) => {
          let jobId = data
          this.result = 'Updating diagnostics settings...'
          let jobMonitorInterval = setInterval(() => {
            $.get(`https://zhqqi-diagnostic-rest.azurewebsites.net/job/get?id=${jobId}&connection_string=${encodeURIComponent(this.connectionString)}`)
              .done((data) => {
                if (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled') {
                  this.result = 'Stauts: ' + data.status
                  let detailedResult = {
                    createdTime: data.createdTime,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    deviceJobStatistics: data.deviceJobStatistics
                  }
                  this.detailedResult = JSON.stringify(detailedResult, null, 2)
                  clearInterval(jobMonitorInterval)
                }
              })
          }, 1000)
        })
        .fail(() => {
          this.result = 'Error: could not update diagnostics settings'
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

label {
  padding-top: 8px;
}

.update {
  padding-top: 20px;
}

.result {
  padding-top: 30px;
}

pre {
  margin-top: 20px;
}
</style>
