import * as axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    // this.api_url = 'https:///back-digi.test/api'
    this.api_url = "https://floating-reaches-03248.herokuapp.com/api";
    this.client = null;
  }

  async create() {
    try {
      this.api_token = localStorage.getItem("token");
    } catch (error) {
      console.log("error", error);
    }

    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    if (this.api_token) {
      // headers['x-access-token'] = this.api_token
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 10000,
      headers: headers
    });
  }

  getClient() {
    return this.client;
  }
}
