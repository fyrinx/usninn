<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark" c>
      <router-link to="/" class="navbar-brand">USN-utlån</router-link>
      <div class="navbar-nav mr-auto mx-md-auto">
        <li class="nav-item">
          <router-link to="/borrows" class="nav-link">Låneliste</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tools" class="nav-link">Utstyrsliste</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/students" class="nav-link">Studentliste</router-link>
        </li>
        
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>