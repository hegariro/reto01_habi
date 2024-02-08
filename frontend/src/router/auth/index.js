import LoginForm from '../../views/Login.vue';
import RegisterForm from '../../views/Register.vue';

const AuthRoutes = {
    path: '/auth',
    children: [
        { path: 'login', component: LoginForm, name: 'login' },
        { path: 'register', component: RegisterForm, name: 'register' },
    ]
};

export { AuthRoutes };