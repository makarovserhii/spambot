const TelegramBot = require('node-telegram-bot-api');

const token = '7786031534:AAH9ydiidltw9JNwkHepNGbEhmgZDmlLuEA';
const bot = new TelegramBot(token, { polling: true });

const banKeywords = ['заработок', 'работа', 'криптовалюта', 'Вакансия', 'Вакансию', 'Внимание', 'Вниманию', 'Казино', 'Слоты', 'Людей', 'Предлагаю', 'Надоело', 'Надоел', 'Человек', 'Крипта', 'Криптовалюта', 'Криптавалюта', 'Обучение'];
const messageBeforeBan = "В РОТ ТЕБЯ ЕБАЛ СПАМ ОБОССАНЫЙ! Послан в БАН нахуй! СЛУЖУ ВЛАДИСЛАВУ! Служу народу барахолки Слава Украине !";

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

  if (containsBanKeyword(messageText)) {
    bot.sendMessage(chatId, messageBeforeBan);
  }
});
