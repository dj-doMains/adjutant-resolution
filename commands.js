import * as HaloAPI from "./api/haloApi.js";
import { MessageEmbed } from "discord.js";

export const GetHelp = () => {
  return `
Commands:
    kdr {gamerTag}\t\tDisplays the kill/death ratio of a player.  
    highestRank {gamerTag}\t\tDisplays the highest achieved CSR for a player.  
`;
};

export const GetKillDeathRatioAsync = async (gamerTag) => {
  if (!gamerTag || gamerTag.trim() === "")
    return 'Invalid or Missing GamerTag. Use "!ar help" for more info.';

  try {
    const playerStats = await HaloAPI.GetPlayerStatsAsync(gamerTag);
    return `Kill Death Ration for ${gamerTag}: ${playerStats.data.kdr.toFixed(
      2
    )}`;
  } catch (error) {
    console.log(error);
    return `Uh oh! Something bad just happened...`;
  }
};

export const GetHighestRankAsync = async (gamerTag) => {
  if (!gamerTag || gamerTag.trim() === "")
    return 'Invalid or Missing GamerTag. Use "!ar help" for more info.';

  try {
    const playerStats = await HaloAPI.GetPlayerCSRAsync(gamerTag);
    return `Highest Rank for ${gamerTag}: ${playerStats.data.all_time.tier} ${playerStats.data.all_time.value}`;
  } catch (error) {
    console.log(error);
    return `Uh oh! Something bad just happened...`;
  }
};
