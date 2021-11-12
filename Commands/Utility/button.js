const { MessageActionRow, MessageButton, MessageEmbed }= require("discord.js")

module.exports = {
    name : "button",
    run : async (client,message,args)=> {
        const k = new MessageEmbed()
        .setAuthor(`Test`, message.author.avatarURL())
        .setDescription('This is description')

        let raw = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel("PARAS DOCS")
            .setStyle("LINK")
            .setURL("https://discord.gg/djs"),
            new MessageButton()
            .setLabel("PARAS DOCS")
            .setCustomId("k")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setLabel("PARAS DOCS")
            .setCustomId("3")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setLabel("PARAS DOCS")
            .setCustomId("4")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setLabel("PARAS DOCS")
            .setCustomId("5")
            .setStyle("DANGER")
);

message.channel.send({content : "_ _",components : [raw]})
    }
}