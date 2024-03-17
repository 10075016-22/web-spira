<template>
  <v-row>
    <v-col>
      <Grid :nIdTabla="2" endpoint="courses" />
    </v-col>
  </v-row>
</template>
<script setup>
import Grid from "@/components/grid/Grid.vue";
</script>