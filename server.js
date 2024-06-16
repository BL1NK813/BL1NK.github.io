const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const token = require('./keypass.py');
const bot = new TelegramBot(token, { polling: true });

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let username = '';

// Обработка команды /start и получение имени пользователя
bot.onText(/\/start/, (msg) => {
    username = msg.from.username || `${msg.from.first_name} ${msg.from.last_name}`;
    io.emit('username', username); // Отправка имени пользователя на клиентскую сторону
});


// Запуск сервера
server.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
