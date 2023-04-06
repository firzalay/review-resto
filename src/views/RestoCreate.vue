<script setup>
import { useRestoRepository } from "@/composables";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";
import BaseContainer from "../components/BaseContainer.vue";

const repository = useRestoRepository();
const route = useRoute();
const router = useRouter();

const value = reactive({
  name: "",
  description: "",
  image: "",
  address: "",
});


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

const onSubmit = () => {
  const dataValue = new FormData();
  dataValue.append('name', value.name);
  dataValue.append('image', imageFile.value);
  dataValue.append('description', value.description);
  dataValue.append('address', value.address);

  try {
    repository.store(dataValue);
    router.replace({ name: "restos" });

  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto p-4 min-h-screen">
    <router-link :to="{name: 'restos'}" class="bg-blue-500 text-white rounded-md p-2 px-4 font-[Poppins]">Back</router-link>
    <h1 class="text-center font-[Poppins] text-4xl">Add Resto</h1>
    <div class="max-w-screen-md mx-auto mt-10">
      <form :action="route.path" method="post" @submit.prevent="onSubmit">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Resto Name</label>
          <input type="text" id="name" v-model="value.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Resto Description</label>
          <input type="text" id="description" v-model="value.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required />
        </div>
        <div class="mb-6">
          <label for="image" class="block mb-2 text-sm font-medium text-gray-900">Resto image</label>
          <img v-show="imageUrl" :src="imageUrl" alt="" class="mb-2 rounded-lg">
          <input type="file" id="image" @change="handleImage"
            class=" block w-full file:mr-5 file:py-3 file:px-10
            file:rounded-md file:border-0
            file:font-semibold  file:text-white
            file:bg-yellow-500"
             />
        </div>
        <div class="mb-6">
          <label for="address" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
          <input type="address" id="address" v-model="value.address"
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
