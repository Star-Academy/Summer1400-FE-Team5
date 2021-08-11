class Api {
  baseUrl = 'https://songs.code-star.ir';

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

    return {
      status: res.status,
      body: await res.json()
    };
  }
}
