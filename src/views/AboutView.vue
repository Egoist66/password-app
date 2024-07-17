<template>
  <div>
    <h1 class="text-3xl font-bold mb-5">About</h1>

    <div class="p-5 bg-white shadow-md rounded-lg">
      <p class="text-gray-600 mb-2">Password App is a web application that generates random passwords based on user preferences.</p>
      <p class="text-gray-600 mb-2">Users can choose the length of the password, include uppercase letters, lowercase letters, numbers, and special characters.</p>
      <p class="text-gray-600">The application provides a simple interface to generate strong passwords in a user-friendly manner.</p>
      <p class="text-gray-600 mt-5 font-semibold">If you have any proposals, suggestions or bugs to report, please use the form below.</p>
      <form :action="'mailto:razormad666@gmail.com?subject=Password%20App%20feedback&body=' + body" method="post" enctype="text/plain">
        <textarea v-model="body" name="body" placeholder="Enter your message here" class="w-full h-20 text-black p-2 mt-2 border-2  border-gray-300 rounded-md"></textarea>
        

        <div class="flex gap-2 flex-wrap">
          <button :disabled="!body.length" type="submit" class="mt-2 px-4 py-2 bg-blue-500 rounded-md">Send</button>
          <button @click="body = ''" type="reset" class="mt-2 px-4 py-2 bg-blue-500 rounded-md">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const body = ref('');
</script>

<style scoped lang="scss">

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>


