<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps<{
  /** массив объектов, приходящий из useFetch */
  items: any[];
  /** поле-ось X (обычно дата)           */ xField: string;
  /** поле-ось Y (число для графика)      */ yField: string;
  /** подпись графика                     */ title:  string;
}>();

const option = computed(() => ({
  title: { text: props.title, left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: props.items.map(i => dayjs(i[props.xField]).format('YYYY-MM-DD')),
    axisLabel: {
      rotate: 40,               // поворот подписи, чтобы не налезали
      formatter: (val: string) => val, // можно изменить на DD.MM, если нужно
    },
  },
  yAxis: { type: 'value' },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 4,
      data: props.items.map(i => i[props.yField]),
    },
  ],
}));
</script>

<template>
  <!-- v-chart зарегистрирован в main.ts -->
  <v-chart :option="option" autoresize style="height: 260px; width: 100%" />
</template>
