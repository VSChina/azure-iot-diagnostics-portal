<template>
  <div id="app">
    <nav class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <a href="#" class="navbar-brand">Azure IoT Diagnostics</a>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link to="/" exact>Home</router-link></li>
          <li><router-link to="/test" exact>Application Map</router-link></li>
          <li><router-link to="#" exact>Kusto Query</router-link></li>
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
