<template>
  <div class="card bg-dark" style="width: 24rem;">
    <!-- Colocar una imagen -->
    <div class="card-body">
      <h5 class="card-title">Login</h5>
      <Form @submit="onSubmit" :validation-schema="schema">
      <div class="form-group">
        <label for="InputEmail1">Correo electr&oacute;nico</label>
        <Field type="email" class="form-control" id="InputEmail1" 
          aria-describedby="emailHelp" placeholder="Email" name="email"
        />
        <!-- <small id="emailHelp" class="form-text text-muted" v-show="!!errors?.email"></small> -->
      </div>
      <div class="form-group">
        <label for="InputPassword1">Contrase&ntilde;a</label>
        <Field type="password" class="form-control" id="InputPassword1" 
          placeholder="Password"  name="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { router } from '../../router';
import { useAuthStore } from '../../stores/auth/auth.store';

const charReg = new RegExp(/[\.,:;\-_\{\}\[\]¿\?\+\*¡!=\)\(&%\$]+/);
const schema = Yup.object().shape({
  email: Yup.string().email('La estructura del email no es correcta'),
  password: Yup.string().required('Por favor introduzca un password')
    .min(8, 'El password debe tener mínimo 8 caracteres'),
});
const onSubmit = async (values) => {
  const authStore = useAuthStore();
  let page = 'register';
  try {
    await authStore.login(values);
    if (authStore.isUserLoggedIn) page = 'all-tasks';
    else throw new Error(authStore.getLastStatus);
  } catch (err) {
    console.error(err);
  } finally {
    // TODO Agregar notificación
    router.push({ name: page });
  }
};
</script>

<style scoped>
button {
  margin-top: 1.2rem;
}
div.card {
  padding-left: 2rem;
}
</style>