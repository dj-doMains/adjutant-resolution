import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
var Auth = require("../auth.json");

const token = `Cryptum-Token ${Auth.cryptumToken}`;

export const GetPlayerStatsAsync = async (gamerTag) => {
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

  return response.data;
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

  return response.data;
};
