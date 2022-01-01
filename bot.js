import { createRequire } from "module";
const require = createRequire(import.meta.url);
var Auth = require("./auth.json");

import Discord from "discord.io";
import logger from "winston";
import * as Commands from "./commands.js";

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = "debug";

// Initialize Discord Bot
var bot = new Discord.Client({
  token: Auth.discordToken,
  autorun: true,
});

bot.on("ready", function (evt) {
  logger.info("Connected");
  logger.info(bot.username + " - (" + bot.id + ")");
});

// It will listen for messages that will start with `!ar`
bot.on("message", async function (user, userID, channelID, message, evt) {
  if (message.substring(0, 3) == "!ar") {
    var args = message.substring(4).split(" ");
    var cmd = args[0];

    args = args.splice(1);

    console.log("message", message);
    console.log("args", args);
    console.log("cmd", cmd);

    let response = "Do hwut?!";
    switch (cmd) {
      case "ping":
        response = `Don't ping me ${user}!`;
        break;
      case "help":
        response = Commands.GetHelp();
        break;
      case "kdr":
        response = await Commands.GetKillDeathRatioAsync(args[0]);
        break;
      case "highestRank":
        response = await Commands.GetHighestRankAsync(args[0]);
        break;
      default:
        response = `Do hwut?!`;
    }
    bot.sendMessage({
      to: channelID,
      message: response,
    });
  }
});
