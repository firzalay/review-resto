<script setup>
import { useRestoRepository } from "@/composables";
import { useAuthRepository } from "@/composables";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const profile = ref([]);

// const resto = useRestoRepository();
const user = useAuthRepository();

const fetchProfile = async () => {
    
    try {
        const { data } = await user.profile();
        profile.value = data;
    } catch (e) {
        console.error(e);
    }
    
}

onMounted(() => 
fetchProfile()
);
</script>

<template>
    <div class="max-w-screen-xl mx-auto p-4 min-h-screen ">
        <h1 class="font-[Poppins] text-4xl font-bold text-center mt-4">Your Profile</h1>

        <div class="flex justify-center mt-5">
            <img src="../assets/image/download.png" alt="" class="w-56 rounded-[50%]">
        </div>

        <div class="">
            <h1 class="font-[Poppins] text-2xl text-center mt-8">{{ profile.name }}</h1>

            <h1 class="font-[Poppins] text-2xl text-center mt-8">Your Email : </h1>
            <h1 class="font-[Poppins] text-2xl text-center ">{{ profile.email }}</h1>
        </div>

        <h1 class="font-[Poppins] text-2xl mt-8">Your Restaurant</h1>
        <button type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 text-center mt-4 ">Add
            Resto
        </button>


        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 mt-5">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Restaurant Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Addres
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-gray-50 border-b font-[Montserrat]">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            1
                        </th>
                        <td class="px-6 py-4">
                            Primarasa Hotel
                        </td>
                        <td class="px-6 py-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae rem, odio earum debitis
                            nobis laboriosam laborum distinctio eligendi? Nobis in quo molestiae tempora maiores laudantium
                            amet ipsum omnis minus repudiandae.
                        </td>
                        <td class="px-6 py-4">
                            <img src="../assets/image/download.png" alt="">
                        </td>
                        <td class="px-6 py-4">
                            Jl. Tunjungan Baru
                        </td>
                        <td class="p-3">
                            <i class="bi bi-eye-fill"></i> <i class="bi bi-pencil-fill"></i> <i
                                class="bi bi-trash-fill"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

</div></template>