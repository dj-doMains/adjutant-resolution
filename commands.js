import * as HaloAPI from "./api/haloApi.js";
import { MessageEmbed } from "discord.js";

export const GetHelp = () => {
  return `
Commands:
    kdr {gamerTag}\t\tDisplays the kill/death ratio of a player.  
    highestRank {gamerTag}\t\tDisplays the highest achieved CSR for a player.
    playerDetails {gamerTag}\t\tDisplays the full service record for a player.
`;
};

export const GetKillDeathRatioAsync = async (gamerTag) => {
  if (!gamerTag || gamerTag.trim() === "")
    return 'Invalid or Missing GamerTag. Use "!ar help" for more info.';

  try {
    const playerStats = await HaloAPI.GetPlayerServiceRecordAsync(gamerTag);
    return `Kill Death Ration for ${gamerTag}: ${playerStats.kdr.toFixed(2)}`;
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
    return `Highest Rank for ${gamerTag}: ${playerStats.all_time.tier} ${playerStats.all_time.value}`;
  } catch (error) {
    console.log(error);
    return `Uh oh! Something bad just happened...`;
  }
};

export const GetPlayerDetailsAsEmbedAsync = async (gamerTag) => {
  if (!gamerTag || gamerTag.trim() === "")
    return 'Invalid or Missing GamerTag. Use "!ar help" for more info.';

  try {
    const serviceRecord = await HaloAPI.GetPlayerServiceRecordAsync(gamerTag);
    const appearance = await HaloAPI.GetPlayerAppearanceAsync(gamerTag);
    const playerCsr = await HaloAPI.GetPlayerCSRAsync(gamerTag);

    return new MessageEmbed()
      .setColor("#507d2a")
      .setTitle(`${gamerTag} [${appearance.service_tag}]`)
      .setAuthor({
        name: "Player Details",
        iconURL: appearance.emblem_url,
      })
      .setDescription(`Service record for ${gamerTag}`)
      .setThumbnail(appearance.backdrop_image_url)
      .addFields(
        {
          name: "Highest Rank",
          value: `${playerCsr.all_time.tier} ${playerCsr.all_time.value}`,
        },
        {
          name: "Total Time Played",
          value: serviceRecord.time_played.human,
        }
        // { name: "\u200B", value: "\u200B" }
      )
      .addField("Matches Played", `${serviceRecord.matches_played}`, true)
      .addField("Win Rate", `${serviceRecord.win_rate.toFixed(2)}%`, true)
      .addField("Total Kills", `${serviceRecord.summary.kills}`, true)
      .addField("Total Deaths", `${serviceRecord.summary.deaths}`, true)
      .addField("Total Assists", `${serviceRecord.summary.assists}`, true)
      .addField("KDR", `${serviceRecord.kdr.toFixed(2)}`, true)
      .addField("KDA", `${serviceRecord.kda.toFixed(2)}`, true)
      .addField("Damage Dealt", `${serviceRecord.damage.dealt}`, true)
      .addField("Damage Taken", `${serviceRecord.damage.taken}`, true)
      .addField("Average Damage", `${serviceRecord.damage.average}`, true)
      .addField("Total Shots Fired", `${serviceRecord.shots.fired}`, true)
      .addField("Total Shots Landed", `${serviceRecord.shots.landed}`, true)
      .addField(
        "Overall Accuracy",
        `${serviceRecord.shots.accuracy.toFixed(2)}%`,
        true
      )
      .setImage(appearance.emblem_url)
      .setTimestamp();
  } catch (error) {
    if (error?.response?.data?.statusCode === 404) return `Player not found`;
    console.log(error);
    return `Uh oh! Something bad just happened...`;
  }
};
