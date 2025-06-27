<script setup lang="ts">
import { useFetch }  from '@/composables/useFetch';
import FiltersPanel  from '@/components/FiltersPanel.vue';
import BaseChart     from '@/components/BaseChart.vue';

/* ⬇ dateFrom = сегодня (UTC-дата «YYYY-MM-DD») */
const today = new Date().toISOString().slice(0, 10);

const { items, total, loading, params } = useFetch('/api/stocks', {
  dateFrom: today,
  page: 1,
  limit: 20,
});

function changePage(p: number) {
  params.value.page = p;
}

/* фильтр: берём ТОЛЬКО левую дату */
function onFilterChange(payload: { dateFrom?: string; search?: string }) {
  const next: any = { ...params.value };       // текущее
  if (payload.dateFrom) next.dateFrom = payload.dateFrom;
  if (payload.search)   next.search   = payload.search;
  params.value = next;                         // триггерит useFetch
}
</script>


<!-- ... -->
<template>
  <h1>Stocks</h1>

  <FiltersPanel @change="onFilterChange" class="mb-4" />

  <!-- график остатков -->
  <BaseChart
      :items="items"
      x-field="date"
      y-field="quantity"
      title="Остатки на складе по дням"
      class="mb-4"
  />

  <el-table v-loading="loading" :data="items" height="500" stripe size="small">
    <el-table-column
        v-for="(val, key) in items[0] || {}"
        :key="key"
        :prop="key"
        :label="key"
        :min-width="120"
        show-overflow-tooltip
    />
  </el-table>

  <el-pagination
      background
      layout="prev, pager, next, total"
      :current-page="params.page"
      :page-size="params.limit"
      :total="total"
      @current-change="changePage"
  />
</template>

