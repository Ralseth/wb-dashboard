<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import FiltersPanel from '@/components/FiltersPanel.vue';
import BaseChart from '@/components/BaseChart.vue';

/* начальные даты – возьмите диапазон, где точно есть данные */
const { items, total, loading, params } = useFetch('/api/orders', {
  dateFrom: '2025-01-01',
  dateTo:   '2025-01-31',
});

function onFilterChange(p: { dateFrom: string; dateTo: string }) {
  params.value = { ...params.value, ...p, page: 1 };
}

function changePage(p: number) {
  params.value.page = p;
}
</script>

<template>
  <h1>Orders</h1>

  <!-- панель фильтров -->
  <FiltersPanel @change="onFilterChange" class="mb-4" />

  <!-- График суммы к оплате по дате -->
  <BaseChart
      :items="items"
      x-field="date"
      y-field="forPay"
      title="Сумма к оплате по дням"
      class="mb-4"
  />

  <!-- таблица -->
  <el-table
      v-loading="loading"
      :data="items"
      style="width: 100%; margin-bottom: 12px"
      height="500"
      stripe
      size="small"
  >
    <!-- динамически выводим все поля объекта -->
    <el-table-column
        v-for="(val, key) in items[0] || {}"
        :key="key"
        :prop="key"
        :label="key"
        :min-width="120"
        show-overflow-tooltip
    />
  </el-table>

  <!-- пагинация -->
  <el-pagination
      background
      layout="prev, pager, next, total"
      :total="total"
      :page-size="params.limit"
      :current-page="params.page"
      @current-change="changePage"
  />
</template>
