import querystring from "querystring";
import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=`;
const RECOMMENDATION_ENDPOINT = `https://api.spotify.com/v1/recommendations?seed_tracks=`;
//api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "client_credentials",
      client_id: client_id,
      client_secret: client_secret,
    }),
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getSongs = async (search: string) => {
  const { access_token } = await getAccessToken();

  return await axios.get(`${SEARCH_ENDPOINT}${search}&type=track&limit=5`, {
    headers: {
      Authorization: `Bearer  ${access_token}`,
    },
  });
};

export const getRecommendation = async (search: string) => {
  const { access_token } = await getAccessToken();
  const api = `${RECOMMENDATION_ENDPOINT}${search}&limit=5`;

  return await axios.get(api, {
    headers: {
      Authorization: `Bearer  ${access_token}`,
    },
  });
};
