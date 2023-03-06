<template>
  <v-container class="container">
    <v-row class="form-container">
      <v-col>
        <Form @send="send">
          <v-col cols="12">
            <v-text-field
              :rules="rules.email"
              dense
              label="Email"
              v-model.trim="form.email"
            ></v-text-field>
          </v-col>
          <v-col v-if="!isSingIn" cols="12">
            <v-text-field
              :rules="rules.name"
              dense
              label="Nome"
              v-model.trim="form.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :rules="rules.password"
              dense
              label="Senha"
              v-model.trim="form.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
            ></v-text-field>
          </v-col>
          <v-col v-if="!isSingIn" cols="12">
            <v-text-field
              :rules="rules.confirmPassword"
              dense
              label="Confirmar senha"
              v-model.trim="form.confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn block color="primary" elevation="3" type="submit">Entrar</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn @click="isSingIn = !isSingIn" variant="text" block type="button">
              {{ isSingIn ? 'Ainda não possui conta?' : 'Já possui conta?' }}
            </v-btn>
          </v-col>
        </Form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { email, minLength, maxLength, required } from '@/common/form-validate'
  import { useUserStore } from '@/store/user';
  import Form from '@/components/Form.vue'
  import router from '@/router';  

  const userStore = useUserStore()

  const isSingIn = ref(true)
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)

  const rules = reactive({
    email: [required, email, maxLength(50)],
    name: [required, minLength(5), maxLength(50)],
    password: [required, minLength(6), maxLength(50)],
    confirmPassword: [required, minLength(6), maxLength(50)],
  })

  const form = reactive({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  })

  function send() {
    userStore.setToken('token');
    router.push({ name: 'Home' });
  }
</script>

<style lang="scss" scoped>
  .container {
    align-items: center;
    background-image: url('../assets/login.png');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    height: 100vh;
    justify-content: center;
    max-width: initial;
    width: 100vw;
  }
  .form-container {
    background-color: rgba(255, 255, 255, .9);
    border-radius: 10px;
    max-width: 400px;
    
    @media screen and (max-width: 500px) {
      max-width: 90%;
    }
  }
</style>
