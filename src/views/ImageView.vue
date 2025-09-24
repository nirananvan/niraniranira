<template>
    <v-row>
    <v-col>
    <div class="mt-4">
  <h3>これまでのごほうび画像</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img
      v-for="(imageUrl, index) in imageUrls"
      :key="index"
      :src="imageUrl"
      alt="ごほうび画像"
      style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;"
    />
  </div>
 </div>
      </v-col>
    </v-row>
</template>

<script>
export default {
  computed: {
    imageUrls() {
      return this.$store.state.imageUrls;
    },
  },
  methods: {
    openDialog(url) {
      this.$store.commit('setImageUrl', url); // 今回表示する画像をセット
      this.dialog = true;
    },
  }
}
</script>
