<template>
  <v-row>
    <v-col>
      <Grid :nIdTabla="5" endpoint="permissions" />
    </v-col>
  </v-row>
</template>
<script setup>
import Grid from "@/components/grid/Grid.vue";
</script>