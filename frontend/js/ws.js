const { backend } = require("../config.json");
const socket = new WebSocket(`ws://${backend}`);