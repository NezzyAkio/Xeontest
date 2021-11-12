const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "hololive",
    description: "random hololive img",
    options: [{
        name: "name",
        type: 3,
        description: "Hololive characters names",
        required: true,
        choices: [{
            name: "Pekora",
            value: "pekora"
        },
        {
            name: "Gura",
            value: "gura"
        },
        {
            name: "Rushia",
            value: "rushia"
        },
        {
            name: "Coco",
            value: "coco"
        }
        ]
    }],
    run: async (interaction, client) => {
        const choose = interaction.options.getString("name")
        const url = `https://img-hololive-api.up.railway.app/${choose}`
        let response
        try {
            response = await fetch(url).then(res => res.json())
        } catch (e) {
            return interaction.reply({ content: "An Error Occured, Try Again Later.", ephemeral: true })
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${choose} Img`)
            .setURL(response.url)
            .setImage(response.url)
        interaction.reply({ embeds: [embed] })
    }
}