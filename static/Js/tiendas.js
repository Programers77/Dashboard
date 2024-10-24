document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para las tiendas
    const tiendas = [
        {
            nombre: "Tienda Central",
            ventasActual: 45000,
            ventasAnterior: 42000,
            historial: [38000, 40000, 42000, 45000]
        },
        // ... Agregar más tiendas aquí
    ];

    const template = document.getElementById('tiendaTemplate');
    const container = document.getElementById('tiendasGrid');

    // Función para calcular el margen de ganancia
    function calcularMargen(actual, anterior) {
        const diferencia = actual - anterior;
        const porcentaje = (diferencia / anterior) * 100;
        return {
            valor: diferencia,
            porcentaje: porcentaje
        };
    }

    // Función para formatear moneda
    function formatCurrency(value) {
        return new Intl.NumberFormat('es-VE', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    // Función para crear el gráfico de una tienda
    function createStoreChart(canvas, data) {
        return new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr'],
                datasets: [{
                    label: 'Ventas',
                    data: data,
                    borderColor: '#0d6efd',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Generar tarjetas de tiendas
    function generarTarjetasTiendas() {
        tiendas.forEach((tienda, index) => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.store-card');
            
            // Calcular margen
            const margen = calcularMargen(tienda.ventasActual, tienda.ventasAnterior);
            
            // Establecer contenido
            card.querySelector('.store-name').textContent = tienda.nombre;
            card.querySelector('.current-sales').textContent = formatCurrency(tienda.ventasActual);
            card.querySelector('.previous-sales').textContent = formatCurrency(tienda.ventasAnterior);
            card.querySelector('.margin').textContent = formatCurrency(margen.valor);
            
            // Configurar badge de rendimiento
            const badge = card.querySelector('.performance-badge');
            badge.textContent = `${margen.porcentaje > 0 ? '↑' : '↓'} ${Math.abs(margen.porcentaje).toFixed(1)}%`;
            badge.classList.add(margen.porcentaje >= 0 ? 'positive' : 'negative');
            
            // Agregar gráfico
            const canvas = card.querySelector('.store-chart');
            createStoreChart(canvas, tienda.historial);
            
            // Añadir delay para animación escalonada
            card.style.animationDelay = `${index * 0.1}s`;
            
            container.appendChild(clone);
        });
    }

    // Implementar búsqueda
    const searchInput = document.getElementById('searchTienda');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = container.querySelectorAll('.store-card');
        
        cards.forEach(card => {
            const storeName = card.querySelector('.store-name').textContent.toLowerCase();
            const parent = card.parentElement;
            parent.style.display = storeName.includes(searchTerm) ? '' : 'none';
        });
    });

    // Inicializar la vista
    generarTarjetasTiendas();
});