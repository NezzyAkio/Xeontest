module.exports.run = async (client) => {
const { Manager } = require("erela.js");
const Spotify  = require("erela.js-spotify");
const { MessageEmbed } = require("discord.js")

console.log(`${client.user.username} is ready in ${client.guilds.cache.size} server`);
    /*setInterval(() => {
      const statuses = [
        `Soon baby`,
        `Soon buddy`,
        `Soon girl`,
        `Soon boy`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
    // client.user.setActivity(status, { type: "STREAMING" })
    }, 60000);*/
    client.user.setPresence({ activities: [{ name: `${client.config.prefix}help` }], status: 'idle' });

  let nodes = client.config.nodes
  let clientID = client.config.spotifyID
  let clientSecret = client.config.spotifySecret
    
client.manager = new Manager({
    nodes,
    plugins: [ new Spotify({ clientID, clientSecret}),
],
    
    autoPlay: true,
    secure: false,
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });
  
client.manager.init(client.user.id);

client.on("raw", d => client.manager.updateVoiceState(d));

client.manager.on("nodeConnect",async node => {
   console.log(`[NODE] "${node.options.identifier}" connected.`);
 
})

client.manager.on("nodeError", (node, error) => {
    console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);   
});
client.manager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    let min = Math.floor((track.duration/1000/60) << 0), sec = Math.floor((track.duration/1000) % 60);
    let sec2;
      if(sec < 10) {
          sec2 = `0${sec}`
      }
      else {
          sec2 = sec
      }

    let np = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor(` NOW PLAYING`,`${track.requester.displayAvatarURL()}`)
    .setDescription(` 
    [${track.title}](${track.uri})[${track.requester}]`);

channel.send({embeds:[np]})
});

client.manager.on("queueEnd", player => {
    if (player.twentyFourSeven) return;

    player.destroy();
});
  
client.manager.on("socketClosed", (player, payload) => {
		if(payload.byRemote === true) player.destroy();
});
	
client.manager.on("playerMove", (player, currentChannel, newChannel) => {
	player.voiceChannel = client.channels.cache.get(newChannel);


setTimeout(() => {
 player.pause(false) 
})
},2000);
};