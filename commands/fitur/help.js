const fs = require("fs");
const config = require("../../config/config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Balasan dengan ping!",
  execute: async (message, args, client) => {
    if (!args[0]) {
      let categories = [];

      fs.readdirSync("./commands/").forEach((dir) => {
        const editedName = `${dir.toUpperCase()}`;
        const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: editedName,
          value: cmds.length === 0 ? "`In progress.`" : cmds.join(" "),
        };

        return categories.push(data);
      });

      const embed = new MessageEmbed()
        .setColor(client.color.blue)
        .setTitle("📬 Butuh bantuan? Ini semua perintah saya:")

        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `>>> Menggunakan \`${config.prefix}help\` diikuti dengan nama perintah untuk mendapatkan informasi tambahan lebih lanjut tentang suatu perintah. Misalnya: \`${config.prefix}help \`.`
        )
        .addFields(categories)
        .setTimestamp()
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      try {
        return await message.reply({ embeds: [embed] });
      } catch (e) {
        return console.error(e);
      }
    } else {
      const command = client.commands.get(args[0].toLowerCase());

      if (!command) {
        const embed = new MessageEmbed()
          .setColor("RED")
          .setTitle("❌ • Error")
          .setDescription(`>>> Tidak sah command! Menggunakan \`${config.prefix}help\` untuk semua milikku commands!`);
        return await message.reply({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setColor(client.color.blue)
        .setTitle("Command Detail:")
        .addField("PREFIX:", `>>> \`${config.prefix}\``)
        .addField("COMMAND:", command.name ? `>>> \`${command.name}\`` : ">>> `Tidak ada nama untuk ini command.`")
        .addField(
          "USAGE:",
          command.usage
            ? `>>> \`${config.prefix}${command.name} ${command.usage}\``
            : `>>> \`${config.prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description ? `>>> \`${command.description}\`` : ">>> `Tidak ada deskripsi untuk ini command.`"
        )
        .setTimestamp()
        .setFooter({
          text: "© Galang",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      try {
        return await message.reply({ embeds: [embed] });
      } catch (e) {
        return console.log(e);
      }
    }
  },
};