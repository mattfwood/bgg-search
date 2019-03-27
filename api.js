import axios from 'axios';

const { parseString } = require('xml2js');

const parse = data => {
  return new Promise((resolve, reject) => {
    parseString(data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const instance = axios.create({
  baseURL: 'https://www.boardgamegeek.com/xmlapi2/',
});

const api = {
  search: async query => {
    const res = await instance.get(`search?query=${query}&type=boardgame`);
    const parsed = await parse(res.data);
    if (!parsed.items.item) {
      return [];
    }
    return parsed.items.item;
  },
  get: async id => {
    const res = await instance.get(`thing?id=${id}`);
    const parsed = await parse(res.data);

    try {
      return parsed.items.item[0];
    } catch (e) {
      return {};
    }
  },
};

export default api;
