<template>
  <v-card :title="oTable?.description" elevation="0">
    <v-card-text>
      <div class="d-flex justify-end mb-3 mt-3">
        <slot name="btn_personalizados"></slot> 
      </div>
      <DxDataGrid :data-source="aItems" :show-borders="true" :show-row-lines="true" v-if="columns?.length > 0" >
        <DxPaging :page-size="10" />

        <DxPager
          :visible="true"
          :allowed-page-sizes="pageSizes"
          :display-mode="displayMode"
          :show-page-size-selector="showPageSizeSelector"
          :show-info="showInfo"
          :show-navigation-buttons="showNavButtons"
          infoText="Pagina {0} de {1} ({2} items)"
        />

        <DxGroupPanel
          :auto-expand-all="true"
          :visible="true"
          emptyPanelText="Arrastra aquí para agrupar..."
        />

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
          :groupIndex="parseInt(column?.groupIndex)"
          :sortIndex="column?.sortIndex"
          :fixed="column?.fixed == 1"
          :width="column?.width"
        />

        <DxColumn caption="Acciones" alignment="center" width="200" cell-template="actionTemplate" v-if="options?.length > 0" />
        <template #actionTemplate="{ data: cellData }">
          <div class="text-center">
            <component
              v-for="(action, index) in options"
              :key="index"
              :is="getComponent(action?.component?.component)"
              :endpoint="props.endpoint"
              :row="cellData.data"
              :item="action"
              @onBack="onBack"
            />
          </div>
        </template>
      </DxDataGrid>
    </v-card-text>
  </v-card>
</template>
<script setup >
import { onMounted, ref } from "vue";
import axios from 'axios'
import { defineAsyncComponent } from 'vue'

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
const emit = defineEmits(['edit'])

const bLoading = ref(false);
const columns = ref([]);
const options = ref([]);
const aItems = ref([]);
const oTable = ref({})

const pageSizes = [5, 10, 'all'];

const displayMode = ref('compact');
const showPageSizeSelector = ref(true);
const showInfo = ref(true);
const showNavButtons = ref(true);

const getComponent = (component) => {
    return defineAsyncComponent(() => import(`@/components/grid/buttons/${component}.vue`) )
}

onMounted(() => onGetData());

const onBack = (info) => {
  const { item, row } = info;
  switch(item?.component?.component) {
    case 'ButtonDelete': 
      onGetData()
      break;
    case 'ButtonEdit':
      emit('edit', info)
      break;
  }
}

const onGetData = async () => {
  try {
    bLoading.value = true;
    
    const { data: { headers, data, tabla, actions } } = await axios.get(`${props.endpoint}?nIdTabla=${props.nIdTabla}`)
    // Asignar columnas y datos
    columns.value = headers
    aItems.value  = data
    oTable.value  = tabla
    options.value = actions
  } catch (error) {
    bLoading.value = false;
  }
};
</script>