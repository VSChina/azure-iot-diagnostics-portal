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
      {{ result }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Diagnostics Settings',
      connectionString: 'connectionString-abcd',
      status: 'on',
      sample: '30',
      result: ''
    }
  },
  methods: {
    updateSetting: function () {
      this.result = 'Start!'
      $.getJSON('https://vscedownloadcountwebapi.azurewebsites.net/formulahendry.code-runner/download-counts?dateInterval=Hour&intervalCount=11')
        .done((data) => {
          console.log(data)
          this.result = data
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
</style>
