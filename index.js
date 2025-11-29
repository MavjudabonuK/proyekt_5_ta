import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();

// .env faylida bot_token ni qo'ying
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Inline tugmalar bilan start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Salom! Men sizga qaror qabul qilishda yordam beraman.\nBugun dars qilasizmi?`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "👍 Ha", callback_data: "ha" },
            { text: "👎 Yo‘q", callback_data: "yoq" },
          ],
        ],
      },
    }
  );
});

// Callback query bilan tanlovni qabul qilish
bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const choice = callbackQuery.data;

  if (choice === "ha") {
    bot.sendMessage(chatId, "🎉 Zo‘r! Dars qilishingiz foydali bo‘ladi. Ishni boshlang!");
  } else if (choice === "yoq") {
    bot.sendMessage(chatId, "😅 Hali dam olish vaqti. Keyinroq urinib ko‘ring.");
  }

  // Tanlangan tugmani o'zgartirish
  bot.editMessageReplyMarkup(
    { inline_keyboard: [] },
    { chat_id: chatId, message_id: message.message_id }
  );
});