<script setup lang="ts">
import { useGenerator } from "@/hooks/useGenerator";
import InputIcon from "primevue/inputicon";
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const {
  optionsState,
  stylePasswordIndicator,
  isStrongPassword,
  isMediumPassword,
  copyPassword,
  isWeakPassword,
  isGeneratingPassword,
  generatedPassword,
  generatePassword,
} = useGenerator();

const toast = useToast()

const passMessage = () => {
  if (isStrongPassword.value) {
    return "Strong password";
  } else if (isMediumPassword.value) {
    return "Medium password";
  } else {
    return "Weak password";
  }
}
</script>

<template>
  <Card :style="{ width: '700px' }">
    <template #title>
      <h2 class="text-center uppercase mb-5 text-gray-500">Password generator</h2>
    </template>
    <template #content>
      <IconField class="mb-2">
        <InputText v-model="generatedPassword" disabled class="w-full" />
        <InputIcon title="Copy" @click="copyPassword" class="pi pi-clone cursor-pointer" />
      </IconField>

      <div class="password-indicator mb-5"></div>
      <p class="text-gray-600 font-bold mb-5">{{ passMessage()}}{{ isWeakPassword ? '!' : '' }}</p>

      <div class="password-slider mb-5">
        <label class="block mb-2" for="password-length"
          >Password length: <span>{{ optionsState.passwordLength }}</span></label
        >
        <Slider
          :step="2"
          :min="6"
          :max="32"
          id="password-length"
          class="outline-none border-none"
          v-model="optionsState.passwordLength"
        />
      </div>

      <div class="password-settings">
        <label class="block mb-2" for="password-length">Password Settings:</label>

        <InputGroup class="justify-between items-center mb-10">
          <div class="flex flex-col flex-wrap gap-3">
            <div class="option flex items-center justify-between gap-2">
              <label for="lowercase">Lowercase (a-z)</label>
              <Checkbox
                title="Include Lowercase (a-z)"
                id="lowercase"
                name="lowercase"
                v-model="optionsState.isLowercase"
                :binary="true"
              />
            </div>
            <div class="option flex justify-between items-center gap-2">
              <label for="lowercase">Uppercase (a-z)</label>
              <Checkbox
                title="Include Uppercase (A-Z)"
                id="uppercase"
                name="uppercase"
                :binary="true"
                v-model="optionsState.isUppercase"
              />
            </div>
          </div>

          <div class="flex flex-col flex-wrap gap-3">
            <div class="option flex justify-between items-center gap-2">
              <label for="numbers">Numbers (0-9)</label>
              <Checkbox
                title="Include Numbers (0-9)"
                id="numbers"
                name="numbers"
                v-model="optionsState.isNumber"
                :binary="true"
              />
            </div>

            <div class="option flex justify-between items-center gap-2">
              <label for="symbols">Symbols (~!@#)</label>
              <Checkbox
                title="Include Symbols ( ~!@#)"
                v-model="optionsState.isSpecial"
                :binary="true"
                id="symbols"
                name="symbols"
              />
            </div>
          </div>

        </InputGroup>

        <div class="option">
          <Button
            @click="generatePassword"
            :disabled="isGeneratingPassword || (optionsState.isLowercase === false && optionsState.isUppercase === false && optionsState.isNumber === false && optionsState.isSpecial === false)"
            class="w-full"
            :label="isGeneratingPassword ? 'Generating...' : 'Generate Password'"
          />
        </div>
      </div>
      <Toast />
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.password-indicator {
  width: 100%;
  height: 5px;
  position: relative;
  border-radius: 20px;
  transition: 0.3s all ease;

  &.password-indicator::before {
    content: "";
    position: absolute;
    left: 0;
    transition: 0.3s all ease;
    top: 0;
    width: v-bind('optionsState.indicatorLength + "%"');
    height: 100%;
    background-color: v-bind("stylePasswordIndicator()");
    border-radius: 20px;
  }
}
</style>
