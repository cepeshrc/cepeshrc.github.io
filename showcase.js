// Скрипт для работы модального окна предпросмотра на страницах персонажей

document.addEventListener('DOMContentLoaded', () => {
    const imagePreviewModal = document.getElementById('imagePreviewModal');
    
    if (imagePreviewModal) {
        imagePreviewModal.addEventListener('show.bs.modal', event => {
            // Элемент, который вызвал модальное окно (ссылка <a> с картинкой)
            const triggerLink = event.relatedTarget;
            
            // Получаем путь к картинке из атрибута data-img-src
            const imgSrc = triggerLink.getAttribute('data-img-src');
            
            // Находим тег <img> внутри модального окна
            const modalImage = imagePreviewModal.querySelector('.preview-image');
            
            // Устанавливаем нужный путь для картинки в модальном окне
            modalImage.src = imgSrc;
        });
    }
});
