const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Balasan dengan ping!",
  execute: async (message, args, client) => {
    const embed = new MessageEmbed()
      .setColor(client.color.blue)
      .setDescription(`>>> ${client.emoji.pong} **Pong**: \`${client.ws.ping}\` **ms!**`)
      .setFooter({
        text: "© Zlang Reg",
        iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
      });

    try {
      return await message.reply({
        embeds: [embed],
      });
    } catch (e) {
      return console.error(e);
    }
  },
};