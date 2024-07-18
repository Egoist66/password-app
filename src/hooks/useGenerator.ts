import { delay } from "@/utils/delay";
import { randomInt } from "@/utils/randomInt";
import { shuffleString } from "@/utils/shuffleString";
import { onMounted, ref, toRef, watch, watchEffect, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useLS } from "./common/useLS";

type OptionsType = {
  strength: number;
  passwordLength: number;
  indicatorLength: number;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumber: boolean;
  isSpecial: boolean;
  _value: number;
};

export const useGenerator = () => {
  const toast = useToast();
  const {set, exist, get} = useLS()

  const lsData = ref(exist('optionsState') ? get<Ref<OptionsType>>('optionsState') : ref<OptionsType>({
    strength: 20,
    passwordLength: 16,
    indicatorLength: 20,
    isUppercase: false,
    isLowercase: true,
    isNumber: false,
    isSpecial: false,
    _value: 20,
  }));

  const ps = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: "!$%&|[](){}:;.,*+-#@<>~",
  } as const;

  const optionsState = ref<OptionsType>(lsData.value);

  const isGeneratingPassword = ref(false);
  const isStrongPassword = ref(false);
  const isMediumPassword = ref(false);
  const isWeakPassword = ref(false);

  const generatedPassword = ref<string>("");

  const updatePasswordIndicator = () => {
    if (optionsState.value.passwordLength >= 16) {
      isStrongPassword.value = true;
      optionsState.value.indicatorLength = 100;

      isMediumPassword.value = false;
      isWeakPassword.value = false;
    } else if (optionsState.value.passwordLength >= 8) {
      isWeakPassword.value = false;

      isMediumPassword.value = true;
      optionsState.value.indicatorLength = 50;
      isStrongPassword.value = false;
    } else {
      optionsState.value.indicatorLength = 20;
      isWeakPassword.value = true;
      isStrongPassword.value = false;
      isMediumPassword.value = false;
    }
  };

  const stylePasswordIndicator = () => {
    if (isStrongPassword.value) {
      return "#1BB381";
    } else if (isMediumPassword.value) {
      return "orange";
    } else {
      return "red";
    }
  };

  const generatePassword = async () => {
    console.log("Generating password...");
    isGeneratingPassword.value = true;

    let passString = "";
    let randomPassword = "";

    try {
     
        passString = shuffleString(ps.lowercase);
       
      if(optionsState.value.isUppercase){
        passString = shuffleString(passString + ps.uppercase);
       
      }
      if(optionsState.value.isNumber){
        passString = shuffleString(passString + ps.numbers);
       
      }
      if(optionsState.value.isSpecial){
        passString = shuffleString(passString + ps.special);
       
      }

      for (let i = 0; i < optionsState.value.passwordLength; i++) {
        passString = shuffleString(passString);
        let random = randomInt(0, passString.length - 1);
        randomPassword += passString[random];
      }

      await delay(500);
      generatedPassword.value = randomPassword;
      isGeneratingPassword.value = false;
      toast.add({
        severity: "success",
        summary: "Password Generated",
        detail: "Just copy and use it",
        life: 3000,
      });
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 3000,
      });

      isGeneratingPassword.value = false;

    }
  };

  const managePasswordLength = (callback: () => void) => {
    callback();
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword.value);
    toast.add({
      severity: "info",
      summary: "Password Copied",
      detail: "Just paste it",
      life:2000,
    });
  }

  watchEffect(() => {
    managePasswordLength(updatePasswordIndicator);
    set("optionsState", optionsState.value)
  });

  onMounted(() => {
    try {
      generatePassword();
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 3000,
      });
    }
  });

  return {
    optionsState,
    generatePassword,
    updatePasswordIndicator,
    stylePasswordIndicator,
    copyPassword,
    generatedPassword: toRef(generatedPassword, "value"),
    isGeneratingPassword: toRef(isGeneratingPassword, "value"),
    isStrongPassword: toRef(isStrongPassword, "value"),
    isMediumPassword: toRef(isMediumPassword, "value"),
    isWeakPassword: toRef(isWeakPassword, "value"),
  };
};
