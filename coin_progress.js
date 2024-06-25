let coinsProgress = 0;
let currentProgress = 0;
const coinsPerFullProgress = 100;


// Функция для увеличения прогресса
function increaseProgress() {
    const stagePodElement1 = document.getElementById('stage_pod_id1');
    const stagePodElement2 = document.getElementById('stage_pod_id2');
    const progressElement = document.getElementById('progress');

    // Пересчитываем прогресс на основе количества монет
    currentProgress = Math.floor((coinsProgress / coinsPerFullProgress) * 100);
    progressElement.style.width = currentProgress + '%';

    // Если достигнут 100% прогресса, сбрасываем и увеличиваем счетчик
    if (currentProgress >= 100) {
        currentProgress = 0;
        progressElement.style.width = 0 + '%';
        stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent) + 1}/10`;
        stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent) + 1}/10`;
    }

    // Обновляем отображение прогресса
    stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent.split('/')[0])}/10`;
    stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent.split('/')[0])}/10`;
}