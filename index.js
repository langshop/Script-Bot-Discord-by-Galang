const fs = require("fs");
const color = require("./config/color.json");
const emoji = require("./config/emoji.json");
const config = require("./config/config.json");
const { Client, Collection, Intents } = require("discord.js");

const client = new Client({
  allowedMentions: { parse: ["users", "roles"] },
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES],
});

client.color = color;
client.emoji = emoji;
client.commands = new Collection();

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const commandsPath = fs.readdirSync("./commands");

for (const folder of commandsPath) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

require("./website/app.js")(client);

client.login(config.token);
