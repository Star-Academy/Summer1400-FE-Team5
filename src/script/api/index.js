class Api {
  baseUrl = 'https://songs.code-star.ir';
  static api;

  static getApi() {
    if (!this.api) this.api = new Api();

    return this.api;
  }

  async get(path) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      status: res.status,
      body: await res.json()
    };
  }

  async post(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    let resBody;
    const status = res.status;
    try {
      resBody = await res.json();
    } catch {}

    return {
      status,
      body: resBody
    };
  }
}
