<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">Azure IoT Diagnostics</a>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to="/" exact>Home</router-link></li>
          <li><router-link to="/appmap" exact>Diagnostics Map</router-link></li>
          <li><a target="_blank" href="https://analytics.applicationinsights.io/subscriptions/faab228d-df7a-4086-991e-e81c4659d41a/resourcegroups/erich-iot-test1/components/aiyugvxkwq46aki" exact>Kusto Query</a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  text-align: center;
}

.navbar {
  border-radius: 0;
}

.navbar-inverse .navbar-nav .active {
  color: #fff;
  background-color: #080000;
}
</style>
