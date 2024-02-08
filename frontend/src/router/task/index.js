import UserLayout from '../../views/layouts/UserLayout.vue';
import TasksList from '../../views/TasksList.vue';

const TaskRoutes = {
    path: '/tasks',
    component: UserLayout,
    children: [
        { path: 'all', component: TasksList, name: 'all-tasks' },
    ]
};

export { TaskRoutes };