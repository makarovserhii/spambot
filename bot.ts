const TelegramBot = require('node-telegram-bot-api');

const token = '7786031534:AAH9ydiidltw9JNwkHepNGbEhmgZDmlLuEA';
const bot = new TelegramBot(token, { polling: true });

const forbiddenWords = require('./forbiddenWords');
const messageBeforeBan = "В РОТ ТЕБЯ ЕБАЛ СПАМ ОБОССАНЫЙ! \nПослан в БАН нахуй 🖕 \nСЛУЖУ ВЛАДИСЛАВУ! Служу народу барахолки \nСлава Украине! 🇺🇦";

function containsBanKeyword(text: string) {
  return forbiddenWords.some((keyword: string) => {
    return text.toLowerCase().includes(keyword.toLowerCase());
  });
}

bot.on('message', (msg: any) => {
  const chatId = msg.chat.id;
  const messageText = msg.text || '';
  const messageId = msg.message_id;
  const userId = msg.from?.id;
  const userName = msg.from?.username;

  if (!containsBanKeyword(messageText)) return;

  bot.sendMessage(chatId, `@${userName} ${messageBeforeBan}`)
    .then((sentMessage: any) => {
      console.log('Пидор обнаружен!!!');
      console.log('-----------------------------------');
      console.log(`${userName}: ${messageText}`);
      console.log('-----------------------------------');
      setTimeout(() => {
        bot.deleteMessage(chatId, sentMessage.message_id)
          .catch((error: any) => console.error('Ошибка при удалении сообщения:', error.description));

        bot.deleteMessage(chatId, messageId)
        .catch((error: any) => console.error('Ошибка при удалении сообщения:', error.description));
      }, 60000);

      // Бан пользователя
      bot.banChatMember(chatId, userId)
        .then(() => console.log(`Пользователь ${userName} забанен в чате ${chatId}`))
        .catch(() => console.error('Ошибка при бане пользователя'));
  })
  .catch(() => console.error('Ошибка при отправке сообщения'));
});
