document.addEventListener('DOMContentLoaded', function() {
    const barButtons = document.querySelectorAll('.bar-button');
    const barContents = document.querySelectorAll('.bar-content');

    barButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            barButtons.forEach(btn => btn.classList.remove('active'));
            barContents.forEach(content => content.classList.remove('active'));

            // Добавляем класс active к текущей кнопке и контенту
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Устанавливаем активную первую вкладку по умолчанию
    barButtons[0].classList.add('active');
    barContents[0].classList.add('active');
});