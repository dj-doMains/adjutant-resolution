import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const token = `Cryptum-Token ${process.env.CRYPTUM_TOKEN}`;

export const GetPlayerServiceRecordAsync = async (gamerTag) => {
  const response = await axios.get(
    `https://cryptum.halodotapi.com/games/hi/stats/players/${gamerTag}/service-record/global`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Cryptum-API-Version": "2.3-alpha",
      },
    }
  );

  return response.data.data;
};

export const GetPlayerCSRAsync = async (gamerTag) => {
  const response = await axios.get(
    `https://cryptum.halodotapi.com/games/hi/stats/players/${gamerTag}/csr?season=1&queue=open&input=crossplay`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Cryptum-API-Version": "2.3-alpha",
      },
    }
  );

  return response.data.data;
};

export const GetPlayerAppearanceAsync = async (gamerTag) => {
  const response = await axios.get(
    `https://cryptum.halodotapi.com/games/hi/appearance/players//${gamerTag}`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Cryptum-API-Version": "2.3-alpha",
      },
    }
  );

  return response.data.data;
};
