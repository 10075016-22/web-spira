import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { UsuarioStore } from '@/store/auth/str_Usuario.js'
export function Menu(props) {

  const bLoading = ref(false);
  const aMenu = ref([]);
  const route = useRoute()
  const router = useRouter()

  onMounted(() => __getModulos());

  const {
    oUsuario
  } = UsuarioStore()

  const __onItem = (item) => {
    if( route.name !== item.name) router.replace({ name: item.name })
    return;
  };

  const __logout =  async () => {
    const res = await axios.post('/logout')
    if(res.status === 200) {
      sessionStorage.clear()
      localStorage.clear()
      window.location.href = ''
    }
  }


  const __getModulos = async () => {
    bLoading.value = true
    try {
      const { roles } = oUsuario;
      
      const { data } = await axios.get('/modules')
      aMenu.value = data?.filter((modulo) => roles[0].permissions.some(permiso => permiso.name === modulo.name));
      console.log(aMenu.value);
      
      bLoading.value = false;
    } catch (error) {
      console.log({error: error});
      bLoading.value = false;
    }
  }

  return {
    aMenu,

    __onItem,
    __logout
  };
}
