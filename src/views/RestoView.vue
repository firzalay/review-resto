<script setup>
import { useRestoRepository } from "@/composables";
import { useAuthRepository } from "@/composables";
import { ref, onMounted } from "vue";


const repository = useRestoRepository();
const auth = useAuthRepository();
const isLoading = ref(true);
const restos = ref([]);
const profile = ref([]);

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

const fetchProfile = async () => {
  isLoading.value = true;
  try {
    const { data } = await auth.profile();
    profile.value = data;
    console.log(data);
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
}

const excerpt = (text, maxLenght = 10, indicator = "...") => {
  let textCopy = text;
  if (textCopy.length > maxLenght) {
    textCopy = textCopy.substring(0, maxLenght) + indicator;
  }
  return textCopy;
};

onMounted(() => {
  fetchRestos(),
    fetchProfile()
});
</script>

<template>
  <div class="bg-gradient-to-tr from-stone-50 to-yellow-200 lg:min-h-screen md:min-h-min">

    <nav class="">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="" class="flex items-center">
          <h1 class="font-[Poppins] font-bold text-3xl">OurReviews.</h1>
        </a>

        <div class="hamburger flex flex-col gap-[3px] md:hidden">
          <div class="bg-black w-6 h-1"></div>
          <div class="bg-black w-6 h-1"></div>
          <div class="bg-black w-6 h-1"></div>
        </div>

        <div class="link-nav hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 font-[Poppins] text-lg">
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded">Home</a>
            </li>
            <li>
              <a href="#about" class="block py-2 pl-3 pr-4 text-gray-900 rounded">About</a>
            </li>
            <li>
              <a href="#products" class="block py-2 pl-3 pr-4 text-gray-900 rounded">Restaurant</a>
            </li>
            <li>
              <a href="#contact" class="block py-2 pl-3 pr-4 text-gray-900 rounded">Contact</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded">Hello </a>
            </li>
          </ul>
        </div>
      </div>


    </nav>

    <section class="max-w-screen-xl mx-auto p-4 mt-1 lg:mt-32 flex">
      <div class="">

        <h1 class="font-[Poppins] text-2xl lg:text-4xl">Temukan Restoran <span
            class="p-1 bg-blue-600 bg-opacity-70 text-white">keren &
            nyaman</span></h1>
        <h1 class="font-[Poppins] text-4xl lg:text-5xl font-extrabold leading-tight mt-3 w-60 md:w-auto">Disini dengan
          berbagai review dari customer</h1>
        <p class="font-[Montserrat] lg:text-lg mt-3 md:w-1/2">Cari restoran disini yang cocok dan pas buat kamu bareng
          keluarga, teman, atau saudara!</p>
        <a href="" target="_blank"><button type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-8 py-2.5 text-center mt-4 ">See
            now</button></a>

        <div class="flex gap-8 mt-5 text-2xl">
          <a href="" target="_blank"><i class="bi bi-instagram transition duration-300 hover:opacity-50"></i></a>
          <a href="" target="_blank"><i class="bi bi-facebook transition duration-300 hover:opacity-50"></i></a>
          <a href="" target="_blank"><i class="bi bi-tiktok transition duration-300 hover:opacity-50"></i></a>
          <a href="" target="_blank"><i class="bi bi-whatsapp transition duration-300 hover:opacity-50"></i></a>
        </div>

      </div>

      <div class="">
        <img src="../assets/image/image-1.jpg" alt=""
          class="hidden md:block relative z-10 rounded-md mr-96 h-72 mt-20 md:mt-10">
        <img src="../assets/image/image-2.jpg" alt=""
          class="hidden lg:block absolute rounded-md top-32 right-96 h-72 -mr-40">
      </div>
    </section>


  </div>

  <div class="bg-[#ffffff] min-h-min" id="about">
    <div class="pt-5">

      <div class="max-w-screen-xl mx-auto p-4 lg:flex gap-3">
        <div class="">
          <h1 class="font-[Poppins] text-4xl font-bold mt-1">About Us</h1>

          <p class="font-[Montserrat] leading-relaxed">Kami memberikan anda banyak pilihan restoran yang cocok untuk anda,
            mulai dari harga, tempat, dan tema bisa anda lihat disini, dan anda juga bisa memberikan reviews untuk
            restoran yang pernah anda datangi disini, semoga kami dapat membantu anda menemukan restoran yang anda cari
          </p>
        </div>


        <img src="../assets/image/image-3.jpg" alt=""
          class="hidden lg:block w-80 rounded-full transition duration-300 ease-in-out hover:rotate-12">
      </div>
    </div>
  </div>

  <div class="bg-[#4df7a5] min-h-screen" id="products">
    <div class="max-w-screen-xl mx-auto p-4">
      <h1 class="font-[Poppins] text-3xl font-bold flex justify-center mt-5">All Resto</h1>

      <div class="mt-10 flex flex-wrap gap-8 justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow" v-for="resto in restos"
          :key="resto.id">
          <a href="#">
            <img class="p-8 rounded-t-lg" :src="'http://localhost:8000/storage/' + resto.image" alt="product image" />
          </a>
          <div class="px-5 pb-2">
            <a href="#">
              <h5 class="font-[Poppins] text-xl font-semibold tracking-tight text-gray-900 ">{{ resto.name }}</h5>
            </a>
          </div>
          <div class="px-5 pb-2 font-[Montserrat] text-xl font-semibold text-green-400">
            Rp35.000
          </div>
          <div class="px-5 pb-2 font-[Montserrat]">
            {{ excerpt(resto.description, 50) }}
          </div>

          <RouterLink :to="{ name: 'restos-show', params: { id: resto.id } }"
            class="inline-block p-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800 mb-2 ml-4">See detail
          </RouterLink>
        </div>
      </div>
    </div>
  </div>


  <div class="min-h-min bg-[#ffffff]" id="contact">
    <footer class="py-6 ">
      <div class="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div class="grid grid-cols-12">
          <div class="pb-6 col-span-full md:pb-0 md:col-span-6">
            <a rel="noopener noreferrer" href="#" class="flex justify-center space-x-3 md:justify-start">
              <span class="self-center text-2xl font-semibold">OurReviews.</span>
            </a>
          </div>
          <div class="col-span-6 text-center md:text-left md:col-span-3">
            <p class="pb-1 text-lg font-medium">Sponsorship</p>
            <ul>
              <li>
                <a rel="noopener noreferrer" href="#" class="">BCA</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="">Mandiri</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="">BNI</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="">BRI</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="">Gopay</a>
              </li>
            </ul>
          </div>
          <div class="col-span-6 text-center md:text-left md:col-span-3">
            <p class="pb-1 text-lg font-medium">Our Office</p>
            <ul>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:dark:text-violet-400">Surabaya</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:dark:text-violet-400">Jakarta</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:dark:text-violet-400">Kalimantan</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:dark:text-violet-400">Sumetara</a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#" class="hover:dark:text-violet-400">Balikpapan</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid justify-center pt-6 lg:justify-between">
          <div class="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
            <span>©2023 All rights reserved</span>
          </div>
          <div class="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13 text-2xl">
            <a href="https://www.instagram.com/arvvenkosmetik/" target="_blank"><i
                class="bi bi-instagram transition duration-300 hover:opacity-50"></i></a>
            <a href="https://www.facebook.com/arvvenbeautystore/" target="_blank"><i
                class="bi bi-facebook transition duration-300 hover:opacity-50"></i></a>
            <a href="https://vt.tiktok.com/ZSdGK167c/" target="_blank"><i
                class="bi bi-tiktok transition duration-300 hover:opacity-50"></i></a>
            <a href="https://wa.me/+6285851117131" target="_blank"><i
                class="bi bi-whatsapp transition duration-300 hover:opacity-50"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
