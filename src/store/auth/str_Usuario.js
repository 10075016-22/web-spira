import axios from "axios";
import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

export const UsuarioStore = defineStore( "UsuarioStore", () => {
    // Esto permitirá ocultar o mostrar el menu lateral
    const oUsuario = ref({
      id: null,
      name: "",
      email: "",
      status: 0,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      sToken: "",
    });

    const __onClear = () => {
        oUsuario.value = {
            id: null,
            name: "",
            email: "",
            status: 0,
            created_at: null,
            updated_at: null,
            deleted_at: null,
            sToken: "",
        }
    }
    const token = computed(() => oUsuario.value.sToken)

    const hasAuthenticated = computed(() => !!oUsuario.value.id )
    onMounted(() => {
      if(!!oUsuario.value.sToken) axios.defaults.headers.common['Authorization'] = `Bearer ${oUsuario.value.sToken}`
    })
    watch(() => token.value, () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
    })
    return {
      oUsuario,
      hasAuthenticated,
      __onClear
    };
  },
  { persist: true }
);
