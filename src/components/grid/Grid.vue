<template>
  <v-card :title="oTable?.description">
    <v-card-text>
      <DxDataGrid :data-source="aItems" :show-borders="true" v-if="columns?.length>0" >
        <DxPaging :page-size="10"/>

        <DxPager
          :visible="true"
          :allowed-page-sizes="pageSizes"
          :display-mode="displayMode"
          :show-page-size-selector="showPageSizeSelector"
          :show-info="showInfo"
          :show-navigation-buttons="showNavButtons"
          infoText="Pagina {0} de {1} ({2} items)"
        />

        <DxGroupPanel :visible="true" emptyPanelText="Arrastra aquí para agrupar..."/>
        
        <DxSearchPanel :visible="true" :width="250" placeholder="Buscar..." />

        <DxColumn 
          v-for="(column, index) in columns" 
          :key="index"
          :data-field="column.dataField"
          :caption="column.caption"
          :visible="column.visible == 1"
          :type="column.type"
          :alignment="column?.alignment"
          :format="column?.format"
          :groupIndex="column?.groupIndex"
          :sortIndex="column?.sortIndex"
          :fixed="column?.fixed == 1"
          :width="column?.width"
        />
      </DxDataGrid>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios'
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxGroupPanel,
  DxSearchPanel
} from "devextreme-vue/data-grid";

const props = defineProps({
  nIdTabla: Number,
  endpoint: String
});

const bLoading = ref(false);
const columns = ref([]);
const aItems = ref([]);
const oTable = ref({})

const pageSizes = [5, 10, 'all'];

const displayMode = ref('compact');
const showPageSizeSelector = ref(true);
const showInfo = ref(true);
const showNavButtons = ref(true);


onMounted(() => onGetData());

const onGetData = async () => {
  try {
    bLoading.value = true;
    
    const { data: { headers, data, tabla } } = await axios.get(`${props.endpoint}?nIdTabla=${props.nIdTabla}`)
    // Asignar columnas y datos
    columns.value = headers
    aItems.value  = data
    oTable.value  = tabla
  } catch (error) {
    bLoading.value = false;
  }
};
</script>