// Formateo de números
const formatNumber = (num) => {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximationFractionDigits: 2,
  }).format(num);
};

// Inicialización de gráficos
let monthlyChart, storesChart, categoryChart, storesMonthlyChart;

// Datos estáticos para el gráfico mensual general
const staticMonthlyData = [
  25000, 28000, 32000, 30000, 35000, 38000, 36000, 40000, 37000, 39000, 42000,
  45000,
];

// Datos estáticos para el gráfico mensual por tienda
const staticStoresMonthlyData = {
  "Caracas Centro": [
    25000, 28000, 32000, 30000, 35000, 38000, 36000, 40000, 37000, 39000, 42000,
    45000,
  ],
  Maracaibo: [
    20000, 22000, 25000, 24000, 28000, 30000, 29000, 32000, 30000, 31000, 34000,
    36000,
  ],
  Valencia: [
    18000, 20000, 23000, 22000, 25000, 27000, 26000, 29000, 27000, 28000, 30000,
    32000,
  ],
  Barquisimeto: [
    15000, 17000, 19000, 18000, 21000, 23000, 22000, 24000, 23000, 24000, 26000,
    28000,
  ],
  Maracay: [
    12000, 14000, 16000, 15000, 18000, 20000, 19000, 21000, 20000, 21000, 23000,
    25000,
  ],
};

// Función para actualizar los datos del dashboard
const updateDashboard = (data) => {
  // Actualizar métricas principales
  document.getElementById("dollarBCV").textContent = formatNumber(
    data.dollarBCV
  );
  document.getElementById("dollarParalelo").textContent = formatNumber(
    data.dollarParalelo
  );
  document.getElementById("totalSalesUSD").textContent =
    "$" + formatNumber(data.totalSalesUSD);
  document.getElementById("totalSalesBS").textContent =
    "Bs. " + formatNumber(data.totalSalesBS);
  document.getElementById("totalSalesCashea").textContent =
    "$" + formatNumber(data.totalSalesCashea);

  // Actualizar gráfico de tiendas
  storesChart.data.labels = data.storesSales.map((item) => item.name);
  storesChart.data.datasets[0].data = data.storesSales.map(
    (item) => item.sales
  );
  storesChart.data.datasets[0].backgroundColor = data.storesSales.map(
    (item) => item.color
  );
  storesChart.update();

  // Actualizar gráfico de categorías
  categoryChart.data.labels = data.salesByCategory.map((item) => item.category);
  categoryChart.data.datasets[0].data = data.salesByCategory.map(
    (item) => item.sales
  );
  categoryChart.data.datasets[0].backgroundColor = data.salesByCategory.map(
    (item) => item.color
  );
  categoryChart.update();
};

// Inicialización de gráficos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Configuración del gráfico mensual (estático)
  const monthlyCtx = document.getElementById("monthlyChart").getContext("2d");
  monthlyChart = new Chart(monthlyCtx, {
    type: "line",
    data: {
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      datasets: [
        {
          label: "Ventas Totales ($)",
          borderColor: "#6366F1",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          data: staticMonthlyData,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Configuración del gráfico de tiendas
  const storesCtx = document.getElementById("storesChart").getContext("2d");
  storesChart = new Chart(storesCtx, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Ventas ($)",
          data: [],
          backgroundColor: [],
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Configuración del gráfico de categorías
  const categoryCtx = document.getElementById("categoryChart").getContext("2d");
  categoryChart = new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Actualizar con datos iniciales
  updateDashboard(initialData);

  // Actualización periódica cada 5 segundos
  setInterval(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => updateDashboard(data));
  }, 5000);
});
