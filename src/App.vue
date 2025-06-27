<template>
  <nav class="links">
    <RouterLink to="/incomes">Incomes</RouterLink> |
    <RouterLink to="/orders">Orders</RouterLink> |
    <RouterLink to="/sales">Sales</RouterLink> |
    <RouterLink to="/stocks">Stocks</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup lang="ts"></script>

<style scoped>
.links {
  margin: 16px;
}
</style>
