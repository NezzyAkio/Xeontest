const discord = require("discord.js");
const express = require("express")
const app = new express()

const client = new discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    "GUILDS","GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
});

client.config = require("./config.json");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.slash = new discord.Collection();

["commands","events","slash"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

app.get('/', function(req, res) {
    res.send(`${client.user.tag} is ready!`)
})

app.listen(3000, () => console.log("Listening on port 3000"))

client.login(client.config.token)