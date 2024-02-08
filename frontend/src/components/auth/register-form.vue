<template>
  <div class="card bg-dark" style="width: 24rem;">
    <!-- Colocar una imagen -->
    <div class="card-body">
      <h5 class="card-title">Registro</h5>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="form-group">
          <label for="InputName">Correo electr&oacute;nico</label>
          <Field type="text" class="form-control" id="InputName" 
            aria-describedby="nameHelp" placeholder="Name" name="name"
          />
          <!-- <small id="emailHelp" class="form-text text-muted" v-show="!!errors?.email"></small> -->
        </div>
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
            placeholder="Password" name="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Registrarme</button>
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
  name: Yup.string().required('Por favor introduzca su nombre completo'),
  email: Yup.string().email('La estructura del email no es correcta'),
  password: Yup.string().required('Por favor introduzca un password')
    .min(8, 'El password debe tener mínimo 8 caracteres')
    .matches(new RegExp(/[0-9]+/), 'El password debe contener por lo menos 1 número')
    .matches(new RegExp(/[a-z]+/), 'El password debe contener por lo menos 1 letra minúscula')
    .matches(new RegExp(/[A-Z]+/), 'El password debe contener por lo menos 1 letra mayúscula')
    .matches(charReg, 'El password debe contener por lo menos 1 de los siguientes caracteres .,:;-_{}[]¿?+*¡!=)(&%$'),
});
const onSubmit = async (values) => {
  const authStore = useAuthStore();
  let page = 'register';
  try {
    await authStore.register(values);
    const lastStatus = await authStore.getLastStatus;
    if (lastStatus.status == 201) page = 'login';
    else throw new Error(lastStatus);
  } catch (err) {
    console.error(err);
  } finally {
    // TODO Agregar notificación
    router.push({ name: page });
  }
};
</script>