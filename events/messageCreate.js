const config = require("../config/config.json");

module.exports = {
  name: "messageCreate",
  execute: async (message, client) => {
    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      return await command.execute(message, args, client);
    } catch (e) {
      return console.error(e);
    }
  },
};