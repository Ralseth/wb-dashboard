<script setup lang="ts">
import { ref } from 'vue';

const model = ref<[Date, Date] | null>(null);
const text  = ref('');

const emit = defineEmits<{
  (e:'change', p:{ dateFrom?:string; search?:string }): void;
}>();

function emitFilters() {
  const payload: Record<string,string> = {};
  if (text.value.trim()) payload.search = text.value.trim();

  // берём только левую дату
  if (model.value) {
    payload.dateFrom = model.value[0].toISOString().slice(0,10);
  }

  emit('change', payload);
}

function resetFilters() {
  model.value = null;
  text.value  = '';
  emit('change', {});          // вернёмся к вчерашнему dateFrom
}
</script>


<template>
  <el-date-picker
      v-model="model"
      type="daterange"
      range-separator="—"
      start-placeholder="От"
      end-placeholder="До"
      format="YYYY-MM-DD"
      size="small"
  />

  <el-input
      v-model="text"
      placeholder="Артикул"
      size="small"
      style="width: 180px; margin-left:8px"
      clearable
  />

  <el-button
      size="small"
      type="primary"
      class="ml-2"
      @click="emitFilters"
  >
    Применить
  </el-button>

  <el-button
      size="small"
      class="ml-1"
      @click="resetFilters"
  >
    Сброс
  </el-button>
</template>
