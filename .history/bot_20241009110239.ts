const TelegramBot = require('node-telegram-bot-api');

// Вставь свой токен API, полученный от BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Массив ключевых слов для бана
const banKeywords = ['заработок', 'работа', 'криптовалюта'];

// Функция для проверки наличия ключевых слов в сообщении
function containsBanKeyword(text) {
  return banKeywords.some(keyword => text.toLowerCase().includes(keyword));
}

// Слушаем сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageText = msg.text || '';

  // Если сообщение содержит ключевое слово, баним пользователя
  if (containsBanKeyword(messageText)) {
    bot.kickChatMember(chatId, userId)
      .then(() => {
        bot.sendMessage(chatId, `Пользователь ${msg.from.first_name} был забанен за использование запрещенных слов.`);
      })
      .catch((error) => {
        console.error('Ошибка при попытке бана:', error);
        bot.sendMessage(chatId, 'Не удалось забанить пользователя.');
      });
  }
});
