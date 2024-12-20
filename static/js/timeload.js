(function() {
    const loadInfoElement = document.getElementById('load-time');

    window.addEventListener('load', function() {
        const performanceData = window.performance.timing;
        const loadTime = performanceData.loadEventStart - performanceData.navigationStart;

        loadInfoElement.textContent = `Время загрузки страницы: ${loadTime} мс`;
    });
})();