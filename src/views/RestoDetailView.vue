
<script setup>
import { useRestoRepository } from "@/composables";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";
import BaseContainer from "../components/BaseContainer.vue";

const repository = useRestoRepository();

const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const resto = ref({});

const fetchDetail = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.show(id);
    resto.value = data;
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};
onMounted(() => fetchDetail());

const reviews = ref([]);
const fetchReviews = async () => {
  isLoading.value = true;
  try {
    const id = route.params.id;
    const { data } = await repository.reviews(id);
    reviews.value = data;
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};

const deleteResto = async () => {

try {
  const id = route.params.id;
  const { data } = await repository.destroy(id);
  if (data) {
    router.replace({ name: "restos" });
  }
} catch (e) {
  console.error(e);
}

};  



onMounted(() => fetchReviews());
</script>

<template>
  <BaseContainer>
    <RouterLink
      :to="{ name: 'restos' }"
      class="inline-block p-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800"
      >Back</RouterLink
    >
    <RouterLink
      :to="{ name: 'restos-edit' }"
      class="inline-block p-2 px-4 mx-2 bg-blue-600 text-white rounded hover:bg-blue-800"
      >Edit</RouterLink
    >
   <form :action="route.path" class="inline-block p-2 px-4 mx-2 bg-red-600 text-white rounded hover:bg-red-800" method="post" @submit.prevent="deleteResto">
    <button class="">Delete</button>
   </form>

    <BaseCard class="mt-4 bg-red-600 text-white">
      <template #title>Resto</template>
    </BaseCard>

    <BaseCard class="mt-4">
      <template #title>{{ resto.name }}</template>
      {{ resto.description }}
    </BaseCard>

    <BaseCard class="mt-4 bg-red-600 text-white">
      <template #title>Reviews</template>
    </BaseCard>

    <BaseCard v-for="review in reviews" :key="review.id" class="mt-4">
      <template #title>{{ review.user.name }}</template>
      {{ review.text }}
    </BaseCard>
  </BaseContainer>
</template>
