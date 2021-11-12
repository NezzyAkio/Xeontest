const { MessageEmbed } = require('discord.js');

module.exports.run = async (client,message) => {

const array = require(`../JSON/scam.json`)
    if(array.includes(message.content.toLowerCase())) {
      message.delete()
      if (message.author.bot) return;
      let reason = "Sending a scam/phising links";
      
      message.member.send(`Kicked in \`\`\`${message.guild.name}(${message.guild.id}\`\`\` for reason: ${reason}`)
      await message.member.kick(reason)
      message.channel.send({content: `<@${message.member.id}> Do not post scam links.`})
}

if (message.author.bot || !message.guild) return;

if (!message.content.startsWith(client.config.prefix)) return;

if (!message.member) message.guild.fetchMembers(message);

const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

const cmd = args.shift().toLowerCase();

if (cmd.length === 0) return;

let command = client.commands.get(cmd)

if (!command) command = client.commands.get(client.aliases.get(cmd))

if (!command) return

if(command.pro){

let guild = await client.db.get(`premium_${message.guild.id}`)

if(!guild){
    return message.channel.send(`This command only avalible for premium server`)
}}

if (command) command.run(client, message, args)

}