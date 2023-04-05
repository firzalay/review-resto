
<script setup>
//TODO : Edit Images
import { useRoute, useRouter } from "vue-router";
import { useRestoRepository } from "@/composables";
import { ref, onMounted, watch } from "vue";


const repository = useRestoRepository();
const route = useRoute();
const router = useRouter();

const resto = ref({});

let imageFile = ref("");
let imageUrl = ref("");

function handleImage(event) {
  if (event.target.files.length === 0) {
    imageFile.value = "";
    imageUrl.value = "";
    return;
  }

  imageFile.value = event.target.files[0];
}

watch(imageFile, (imageFile) => {
  if (!(imageFile instanceof File)) {
    return;
  }

  let fileReader = new FileReader();

  fileReader.readAsDataURL(imageFile);

  fileReader.addEventListener("load", () => {
    imageUrl.value = fileReader.result;
  })
})


const fetchResto = async () => {
  try {
    const id = route.params.id;
    const { data } = await repository.show(id);
    resto.value = data;
  } catch (e) {
    console.log(e);
  }
}

const onSubmit = async () => {
  const dataValue = new FormData();
  dataValue.append('name', resto.name);
  dataValue.append('image', imageFile.value);
  dataValue.append('description', resto.description);
  dataValue.append('address', resto.address);


  try {
    const id = route.params.id;
    const { data } = await repository.update(id, resto.value);
    if (data) {
      router.replace({ name: "restos" });
    }
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => fetchResto());

</script>

<template>
  
    <div class="max-w-screen-xl mx-auto p-4 min-h-screen">
      <router-link :to="{ name: 'restos' }"
        class="bg-blue-500 text-white rounded-md p-2 px-4 font-[Poppins]">Back</router-link>
      <h1 class="text-center font-[Poppins] text-4xl">Edit Resto</h1>
      <div class="max-w-screen-md mx-auto mt-10">
        <form :action="route.path" method="post" @submit.prevent="onSubmit">
          <div class="mb-6">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Resto Name</label>
            <input type="text" id="name" v-model="resto.name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required />
          </div>
          <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Resto Description</label>
            <input type="text" id="description" v-model="resto.description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required />
          </div>
          <div class="mb-6">
            <label for="image" class="block mb-2 text-sm font-medium text-gray-900">Resto image</label>
            <img v-show="imageUrl" :src="imageUrl" alt="">
            <input type="file" id="image" @change="handleImage"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required />
          </div>
          <div class="mb-6">
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
            <input type="address" id="address" v-model="resto.address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required />
          </div>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  
</template>