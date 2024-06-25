function showCoinNotification(message, x, y) {
    const notification = document.createElement('div');
    notification.className = 'coin-notification';
    notification.innerText = message;
    notification.style.left = `${x}px`;
    notification.style.top = `${y}px`;
    document.body.appendChild(notification);

    // Анимация появления
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    });

    // Удаление уведомления через 1 секунду
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 500);
}
