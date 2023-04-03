<script setup>
import { useRestoRepository } from "@/composables";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import BaseContainer from "../components/BaseContainer.vue";

const repository = useRestoRepository();
const route = useRoute();
const router = useRouter();

const value = reactive({
  name: "",
  description: "",
  address: "",
});

const onSubmit = async () => {
  try {
    const { data } = await repository.store(value);
    console.log({ data });
    if (data) {
      router.replace({ name: "restos" });
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <BaseContainer>
    <form :action="route.path" method="post" @submit.prevent="onSubmit">
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >Resto Name</label
        >
        <input
          type="text"
          id="name"
          v-model="value.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Resto Description</label
        >
        <input
          type="text"
          id="description"
          v-model="value.description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="address"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Address</label
        >
        <input
          type="address"
          id="address"
          v-model="value.address"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </BaseContainer>
</template>
