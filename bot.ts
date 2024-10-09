const TelegramBot = require('node-telegram-bot-api');

const token = '7786031534:AAH9ydiidltw9JNwkHepNGbEhmgZDmlLuEA';
const bot = new TelegramBot(token, { polling: true });

const banKeywords = ['заработок', 'работа', 'криптовалюта', 'Вакансия', 'Вакансию', 'Внимание', 'Вниманию', 'Казино', 'Слоты', 'Людей', 'Предлагаю', 'Надоело', 'Надоел', 'Человек', 'Крипта', 'Криптовалюта', 'Криптавалюта', 'Обучение'];
const messageBeforeBan = "В РОТ ТЕБЯ ЕБАЛ СПАМ ОБОССАНЫЙ! Послан в БАН нахуй! СЛУЖУ ВЛАДИСЛАВУ! Служу народу барахолки \n Слава Украине !";

function containsBanKeyword(text: string) {
  return banKeywords.some(keyword => {
    console.log('keyword', keyword);
    console.log('text', text);
    return text.toLowerCase().includes(keyword.toLowerCase());
  });
}

bot.on('message', (msg: any) => {
  console.log('msgData', msg);
  const chatId = msg.chat.id;
  const messageText = msg.text || '';
  const userId = msg.from?.id;
  const userName = msg.from?.username;

  if (!containsBanKeyword(messageText)) return;

  bot.sendMessage(chatId, `@${userName} ${messageBeforeBan}`)
    .then((sentMessage: any) => {
      // Удаление сообщения через 1 минуту 
      setTimeout(() => {
        bot.deleteMessage(chatId, sentMessage.message_id)
          .catch((error: any) => console.error('Ошибка при удалении сообщения:', error));
      }, 60000);

      // Бан пользователя
      bot.banChatMember(chatId, userId)
        .then(() => console.log(`Пользователь ${userName} забанен в чате ${chatId}`))
    .catch((error: any) => console.error('Ошибка при бане пользователя:', error));
  })
  .catch((error: any) => console.error('Ошибка при отправке сообщения:', error));
});
