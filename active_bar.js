document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const navContents = document.querySelectorAll('.nav-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Удаляем класс active со всех кнопок и контента
            navButtons.forEach(btn => btn.classList.remove('active'));
            navContents.forEach(content => content.classList.remove('active'));

            // Добавляем класс active к текущей кнопке и контенту
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Устанавливаем активную первую вкладку по умолчанию
    navButtons[0].classList.add('active');
    navContents[0].classList.add('active');
});

