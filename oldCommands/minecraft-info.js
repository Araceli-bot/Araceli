class minecraftinfo {

    processTableData(table) {
        var a;
        var b;
        var c;
        var d;
        var e;

        var data = {
            Transparency: 0,
            Luminance: 0,
            Blastresistance: 0,
            Renewable: "no",
            Stackable: "no (0)",
            Flammable: "no"
        }

        /*
            { Transparency: 'No\n',
            Luminance: 'No\n',
            BlastResistance: 0,
            Renewable: 'Yes\n',
            Stackable: 'no, 0',
            Flammable: 'no',
            Blastresistance: '2.5\n',
            Drops: 'Itself\n',
            Datavalue: undefined,
            Name: 'See ' }
        */

        for(a in table.child) {
            if(table.child[a].tag == "tr") {
                var tr = table.child[a];
                for(b in tr.child) {
                    if(tr.child[b].tag == "td") {
                        var td = tr.child[b];
                        for(c in td.child) {
                            if(td.child[c].tag == "p") {
                                var value = td.child[c].child[0].text;
                                for(d in tr.child) {
                                    if(tr.child[d].tag == "th") {
                                        var th = tr.child[d];
                                        for(e in th.child) {
                                            console.log(th.child[e])
                                            if(th.child[e].tag == "a") {
                                                var head = th.child[e].child[0].text;
                                                head = head.replace(" ", "");
                                                data[head] = value;
                                            } else if(th.child[e].text != '\n' && th.child[e].text != " " && th.child[e].text != "") {
                                                var head = th.child[e].text;
                                                head = head.replace("\n", "");
                                                head = head.replace(" ", "")
                                                data[head] = value;
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }

        return data;
    }

    execute(message, args) {
        args[0] = args[0].toLowerCase();
        const Discord = require('discord.js');
        var request = require('request');
        var html2json = require('html2json').html2json;
        var msgs = require('http-status-messages');

        var a;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g;
        var h;
        var i;
        var z;
        var self = this;

        request('https://minecraft.gamepedia.com/'+args[0], (err, res, body) => {
            if(res.statusCode === 200) {
                var dat = html2json(body);
                for(a in dat.child) {
                    if(dat.child[a].tag == "html") {
                        for(b in dat.child[a].child) {
                            if(dat.child[a].child[b].tag == "body") {
                                var body = dat.child[a].child[b];
                                //dat = "";
                                for(c in body.child) {
                                    if(body.child[c].tag == "div" && body.child[c].attr.id == "global-wrapper") {
                                        var globl = body.child[c];
                                        //body = "";
                                        for(d in globl.child) {
                                            if(globl.child[d].tag == "div" && globl.child[d].attr.id == "pageWrapper") {
                                                var page = globl.child[d];
                                                //globl = "";
                                                for(e in page.child) {
                                                    if(page.child[e].tag == "div" && page.child[e].attr.id == "content") {
                                                        var Body = page.child[e]
                                                        for(f in Body.child) {
                                                            if(Body.child[f].tag == "div" && Body.child[f].attr.id == "bodyContent") {
                                                                var content = Body.child[f];
                                                                for(g in content.child) {
                                                                    if(content.child[g].tag == "div" && content.child[g].attr.id == "mw-content-text") {
                                                                        var text = content.child[g];
                                                                        for(h in text.child) {
                                                                            if(text.child[h].tag == "div" && text.child[h].attr.class == "notaninfobox") {
                                                                                var infobox = text.child[h];
                                                                                for(i in infobox.child) {
                                                                                    if(infobox.child[i].tag == "div" && infobox.child[i].attr.class == "infobox-imagearea") {
                                                                                        for(z in infobox.child) {
                                                                                            if(infobox.child[z].tag == "table" && infobox.child[z].attr.class == "infobox-rows") {
                                                                                                /*
                                                                                                    { Transparency: 'No\n',
                                                                                                    Luminance: 'No\n',
                                                                                                    BlastResistance: 0,
                                                                                                    Renewable: 'Yes\n',
                                                                                                    Stackable: 'no, 0',
                                                                                                    Flammable: 'no',
                                                                                                    Blastresistance: '2.5\n',
                                                                                                    Drops: 'Itself\n',
                                                                                                    Datavalue: undefined,
                                                                                                    Name: 'See ' }
                                                                                                */
                                                                                                var tableData = self.processTableData(infobox.child[z]);
                                                                                                var images = infobox.child[i];
                                                                                                var image = images.child[0];
                                                                                                var link = image.child[0]
                                                                                                var src = link.child[0].attr.src;

                                                                                                var embed = new Discord.RichEmbed()
                                                                                                //.setImage(message.author.displayAvatarURL)
                                                                                                .setColor(0x00AE86)
                                                                                                .setDescription("")
                                                                                                .setFooter("Araceli Copyright 2017-2018", src)
                                                                                                .setThumbnail(src)
                                                                                                /*
                                                                                                * Takes a Date object, defaults to current date.
                                                                                                */
                                                                                                .setTimestamp()
                                                                                                .setTitle("Info on " + args[0])
                                                                                                .setAuthor(message.author.username, src, "https://minecraft.gamepedia.com/"+args[0])
                                                                                                .setDescription("• Name: " + args[0] + "\n" +
                                                                                                "• Transparency: " + tableData.Transparency +
                                                                                                "• Luminance: " + tableData.Luminance +
                                                                                                "• Blast Resistance: " + tableData.Blastresistance +
                                                                                                "• Renewable: " + tableData.Renewable +
                                                                                                "• Stackable: " + tableData.Stackable +
                                                                                                "• Flammable: " + tableData.Flammable +
                                                                                                "• Drops: " + tableData.Drops
                                                                                                )
                                                                                                .setImage(src);
                                                                                                /*
                                                                                                Information about the user ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛:
                                                                                                • Username: ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛
                                                                                                • ID: 193124101446041602
                                                                                                • Discord Tag: ⊛ 𝖊𝕯𝖗𝖔𝖎𝖉 ⊛#2634
                                                                                                • Avatar URL: https://cdn.discordapp.com/avatars/193124101446041602/1c670d397a9d74e401760e163bf35e3b.png?size=2048
                                                                                                • Created at: Fri Jun 17 2016 00:06:13 GMT+0200 (CEST)
                                                                                                • Bot?: false
                                                                                                • Roles: @everyone, Notable Member
                                                                                                • Game: None
                                                                                                • Status: dnd
                                                                                                */

                                                                                                message.channel.send({embed});
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                message.channel.send("Hmmm, there was an issue. Error: " + res.statusCode + ": " + msgs[res.statusCode] + " was received when trying to find " + args[0]);
            }
        });
    }
}

module.exports = minecraftinfo;
