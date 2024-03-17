<template>
  <v-row>
    <v-col>
      <Grid 
        :nIdTabla="1" 
        endpoint="users"
      />
    </v-col>
  </v-row>
</template>
<script setup>
import Grid from "@/components/grid/Grid.vue";
</script>