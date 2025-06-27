# WB-Dashboard

SPA-дашборд для продавца Wildberries  
Vue 3 + TypeScript + Element Plus + ECharts

| Страница | Данные | Что есть |
|----------|--------|----------|
| **Incomes** | /api/incomes | график `quantity`, таблица, фильтры, пагинация |
| **Orders**  | /api/orders  | график `forPay` |
| **Sales**   | /api/sales   | график `forPay` |
| **Stocks**  | /api/stocks  | график `quantity` (остатки на сегодня) |

### Демо

<https://wb-dashboard-one.vercel.app>

### Быстрый старт локально

```bash
git clone https://github.com/Ralseth/wb-dashboard.git
cd wb-dashboard

cp .env.example .env      # вставьте реальный API-ключ
npm i                     # установка зависимостей
npm run dev               # запуск на http://localhost:5173
