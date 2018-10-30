const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('Quick.db');
const ascii = require('ascii-art');
const urban = require('urban');

var eightball = [ // sets the answers to an eightball
    "Yes.",
    "No.",
    "Maybe?",
    "Probably.",
    "I don't think so.",
    "I don't know, try to ask again.",
    "Sure?",
    "Up to you!",
]

client.on('ready',() => {
    console.log('I\'m Online\nI\'m Online');
    client.user.setGame("r!help");
});

var prefix = "r!"

client.on('message', message => {
    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }

    if (message.content.startsWith(prefix + 'cookie')) {
        function cookienum() {
            var rand = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26']
    
            return rand[Math.floor(Math.random()*rand.length)];
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        
        function cookiemsg() {
            var rand = [`You're like the chocolate chip cookie king of the world!`, `Easy cookie, easy life.`, `That's how the cookie crumbles!`, `Mmm...useless digital cookies.`, `What a tough cookie!`];
        
            return rand[Math.floor(Math.random()*rand.length)];
        }
    
        var link = `https://i-like.blue/imgs/cookies/cookie${cookienum()}.jpg`
    
        if (!args[0]) {
            message.reply(`Please mention a user.`)
            return;
        }
    
        if (!message.mentions.members.first()) {
            message.reply(`I could not find a user with that name.`)
            return;
        }
    
        if (message.content.includes(`<@${message.author.id}>`)) {
            message.reply(`You cannot give a cookie to yourself!`)
            return;
        }
    
        db.fetchObject(`sentCookies_${message.author.id}`).then(cookiesSent => {
        db.fetchObject(`receivedCookies_${message.author.id}`).then(cookiesReceived => {
    
            var cookieembed = new Discord.RichEmbed()
            .setAuthor(`Cookie 🍪!`, message.author.avatarURL)
            .setDescription(`**${message.author.username} has given ${message.mentions.users.first().username} a cookie**!\n${cookiemsg()}`)
            .setFooter(`📥 ${cookiesReceived.value} | 📤 ${cookiesSent.value}`)
            .setThumbnail(link)
            .setColor(0xa7ba59)
    
            db.updateValue(`sentCookies_${message.author.id}`, 1).then(cookiesSent => {
            db.updateValue(`receivedCookies_${message.mentions.users.first().id}`, 1).then(cookiesSent => {
                message.channel.send(cookieembed)
        })
            })
    
        })
    })
    }

    if (message.content.startsWith(prefix + '8ball')) { // creates the command 8ball
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); // if args[1], post random answer
        else message.channel.send(" What is your question?"); // if not, error
    }

    var hd = [
        ":joy:",
        ":thinking:"
    ];

    if (message.content.startsWith(prefix + 'flipemoji')) {
    message.channel.send(message.author.toString() + " You Flipped: " + (hd[Math.floor(Math.random() * hd.length)]));
}


if (message.content.startsWith(prefix + 'urban')) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (!args[0]) {
      urban.random().first(randurban => {
        
          var randurbanemb = new Discord.RichEmbed()
          .setTitle(`:book: ${randurban.word}`)
          .setDescription(randurban.definition || "None")
          .addField(`Example:`, `${randurban.example}` || "None")
          .setFooter(`Definition By: ${randurban.author}`)

          message.channel.send(randurbanemb);
      })
      return;
  }
  let str = args.join(' ')

  urban(str).first(json => {
      
      if (!json) {
          message.reply(':thumbsdown: No results found.')
          return;
      }

      if (message.content.includes('The Longest Definitionda On sxczczxcrbandictionary')) return;

      var searchres = new Discord.RichEmbed()
      .setTitle(` ${json.word}`)
      .setDescription(json.definition || "None")
      .addField(`Example:`, `${json.example}` || "None")
      .setFooter(`Definition By: ${json.author}`)

      message.channel.send(searchres);
  })
}

    if (message.content.startsWith(prefix + 'help')) {
    message.channel.sendMessage('Currenctly we have the commands of: ping, flipemoji, cookie, urban, 8ball and dice. Prefix: r!  ') }

    if (message.content.startsWith(prefix + 'shrug')) {
    message.channel.send("¯\\_(ツ)_/¯").then(m => {
        setTimeout(() => {
            m.edit("¯\\\\\\-(ツ)-/¯").then(ms => {
                setTimeout(() => {
                    ms.edit("¯\\_(ツ)_/¯")
                }, 500)
            })
        }, 500)
    
    })
    }
    

    if (message.content.startsWith(prefix + 'dice')) {
	function generateHex() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    function dicenum() {
        var rand = ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4', '5', '6'];
    
        return rand[Math.floor(Math.random()*rand.length)];
    }

    var rolldice = new Discord.RichEmbed()
    .setTitle(":game_die: Dice")
    .setDescription(`You rolled a **${dicenum()}!**`)
    .setColor(generateHex())

    message.channel.send(rolldice)

}

if (message.content.startsWith(prefix + 'asciify')) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    ascii.font(args.join(' '), 'Doom', function(rendered) {
        //args holds an array of the words following the command, so if we join them we get a string of tword following the command
        
        //The rendered variable now contains our output
        //Although, there is usually a few Spaces on the end
        rendered = rendered.trimRight(); //this will remove the whitespace on the right side of the string

        //now We need to check if the string excedds max characters.
        if (rendered.lenght> 2000) return message.channel.send('That message is too long.');

       message.channel.send(rendered,{
        code: 'md'
               });

        });
}

});

client.login("NTA2NjE1NDQ5NjI3MTMxOTI2.DrnfEQ.5-J1rtsb2sW33dpLiw8av8UgHGY");