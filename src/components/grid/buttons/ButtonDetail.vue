<template>
  <v-tooltip :text="item?.component?.message" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" density="compact" icon elevation="0">
        <v-icon color="#1565C0">mdi-eye</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
<script setup>

const props = defineProps({
  row: Object,
  item: Object,
})

</script>