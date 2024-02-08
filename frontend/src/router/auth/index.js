import LoginForm from '../../views/Login.vue';
import LogoutForm from '../../views/Logout.vue';
import RegisterForm from '../../views/Register.vue';

const AuthRoutes = {
    path: '/auth',
    children: [
        { path: 'login', component: LoginForm, name: 'login' },
        { path: 'logout', component: LogoutForm, name: 'logout' },
        { path: 'register', component: RegisterForm, name: 'register' },
    ]
};

export { AuthRoutes };