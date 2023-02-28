class ClientInBlackList extends Error {
    constructor(message) {
      super(message);
      this.name = 'ClientInBlackList';
      this.statusCode = 400;
    }
  }