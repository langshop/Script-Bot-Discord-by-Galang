const { MessageEmbed, Permissions } = require("discord.js");
const db = require("../../database/database.json");

module.exports = {
  name: "register",
  description: "Replies with register!",
  execute: async (message, args, client) => {
    const string = args.join(" ");

    if (!db.channel || !db.role) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(
          `>>> ${message.author}, **Silakan isi channel id & role id pada file database di folder database!**`
        )
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (message.channel.id != db.channel) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **Anda tidak dapat menggunakan perintah ini kecuali di <#${db.channel}>**`)
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **Anda tidak dapat menggunakan perintah ini karena Anda adalah administrator!**`)
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (!string) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **Silakan masukkan nama Anda yang ingin Anda gunakan!**`)
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      return await message.reply({ embeds: [embed] });
    }

    if (string.length > 32) {
      const embed = new MessageEmbed()
        .setColor(client.color.red)
        .setTitle(`${client.emoji.error} • Error`)
        .setDescription(`>>> ${message.author}, **Anda tidak dapat memasukkan nama hingga 32 kata!**`)
        .setFooter({
          text: "© Zlang Reg",
          iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
        });

      return await message.reply({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setColor(client.color.green)
      .setTitle(`${client.emoji.success} • Success`)
      .setDescription(`>>> ${message.author}, **Anda telah diverifikasi di ${message.guild.name} server**`)
      .setTimestamp()
      .setFooter({
        text: "© Zlang Reg",
        iconURL: "https://telegra.ph/file/bf825d1dd5935e84b7541.jpg",
      });

    try {
      if (!db.roleremove) {
        await message.member.roles.add(`${db.role}`);
        if (db.tag) {
          await message.member.setNickname(`${db.tag} ${string}`);
        } else {
          await message.member.setNickname(`${string}`);
        }
        return await message.reply({ embeds: [embed] });
      } else if (!db.tag) {
        await message.member.roles.add(`${db.role}`);
        if (db.roleremove) {
          await message.member.roles.remove(`${db.roleremove}`);
        }
        await message.member.setNickname(`${string}`);
        return await message.reply({ embeds: [embed] });
      } else {
        await message.member.roles.add(`${db.role}`);
        await message.member.roles.remove(`${db.roleremove}`);
        await message.member.setNickname(`${db.tag} ${string}`);
        return await message.reply({ embeds: [embed] });
      }
    } catch (e) {
      return console.error(e);
    }
  },
};
