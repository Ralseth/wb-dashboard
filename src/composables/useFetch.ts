import { ref, watchEffect } from 'vue';
import api from '@/services/api';

export function useFetch(endpoint: string, initParams: Record<string, any>) {
    const items   = ref<any[]>([]);
    const loading = ref(false);
    const total   = ref(0);

    // реактивный объект параметров: page, limit, фильтры и пр.
    const params = ref({ page: 1, limit: 20, ...initParams });

    async function load() {
        loading.value = true;

        const { data } = await api.get(endpoint, { params: params.value });
        console.log('RAW', data);
        items.value = data.data ?? data;                      // на всякий случай
        total.value = data.meta?.total ?? data.total ?? 0;

        loading.value = false;
    }

    // любой сдвиг params триггерит новый запрос
    watchEffect(load);

    return { items, total, loading, params, load };
}
