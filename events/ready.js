const config = require("../config/config.json");

module.exports = {
  name: "ready",
  once: true,
  execute: (client) => {
    try {
      console.log(`Ready! Logged in as ${client.user.tag}`);
      client.user.setPresence({
        activities: [
          {
            name: `24/7 Online | ${config.prefix}help | Dev: Galang`,
            type: "STREAMING",
          },
        ],
        status: "online",
      });
    } catch (e) {
      return console.error(e);
    }
  },
};
