<script setup>
import { useRestoRepository } from "@/composables";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import BaseContainer from "../components/BaseContainer.vue";
import BaseCard from "../components/BaseCard.vue";

const repository = useRestoRepository();
const isLoading = ref(true);
const restos = ref([]);

const fetchRestos = async () => {
  isLoading.value = true;
  try {
    const { data } = await repository.index();
    restos.value = data;
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};

const excerpt = (text, maxLenght = 10, indicator = "...") => {
  let textCopy = text;
  if (textCopy.length > maxLenght) {
    textCopy = textCopy.substring(0, maxLenght) + indicator;
  }
  return textCopy;
};

onMounted(() => fetchRestos());
</script>

<template>
  <BaseContainer>
    <div class="grid grid-cols-12 gap-4">
      <div v-for="resto in restos" :key="resto.id" class="col-span-4">
        <!-- Card -->
        <BaseCard :to="{ name: 'restos-show', params: { id: resto.id } }">
          <template #title>
            {{ resto.name }}
          </template>
          {{ excerpt(resto.description, 40) }}
        </BaseCard>
      </div>
    </div>
  </BaseContainer>
</template>
