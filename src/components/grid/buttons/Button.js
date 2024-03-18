import axios from "axios";
import { ref } from "vue";
import { inject } from "vue";

export function Button(props, emit) {
  const bLoading = ref(false);
  const swal = inject("$swal");

  const onEliminar = async (endpoint, id) => {
    try {
      bLoading.value = true;
      swal
        .fire({
          icon: "info",
          title: "¿Desea eliminar el registro?",
          showCancelButton: true,
          confirmButtonText: "Si, Eliminar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const url = `${endpoint}/${id}`;
            const { data, status } = await axios.delete(url);
            bLoading.value = false;
            switch (status) {
              case 200:
                swal.fire({icon: 'success', title: data.message});
                emit("onBack", { item: props.item, row: props.row });
                break;
              case 210:
                swal.fire({ title: data.message, icon: "info" });
                break;
            }
          }
        });
    } catch (error) {
      bLoading.value = false;
    }
  };
  return {
    bLoading,

    onEliminar,
  };
}
