import dotenv from 'dotenv';
dotenv.config();

const options = {
  method: 'GET',
  url: '0',
  params: {
    lat: 'userLat',
    lon: 'userLon',
    lang: 'en',
    units: 'metric',
  },
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': process.env.API_HOST,
  },
};

export { options };
