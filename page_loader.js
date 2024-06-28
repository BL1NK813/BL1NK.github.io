let tg = window.Telegram.WebApp;
tg.expand(2000);
setTimeout(function() {
    tg.expand();
}, 2000);

/*Предзагрузка страницы*/
document.addEventListener('DOMContentLoaded', function() {
    const dotsElement = document.getElementById('dots');
    let dotCount = 0;

    const changeDots = () => {
        dotCount = (dotCount + 1) % 4;
        dotsElement.textContent = '.'.repeat(dotCount);
    };

    const intervalId = setInterval(changeDots, 500);

    setTimeout(function () {
        clearInterval(intervalId);
        document.getElementById('progress_few').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 50);
});

