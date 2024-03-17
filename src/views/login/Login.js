import { ref } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";


import { UsuarioStore } from "@/store/auth/str_Usuario.js";

export function LoginJS(props) {

  const { oUsuario } = storeToRefs(UsuarioStore())

  const properties = {
    density: "compact",
    variant: "outlined",
  };
  const oForm = ref({
    sUsuario: "admin@email.com",
    sPassword: "admin1234",
  });

  const router = useRouter()
  const form = ref(null);
  const bLoading = ref(false);

  const __onLogin = async () => {
    try {
      // inicia loading
      bLoading.value = true;

      // consultamos estado de validación del formulario
      const { valid } = await form.value.validate();

      // Armamos el cuerpo de la petición
      const body = { email: oForm.value.sUsuario, password: oForm.value.sPassword }
      const { data } = await axios.post('/login', body)
      
      if(!!data) {
        if(data?.status == 'error') {
          error.value = data?.error
          bLoading.value = false
          return;
        } 
        oUsuario.value = data
        oUsuario.value.sToken = data.access_token
        
        delete oUsuario.value.access_token
        // seteamos el bearer de axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
        router.replace({name: 'home'})

      }  else bLoading.value = false;     
      
    } catch (error) {
      console.log({error: error});
      bLoading.value = false;
    }
  };
  return {
    properties,
    form,
    oForm,
    bLoading,

    __onLogin,
  };
}
