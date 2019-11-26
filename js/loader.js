import dataAdapter from "./data/data-adapter";

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `o0`;
const APP_ID = 35407935;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON).then(dataAdapter);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/:${APP_ID}-:${name}`, requestSettings).then(checkStatus);
  }
}
