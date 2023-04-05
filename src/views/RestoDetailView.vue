
<script setup>
import { useRestoRepository, useReviewsRepository } from "@/composables";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from '../components/Loading.vue';

const repository = useRestoRepository();
const review = useReviewsRepository();


const route = useRoute();
const id = route.params.id;
const value = reactive({
  text: "",
  rating: "",
  resto_id: id,

});

const router = useRouter();
const isLoading = ref(true);
const resto = ref({});

const fetchDetail = async () => {
  isLoading.value = true;
  try {

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

const onSubmit = async () => {
  try {

    const { data } = await review.store(value);
    if (data) {
      location.reload();
    }
  } catch (e) {
    console.error(e);
  }
}



onMounted(() => fetchReviews());
</script>

<template>
  <Loading v-if="isLoading" />

  <div v-else>


    <section class="min-h-screen max-w-screen-xl mx-auto p-4">
      <div class="flex gap-5">
        <router-link :to="{ name: 'restos' }"
          class="bg-blue-500 text-white rounded-md p-2 px-4 font-[Poppins]">Back</router-link>
        <router-link :to="{ name: 'restos-edit' }"
          class="bg-purple-600 text-white rounded-md p-2 px-4 font-[Poppins]">Edit</router-link>
        <button @click="deleteResto" class="bg-red-500 text-white rounded-md p-2 px-4 font-[Poppins]">Delete</button>
      </div>
      <div class="mt-5">
        <h1 class="font-[Poppins] text-4xl font-bold text-center">Resto Detail</h1>
      </div>

      <div class="pt-5">

        <div class="max-w-screen-xl flex justify-between mx-auto p-4">
          <div>
            <h1 class="font-[Poppins] font-bold text-3xl">{{ resto.name }}</h1>

            <p class="font-[Montserrat]">{{ resto.description }}</p>
          </div>

          <div class=" w-full md:block md:w-auto">
            <img :src="'http://localhost:8000/storage/' + resto.image" alt="" class="w-96 rounded-lg">
          </div>
        </div>

      </div>

      <div class="mt-5 max-w-screen-xl mx-auto p-4">
        <h1 class="text-xl font-bold">Berikan review untuk restoran ini</h1>
        <form class="mt-5" :action="route.path" @submit.prevent="onSubmit">
          <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-100 ">
            <div class="px-4 py-2 bg-gray-100 rounded-t-lg ">
              <label for="review">Your review</label>
              <textarea id="review" rows="4"
                class="w-full px-0 text-sm text-gray-900 bg-gray-100 border-0  focus:ring-0  outline-none"
                placeholder="Write a review..." required v-model="value.text"></textarea>
            </div>

            <p class="font-[Poppins] ml-3">Your rating</p>
            <input type="number" class="m-3 bg-gray-300 p-1 border border-gray-100 rounded-md outline-none" min="1"
              max="5" placeholder="1 - 5" v-model="value.rating
              ">

            <div class="flex items-center justify-between px-3 py-2 border-t bg-gray-50">
              <button type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
                Post review
              </button>
            </div>
          </div>
        </form>


      </div>

      <section class="">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 class="text-center text-4xl font-bold">
            Reviews dari para customer untuk restoran ini
          </h2>

          <div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <blockquote class="rounded-lg bg-gray-100 p-8" v-for="review in reviews" :key="review.id">
              <div class="flex items-center gap-4">

                <div>
                  <div class="flex justify-center gap-0.5 text-green-500">

                  </div>

                  <p class="mt-1 text-lg font-medium text-gray-700">{{ review.user.name }}</p>
                </div>
              </div>

              <p class="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                {{ review.text }}
              </p>
            </blockquote>


          </div>
        </div>
      </section>

    </section>
  </div>
</template>
