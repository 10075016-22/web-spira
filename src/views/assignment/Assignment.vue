<template>
    <v-row>
      <v-col>
        <Grid :nIdTabla="3" endpoint="assignments" />
      </v-col>
    </v-row>
  </template>
  <script setup>
  import Grid from "@/components/grid/Grid.vue";
  </script>