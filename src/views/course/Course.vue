<template>
  <v-row justify="center">
    <v-col v-if="!bFormulario">
      <Grid :nIdTabla="2" endpoint="courses" @edit="onEdit">
        <template v-slot:btn_personalizados>
          <v-btn elevation="0" color="#1565C0" class="text-white" @click="bFormulario = true">
            <v-icon>mdi-plus</v-icon> Agregar
          </v-btn>
        </template>
      </Grid>
    </v-col>
    <v-col v-else lg="6" md="6" sm="12" xl="6" class="mt-10">
      <FormCourse 
        @onBack="bFormulario = false;" 
        :editMood="bEditar" 
        :id="id"
        :oItem="oItem"
      />
    </v-col>
  </v-row>
</template>
<script setup>
import { ref } from "vue";
import Grid from "@/components/grid/Grid.vue";
import FormCourse from '@/views/course/form/FormCourse.vue'
const bFormulario = ref(false)

const id = ref(0)
const bEditar = ref(false)
const oItem = ref({})


const onEdit = ({item, row}) => {
  bFormulario.value = true
  bEditar.value = true
  id.value = row.id
  oItem.value = row
}
</script>