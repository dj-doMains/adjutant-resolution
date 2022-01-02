import { Client, Intents } from "discord.js";
import logger from "winston";
import * as Commands from "./commands.js";
import dotenv from "dotenv";
dotenv.config();

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";

// Initialize Discord Bot
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on("ready", () => {
  logger.info("Connected");
});

client.login(process.env.DISCORD_TOKEN);

// It will listen for messages that will start with `!ar`
client.on("messageCreate", async (message) => {
  const messageContent = message.content;
  if (messageContent.substring(0, 3) == "!ar") {
    var args = messageContent.substring(4).split(" ");
    var cmd = args[0];
    args = args.splice(1);
    console.log("message", messageContent);
    console.log("args", args);
    console.log("cmd", cmd);
    let response = "Do hwut?!";
    switch (cmd) {
      case "ping":
        response = `Don't ping me ${user}!`;
        message.reply(response);
        break;
      case "help":
        response = Commands.GetHelp();
        message.reply(response);
        break;
      case "kdr":
        response = await Commands.GetKillDeathRatioAsync(args[0]);
        message.reply(response);
        break;
      case "highestRank":
        response = await Commands.GetHighestRankAsync(args[0]);
        message.reply(response);
        break;
      case "playerDetails":
        const embedResult = await Commands.GetPlayerDetailsAsEmbedAsync(
          args[0]
        );
        if (typeof embedResult === "string" || embedResult instanceof String) {
          message.reply(embedResult);
          break;
        }
        message.reply({ embeds: [embedResult] });
        break;
      default:
        response = `Do hwut?!`;
        message.reply(response);
    }
  }
});
