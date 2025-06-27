import { createRouter, createWebHistory } from 'vue-router';

/* ленивые импорты страниц — пока заглушки */
const IncomesView = () => import('@/pages/IncomesView.vue');
const OrdersView  = () => import('@/pages/OrdersView.vue');
const SalesView   = () => import('@/pages/SalesView.vue');
const StocksView  = () => import('@/pages/StocksView.vue');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/',         redirect: '/incomes' },
        { path: '/incomes',  component: IncomesView },
        { path: '/orders',   component: OrdersView },
        { path: '/sales',    component: SalesView },
        { path: '/stocks',   component: StocksView },
        { path: '/:pathMatch(.*)*', redirect: '/' }, // 404 редирект
    ],
});

export default router;
