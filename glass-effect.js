document.addEventListener('DOMContentLoaded', () => {
    const pageHeader = document.getElementById('page-header');
    if (!pageHeader) {
        console.error('Header element #page-header not found.');
        return;
    }

    // --- Конфигурация для эффекта стекла ---
    const config = {
        scale: -180,       // Сила смещения
        displace: 1.2,     // Размытие итогового изображения (сила "преломления")
        blend: 'difference', // Режим смешивания для цветов карты смещения
        lightness: 50,     // Яркость внутренней части карты (0-100)
        alpha: 0.93,       // Прозрачность внутренней части карты (0-1)
        blur: 11,          // Размытие на самой карте
        border: 0.07,      // Толщина "рамки" на карте, где искажение максимально
        // Смещение для хроматической аберрации (расслоение цветов)
        r: 0,
        g: 10,
        b: 20,
    };

    function applyGlassEffect() {
        const { width, height } = pageHeader.getBoundingClientRect();
        const borderRadius = parseFloat(window.getComputedStyle(pageHeader).borderRadius);

        if (width === 0 || height === 0) return; // Не запускать для невидимых элементов

        // --- Динамическое создание SVG карты смещения ---
        const border = Math.min(width, height) * (config.border * 0.5);
        const displacementSvgString = `
            <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="glass-red-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#0000"/>
                  <stop offset="100%" stop-color="red"/>
                </linearGradient>
                <linearGradient id="glass-blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#0000"/>
                  <stop offset="100%" stop-color="blue"/>
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
              <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#glass-red-grad)" />
              <rect x="0" y="0" width="${width}" height="${height}" rx="${borderRadius}" fill="url(#glass-blue-grad)" style="mix-blend-mode: ${config.blend}" />
              <rect x="${border}" y="${border}" width="${width - border * 2}" height="${height - border * 2}" rx="${borderRadius - border > 0 ? borderRadius - border : 0}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
            </svg>`;

        // --- Кодирование и применение карты в основной SVG-фильтр в HTML ---
        const encoded = encodeURIComponent(displacementSvgString);
        const dataUri = `data:image/svg+xml,${encoded}`;

        const feImage = document.querySelector('#filter feImage');
        if (feImage) {
            feImage.setAttribute('href', dataUri);
        }

        // --- Обновление атрибутов фильтра ---
        const redChannel = document.getElementById('redchannel');
        const greenChannel = document.getElementById('greenchannel');
        const blueChannel = document.getElementById('bluechannel');
        const gaussianBlur = document.querySelector('#filter feGaussianBlur');

        if (redChannel) redChannel.setAttribute('scale', config.scale + config.r);
        if (greenChannel) greenChannel.setAttribute('scale', config.scale + config.g);
        if (blueChannel) blueChannel.setAttribute('scale', config.scale + config.b);
        if (gaussianBlur) gaussianBlur.setAttribute('stdDeviation', config.displace);
    }

    // Применить эффект при загрузке
    applyGlassEffect();

    // Пересчитывать эффект при изменении размера окна
    window.addEventListener('resize', applyGlassEffect);
});