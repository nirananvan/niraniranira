<template>
  <v-app>
    <v-app-bar app color="light-green">


      <v-toolbar-title class="white--text">
        きょうのやること
      </v-toolbar-title>
     
      <v-spacer></v-spacer>

      <v-btn  text to="/" class="white--text">ついか</v-btn>
      <v-btn  text to="/kids" class="white--text">いちらん</v-btn>
    
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
