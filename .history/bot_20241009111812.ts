const TelegramBot = require('node-telegram-bot-api');

const token = '7786031534:AAH9ydiidltw9JNwkHepNGbEhmgZDmlLuEA';
const bot = new TelegramBot(token, { polling: true });

// Массив ключевых слов для бана
const banKeywords = ['заработок', 'работа', 'криптовалюта', 'Вакансия', 'Вакансию', 'Внимание', 'Вниманию', 'Казино', 'Слоты', 'Людей', 'Предлагаю', 'Надоело', 'Надоел', 'Человек', 'Крипта', 'Криптовалюта', 'Криптавалюта', 'Обучение'];
const messageBeforeBan = "В РОТ ТЕБЯ ЕБАЛ СПАМ ОБОССАНЫЙ! Послан в БАН нахуй! СЛУЖУ ВЛАДИСЛАВУ! Служу народу барахолки Слава Украине !";
// Функция для проверки наличия ключевых слов в сообщении
function containsBanKeyword(text: string) {
  return banKeywords.some(keyword => {
    console.log('keyword', keyword);
    console.log('text', text);
    return text.toLowerCase().includes(keyword.toLowerCase());
  });
}

// Слушаем сообщения
bot.on('message', (msg: any) => {
  console.log('msgData', msg);
  const chatId = msg.chat.id;
  // const userId = msg.from?.id;
  const messageText = msg.text || '';

  // bot.sendMessage(chatId, `Пользователь ${msg.from?.first_name} был забанен за использование запрещенных слов.`);

  // Если сообщение содержит ключевое слово, баним пользователя
  if (containsBanKeyword(messageText)) {
  //   bot.kickChatMember(chatId, userId)
  //     .then(() => {
  //       bot.sendMessage(chatId, `Пользователь ${msg.from?.first_name} был забанен за использование запрещенных слов.`);
  //     })
  //     .catch((error) => {
  //       console.error('Ошибка при попытке бана:', error);
  //       bot.sendMessage(chatId, 'Не удалось забанить пользователя.');
  //     });
    bot.sendMessage(chatId, messageBeforeBan);
  }
});
