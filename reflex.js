//configurações iniciais

const discord = require('discord.js');

const client = new discord.Client();
const config = require("./reflex.json");

var checkLog = false;

var currQuest = 0;

const quests = [
    "5. Qual seu nome verdadeiro, pode ser utilizado um nome fictiício desde que você possa se indentificado por ele.",
    "6. Função dentro da reflex."
];

client.on("ready", ()=>{
    console.log("\nbot on-");
    client.user.setActivity('iniciando...', {type: 'STREAMING'});
    setTimeout(()=>{
        client.user.setActivity('', {type: ''});
    }, 1000);

    client.channels.cache.get("804026675838976000").setTopic(`Total de membros: ${client.users.cache.size}.`);
    client.channels.cache.get("823356914556731402").setName(`Usuários: ${client.users.cache.size}`);
    console.log("bot iniciado com sucesso!\n\n");
});

var P1A, P1B;
function novNum(){
    P1A = Math.floor(Math.random() * 500);P1B = Math.floor(Math.random() * 1500);
}

client.on("message", async message => {
    if(message.author.bot){return;}else{if(message.channel.type === "type"){return;}}
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    var server = message.guild.id;
    
    const member = message.member;

    const comando = {
        ping: ()=>{message.reply("Pong!").then((pingMessage) => {message.delete();
                        message.channel.send(`${pingMessage.createdTimestamp - message.createdTimestamp}ms`).then((messagePong)=>{
                            setTimeout(()=>{
                                pingMessage.delete();
                                messagePong.delete();
                            }, 5000);
                        });
                    }
                    );},
        calc: ()=>{
            const calculo = message.content.replace(/ calcA/, "");
            message.reply(eval(calculo));
        },
        log: ()=>{
            checkLog = !checkLog;
            message.delete();
            return message.member.send("log " + checkLog);
        }
    }

    if(checkLog){
        console.log(message.channel.name + "\n    > " + message.member.user.username + ": " + message.content);
    }

    //recrutamento
        if(command === "recrutamento"){
            let recru = [cod] = args;
                if(message.member.roles.cache.find(r => r.name === 'Recruta')){
                    if(!args[0]){
                        message.member.send("seu código: DGzn^tWtqAW#TSFDNjUB65&f9G^8&DD&mjc8w4fCfmVKXmUVSY" + message.member.user.username.replace(" ", "") + message.member.user.id);
                        message.reply(`\nRecruta: ${message.member.user.username}.\nId: ${message.member.user.id}.\n\nUse novamente o comando /recrutamento, porém adicione o código que lhe foi enviado: /recrutamento ([código])`);
                    }else{
                        if(cod === ("DGzn^tWtqAW#TSFDNjUB65&f9G^8&DD&mjc8w4fCfmVKXmUVSY" + message.member.user.username.replace(" ", "") + message.member.user.id)){
                            message.delete();
                            message.reply("vai começar agora seu recrutamento!").then((messageMessage) => {
                                message.member.send("você está no nosso sistema, agora você pode fazer seu recrutamento.\n\n/recrutamento recrutar");
                                setTimeout(()=>{
                                    messageMessage.delete();
                                }, 2500);
                            });
                        }else if(cod === "recrutar"){
                                message.member.send("O recrutamento é feito em três(3) etapas.\n1. São feitas perguntas de capctha, não é necessário que você acerte elas(as perguntas 1 e 2 devem ser respondidas corretamente);\n2. Você coloca seu nome e a função que deseja dentro da reflex;\n3. Você entrará em uma call e então você poderá conversar conosco.\n\nQualquer dúvida você pode falar no próprio canal do recrutamento");
                                message.member.send("sua entrevista começou!\nCanal: >#recrutamento");
                                message.channel.send("para responder use: /r [número da pergunta] ([resposta])");
                                    message.channel.send("1. Quanto é 5 + 5?");
                        }else{
                            message.delete();
                            message.member.send("código inválido");
                            console.log("DGzn^tWtqAW#TSFDNjUB65&f9G^8&DD&mjc8w4fCfmVKXmUVSY" + message.member.user.username + message.member.user.id);
                        }
                    }
                }else{
                    message.delete();
                    message.member.send("você não ter permissão de usar este comando");
                }
        }
        
        function questsF(pos){
            message.channel.send(quests[pos]);
        }

        const recrutamento = {
            recrutamento: (val, numQ)=>{client.channels.cache.get("857041168722034728").send((numQ + 5) + ": " + val); questsF(numQ+1); currQuest++},
            completo: ()=>{message.member.roles.add(message.guild.roles.cache.find(role => role.name === "Membro"));
                            message.member.roles.remove(message.guild.roles.cache.find(role => role.name === "Recruta"));
                            message.channel.send("<@&798707299060285461>").then((adm)=>{
                                setTimeout(()=>{adm.delete();}, 500);
                            });
                        }
        }

        if(command === "r"){
            let [num, resp] = args;

            //perguntas de captcha
                if(num == "1"){
                    if(resp == "10"){
                        novNum();
                        message.channel.send("2. Quanto é " + P1A + " + " + P1B + "?");
                    }else{
                        message.reply("Errado!");
                        return;
                    }
                }if(num == "2"){
                    if((resp == (P1A+P1B))){
                        message.channel.send("3. ∞-∞=0(tirar infinito de infinito resulta em zero); verdadeiro(v) ou falso(f)?");
                    }else{
                        novNum();
                        message.channel.send("2. Quanto é " + P1A + " + " + P1B + "?");
                        return;
                    }
                }if(num == "3"){
                    if(resp){
                        message.channel.send("4. Um ∞(infinito) formado apenas por números pares = um ∞(infinito) formado por todos os números naturais; verdadeiro(v) ou falso(f)?");
                    }
                }if(num == "4"){
                    if(resp){
                        questsF(0);
                        message.reply("Captcha terminado.").then((messageCaptcha) => {
                            setTimeout(()=>{messageCaptcha.delete();}, 2500);
                        });
                    }
                }

            if(num == (currQuest+5)) recrutamento.recrutamento(resp, currQuest);
        }

    //membros
        if(command === "ping"){
            comando.ping();
        }

        //calculadora
            if(command === "calc-tres"){
                let [x, y, z, privado, info] = args;
        
                var result;
        
                if(!args[0] || !args[1] || !args[2]){
                    return message.channel.send("você precisar colocar valores válidos! \n/calc-tres <número x> <número y> <número z> [mensagem direta(opicional)(Boleano)] [informações(opicional)(Boleano)]");            
                }else{
                    if(privado){
                        if(privado === "true" || privado === "verdadeiro"){
                            if(info === "false" || info === "falso"){
                                result = (y*z)/x;
                                    message.delete();
                                return message.author.send("Resultado: " + result);
                            }else{
                                result = (y*z)/x;
                                    message.delete();
                                        var mensConta = message.author.send("\n--------------------------------\nRegra de Três - Informações:\n\n"+x+"  "+z+"\n"+y+"   x");
                                const m = message.author.send("Calculo: ("+y+"*"+z+")/"+x+"="+result);
                                return message.author.send("Resultado: " + result);
                            }
                        }else{
                            if(info === "false" || info === "falso"){
                                result = (y*z)/x;
                                return message.channel.send("Resultado: " + result);
                            }else{
                                result = (y*z)/x;
                                    var mensConta = message.author.send("\n--------------------------------\nRegra de Três - Informações:\n\n"+x+"  "+z+"\n"+y+"   x");
                                const m = message.author.send("Calculo: ("+y+"*"+z+")/"+x+"="+result);
                                return message.channel.send("Resultado: " + result);
                            }
                        }
                    }else{
                        if(!args[3] || !args[4]){
                            result = (y*z)/x;
                                var mensConta = message.author.send("\n--------------------------------\nRegra de Três - Informações:\n\n"+x+"  "+z+"\n"+y+"   x");
                            const m = message.author.send("Calculo: ("+y+"*"+z+")/"+x+"="+result);
                            return message.channel.send("Resultado: " + result);
                        }
                    }
                }
            }
            if(command === "calc"){
                let [conta, mdireta] = args;
        
                var result;
        
                if(!args[0]){
                    return message.channel.send("você precisa colocar a conta /calc-compl <conta>");
                }else{
                    result = eval(conta);
                    
                    if(mdireta == "false" || !mdireta){
                        return message.channel.send(conta + "=" + result);
                    }else{
                        message.delete();
                        return message.member.send(conta + "=" + result);
                    }
                }
            }
            if(message.content.match(" calcA")){
                comando.calc();
            }

    //admin
        if(command === "notific:"){
            let ntf = [cont, ass1, val1, ass2, val2, menc] = message.content.slice(config.prefix.length).trim().split(/;/);

            if(!args[1]){
                message.delete();
                message.member.send("por favor coloque o conteúdo da mensagem");
            }else{
                if(message.member.roles.cache.find(r => r.name === 'Administrador')){
                    message.delete();
                    notific(message.member.user.username, ntf);
                    message.member.send("você enviou uma notificação com sucesso");
                }else{
                    message.delete();
                    message.member.send("você não tem permissão de usar esse comando");
                }
            }
        }
        if(command === "reflex"){
            let [com, val] = args;

            if(!args[0]){
                message.reply("estou ativado!");
            }
                if(com === "code"){
                    message.delete();
                    message.member.send(("DGzn^tWtqAW#TSFDNjUB65&f9G^8&DD&mjc8w4fCfmVKXmUVSY" + message.member.user.username + message.member.user.id));
                }else if(com === "commands"){
                        message.delete();
                        message.member.send("-\ncomandos para usar no comando reflex\n\n/reflex\n**code** *retorna o seu código de usuário reflex*\n**commands** *retorna a lista de comandos que pode ser utilizados dentro do comando \"reflex\"*");
                    }
        }
        if(command === "say"){
            let [pal] = message.content.slice(config.prefix.length).trim().split(/;/);

            if(message.member.roles.cache.find(r => r.name === 'Administrador')){
                message.delete();
                client.channels.cache.get("804026675838976000").send(pal.replace(/say/, ""));
            }
        }

        if(command === "connect"){
            let [canal] = args;

            if(!args[0]){
                let channelVoice = message.guild.channels.cache.find(channel => channel.name === member.voice.channel.name);
                if(channelVoice){
                    channelVoice.join().then(()=>{
                        console.log("-Bot se conectou ao canal: \"" + canal + "\"");
                    });
                }
                message.delete();
            }else{
                let channelVoice = message.guild.channels.cache.find(channel => channel.name === canal);
                message.delete();

                if(channelVoice){
                    channelVoice.join().then(()=>{
                        console.log("-Bot se conectou ao canal: \"" + canal + "\"");
                    });
                }else{
                    return message.member.send('canal "'+ canal +'" não encontrado');
                }
            }
        }
        if(command === "discB"){
            let channelVoice = message.guild.channels.cache.find(channel => channel.name === client.voice.channel.name);            
            if(channelVoice){
                channelVoice.leave().then(()=>{
                    console.log("-Bot se desconectou ao canal: \"" + canal + "\"");
                });
            }else{
                return message.channel.send('O bot não está em nenhum canal de voz atualmente');
            }
        }

        if(command === "log"){
            comando.log();
        }
});

client.on("guildMemberAdd", async member => {
    const embed = new discord.MessageEmbed()
    .setTitle("Nova Notificação")
    .setColor('#0099ff')
    .setDescription(`Um novo membro entrou para a reflex como recruta: ${member}`)
    .addFields(
        {name: 'Nome', value: member.user.username, inline: true},
        {name: 'Id', value: member.user.id, inline: true}
    )
    .setThumbnail("https://cdn.discordapp.com/avatars/811234068192034866/b629e9956a5b5d413190555256c82f59.png?size")
    .setImage("https://cdn.discordapp.com/avatars/811234068192034866/b629e9956a5b5d413190555256c82f59.png?size")
    .setTimestamp()
    .setFooter('Reflex notific. By Reflex');
    const recruta = member.guild.roles.cache.find(r => r.name === 'Recruta');

    member.roles.add(recruta);

    member.send("Como novo recruta da reflex, pedimos que você entre no canal #recrutamento para se tornar um membro. Use o comando /recrutamento");
    
    client.channels.cache.get("798707057192730687").send("@here");
    client.channels.cache.get("798707057192730687").send(embed);
});

function notific(mem, ntf){
    for(var checkN = 0; checkN < 5; checkN++){
        if(ntf[checkN] == undefined || ntf[checkN] == null || ntf[checkN] == "" || ntf[checkN] == " nada aqui"){
            ntf[checkN] = "ㅤ";
        }
    }

    const embed = new discord.MessageEmbed().setTitle("Nova Notificação").setColor('#0099ff').setDescription(ntf[0].replace(/notific: /, ""))
    .addFields(
        {name: ntf[1], value: ntf[2], inline: true},
        {name: ntf[3], value: ntf[4], inline: true}
    ).setThumbnail("https://cdn.discordapp.com/avatars/811234068192034866/b629e9956a5b5d413190555256c82f59.png?size")
    .setImage("https://cdn.discordapp.com/avatars/811234068192034866/b629e9956a5b5d413190555256c82f59.png?size")
    .setTimestamp().setFooter('Reflex notific. By ' + mem);
    
    if(ntf[5] == "v" || ntf[5] == "verdadeiro" || !ntf[5]){
        client.channels.cache.get("857387080262221844").send("@here");
        client.channels.cache.get("857387080262221844").send(embed);
    }else{
        client.channels.cache.get("857387080262221844").send(embed);
    }
}

client.login(config.token);

//vs: 0.35v|29\06\2021