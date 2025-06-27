<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import FiltersPanel  from '@/components/FiltersPanel.vue';
import BaseChart     from '@/components/BaseChart.vue';


const { items, total, loading, params } = useFetch('/api/sales', {
  dateFrom: '2025-01-01',
  dateTo:   '2025-01-31',
});


function onFilterChange(payload: Record<string,any>) {
  params.value = { ...params.value, ...payload, page: 1 };
}

function changePage(p:number) { params.value.page = p; }
</script>

<template>
  <h1>Sales</h1>

  <FiltersPanel @change="onFilterChange" class="mb-4"/>

  <!-- ⬇ поле forPay есть в sales  -->
  <BaseChart
      :items="items"
      x-field="date"
      y-field="forPay"
      title="Сумма продаж по дням"
      class="mb-4"
  />

  <el-table v-loading="loading" :data="items" height="500" stripe size="small">
    <el-table-column
        v-for="(val,key) in items[0] || {}"
        :key="key" :prop="key" :label="key" :min-width="120" show-overflow-tooltip/>
  </el-table>

  <el-pagination
      background layout="prev, pager, next, total"
      :total="total" :page-size="params.limit" :current-page="params.page"
      @current-change="changePage"
  />
</template>
