const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bokep",
  description: "Balasan dengan hlep!",
  execute: async (message, args, client) => {
    const embed = new MessageEmbed()
      .setColor(client.color.blue)
      .setDescription(`Ini Hasil Pencarian 🔍\n> \n > Belum Buat Link`)
      .setFooter({
        text: "© Galang",
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
