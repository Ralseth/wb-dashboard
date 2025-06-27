import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueECharts from 'vue-echarts';
import 'echarts';

createApp(App)
    .use(router)
    .use(ElementPlus)
    .component('v-chart', VueECharts)
    .mount('#app');
