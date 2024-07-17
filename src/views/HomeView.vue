<script setup lang="ts">
import InputIcon from 'primevue/inputicon';
import { ref } from 'vue';

const strength = ref<number>(20);
const passwordLength = ref<number>(16);
const isUppercase = ref<boolean>(false);
const isLowercase = ref<boolean>(true);
const isNumber = ref<boolean>(true);
const isSpecial = ref<boolean>(true);
const value = ref<number>(20);
</script>

<template>

  <Card :style="{ width: '700px' }">
    <template #title>
      <h2 class="text-center uppercase mb-5 text-gray-500">Password generator</h2>
    </template>
    <template #content>
      <IconField class="mb-2">
        <InputText disabled class="w-full" />
        <InputIcon @click="strength++" class="pi pi-clone cursor-pointer" />
      </IconField>

      <div class="password-indicator mb-5 weak"></div>

      <div class="password-slider mb-5">
        <label class="block mb-2" for="password-length">Password length: <span>{{ passwordLength }}</span></label>
        <Slider :step="2" :min="6" :max="32" id="password-length" class="outline-none border-none"
          v-model="passwordLength" />

      </div>

      <div class="password-settings">
        <label class="block mb-2" for="password-length">Password Settings:</label>

        <InputGroup class="justify-between items-center mb-10">
            <div class="flex flex-col flex-wrap gap-3">
              <div class="option flex items-center justify-between gap-2">
                <label for="lowercase">Lowercase (a-z)</label>
                <Checkbox  id="lowercase" name="lowercase" v-model="isLowercase" :binary="true" />
              </div>
              <div class="option flex justify-between items-center gap-2">
                <label for="lowercase">Uppercase (a-z)</label>
                <Checkbox  id="uppercase" name="uppercase" :binary="true" v-model="isUppercase" />
              </div>
  
            </div>

            <div class="flex flex-col flex-wrap gap-3">
              <div class="option flex justify-between items-center gap-2">
                <label for="numbers">Numbers (0-9)</label>
                <Checkbox id="numbers" name="numbers" v-model="isNumber" :binary="true" />
              </div>
  
              <div class="option flex justify-between items-center gap-2">
                <label for="symbols">Symbols (~!@#)</label>
                <Checkbox v-model="isSpecial" :binary="true" id="symbols" name="symbols" value="rb1" />
              </div>

             
  
            </div>

           
            
        </InputGroup>

        <div class="option">
          <Button class="w-full" label="Generate password" />

        </div>
      </div>
    </template>
  </Card>


</template>

<style lang="scss" scoped>
.password-indicator {
  width: 100%;
  height: 5px;
  position: relative;
  border-radius: 20px;

  &.weak::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: v-bind('strength + "%"');
    height: 100%;
    background-color: rgb(255, 52, 96);
    border-radius: 20px;
  }
}
</style>
