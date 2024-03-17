<template>
  <v-row>
    <v-col>
      <Grid :nIdTabla="4" endpoint="roles" />
    </v-col>
  </v-row>
</template>
<script setup>
import Grid from "@/components/grid/Grid.vue";
</script>