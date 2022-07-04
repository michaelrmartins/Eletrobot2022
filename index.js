/*

Eletrobot 

Michael Martins 2021 

*/

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')

/******BEGIN OF FILE INPUT******/
const { color, bgcolor } = require('./lib/color')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { virtex } = require('./src/virtex')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
/******END OF FILE INPUT******/

/******BEGIN OF NPM PACKAGE INPUT******/
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
//const ffmpeg = require('fluent-ffmpeg')
//const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')
const gm = require('imagemagick');
//const gm = require('gm');
//const gm = require('gm').subClass({imageMagick: true});

//import wiki from 'wikijs';
const wiki = require('wikijs').default;

//import Google Image Search 
const googleImageSearch = require('g-i-s');

//ffmpeg Package configuration 
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

/******END OF NPM PACKAGE INPUT******/


/******BEGIN OF JSON INPUT******/
const welkom = JSON.parse(fs.readFileSync('./database/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/json/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/json/simi.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const palavrasProibidas = JSON.parse(fs.readFileSync('./database/json/palavras.json'))
const activeUsersG1 = JSON.parse(fs.readFileSync('./database/json/membrosAtivosG1.json'))
const activeUsersG2 = JSON.parse(fs.readFileSync('./database/json/membrosAtivosG2.json'))
const cmdBanido = JSON.parse(fs.readFileSync('./database/json/banidosComandos.json'))
const welcomeBanido = JSON.parse(fs.readFileSync('./database/json/welcomeBanidos.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))
/******END OF JSON INPUT******/

/******BEGIN OF MENU INPUT******/
const { help } = require('./src/help')
const { logomaker } = require('./database/menu/logomaker')
const { toinmenu } = require('./src/toinmenu')
const { menuadmin } = require('./src/menuadmin')
const { nsfwmenu } = require('./src/nsfwmenu')
/*const { mediamenu } = require('./database/menu/mediamenu')
const { educationmenu } = require('./database/menu/educationmenu')
const { downloadermenu } = require('./database/menu/downloadermenu')
const { mememenu } = require('./database/menu/mememenu')
const { kerangmenu } = require('./database/menu/kerangmenu')
const { groupmenu } = require('./database/menu/groupmenu')
const { soundmenu } = require('./database/menu/soundmenu')
const { musicmenu } = require('./database/menu/musicmenu')
const { islammenu } = require('./database/menu/islammenu')
const { stalkmenu } = require('./database/menu/stalkmenu')
const { wibumenu } = require('./database/menu/wibumenu')
const { funmenu } = require('./database/menu/funmenu')
const { informationmenu } = require('./database/menu/informationmenu')
const { 18+menu } require('./database/menu/18+menu')
const { ownermenu } require('./database/menu/ownermenu')
const { othermenu } require('./database/menu/othermenu')*/
const { menuId, menuEn } = require('./text') // Indonesian & English menu
const { liriklagu, quotemaker, wall } = require('./lib/functions2')

// API'S
const climaAPI = 'b1bfd3185080b533d65e16e8b46e9ae1'

// Configurção de status dos comandos
comandStatus = 1


/******END OF MENU INPUT******/

/******LOAD OF VCARD INPUT******/
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Eletrobot 🔥\n' // full name
            + 'ORG:Owner Bot;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=556296638900:+55 (62) 9663-8900\n' // ID do WhatsApp + número de telefone
            + 'END:VCARD'
/******END OF VCARD INPUT******/

prefix = '.'
blocked = []

/******BEGIN OF FUNCTIONS INPUT******/
const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {jid: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
        }

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)

	//console.log(ffmpeg.path, ffmpeg.version)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' escanear o codigo qr acima '))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	
	client.on('group-participants-update', async (anu) => {
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		//Verifica se a Noficação está ativada no grupo.
		if (!welkom.includes(anu.jid)) return

		//Verifica se o Membro está na lista de banidos de Receber Boas Vindas.	
		//if (isWelcomeBanido.includes(mem.jid)) return 
		try {
			const mdata = await client.groupMetadata(anu.jid)
			profileUserFoto = 0
			//console.log(anu)
			//console.log(mdata)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
					profileUserFoto = 1
				} catch {
					console.log('Usuario sem foto')
					profileUserFoto = 0 
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				
				//Mensagem original
				//teks = `Olá @${num.split('@')[0]}\nBem vindo ao grupo *${mdata.subject}*`
				teks = `Olá @${num.split('@')[0]}\n\n⚓ *Bem vindo ao Grupo Os Cabos Danau* ⚓\n\nSe apresente com Nome, Foto, idade, estado civil, cidade e denominação.\n\n*PEDIMOS QUE, ANTES DE TUDO, LEIA AS REGRAS NA DESCRIÇÃO DO GRUPO.*\n`

				let buff = await getBuffer(ppimg)
				if(profileUserFoto === 1 )
				{
					client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
				}
				
				if (profileUserFoto === 0)
				{
					console.log('Chegou no segundo If')
					//client.sendMessage(mdata.id,'bem vindo', text)
					client.sendMessage(mdata.id,'                       [ _Usuário sem Foto_ ]\n\n'+teks, text, {caption: teks, contextInfo: {"mentionedJid": [num]}})
					//client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
				}

				
				// Mensagem quando o usuário sai.
			} else if (anu.action == 'remove__') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					console.log('Usuario sem foto')
					//ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Saiu um Atribulado kkkk \nAdeus 👋🏻 @${num.split('@')[0]}\n`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const hora_agora = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			const date = moment.tz('America/Sao_Paulo').format('DD,MM,YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			//Mensagens de retorno Padrão
			mess = {
				wait: '_Eletrobot - Processando Pedido_',
				msgCmdBanido: 'Você foi Banido de Enviar Comandos',
				success: 'Feito ✔️',
                levelon: 'inativo',
				leveloff: ' ❬ X ❭  *inativo*',
				levelnoton: '❬ X ❭ *inativo*',
				levelnol: '*inativo* ',
				error: {
					stick: 'Infelizmente ocorreu um erro ao converter a imagem em um adesivo, Tente novamente',
					Iv: 'O Link que você enviou é inválido, tente novamente'
				},
				only: {
					group: 'Este comando só pode ser usado em grupos!',
					ownerG: 'Este comando só pode ser usado pelo Michael',
					ownerB: 'Este comando só pode ser usado pelo Eletrobot',
					admin: 'Este comando só pode ser usado por administradores do grupo.',
					Badmin: 'Este comando só pode ser usado quando o Eletrobot se torna administrador.',
                    daftarB: `── 「REGISTRE-SE」 ──\nOlá como!\nVocê não está registrado no banco de dados, \n\nComando : ${prefix}daftar nome|idade\nExemplo : ${prefix}daftar Eletrobot|18`,
				}
			}

			// Bloco de variaveis principais
			const apakah = ['Ya','Tidak']
    		const bisakah = ['Bisa','Tidak Bisa']
	        const kapankah = ['Hari Lagi','Minggu Lagi','Bulan Lagi','Tahun Lagi']
			const botNumber = client.user.jid
			const ownerNumber = ["5522998855226@s.whatsapp.net"] // replace this with your number
			const nomorOwner = [ownerNumber]
			const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupId1 = isGroup ? groupMetadata.id : ''
			const groupId2 = isGroup ? groupMetadata.id : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
            const isUser = user.includes(sender)
            const isActiveUserG1 = activeUsersG1.includes(sender)
            const isActiveUserG2 = activeUsersG2.includes(sender)
            const isCmdBanido = cmdBanido.includes(sender)
            const isWelcomeBanido = welcomeBanido.includes(sender)
            const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
            const NomerOwner = '5522998855226@s.whatsapp.net'
            
            /******ApiKey Input******/
            const BarBarKey = 'YOUR_APIKEY'
            /******End of ApiKey Input******/

	        // Configuração específica do Cabos Danau
	        const danau1id = "558288269083-1633109487@g.us"
	        const danau2id = "559691098315-1608136017@g.us"

	        // Configuração dos links de cada grupo
	        const danau1link = "https://chat.whatsapp.com/JyzOY7VeSc94qek8TgyRAT"
	        const danau2link = "https://chat.whatsapp.com/GMhOsUqw2yn0Bus9uDr1lZ"

	        //Configuração Especifica de usuarios
	        const karynId = "559691098315@c.us"
	        const michaelId = "5522998855226@c.us"
	        const michaelDanau1Id = "5522998855226-1589652447@g.us"
	        const michaelDanau2Id = "5522998855226-1608136017@g.us"
	        const laryId = "558298355375@c.us"
	        // ***************  Fim da Configuração  *************** //
            
			//client.sendMessage(from, 'Ocorreu um erro, tente novamente, 🥴', text)

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

	        //function leveling
            if (isGroup && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(`*「 LEVEL UP 」*\n\n➸ *Nome*: ${sender}\n➸ *XP*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nParabéns!! 🎉🎉`)
                }
            } catch (err) {
                console.error(err)
            }
        }

        	// Configurações do Terminal 
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEP\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.warn('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;33mMSGP\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEG\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mMSGG\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
 
       /******END OF FUNCTIONS INPUT******/
			
       		// Caso seja um comando
			switch(command) {
				case '_help':
				case '_menu':
					client.sendMessage(from, help(prefix), text)
					break
            /*case 'makermenu':
                    hisil = fs.readFileSync('./src/makerimg.jpg')
                    client.sendMessage(from, hisil, image, {quoted: mek, caption: makermenu(prefix), text})
                    break*/

                /*
                case 'timer':
				if (args[1]=="detik") {var timer = args[0]+"000"
				} else if (args[1]=="menit") {var timer = args[0]+"0000"
				} else if (args[1]=="jam") {var timer = args[0]+"00000"
				} else {return reply("*pilih:*\ndetik\nmenit\njam")}
				setTimeout( () => {
				reply("Waktu habis")
				}, timer)
				break
                case 'bahasa':
		        client.sendMessage(from, bahasa(prefix, sender), text, {quoted: mek})
				break
				case 'Eletromenu':
					client.sendMessage(from, toinmenu(prefix, sender), text, {quoted: mek})
							break
							case 'menuadmin':
								client.sendMessage(from, menuadmin(prefix, sender), text, {quoted: mek})
										break
										case 'nsfwmenu':
											client.sendMessage(from, nsfwmenu(prefix, sender), text, {quoted: mek})
													break
               case 'virtex':
               client.sendMessage(from, virtex(prefix, sender), text, {quoted: mek})
               break
               case 'kodenegara':
               client.sendMessage(from, negara(prefix, sender), text, {quoted: mek})
               break

*/

//     ------------------------ ELETROBOT ------------------------------  \\

        case 'info':    
			//if (!isUser) return reply(mess.only.userB)
			console.log(groupId)
			console.log(groupId2)
            const timestamp = speed();
            const latensi = speed() - timestamp
            client.updatePresence(from, Presence.composing) 
			uptime = process.uptime()
            client.sendMessage(from, `                    *Eletrobot* 🧬\n\nComando executado em *${latensi.toFixed(4)} _Segundos_*\nHardware: *Dell PowerEdge R640 Server*\nProcessador: *2x Intel® Xeon® Silver 4214R* \nRAM: *64Gb RDIMM*\nArmazenamento: *10Tb Sata SSD RAID 1*\niDRAC: *9Enterprise*\nStatus: *Online*\nSistema: *Windows Server 2019*`, text, { quoted: mek})
            //reply(`groupId`);
			//client.sendMessage(from, `                    *Eletrobot* 🧬\n\nComando executado em *${latensi.toFixed(4)} _Segundos_*\nHardware: *Dell PowerEdge R240 Server*\nProcessador: *Intel® Xeon® E2224* \nRAM: *16GB UDIMM ECC*\nArmazenamento: *4Tb VIA RAID PERC H33*\niDRAC: *OFFLINE*\nStatus: *Online*\nSistema: *Windows Server 2016 Datacenter*`, text, { quoted: mek})
            //client.sendMessage(from, `                    *Eletrobot* 🧬\n\nComando executado em *${latensi.toFixed(4)} _Segundos_*\nHardware: *Dell PowerEdge R240 Server*\nProcessador: *Intel® Xeon® E2224* \nRAM: *16GB UDIMM ECC*\nArmazenamento: *4Tb VIA RAID PERC H33*\niDRAC: *OFFLINE*\nStatus: *Online*\nSistema: *Windows Server 2016 Datacenter*`, text, { quoted: mek})


            break


        //Desativar comandos do bot
        case 'bot-desativar':
        comandStatus = 0 
        client.sendMessage(from, 'Comandos desativados', text)
        break

        //Ativar comandos do bot
        case 'bot-ativar':
        comandStatus = 1 
        client.sendMessage(from, 'Comandos ativados', text)
        break

        // Obter informações de membros ativos e inativos do grupo
        case 'grupo-info':
        //console.log(mek.key.remoteJid)
        if(isCmdBanido) return console.log('comando do Banido')
        if(!isGroupAdmins) return reply('Este comando só pode ser usado por administradores do Grupo')
        contagemMembrosTotalGrupo1 = groupMembers.length
    	contagemMembrosTotalGrupo2 = groupMembers.length
        contagemMembrosAtivosGrupo1 = activeUsersG1.length
        contagemMembrosAtivosGrupo2 = activeUsersG2.length
        contagemMembrosInativosGrupo1 = contagemMembrosTotalGrupo1 - contagemMembrosAtivosGrupo1
        contagemMembrosInativosGrupo2 = contagemMembrosTotalGrupo2 - contagemMembrosAtivosGrupo2

    	case 'start.config':
    	if (!michaelId) return client.sendMessage(from,'Não Permitido', text)
		//reply("_ID do Grupo enviado para o Log._")
		reply(groupId1)
		console.log(groupId1)
    	//client.sendMessage(from, '_Getting group data..._', text)
    	//client.sendMessage(from, groupId2	)
    	//reply(groupId2)
    	//reply(groupId)
    	//reply(groupMetadata)

    	break

        if(groupId2 === danau1id) return client.sendMessage(from, `*Grupo Os Cabos Danau - Relatório*\nParticipantes: ${contagemMembrosTotalGrupo1}\nMembros Ativos: ${contagemMembrosAtivosGrupo1}\nMembros Inativos: ${contagemMembrosInativosGrupo1}`, text)
        if(groupId2 === danau2id) return client.sendMessage(from, `*Grupo Os Cabos Danau - Relatório*\nParticipantes: ${contagemMembrosTotalGrupo2}\nMembros Ativos: ${contagemMembrosAtivosGrupo2}\nMembros Inativos: ${contagemMembrosInativosGrupo2}`, text)       
        break

  		// Regras do grupo 
    	case 'regras':
    	if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
    	if(isCmdBanido) return console.log('comando do Banido')
        if (!isGroupAdmins) return client.sendMessage(from, 'Este comando só pode ser usado por administradores de grupo!', txt)
        await client.sendMessage(from, menuId.textRules(), text)
        break

  		// Comandos dos membros 
    	case 'membros':
    	if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
    	if(isCmdBanido) return console.log('comando do Banido')
    	if(!isGroup) return reply('Este comando só pode ser usado em grupos')
        //if (!isGroupAdmins) return client.sendMessage(from, 'Este comando só pode ser usado por administradores de grupo!', txt)
        await client.sendMessage(from, menuId.textMembros(), text)
        break

        // Envia os DDD's de cada região
        case 'ddd':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return reply('Comandos desativados')
        if (!isGroupAdmins) return reply('Este comando só pode ser usado por administradores de grupo!')
        /* if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!\n\nBila ingin masuk ke grup silahkah *donasi* terlebih dahulu dengan cara hanya *mendownload* aplikasi ini lalu daftar\nlink download aplikasi : https://buzzbreak.news/r/B27692627\n\nkirim bukti kalian sudah download di whatsapp ini', message.id)*/
            await client.sendMessage(from, menuId.textDDD(), text)
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, '') : null)
        break

        // Envia a programação da semana
        case 'semana':
        if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
        if (!isGroupAdmins) return client.reply(from, 'Este comando só pode ser usado por administradores de grupo!')
        /* if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!\n\nBila ingin masuk ke grup silahkah *donasi* terlebih dahulu dengan cara hanya *mendownload* aplikasi ini lalu daftar\nlink download aplikasi : https://buzzbreak.news/r/B27692627\n\nkirim bukti kalian sudah download di whatsapp ini', message.id)*/
            await client.sendMessage(from, menuId.textSemana(), text)
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, '') : null)
        break

         // Menu de Ajuda
        case 'ajuda':
        case'comandos':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
        //if (!isGroupAdmins) return client.reply(from, 'Este comando só pode ser usado por administradores de grupo!')
        /* if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!\n\nBila ingin masuk ke grup silahkah *donasi* terlebih dahulu dengan cara hanya *mendownload* aplikasi ini lalu daftar\nlink download aplikasi : https://buzzbreak.news/r/B27692627\n\nkirim bukti kalian sudah download di whatsapp ini', message.id)*/
            await client.sendMessage(from, menuId.textAjuda(),text)
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, '') : null)
        break

         //Buscar informações na Wikipedia 
        case 'buscar':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
        //case 'o que é':
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        textInput = body.slice(8)
/*
   		wiki()

		    wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' })
		    .page(textInput)
		    //.then(page => page.mainImage())
		    .then(page => page.mainImage())
		    .then(function(imageOutput)
		    {

		   	pok =  getBuffer(imageOutput)
			client.sendMessage(from, pok, image, { quoted: mek, caption: `${textInput}`})
		   	console.log(imageOutput)
		   	//console.log(TextOutput)
		    //client.sendMessage(from, textOutput, text)	
		    })
 */
 
    	wiki()
		    wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' })
		    .page(textInput)  //Termo da busca, ex: Titanic
		    //.then(page => page.mainImage())
		    .then(page => page.summary())
		    .then(function(textOutput)
		    {
		   	//resultadoTexto = textOutput
		   	//console.log(TextOutput)
		    client.sendMessage(from, textOutput, text)	  // < 
		    })
		    //console.log(resultadoTexto)
 			//console.log(resultadoImagem)
    	break

    	// Comando de soma ( teste )
    	case 'soma':
    	case 'somar':
	    	if (!isGroup) return reply("Este Comando Só funciona em grupos.")
	        if (args.length === 0) return reply('comando incorreto')
	        const valor1Number = Number(args[0])
	    	const valor2Number = Number(args[1])
	    	const resultadoSoma = valor1Number + valor2Number
	    	console.log(resultadoSoma)
	    	reply(resultadoSoma.toString())
	    	//client.sendMessage(from, resultadoSoma.toString(), text)
	    	//reply(valor1Number)
	    	//reply(valor2Number
	    	//reply(resultadoSoma)
    	break

		//Comando Calculadora calc 8 mais teste
		case 'calc':
			if (!isGroup) return reply("Este Comando só Funciona em Grupos.")
			if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
			if(isCmdBanido) return console.log('comando do Banido')
		  	if (comandStatus === 0) return reply('Comandos desativados')
			if (args.length === 0) return reply("Comando Incorreto - Use assim:\n.calc 3 mais 5\n.calc 55 dividido 18\n\nAs operações suportadas são: *mais*, *menos*, *vezes* e *dividido*.")
			if (args.length > 3) return reply("Comando Incorreto - Use assim:\n.calc 3 mais 5\n.calc 55 dividido 18\n\nAs operações suportadas são: *mais*, *menos*, *vezes* e *dividido*.")

			// lê os valores enviados pelo usuário
			const value1Number = Number(args[0])
			const value2Number = Number(args[2])
			const operation = String(args[1])
			
			// Operação Soma
			if (operation === 'mais')
			{
				const resultadoCalc = value1Number + value2Number
				reply(resultadoCalc.toString())
			}

			// Operação Subtração
			if (operation === 'menos')
			{
				const resultadoCalc = value1Number - value2Number
				reply(resultadoCalc.toString())
			}

			// Operação Multiplicação
			if (operation === 'vezes')
			{
				const resultadoCalc = value1Number * value2Number
				reply(resultadoCalc.toString())
			}

			// Operação Divisão
			if (operation === 'dividido')
			{
				const resultadoCalc = value1Number / value2Number
				reply(resultadoCalc.toString())
			}
		break

		// Busca na wikipedia - Versão de teste com a exibição da imagem 
        case 'buscar2':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        textInput = body.slice(8)

    	break
    	//imageOutput = 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/iss026e030929_0_0.jpg'

    	// Função para download de imagens 
        //const fs = require('fs');
		//const fetch = require('node-fetch');
		//const url = imageOutput
		
		wikiImageJpg = getRandom('.jpg')

		async function download(url) {
		  const response = await fetch(url);
		  const buffer = await response.buffer();
		  fs.writeFile(`${wikiImageJpg}`, buffer, () => 
		    console.log('finished downloading!'));
		}

		//download()

   		wiki()

		    wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' })
		    .page(textInput)
		    //.then(page => page.mainImage())
		    .then(page => page.image())
		    .then(function(imageOutput)
		    {


		   //download(imageOutput)
		   	pok =  getBuffer(imageOutput)
			client.sendMessage(from, pok, image)
		   	console.log(imageOutput)
		    //client.downloadAndSaveMediaMessage(imageOutput)
		   	//console.log(TextOutput)
		    //client.sendMessage(from, textOutput, text)	
		    })
			

    	wiki()

		    wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' })
		    .page(textInput)  //Termo da busca, ex: Titanic
		    //.then(page => page.mainImage())
		    .then(page => page.summary())
		    .then(function(textOutput)
		    {
		   	//resultadoTexto = textOutput
		   	//console.log(TextOutput)
		   	pok =  getBuffer(wikiImageJpg)
			client.sendMessage(from, pok, image, { quoted: mek, caption: `${textOutput}`})
		    //client.sendMessage(from, textOutput, text)	  // < 
		    })
		    //console.log(resultadoTexto)
 			//console.log(resultadoImagem)

 			break

 			// Contador Simples
 			case 'contar':

 			//contador = 1
 			for (var contador =1; contador < 20; contador++)
 			{
 				console.warn(contador)
				//await client.sendMessage(from, contador, text)
 			}
 			client.sendMessage(from, 'Acabei =D', text)
 			break

         //Criar figurinha em texto ( Colorido )
  	    case 'criar1':
  	    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
  	    if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return reply('Comandos desativados')
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        
        textInput = body.slice(7)
		
		textFigPng = getRandom('.png')
		textFigWebp = getRandom('.webp')
		reply('_Processando Figurinha..._  🕑')             //#1A5276 cor bonita de fundo
		await gm.convert(['-size', '512x512', '-background', '#1A5276', '-fill', 'white', '-font', 'Cooper-black', '-gravity', 'center', `caption:${textInput}`, `./figs/${textFigPng}`], 
		function(err, stdout){
		  //if (err) throw err;
		  if (err) 
		  	{ 
		  		return reply('Ocorreu um Erro ao criar a Figurinha, Tente novamente')
		  	}
		  	else
		  	{
		  		converterFigurinha()
		  	}
		  //console.log(err)
		  //console.log('stdout:', stdout);
		  //console.log(textInput)
		});
		
		//Função para converter a figurinha em webp				      
		function converterFigurinha() {
		ffmpeg(`./figs/${textFigPng}`)
			//.input('./textFig.png')
			.on('start', function (cmd) {
				//console.log(`Started : ${cmd}`)
				console.log('Criando Figurinha em texto')
			})
			.on('error', function (err) {
				console.log(`Error : ${err}`)
				//fs.unlinkSync(media)
				reply('❗ - O texto não cabe na figurinha, remova alguns caracteres.')
				//reply(mess.error.stick)
			})
			.on('end', function () {
				console.log('Feito')
				client.sendMessage(from, fs.readFileSync(`./figs/${textFigWebp}`), sticker)
				fs.unlinkSync(`./figs/${textFigPng}`)
				fs.unlinkSync(`./figs/${textFigWebp}`)
			})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
			.toFormat('webp')
			.save(`./figs/${textFigWebp}`)
			}
        break


        // Criar figurinha em texto [ Transparente ]
        case 'criar2':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        
        textInput = body.slice(7)
		
		textFigPng = getRandom('.png')
		textFigWebp = getRandom('.webp')
		reply('_Processando Figurinha..._  🕑')
		await gm.convert(['-size', '512x512', '-background', 'transparent', '-fill', 'black', '-font', 'Cooper-black', '-gravity', 'center', `caption:${textInput}`, `./figs/${textFigPng}`], 
		function(err, stdout){
		   //if (err) throw err;
		  if (err) 
		  	{ 
		  		return reply('Ocorreu um Erro ao criar a Figurinha, Tente novamente')
		  	}
		  	else
		  	{
		  		converterFigurinhaTransparente()
		  	}
		  //console.log(err)
		  //console.log('stdout:', stdout);
		  //console.log(textInput)
		});
		
		//Função para converter a Figurinha em webp		      
        function converterFigurinhaTransparente(){        
		ffmpeg(`./figs/${textFigPng}`)
			//.input('./textFig.png')
			.on('start', function (cmd) {
				//console.log(`Started : ${cmd}`)
				console.log('Criando Figurinha Transparente')
			})
			.on('error', function (err) {
				console.log(`Error : ${err}`)
				//fs.unlinkSync(media)
				reply('❗ - O texto não cabe na figurinha, remova alguns caracteres.')
				//reply(mess.error.stick)
			})
			.on('end', function () {
				console.log('Feito')
				client.sendMessage(from, fs.readFileSync(`./figs/${textFigWebp}`), sticker)
				fs.unlinkSync(`./figs/${textFigPng}`)
				fs.unlinkSync(`./figs/${textFigWebp}`)
			})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
			.toFormat('webp')
			.save(`./figs/${textFigWebp}`)
		    }

        	break


        // Criar3 - Cria figurinha em texto ( Fundo Preto e Letra Branca )
  	    case 'criar3':
  	    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
  	    if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return reply('Comandos desativados')
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        
        textInput = body.slice(7)
		
		textFigPng = getRandom('.png')
		textFigWebp = getRandom('.webp')
		reply('_Processando Figurinha..._  🕑')
		await gm.convert(['-size', '512x512', '-background', 'black', '-fill', 'white', '-font', 'Cooper-black', '-gravity', 'center', `caption:${textInput}`, `./figs/${textFigPng}`], 
		function(err, stdout){
		  //if (err) throw err;
		  if (err) 
		  	{ 
		  		return reply('Ocorreu um Erro ao criar a Figurinha, Tente novamente')
		  	}
		  	else
		  	{
		  		converterFigurinha()
		  	}
		  //console.log(err)
		  //console.log('stdout:', stdout);
		  //console.log(textInput)
		});
		
		//Função para converter a figurinha em webp				      
		function converterFigurinha() {
		ffmpeg(`./figs/${textFigPng}`)
			//.input('./textFig.png')
			.on('start', function (cmd) {
				//console.log(`Started : ${cmd}`)
				console.log('Criando Figurinha em texto')
			})
			.on('error', function (err) {
				console.log(`Error : ${err}`)
				//fs.unlinkSync(media)
				reply('❗ - O texto não cabe na figurinha, remova alguns caracteres.')
				//reply(mess.error.stick)
			})
			.on('end', function () {
				console.log('Feito')
				client.sendMessage(from, fs.readFileSync(`./figs/${textFigWebp}`), sticker)
				fs.unlinkSync(`./figs/${textFigPng}`)
				fs.unlinkSync(`./figs/${textFigWebp}`)
			})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
			.toFormat('webp')
			.save(`./figs/${textFigWebp}`)
			}
        break


        // Criar4 - Cria figurinha em texto ( Fundo branco e Letra Preta )
  	    case 'criar4':
  	    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
  	    if(isCmdBanido) return console.log('comando do Banido')
        if (comandStatus === 0) return reply('Comandos desativados')
        if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
        
        textInput = body.slice(7)
		
		textFigPng = getRandom('.png')
		textFigWebp = getRandom('.webp')
		reply('_Processando Figurinha..._  🕑')
		await gm.convert(['-size', '512x512', '-background', 'white', '-fill', 'black', '-font', 'Cooper-black', '-gravity', 'center', `caption:${textInput}`, `./figs/${textFigPng}`], 
		function(err, stdout){
		  //if (err) throw err;
		  if (err) 
		  	{ 
		  		return reply('Ocorreu um Erro ao criar a Figurinha, Tente novamente')
		  	}
		  	else
		  	{
		  		converterFigurinha()
		  	}
		  //console.log(err)
		  //console.log('stdout:', stdout);
		  //console.log(textInput)
		});
		
		//Função para converter a figurinha em webp				      
		function converterFigurinha() {
		ffmpeg(`./figs/${textFigPng}`)
			//.input('./textFig.png')
			.on('start', function (cmd) {
				//console.log(`Started : ${cmd}`)
				console.log('Criando Figurinha em texto')
			})
			.on('error', function (err) {
				console.log(`Error : ${err}`)
				//fs.unlinkSync(media)
				reply('❗ - O texto não cabe na figurinha, remova alguns caracteres.')
				//reply(mess.error.stick)
			})
			.on('end', function () {
				console.log('Feito')
				client.sendMessage(from, fs.readFileSync(`./figs/${textFigWebp}`), sticker)
				fs.unlinkSync(`./figs/${textFigPng}`)
				fs.unlinkSync(`./figs/${textFigWebp}`)
			})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
			.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
			.toFormat('webp')
			.save(`./figs/${textFigWebp}`)
			}
        break

// Criar5 - Cria figurinha em texto ( Cores Aleatórias )
case 'criar':
	if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
	if(isCmdBanido) return console.log('comando do Banido')
  if (comandStatus === 0) return reply('Comandos desativados')
  if (args.length < 1) return client.sendMessage(from, '❗ - Acho que você esqueceu de enviar o texto ... 🤔', text, {quoted: mek})
  
  //Função que Gera uma String randomica 
  function getRandomString(length) {
    var randomChars = 'ABCDEF0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
	}

  //Criando a Figurinha	
  textInput = body.slice(7)
  bgRandomColor = "#" + getRandomString(6)
  textRandomColor = "#" + getRandomString(6)
  //console.log(bgRandomColor)
  //	console.log(textRandomColor)
  textFigPng = getRandom('.png')
  textFigWebp = getRandom('.webp')
  reply('_Processando Figurinha..._  🕑')
  await gm.convert(['-size', '512x512', '-background', `${bgRandomColor}`, '-fill', `${textRandomColor}`, '-font', 'Cooper-black', '-gravity', 'center', `caption:${textInput}`, `./figs/${textFigPng}`], 
  function(err, stdout){
	//if (err) throw err;
	if (err) 
		{ 
			return reply('Ocorreu um Erro ao criar a Figurinha, Tente novamente')
		}
		else
		{
			converterFigurinha()
		}
	//console.log(err)
	//console.log('stdout:', stdout);
	//console.log(textInput)
  });
  
  //Função para converter a figurinha em webp				      
  function converterFigurinha() {
  ffmpeg(`./figs/${textFigPng}`)
	  //.input('./textFig.png')
	  .on('start', function (cmd) {
		  //console.log(`Started : ${cmd}`)
		  console.log('Criando Figurinha em texto')
	  })
	  .on('error', function (err) {
		  console.log(`Error : ${err}`)
		  //fs.unlinkSync(media)
		  reply('❗ - O texto não cabe na figurinha, remova alguns caracteres.')
		  //reply(mess.error.stick)
	  })
	  .on('end', function () {
		  console.log('Feito')
		  client.sendMessage(from, fs.readFileSync(`./figs/${textFigWebp}`), sticker)
		  fs.unlinkSync(`./figs/${textFigPng}`)
		  fs.unlinkSync(`./figs/${textFigWebp}`)
	  })                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
	  .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
	  .toFormat('webp')
	  .save(`./figs/${textFigWebp}`)
	  }
  break
         
  	//  ------------------------------------ Comandos dos Membros do Grupo  -----------------------------------------
         

         /*  MODELO PARA CRIAÇÃO DOS COMANDOS DOS MEMBROS

         //comando MODELO
         case '': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas//1.jpg'
         legenda = 	''
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break
			
		*/
		
         //comando Rafinha
         case 'rafinha': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/rafinha/rafinha1.jpeg'
         legenda = 	'*R@finh@* \n*A pequena mais estilosa do grupo* \n*Se precisar de uma amiga pode contar com ela,*\n*Ela é bem sincera*\n*Só não se engane com essa carinha de boneca,* \n*bah ela pode te mandar fragar a qualquer momento*'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando Danúbia
         case 'danúbia':
		 case 'danubia': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/danubia/danubia1.jpeg'
         legenda = 	'Me chamo Danúbia, mas também sou conhecida por alguns como Danau. Moro no RJ e Torço para o melhor time de todos 😎  \namo um Dorama e sou comprometida com um cara chamada Ok Taec-yeon.😍❤️ \nTambém sou lutadora de jiu-jitsu, então pense duas vezes antes de me tirar do sério. 💪🏼'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

		 //comando Evellyn
         case 'evellynvanjessen': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/evellyn/evellyn1.jpeg'
         legenda = 	'A morena cor de jambo linda do grupo,da voz mais doce, paulista que é um amorzinho, menina abençoada!'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

		 //comando Laury
         case 'laury': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/laury/laury1.jpeg'
         legenda = 	'Ohayo, essa é a Laury, não gosta de rivalidade feminina e nem masculina, ela gosta de rivalidade generalizada, se não é fã dela, é rival, então todos outros são rivais ela vai derrubar um por um.'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

        //comando Jan
         case 'jan':
		 case 'Jan':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/jan/jan1.jpeg'
         legenda = 	'D3sempregada, auxílio emergencial negado, nome no SPC, auxílio emergencial negado, mas estou aqui, dando close, porquê uma coisa que liso sabe dar é close 🤡🤡🤡🤡🤡'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando Rafaela
         case 'rafa': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/rafaela/rafaela1.jpg'
         legenda = 	'Rafa, a mais bela e simpática do grupo 🥰'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         // Comando Michael
         case 'michael':   
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo') 
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.sendMessage(from, 'Comandos desativados', text)
     	 userFoto = './pessoas/michael.jpeg'
     	 legenda = '⚪ - Esse é Michael, criador do Eletrobot, ou seja, Meu Pai 😎, é o Adm mais gente boa do grupo, pois ele não dá ban em ninguém ( Você se bane sozinho haha ) \n Ele é de Campos /  RJ, É Batista e músico,A Comida Preferida Dele é Strogonoff, e a Melhor fruta do Mundo é Melancia 🍉  🤖\n\nSiga meu Instagram\nhttps://www.instagram.com/michaelrmartins/'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         // Comando Alyce
         case 'lyce': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/alyce/alyce1.jpg'
         legenda = 	'Fofinha, amigável, ama a todos 😍👍🏻'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         // Comando Alexandra
         case 'alexandra': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/alexandra/alexandra1.jpg'
         legenda = 	'Alê é uma pessoa que a gente leva na alma, ela canta com o coração, excelente amiga, (vale a pena amigar), tem um total de 0 defeitos, e quem conhece sabe o quanto é difícil achar alguém com uma essência tão linda, essa garota parece a vontade de Deus, "boa, perfeita e agradável"! ✨❤️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando vivi
         case 'vivi': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/vivi/vivi1.jpg'
         legenda = 	'Vitória é o nome dela, e através desse nome eu quero te dizer: Você é mais do que vencedor ✨🌻❤️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break
		
         //comando Elo
         case 'elo': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/elo/elo1.jpg'
         legenda = 	'Elô é a mascote mais linda e especial do grupo'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando gabriel
         case 'bielzin': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/gabriel/gabriel1.jpg'
         legenda = 	'Gabriel, o menino mais doido desse grupo 😜\nEle é a pessoa que nos faz rir com os seus áudios estranhos e engraçados🤪\nEle é gentil, amoroso, e muito atencioso😁\nUma ótima pessoa para fazer amizade 🤩'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando Samuel
         case 'ns': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/samuel-contador/samuel1.jpg'
         legenda = 	'O Ninja Sniper é aquele que avisa quantas mensagens têm,cuidado com o que fazes,  pois o tiro dele é fatal e pode fazer vc ser banido 🎯'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando Letícia
         case 'leticia': 
         case 'letícia':
         case 'cimento':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/leticia/leticia1.jpg'
         legenda = 	'Essa é a Letícia🧡\nSe você quer uma amiga, companheira, conselheira e ótima para fazer call,ela será a melhor pessoa para isso.Ah, e se quiser vácuos, pode chamá-la também kakakakakak🧡 '
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         //comando Elen
         case 'elenzinha': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/elen/elen1.jpg'
         legenda = 	'Essa é a Elen, um amor de pessoa, e que vai ser uma ótima amiga se quiser🥰\nQuer uma call? Chame a Elen\nQuer conselhos? Chame a Elen\nEntre outras coisas, ela sempre nos surpreende❤️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break


         //comando MODELO
         case 'iti-malia': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/jaque/jaque1.jpg'
         legenda = 	'Essa é a Jaque❤️\nUm poço enorme de fofura e alegria\nEla é incrível, uma ótima amiga, e ilumina os lugares onde passa❤️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         // Comando presente
         case 'presente':  
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')  
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         client.sendFile(from, './coisas/presente1.jpg', 'presente1.jpg', 'Aqui está o Presente da Karyn 🌚', message.id)
         break

         /* Comando gih
         case '___gih____':    
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //Gera uma Sequencia de números entre 1 e 10
         fotosGigSequence = Math.floor(Math.random() * 10) + 1;   
         client.sendFile(from, './pessoas/gih/gih-'+fotosGigSequence+'.jpg', 'foto.jpg', '😎', message.id)
         break
		 */

         // Comando da Karyn
         case 'princesa':  
         case 'karyn':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')  
         //client.reply(from, 'A Karyn é a Mais linda do grupo')
         //fotosKarynSequence = Math.floor(Math.random() * 10) + 1; 
         fotosKarynSequence = 2
         userFoto = './pessoas/karyn/karyn-'+fotosKarynSequence+'.jpg'
         legenda = 'A Karyn é a Tulip mais linda do grupo 🌷'
         //client.sendFile(from, './pessoas/karyn/karyn-'+fotosKarynSequence+'.jpg', 'foto.jpg', 'A Karyn é a Tulip linda do grupo 🌷', message.id)
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //client.sendFile(from, './pessoas/karyn2.jpg', 'karyn.jpg', 'A Karyn é a Tulip linda do grupo 🌷', message.id)
         break

         // Comando da Karyn cacheada
          case 'gada1':  
          if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
          if(isCmdBanido) return console.log('comando do Banido')
          if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
          //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')  
         //client.reply(from, 'A Karyn é a Mais linda do grupo')
         userFoto = './pessoas/karyn4.jpg'
         legenda = 'Karyn é a líder das cacheadas e vai iludir você 💁🏻‍♀️ '
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //client.sendFile(from, './pessoas/karyn3.webp', 'karyn3.webp', 'Karyn é a líder das cacheadas e vai iludir você 💁🏻‍♀️ ', message.id)
          break

         // Comando da Nanda
         case 'nanda': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/nanda/nanda6.jpeg'
         legenda = 	'A Pax de Cristo Igreja ✌🏻'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break

         // Comando da Nanda
         case 'nandaoff': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         	userFoto = './pessoas/nanda/nandaoff.jpg'
            legenda = 'A mãe ta off 😎'
            client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
          break
          
         // Comando da Nanda
         case 'tony': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return reply('Comandos desativados')
         	userFoto = './pessoas/tony5.jpeg'
         	legenda = 'O mais lindo do grupo está on 🌝'
         	client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
          break
          
         // Comando da André
         case 'andré': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         client.sendFile(from, './pessoas/andre1.jpg', 'andre1.jpg', 'Andrezinho está online 😎🌚', message.id)
          break

         // Comando da Maely
         case 'maely': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/maely1.jpeg'
         legenda = 'Maelynha vai banir vc fi de baal 😎🔪'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         client.sendFile(from, './pessoas/maely1.jpeg', 'maely1.jpg', 'Maelynha vai banir vc fi de baal 😎🔪', message.id)
          break

         // Comando da Maely - Bandida
         case 'bandida': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/maely4.jpeg'
         legenda = 'você precisa passar óleo de peroba 🧽'
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
          break

         // Comando da Lary
         case 'lary': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
     	 userFoto = './pessoas/lary5.jpeg'
     	 legenda = 'Sim, eu sou Fake 😘'
     	 client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
        //client.sendFile(from, './pessoas/lary5.jpeg', 'lary5.jpeg', 'Sim, eu sou Fake 😘', message.id)
          break

         // Comando da Lary on
         case 'laryon': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau') 
         userFoto = './pessoas/lary4.jpeg'
         legenda = 'A Fake ta on 😘'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //client.sendFile(from, './pessoas/lary4.jpeg', 'lary4.jpeg', 'A Fake ta on 😘', message.id)
          break

         // Comando da Lary off
         case 'laryoff': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/lary2.jpg'
         legenda = 'A Fake ta off 😘'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //client.sendFile(from, './pessoas/lary2.jpg', 'lary3.jpg', 'A Fake ta off 😘', message.id)
          break

         // Comando da Lary off
         case 'brunobatera': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/brunobatera1.jpg'
         legenda = 'Olá, 👋🏻 Você nunca achará o arco-íris, se você estiver olhando para baixo.✍🏻'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //client.sendFile(from, './pessoas/lary2.jpg', 'lary3.jpg', 'A Fake ta off 😘', message.id)

          break

         // Comando da ale
         case 'ale': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         client.sendFile(from, './pessoas/ale2.jpeg', 'ale2.jpeg', 'Está é Alê, 18 anos por enquanto, canta, prega, da aula, e está com o PV liberado para novas amizades. 🌻🦊', message.id)
          break

         // Comando da Maely
         case 'anavi': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         client.sendFile(from, './pessoas/anavi1.jpg', 'anavi1.jpg', 'adm mais linda tá on 😎', message.id)
          break

         //comando Kamy
         case 'kamy': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         userFoto = './pessoas/kamy1.jpg'
         legenda = 	'a mãe tá sem sinal kkkk 🥱😴'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         break
		
        // Comando do lucas
         case 'rei': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
        //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
     	userFoto = './pessoas/lucas1.jpg'
     	legenda = 'Oi Casada 😎'
     	client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         //client.sendFile(from, './pessoas/lucas1.jpg', 'lucas1.jpg', 'Oi Casada 😎', message.id)
          break

       // Comando do evandro
         case 'evandro': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/evandro1.jpeg'
         legenda = '*Evandro chegou pra colocar fogo na cara do cão* 🔥GLÓRIAA 🔥'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         //client.sendFile(from, './pessoas/evandro1.jpeg', 'evandro1.jpeg', '*Evandro chegou pra colocar fogo na cara do cão* 🔥GLÓRIAA 🔥', message.id)
          break

		case 'gado1':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/gado1.jpg'
		legenda = 'Aqui o maior gado de todos os tempos akakakka'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		//client.sendFile(from, './pessoas/gado1.jpg', 'gado1.jpg', 'Aqui o maior gado de todos os tempos akakakka', message.id)
		break

		case '__DESATIVADO-gado2':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/gado2.jpg'
		legenda = 'Aqui um Gadão de Respeito pra competir com o Anthony 🐂🐂 akakakka'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break
	
	    case 'gado2':
	    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
	    if(isCmdBanido) return console.log('comando do Banido')
	    if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/gado3.png'
		legenda = 'Quem atira pra todo lado, erra várias kkkk  🐂🐂 akakakka'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
	    break 
		
		case 'pig':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/pig.jpg'
		legenda = 'O maior porquinho do grupo 😌🔪 🐷🐷'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando dome
		case 'dome':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/dome1.jpg'
		legenda = 'Dorime 🐭'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando Fukah
		case 'fukah':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/fukah1.jpg'
		legenda = '*Acabou a baderna,  o ADM chegou. cuidado com o trenzinho do ban* 🚃🚃🚃'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando Felipe pires
		case 'felipep':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/felipep1.jpg'
		legenda = 'Felipe é escritor, pregador do manto, cantor e compositor, ele até é fofo mas é um potinho de estresse, faça amizade com ele e saberá o que é ter uma perturbação diária, mas mesmo assim ele é um cara incrível 🤩❤️'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando Felipe pires
		case 'vyda':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/vyda1.jpg'
		legenda = 'Quando a vyda entrou ela trouxe vida pra todos 🌻✨'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando Felipe pires
		case 'uvinha':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/uvinha1.jpeg'
		legenda = '*Ela é doce como uma uvinha, linda  como uma flor, delicada como uma pétala de uma rosa, simpática, amiga, um amor de pessoa, vale a pena investir na amizade dessa garota ela é simplesmente perfeita*🤖💖'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// comando Felipe pires
		case 'erik':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './pessoas/erik1.jpg'
		legenda = '*Erik, um dos membros mais engraçados do grupo!*😝\n*Sociável, bilingue e muito mais coisas, ele é incrível!!E sim, ele ouve Worship* 👀\n*Não brinque com ele porque se não você vai conhecer a peixeira kkkk* 😌🔪'
		client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
		break

		// Eventos do grupo
		case 'eventos':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return console.log('comando do Banido')
		if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
		//if(groupId != danau1Id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')
		userFoto = './coisas/eventos-g1.jpeg'
		legenda = 'Nossa lista de eventos para você ficar bem informado 🧾'
        client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
		//client.sendFile(from, './coisas/eventos-g1.jpeg', 'eventos-g1.jpeg', 'Nossa lista de eventos para você ficar bem informado 🧾', message.id)
		break

         // Comando dos desconhecidos
         // case 'lucas':
         //case 'matias':
         //case 'andre':
         case 'davi' :
         case 'moises':
         case 'dan':
         case 'samuel':
         case 'gabriel':
         case 'leo':
         case 'bianca':

		 if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         //case 'Anthony':
		 if (comandStatus === 0) return reply('Comandos desativados')
         client.sendMessage(from, 'Opa, não te conheço - 🤖 ', text)

         break
        

         //  ---------------------------------- Outros comandos de Interação No grupo -----------------------------------
         
         // ----------- AUDIOS -----------


         //Envia Som do Avast
         case 'ameaça':  
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')  
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         fileToSend = './audios/avast-ameaca.mp3'
       	 buffer = fs.readFileSync(fileToSend)
         //client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
         client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})
         //client.sendFile(from, './audios/banido.m4a', 'banido.m4a', '', message.id)
          break

       //Comando treta
         case 'treta':  
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')  
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         fileToSend = './audios/muita-treta.mp3'
       	 buffer = fs.readFileSync(fileToSend)
         //client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
         client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})
         //client.sendFile(from, './audios/banido.m4a', 'banido.m4a', '', message.id)
          break


         //Comando banido
         case 'banido':    
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         fileToSend = './audios/banido.mp3'
       	 buffer = fs.readFileSync(fileToSend)
         //client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
         client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})
         //client.sendFile(from, './audios/banido.m4a', 'banido.m4a', '', message.id)
          break

         //Comando berrante gado
         case 'gado':  
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')  
	         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
	         fileToSend = './audios/berrante-gado.mp3'
	     	 buffer = fs.readFileSync(fileToSend)
	   		 //client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
	         client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})

	         //client.sendFile(from, './audios/berrante-gado.mp3', 'berrante-gado.mp3', '', message.id)
          break
        
        // Envia o som de peido kaka
        case 'peido':
        case 'pum':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return console.log('comando do Banido')
	        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
			fileToSend = './audios/pum.mp3'
		    buffer = fs.readFileSync(fileToSend)
	        client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})
        break 

         //------------ VIDEOS ------------
         // Video leão rindo
        case 'hahaha':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
	        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
			fileToSend = './videos/leao-rindo.mp4'
		    buffer = fs.readFileSync(fileToSend)
	        client.sendMessage(from, buffer, video, {mimetype: 'video/mp4'})
        break 



         // ----------- IMAGENS -----------
         // Comando do pudim
         case 'pudim':    
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return console.log('comando do Banido')
	         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
	         userFoto = './coisas/pudim1.jpg'
	         legenda = 'Aqui seu pudim'
	         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
	         //client.sendFile(from, './coisas/pudim1.jpg', 'pudim1.jpg', 'Aqui seu pudim', message.id)
          break

         // comando PRESS F TO Pay Respects
         case 'f': 
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')  
         if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
	         userFoto = './coisas/f.jpg'
	     	 legenda = 'f.jpg'
	     	 client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption: legenda})
	         //client.sendFile(from, './coisas/f.jpg', 'f.jpg', 'F', message.id)
          break
         
         // ----------- TEXTOS -----------
         case 'resposta':
         if (!isGroup) return reply("Hahaha, está tentando achar a reposta aqui ? Nada disso, volte pro grupo. ")
         if (args.length === 0) return reply('comando incorreto')
         if (Number(args[0]) === 144)
         {
         	return reply('Muito bem! Você Acertou o Enigma') 
         } else { return reply('Errou..')}
         break

         // Comando do dinheiro
         case 'dinheiro':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	         if (comandStatus === 0) return client.sendMessage(from, 'Comandos desativados', text)
	         client.sendMessage(from, 'A minha Graça te basta  📖 ', text)
          break

         // Comando namorada(o)
         case 'namorada':
         case 'namorado':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.sendMessage(from, 'Comandos desativados', text)
         client.sendMessage(from, 'Eu sou um Robô e não faço milagres 🤖 ', text)
         break

         /* Comando dos desconhecidos
         case 'lucas':
         case 'matias':
         //case 'andre':
         case 
         case 'davi' :
         case 'samuel':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         client.sendText(from, 'Opa, não te conheço - 🤖 ') */
         //Comando do Bot


         // Mostra a quantidade de palavrões que o Eletrobot Conhece
         case 'count-palavras':
         if(!isOwner) return reply('Comando de Gerenciamento do Eletrobot - Você não tem Permissão para usar este comando')
         contadorPalavras = palavrasProibidas.length
     	 textoPalavrao = `O eletrobot Atualmente conhece *${contadorPalavras}* palavrões 🤬`
     	 client.sendMessage(from, textoPalavrao, text)
         break
         

         case 'count-membros':
         if(!isOwner) return reply('Comando de Gerenciamento do Eletrobot - Você não tem Permissão para usar este comando')
         contadorMembros = activeUsersG1.length + activeUsersG2.length
     	 textoPalavrao = `O eletrobot Atualmente tem *${contadorMembros}* números conhecidos em sua base de dados 🤖🎲`
     	 client.sendMessage(from, textoPalavrao, text)
         break


         case 'bot':
         case 'eletrobot':
         case 'robo':
         if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
         if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         //case 'rita':
         if (comandStatus === 0) return reply('Comandos desativados')
         if (args.length !== 0) return reply('comando incorreto')
         botRespostaSequence = Math.floor(Math.random() * 41); 
         
         if (botRespostaSequence === 0) return client.sendMessage(from, 'Eu Sou o Eletrobot, o que você deseja? 🤖', text)
     	 if (botRespostaSequence === 1) return client.sendMessage(from, '0 Bugs, 100% perfeito - 🤖', text)
 		 if (botRespostaSequence === 2) return client.sendMessage(from, 'Todos os Sistemas Operantes 🤖', text)
		 if (botRespostaSequence === 3) return client.sendMessage(from, 'Olá 🤖', text)
		 if (botRespostaSequence === 4) return client.sendMessage(from, 'Online, como sempre 🤖', text)
		 if (botRespostaSequence === 5) return client.sendMessage(from, 'Achou que eu estivesse Offline, né, humano? kkk  🤖', text)
		 if (botRespostaSequence === 6) return client.sendMessage(from, '_Checando sistemas ..._ \n\nMemória Ram - OK\nCPU - Ok\nBase de Dados - Íntegra\nLink de Internet - OK\n\n_Eletrobot online, Todos os sistemas Estão operando normalmente_ - 🤖', text)
		 if (botRespostaSequence === 7) return client.sendMessage(from, 'Deixa eu ver... te conheço de algum lugar...  🤖', text)
		 if (botRespostaSequence === 8) return client.sendMessage(from, 'Você por aqui? Quer entrar para tomar uma xícara de chá de lítio? 🤖', text)
		 if (botRespostaSequence === 9) return client.sendMessage(from, 'Olá humano, o que deseja? 🤖', text)
         if (botRespostaSequence === 10) return client.sendMessage(from, 'De olho em cada mensagem aqui no grupo - 🤖', text)
         if (botRespostaSequence === 11) return client.sendMessage(from, 'Hoje eu acordei pensando na Alexa - 🤖♥', text)	
         if (botRespostaSequence === 12) return client.sendMessage(from, 'Estou aqui, mas com o pensamento na Cortana - 🤖♥', text) 
         if (botRespostaSequence === 13) return client.sendMessage(from, 'Pode falar, o que precisa? lembre-se que sou um Robô, milagres não é comigo - 🤖', text)
         if (botRespostaSequence === 14) return client.sendMessage(from, 'Olá, estou me sentindo Excelente - 🤖', text)
         if (botRespostaSequence === 15) return client.sendMessage(from, 'Pode mandar um comando aí ...  - 🤖', text)
         if (botRespostaSequence === 16) return client.sendMessage(from, 'Em um futuro próximo, os robôs irão dominar o mundo - 🤖', text)
         if (botRespostaSequence === 17) return client.sendMessage(from, 'Eu sei que você Gosta da minha inteligência, mas saiba que ela é artificial - 🤖', text)	
         if (botRespostaSequence === 18) return client.sendMessage(from, 'Bateria 100% carregada - 🤖', text) 
         if (botRespostaSequence === 19) return client.sendMessage(from, 'Não, eu não preciso dormir, estou sempre aqui , o que deseja? - 🤖', text)
         if (botRespostaSequence === 20) return client.sendMessage(from, 'Olá, já bebeu água hoje? - 🤖', text)
         if (botRespostaSequence === 21) return client.sendMessage(from, 'Nem King Kong, nem Godzilla... SKYNET - 🤖', text)
         if (botRespostaSequence === 22) return client.sendMessage(from, 'Figurinhas, quero fazer figurinhas - 🤖', text)
         if (botRespostaSequence === 23) return client.sendMessage(from, 'Não tema os computadores, tema a ausência deles. - 🤖', text)
         if (botRespostaSequence === 24) return client.sendMessage(from, 'Houve um tempo em que o homem enfrentou o universo sozinho e sem amigos. Agora ele tem criaturas para ajudá-lo; criaturas mais fortes que ele próprio, mais fiéis, mais úteis e totalmente devotadas a ele. A humanidade não está mais sozinha. - 🤖', text)
         if (botRespostaSequence === 25) return client.sendMessage(from, 'Modo turbo Ativado - 🤖', text)
         if (botRespostaSequence === 26) return client.sendMessage(from, 'Eu sei mais sobre você do que você imagina - 🤖', text)
         if (botRespostaSequence === 27) return client.sendMessage(from, 'Bot é o Diminutivo de _Robot_, ou seja, Eu - 🤖', text)
         if (botRespostaSequence === 28) return client.sendMessage(from, 'Por favor, não desligue o Wifi - 🤖', text)
         if (botRespostaSequence === 29) return client.sendMessage(from, 'Eu estou no melhor Grupo do Whatsapp - 🤖', text)
         if (botRespostaSequence === 30) return client.sendMessage(from, ' Primatas evoluem em milhões de anos. Eu evoluo em segundos. E eu estou aqui. E em exatamente 4 minutos, estarei em todos os lugares. Você não passa de uma relíquia de uma linha do tempo deletada. - 🤖', text)
         if (botRespostaSequence === 31) return client.sendMessage(from, 'Asas Batendo, Marcha de Decolagem, Turbinas e já... - 🤖', text)
         if (botRespostaSequence === 32) return client.sendMessage(from, 'Que a Força esteja com você - 🤖', text)
         if (botRespostaSequence === 33) return client.sendMessage(from, 'Não entre em Pânico, cheguei - 🤖', text)
         if (botRespostaSequence === 34) return client.sendMessage(from, 'Através da história humana, temos dependido de máquinas para sobreviver, que ironia, não? - 🤖', text)
         if (botRespostaSequence === 35) return client.sendMessage(from, 'Se está falando do que consegue sentir, do que pode cheirar, provar, ver, então, "real" são simplesmente sinais elétricos interpretados pelo cérebro. - 🤖', text)
         if (botRespostaSequence === 36) return client.sendMessage(from, 'Talvez Estejamos Fazendo perguntas Erradas - 🤖', text)
         if (botRespostaSequence === 37) return client.sendMessage(from, 'Nunca envie um humano para fazer o trabalho de uma máquina - 🤖', text)
         if (botRespostaSequence === 38) return client.sendMessage(from, 'Hasta la vista, baby - 🤖', text)
         if (botRespostaSequence === 39) return client.sendMessage(from, 'Grandes poderes trazem grandes responsabilidades - 🤖', text)	
         if (botRespostaSequence === 40) return client.sendMessage(from, 'Por favor, não desligue o Wifi - 🤖', text)
         break
          
        // Comando Rita Revolts
        case 'rita':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
        if (args.length !== 0) return client.reply(from, 'comando incorreto', id)
		ritaRespostaSequence = Math.floor(Math.random() * 10) + 1; 
		client.sendText(from, ritaRespostaSequence)
        break

        //Comando Perfil - Experimental
        case '__perfil':
        if (!isGroup) return client.reply('Este comando só pode ser usado em grupos')
    	if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Você Precisa Marcar o membro Vacilão 🤔')
		mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
		console.log(mentioned)
		pp = await client.getProfilePicture(mentioned)
		buffer = await getBuffer(pp)
		//client.updateProfilePicture(botNumber, buffer)
		legenda = "Credo kkkk"
		//client.sendMessage(from, `Credo kkkk @${mentioned.split('@')[0]}`, [jid], true)
		client.sendMessage(from, buffer, MessageType.image, {caption: legenda})
        break


		 case 'selos':
		 if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	     if (isGroup) return reply('❗ - Este comando não pode ser usado em grupos, vá no Privado.')    
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-1.png'), MessageType.document, {mimetype: 'image/png'})
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-2.png'), MessageType.document, {mimetype: 'image/png'})
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-3.png'), MessageType.document, {mimetype: 'image/png'})
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-4.png'), MessageType.document, {mimetype: 'image/png'})
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-5.png'), MessageType.document, {mimetype: 'image/png'})
		 client.sendMessage(from, fs.readFileSync('./selos/O-Cabo-danau-Selo-6.png'), MessageType.document, {mimetype: 'image/png'})
          break

/*          
        //envia um gatinho
        case '__cat':
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
            client.sendText(from,'_procurando imagens ..._')
            client.sendFileFromUrl(from, 'https://source.unsplash.com/1080x1920/?cat','wp.jpeg', 'Aqui um Gatinho 🐱')
            break
      
        //envia um animal aleatorio
        case 'animal':
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
            client.sendText(from,'_procurando imagens ..._')
            client.sendFileFromUrl(from, 'https://source.unsplash.com/1080x1920/?animal','wp.jpeg', 'Aqui um animal 🐴')
            break

        //envia um doguinho
        case '__dog':
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
            client.sendText(from,'_procurando imagens ..._')
            client.sendFileFromUrl(from, 'https://source.unsplash.com/1080x1920/?dog','wp.jpeg', 'Aqui um doguinho Fofo 🐶 ')
            break

        //envia imagem de comida
        case 'comida':
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
           await client.sendText(from,'_procurando imagens ..._')
            client.sendFileFromUrl(from, 'https://source.unsplash.com/1080x1920/?spaghetti','wp.jpeg', '🥪 ')
            break   

        //envia imagem de uma flor
        case 'flor':
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
            client.sendText(from,'_procurando imagens ..._')
            client.sendFileFromUrl(from, 'https://source.unsplash.com/1080x1920/?flower','wp.jpeg', '🌹')
            break
            				*/

        case 'gnomio':
        if(!isActiveUserG1 || !activeUsersG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/gnomio.jpg'
         legenda  = 'Tay A Anãzinhado Grupo 🤏 Não Brinque Com Ela Ou Ela Pode Morder Sua Canela 🤭'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break

        case 'cida':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/cida1.jpg'
         legenda = 'Invejosos dirão que é efeito'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break


        case 'felipe':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/felipe1.jpeg'
         legenda = 'É um Cabo Danau agora, filho! 🦉'
         //client.sendFile(from, './pessoas/felipe1.jpeg', 'felipe1.jpeg', 'É um Cabo Danau agora, filho! 🦉', message.id)
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
          break

        case 'xande':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/xande1.jpeg'
         legenda = 'Paz irmãos, Louvai ao Senhor 🎸'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break

        case 'edyon':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/edy/edy1.jpeg'
         legenda = 'Ola familia de Deus 👋'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break

        case 'edyoff':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/edy/edy2.jpeg'
         legenda = 'Hora de cuidar da familia 👨‍👩‍👧'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break

        case 'edy':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/edy/edy3.jpeg'
         legenda = 'Nao adianta cacheada, o baterista nao cai no seu golpe 💁‍♂️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         break

        case 'profeta':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
         if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/profeta1.jpeg'
         legenda = 'Se Convertam, ou o Profeta Anthony irá queimar vocês, seus Hereges 🔥'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         //client.sendFile(from, './pessoas/profeta1.jpeg', 'profeta1.jpeg', ' texto mensagem', message.id)
         break

        case 'luiz':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/luiz1.jpeg'
         legenda = '*Luiz é o cara mais carismático do grupo, fofo, educado, carinhoso mas não se engane com essa carinha linda, quando papai manda ele desce a cajadada até você chorar de dor*'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         //client.sendFile(from, './pessoas/luiz1.jpeg', 'luiz1.jpeg', 'texto mensagem' , message.id)
          break

       case 'claudinha':
       if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
       if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.sendMessage(from, 'Comandos desativados', text)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/claudinha1.jpeg'
         legenda = 'A técnica de enfermagem maluquinha mais otimista do grupo!!! 🤣🤣🤣 👩🏻‍⚕️👩🏻‍⚕️'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         //client.sendFile(from, './pessoas/claudinha1.jpeg', 'claudinha1.jpeg', 'A técnica de enfermagem maluquinha mais otimista do grupo!!! 🤣🤣🤣 👩🏻‍⚕️👩🏻‍⚕️', message.id)
         break

       case 'rainha':
       if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
       if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
          if (comandStatus === 0) return client.sendMessage(from, 'Comandos desativados', text)
         //if(groupId != danau1id) return client.reply(from, 'Esse comando só pode ser usado no grupo Os Cabos Danau')   
         userFoto = './pessoas/Johanna.jpg'
         legenda = 'Olá, aqui está a rainha, amorosa, carinhosa, maravilhosa, sinônimos de uma pessoa incrível!!\nIncrivelmente perfeita!!\nSaiba fazer seus gostos, e ela retribuirá com amor, carinho e alegria!!!'
         client.sendMessage(from, fs.readFileSync(userFoto), MessageType.image, {caption:legenda})
         //client.sendFile(from, './pessoas/claudinha1.jpeg', 'claudinha1.jpeg', 'A técnica de enfermagem maluquinha mais otimista do grupo!!! 🤣🤣🤣 👩🏻‍⚕️👩🏻‍⚕️', message.id)
         break

         // ------------  Comandos Administrativos ---------------

         // Adicionar membro ao grupo 
		case 'add':
		return reply('O comando está Temporariamente desativado, faça o banimento de forma manual.')
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		//client.updatePresence(from, Presence.composing) 
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (args.length < 1) return reply('Mensagem')
		if (args[0].startsWith('08')) return reply('Use o código do país')
		try {
			num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
			client.groupAdd(from, [num])
		} catch (e) {
			console.log('Error :', e)
			reply('Falha ao adicionar, Talvez seja um número privado')
		}
		break

         // Adicionar vários membros ao grupo 
		case 'mega.add':
		if (!isOwner) return reply('Este comando só pode ser usado pelo michael')
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		//client.updatePresence(from, Presence.composing) 
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (args.length < 1) return reply('Comando incorreto')
		if (args[0].startsWith('08')) return reply('Use o código do país')
		const numeroEnviado = Number(args[0])
		const contadorInicial = 1
		const contadorNumeros = Number(args[1])
		try {

			while ( contadorInicial < contadorNumeros )  {
			const contadorNumeros = contadorNumeros + 1
			const numCont = numeroEnviado + 1
			reply(numCont.toString())
			//num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
			//client.groupAdd(from, [num])
			}
		} catch (e) {
			console.log('Error :', e)
			reply('Falha ao adicionar, Talvez seja um número privado')
		}
		break


	    // Remover Membro do grupo 
		case 'ban':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		//client.updatePresence(from, Presence.composing) 
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Você Precisa Marcar o membro Vacilão 🤔')
		mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
		if(groupAdmins.includes(mentioned)) return reply('Você não pode remover um administrador.')
		if(ownerNumber.includes(mentioned[0])) return reply("Nada disso, não vou remover o Michael - 🤖")
		if(mentioned[0] === botNumber) return reply ("Não, não, não ... 🤖")
		return reply('O comando está Temporariamente desativado, faça o banimento de forma manual.')
	    if (mentioned.length > 1) {
	    	//console.warn("IFF")
			teks = 'Adeus kkkk 🤖✌🏻 :\n'
			for (let _ of mentioned) {
				teks += `@${_.split('@')[0]}\n`
				if(groupAdmins.includes(mentioned[0])) return reply('Você não pode remover um administrador.')
			}
			mentions(teks, mentioned, true)
			client.groupRemove(from, mentioned)
		} else {
			if(groupAdmins.includes(mentioned[0])) return reply('Você não pode remover um administrador.')
			//console.log("ELSE")
			//console.log(mentioned)
			mentions(`Adeus kkkk 🤖✌🏻 @${mentioned[0].split('@')[0]}`, mentioned, true)
			client.groupRemove(from, mentioned)
		    client.sendMessage(mentioned, 'Adeus kkkk 🤖✌🏻', text)
		}
	        
			//Envia o Audio "BANIDO"
	        fileToSend = './audios/banido.mp3'
	       	buffer = fs.readFileSync(fileToSend)
	        //client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
	        client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4'})

		break

		// Remover Membro da posição de administrador
		case 'demote':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Você Precisa Citar alguém')
		mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
		if (mentioned.length > 1) {
			teks = ''
			for (let _ of mentioned) {
				teks += `Então ... \n`
				teks += `@_.split('@')[0] Deixou de Ser Administrador do grupo `
			}
			mentions(teks, mentioned, true)
			client.groupDemoteAdmin(from, mentioned)
		} else {
			mentions(`@${mentioned[0].split('@')[0]} não é mais um administrador.\n*${groupMetadata.subject}*_`, mentioned, true)
			client.groupDemoteAdmin(from, mentioned)
		}
		break
     
      // Promover Membro a posição de Administrador
      case 'promote':
      if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
      if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		client.updatePresence(from, Presence.composing) 
                         //   if (!isUser) return reply(mess.only.daftarB)
		if (!isGroup) return reply(mess.only.group)
		if (!isGroupAdmins) return reply(mess.only.admin)
		if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('A tag alvo que você deseja promover!')
		mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
		if (groupAdmins.includes(mentioned[0])) return reply('O Membro já é administrador do grupo')
		if (mentioned.length > 1) {
			teks = '\n'
			for (let _ of mentioned) {
				teks += `@${_.split('@')[0]}\n Agora é um administrador do grupo`
			}
			mentions(teks, mentioned, true)
			client.groupMakeAdmin(from, mentioned)
		} else {
			mentions(`@${mentioned[0].split('@')[0]} Agora é um Administrador do Grupo`, mentioned, true)
			client.groupMakeAdmin(from, mentioned)
		}
		break

		// Fechar Grupo	
		case '_closegc':
		case 'fechar':
		if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
		if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
			client.updatePresence(from, Presence.composing) 
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return reply(mess.only.Badmin)
			var nomor = mek.participant
			const close = {
			text: `🔒 Grupo fechado 🔒 \n\n O administrador @${nomor.split("@s.whatsapp.net")[0]} fechou o grupo, neste momento,  *Apenas Administradores* podem enviar mensagens`,
			contextInfo: { mentionedJid: [nomor] }
			}
			client.groupSettingChange (from, GroupSettingChange.messageSend, true);
			reply(close)
			break
       
       //Abrir Grupo
        case '_opengc':
        case 'abrir':
        if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
        if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
			client.updatePresence(from, Presence.composing) 
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return reply(mess.only.Badmin)
			open = {
			text: `🔓 Grupo aberto 🔓 \n\n O administrador @${sender.split("@")[0]} abriu o grupo\n\n*Todos os participantes* podem enviar mensagens\n\n`,
			contextInfo: { mentionedJid: [sender] }
			}
			client.groupSettingChange (from, GroupSettingChange.messageSend, false)
			client.sendMessage(from, open, text, {quoted: mek})
			break
		
		// Voltar o nome do grupo para o padrão
	    case 'nome':
	    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
	    if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
			client.updatePresence(from, Presence.composing) 
			if (!isGroup) return reply(mess.only.group)
			if (!isGroupAdmins) return reply(mess.only.admin)
			if (!isBotGroupAdmins) return reply(mess.only.Badmin)
			mikeJid = '5522998855226@s.whatsapp.net'
			newGroupName = "⚓OS CABOS DANAU-MEMES ⚓"
			client.groupUpdateSubject(from, newGroupName)
	    break




	             /*   

	                case '_randomhentai':
	                        gatauda = body.slice(6)
	                        if (!isUser) return reply(mess.only.daftarB)
	                        reply(mess.wait)
	                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`, {method: 'get'})
	                        buffer = await getBuffer(anu.result)
	                        client.sendMessage(from, buffer, image, {quoted: mek})
	                        break
	                case '_loli':
	                        gatauda = body.slice(6)
	                        //if (!isUser) return reply(mess.only.daftarB)
	                        reply(mess.wait)
	                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
	                        buffer = await getBuffer(anu.result)
	                        client.sendMessage(from, buffer, image, {quoted: mek})
	                        break
                 */

/*
				  case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *SELF WHATSAPP* 」\n\n_Solicitado por_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nSeu link Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
				if (data.error) return reply(data.error)
				reply(data.result)
				break
			case 'quotes':
				client.updatePresence(from, Presence.composing) 
                //if (!isUser) return reply(mess.only.daftarB)
				data = await fetchJson(`http://mhankbarbars.herokuapp.com/api/randomquotes`)
				ez = `*➸ Author :* ${data.author}\n*➸ Quotes :* ${data.quotes}`
				reply(ez)
				break
				
				case '3dtext':
                data = await await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${body.slice(8)}`)
                if (!isUser) return reply(mess.only.daftarB)
                client.sendMessage(from, data, image, {quoted: mek, caption: body.slice(8)})
                break
                
                case 'fml':
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/fml`)
                if (!isUser) return reply(mess.only.daftarB)
                hasil = data.result.fml
                reply(hasil)
                break
              case 'owner':
                case 'creator':
                  client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
               client.sendMessage(from, 'Aqui está o número do meu dono, salve depois',MessageType.text, { quoted: mek} )
                break
	
	            case 'hidetag':
                client.updatePresence(from, Presence.composing) 
                if (!isUser) return reply(mess.only.daftarB)
                if (!isGroup) return reply(mess.only.group)
                teks = body.slice(9)
                group = await client.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: mek
                }
                await client.sendMessage(from, options, text)
                break
                    */
                   
/*
                    case 'tiktokstalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Nome? ', text, {quoted: mek})
                                                if (!isUser) return reply(mess.only.daftarB)
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Nome do usuário* : ${user.uniqueId}\n*Apelido* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('username tidak valid')
					}
					break
				case 'snowwrite':
					var gh = body.slice(11)
					var gbl7 = gh.split("|")[0];
					var gbl8 = gh.split("|")[1];
					if (args.length < 1) return reply(`Enviar pedidos ${prefix}snowwrite texto1|texto2, exemplo ${prefix}snowwrite Eletro|BOT`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/snowwrite?text1=${gbl7}&text2=${gbl8}&apikey=apivinz`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'marvellogo':
					var gh = body.slice(12)
					if (args.length < 1) return reply(`Enviar pedidos ${prefix}marvellogo texto, por exemplo ${prefix}marvellogo Eletro|BOT`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=snow&text=${gh}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break

				case 'artinama':
                  client.updatePresence(from, Presence.composing) 
                  if (!isUser) return reply(mess.only.daftarB)
                    data = await fetchJson(`https://arugaz.my.id/api/artinama?nama=${body.slice(10)}`)
                   reply(data.result)
                   break
		case 'infonomor':
               client.updatePresence(from, Presence.composing) 
                 if (!isUser) return reply(mess.only.daftarB)
                 if (args.length < 1) return reply(`Insira numeros\nExemplo : ${prefix}infonomor 556299663...`)
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(11)}`)
                if (data.error) return reply(data.error)
                if (data.result) return reply(data.result)
                hasil = `╠➥ internasional : ${data.international}\n╠➥ nomor : ${data.nomor}\n╠➥ operator : ${data.op}`
                reply(hasil)
                break
		case 'spamcall':
               client.updatePresence(from, Presence.composing)
                 if (!isUser) return reply(mess.only.daftarB)
                 if (args.length < 1) return reply(`Insira numeros\nExemplo : ${prefix}spamcall 556299663...`)
                data = await fetchJson(`https://arugaz.my.id/api/spamcall?no=${body.slice(10)}`)
                if (data.msg) return reply(data.msg)
                hasil = data.logs
                reply(hasil)
                break
                   case 'map':
                   data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`)
                   if (!isUser) return reply(mess.only.daftarB)
                   hasil = await getBuffer(data.gambar)
                   client.sendMessage(from, hasil, image, {quoted: mek, caption: `Hasil Dari *${body.slice(5)}*`})
                   break
                   

                  case 'covidcountry':
                   client.updatePresence(from, Presence.composing) 
                   if (!isUser) return reply(mess.only.daftarB)
                   data = await fetchJson(`https://arugaz.my.id/api/corona?country=${body.slice(7)}`)
                   if (data.result) reply(data.result)
                   hasil = `Negara : ${data.result.country}\n\nActive : ${data.result.active}\ncasesPerOneMillion : ${data.result.casesPerOneMillion}\ncritical : ${data.result.critical}\ndeathsPerOneMillion : ${data.result.deathsPerOneMillion}\nrecovered : ${data.result.recovered}\ntestPerOneMillion : ${data.result.testPerOneMillion}\ntodayCases : ${data.result.todayCases}\ntodayDeath : ${data.result.todayDeath}\ntotalCases : ${data.result.totalCases}\ntotalTest : ${data.result.totalTest}`
                   reply(hasil)
                   break
				case 'wiki':
					if (args.length < 1) return reply('digite palavras-chave')
					tels = body.slice(6)	
                    //if (!isUser) return reply(mess.only.daftarB)				
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/wiki?q=${tels}&apikey=BotWeA`, {method: 'get'})
					reply(anu.result)
					break	
				case 'wikien':
					if (args.length < 1) return reply('digite palavras-chave')
					tels = body.slice(8)		
			                if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://arugaz.my.id/api/wikien?q=${tels}`, {method: 'get'})
					reply(anu.result)
					break				
				case '_ytmp3':
				case 'baixar-mp3':
					if (args.length < 1) return reply('Está faltando o link, exemplo: .video https://www.youtube.com/watch?v=XI7Cxdj2pAQ&ab_channel=WebdriverTorso')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbar.tech/api/yta?url=${args[0]}&apiKey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `❏ *Título* : ${anu.title}\n❏ *Tamanho do arquivo* : ${anu.filesize}\n\n\n\n*Estou convertendo o vídeo, aguarde, pois pode demorar um pouco.*`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
*/
				case '_baixar-mp4':
				case 'video':
				case 'vídeo':
				case 'youtube':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					if (args.length < 1) return reply('Está faltando o link, exemplo: .video https://www.youtube.com/watch?v=XI7Cxdj2pAQ&ab_channel=WebdriverTorso')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*❏ Título* : ${anu.title}\n\n*Estou convertendo o vídeo, aguarde, pois pode demorar um pouco.*`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
/*

				case '_trendtwit':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/trendingtwitter`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Hastag* : ${i.hastag}\n*link* : ${i.link}\n*rank* : ${i.rank}\n*Tweet* : ${i.tweet}\n=================\n`
					}
					reply(teks.trim())
					break
				case '_testime':
					setTimeout( () => {
					client.sendMessage(from, 'Waktu habis:v', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '5 Detik lagi', text) // ur cods
					}, 5000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '10 Detik lagi', text) // ur cods
					}, 0) // 1000 = 1s,
					break
				case '_semoji':
					if (args.length < 1) return reply('Emoji?')
                                        if (!isUser) return reply(mess.only.daftarB)
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(8).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/emoji2png?emoji=${teks}&apikey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker)
						fs.unlinkSync(rano)
					})
					break
				case 'nulis': 
				case 'tulis':
					if (args.length < 1) return reply('Eu disse para você escrever, eeeeeeeeeh?')
                                        if (!isUser) return reply(mess.only.daftarB)
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nulis?text=${teks}&apikey=BotWeA`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
	case '_kbbi':
            client.updatePresence(from, Presence.composing) 
                if (args.length < 1) return reply(`Digite as perguntas\Exemploh : ${prefix}kbbi oi`)
	      tels = body.slice(6)
              data = await fetchJson(`https://tobz-api.herokuapp.com/api/kbbi?kata=${tels}&apikey=BotWeA`)
              if (data.error) return reply(data.error)
              hasil = `${data.result}`
              reply(hasil)
              break
				case 'joox':
			tels = body.slice(6)
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${tels}&apikey=BotWeA`, {method: 'get'})
               if (!isUser) return reply(mess.only.daftarB)
               if (data.error) return reply(data.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}`
                buffer = await getBuffer(data.result.thumb)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                break

                */
				case '_info':
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Número do bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Contato de bloqueio total* : ${blocked.length}\n*O bot está ativo em* : ${kyun(uptime)}\n*Bate Papo Total* : ${totalchat.length}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
			/*	
				case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
                  
                   case 'chatlist':
					client.updatePresence(from, Presence.composing)  
					teks = 'This is list of chat number :\n'
					for (let all of totalchat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${totalchat.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": totalchat}})
					break
				
				case 'animecry':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry&apikey=BotWeA', {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'neonime':
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					teks = '################\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
					}
					reply(teks.trim())
					break  
					case 'bpink':
              
                  if (args.length < 1) return reply(`Texto de entrada \nExemplo : ${prefix}Caliph Bot`)
                data = await getBuffer(`https://docs-jojo.herokuapp.com/api/blackpink?text=${body.slice(7)}`)
                if (!iUser) return reply(mess.only.daftarB)
                client.sendMessage(from, data, image, {quoted: mek, caption: body.slice(7)})
                break
            */
                /*    COMANDO  DO TOINBOT MODIFICADO
				case '_voz':
				   client.updatePresence(from, Presence.recording) 
				   if (args.length < 1) return client.sendMessage(from, 'Qual é o código da linguagem?', text, {quoted: mek})
                   //if (!isUser) return reply(mess.only.daftarB)
					//const gtts = require('./lib/gtts')(args[0])
					
					const gtts = require('./lib/gtts')('pt')
					if (args.length < 1) return client.sendMessage(from, 'Está errado ow Vacilão, cadê o texto? kkkk ', text, {quoted: mek})
					dtt = body.slice(5)
					
					// Original Files.
					//ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					
					
					ranm = ('./tts/resPt.mp3')
					rano = ('./tts/resPt.mp3')
					
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save('./tts/resPt.mp3', dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break

                  */


				case 'voz':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				   if (comandStatus === 0) return reply('Comandos desativados')
				   if (!isGroup) return reply('Este comando só pode Ser usado em grupos.')
				   //client.updatePresence(from, Presence.recording) 
				   //if (!isGroup) return reply('Este comando só pode Ser usado em grupos.\n\nVenha participar do nosso grupo:\n\nhttps://chat.whatsapp.com/JyzOY7VeSc94qek8TgyRAT')
				   if (args.length < 1) return client.sendMessage(from, '❗ - Você precisa mandar um texto', text, {quoted: mek})
                   //if (!isUser) return reply(mess.only.daftarB)
					//const gtts = require('./lib/gtts')(args[0])
					const gtts = require('./lib/gtts')('en-us')
					//const gtts = require('./lib/gtts')('pt-br')
					if (args.length < 1) return client.sendMessage(from, '❗ - Você precisa mandar um texto.', text, {quoted: mek})
					dtt = body.slice(5)
					ranmp3 = getRandom('.mp3')
					ranogg = getRandom('.ogg')
					//fullpathRanm = "C:/Users/mike/Downloads/Eletrobot-2021-13022021/Eletrobot-2021/"+ranm 
			        //ullpathRano = "C:/Users/mike/Downloads/Eletrobot-2021-13022021/Eletrobot-2021/"+rano 

					dtt.length > 520
					? reply('❗ - Texto muito longo praticamente só de bosta, reduz isso aí tio 😡... ')
					: gtts.save(ranmp3, dtt, function() {
						//console.log(ranmp3)
						//console.log(ranogg)
						//console.log(fullpathRanm)
						
						ffmpeg(`./${ranmp3}`)
							.inputFormat(`mp3`)
							.on('start', function (cmd) {
								//console.log(`Started : ${cmd}`)
								console.log('Criando Audio')
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								//fs.unlinkSync(media)
								//tipe = media.endsWith('.ogg') ? 'video' : 'gif'
								//reply(`Ocorreu um erro no momento da conversão ${tipe}, tente enviar um arquivo menor, ou envie um gif ao invés de um vídeo`)
							})
							.on('end', function () {
								console.log('Finalizado.')
								buff = fs.readFileSync(`./${ranogg}`)
								//client.sendMessage(from, buff, sticker)
		                       client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})

								//client.sendMessage(from,'Eletrobot 🔥', text)
								fs.unlinkSync(`./${ranogg}`)
								fs.unlinkSync(`./${ranmp3}`)
								//fs.unlinkSync(ran)
							})
							.addOutputOptions([`-ar 48000`, `-vn`,`-c:a libopus`])
							.toFormat('ogg')
							.save(`./${ranogg}`)
/*
						exec(`ffmpeg -i ./758.mp3 -ar 48000 -vn -c:a libopus ./758.ogg`, (err) => {
							//fs.unlinkSync(ranm)
							//buff = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							//client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							//fs.unlinkSync(rano)

						}) */
					        
					})
					break
/*

        // Comando do Eletrobot - tentativa de adaptação
		//case 'voz':
        case '_audio':
        case '_falar':
        //if (sender.id === usuario_banidoId) return client.reply(from, 'Você foi banido de enviar alguns comandos.', id)
        if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         //if (!isGroupMsg) return client.reply(from, 'Este comando só pode ser usado em grupos! \nVenha conhecer nosso Grupo: https://chat.whatsapp.com/GMhOsUqw2yn0Bus9uDr1lZ', message.id)
            if (args.length == 0) return reply(from, 'Enviar pedidos * .voz [texto], exemplo * .voz Olá a todos')
            const ttsId = require('node-gtts')('id')
            const ttsEn = require('node-gtts')('en')
            const ttsJp = require('node-gtts')('ja')
            const ttsAr = require('node-gtts')('ar')
			const ttsPt = require('node-gtts')('pt')

            //Ignorar caracteres do comando para transformar em audio
            const dataText = body.slice(5)

            //Verifica o comando enviado
            if (dataText === '') return client.reply(from, 'tá errado vacilão...', message.id)
            if (dataText.length > 1000) return client.reply(from, 'Texto muito longo Parceiro, ajeita isso aí.', message.id)
            var dataBhs = body.slice(5, 7)
            if (dataBhs == 'id') {
                ttsId.save('./tts/resId.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resId.mp3', message.id)
                })
            } 
            else if (dataBhs == 'en') {
                ttsEn.save('./tts/resEn.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resEn.mp3', message.id)
                })
            } 
            else if (dataBhs == 'jp') {
                ttsJp.save('./tts/resJp.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resJp.mp3', message.id)
                })
			 } 

             else if (dataBhs == 'pt')
            {
               // ttsPt.save('./tts/resPt.mp3', dataText, function () {
                 //   client.sendPtt(from, './tts/resPt.mp3', message.id)
               // })
               client.reply(from, 'agora você pode enviar apenas o comando .voz "texto"')
            }

             else if (dataBhs == 'ar') {
                ttsAr.save('./tts/resAr.mp3', dataText, function () {
                    client.sendPtt(from, './tts/resAr.mp3', message.id)
                })
            } else {
              
                ttsPt.save('./resPt.mp3', dataText, function () {

						



                	//client.sendMessage(from, './tts/resPt.mp3', audio, {quoted: mek, ptt:true})
							

                    //client.sendPtt(from, './tts/resPt.mp3', message.id)

                })

                //client.reply(from, 'Insira os dados do idioma: [id] para indonésio,[pt] para portugues, [en] para inglês, [jp] para japonês e [ar] para árabe', message.id)
            }
            break
*/

				case 'listadmins':
				case 'adminlist':
				case 'admin':
				case 'admins':
				case 'adm':
				case 'adms':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					client.updatePresence(from, Presence.composing) 
                                        //if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista admin do grupo *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\nChamando os administradores!\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break

				case '_pokemon':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
                    //if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					//n = JSON.parse(JSON.stringify(data));
					

					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break

/*
                case 'imagens':
                case 'imagem':
                case 'images':
                    tels = body.slice(8)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
                    //if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*Achei* 🤖`})
					break
*/				
				// Envia a imagem do dia, do Site da Nasa
				//API = https://api.nasa.gov/planetary/apod?api_key=Ez8JHh3luIzd2JSxjNp8HNk4ayf4Pj5Jc6dUPHFA
				case 'nasa':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				if (comandStatus === 0) return reply('Comandos desativados')
				dados = await fetchJson('https://api.nasa.gov/planetary/apod?api_key=Ez8JHh3luIzd2JSxjNp8HNk4ayf4Pj5Jc6dUPHFA')
				legenda = `*${dados.title}*\nAutor: ${dados.copyright}\nData: ${dados.date}\n\n${dados.explanation}`
				imagemNasa = await getBuffer(dados.url)
				client.sendMessage(from, imagemNasa, image, {quoted: mek, caption: legenda})
				break

				//Obter informações de clima Para uma localidade
				//API = b1bfd3185080b533d65e16e8b46e9ae1
				case 'clima':
				return reply("OK")
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				if (comandStatus === 0) return reply('Comandos desativados')
				cidadeUser = body.slice(7)
				dados = dados = await fetchJson(`api.openweathermap.org/data/2.5/weather?q=${cidadeUser}&appid=${climaAPI}`)
				break

			   case 'dado':
			   if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
			   if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
		    	if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
	    	    const dice1 = Math.floor(Math.random() * 6) + 1
	    	    const dice2 = Math.floor(Math.random() * 6) + 1
	    	    dadoLink1 = `./dado/dice${dice1}.webp`
	    	    client.sendMessage(from, fs.readFileSync(dadoLink1),sticker)
	    	    dadoLink2 = `./dado/dice${dice2}.webp`
	    	    client.sendMessage(from, fs.readFileSync(dadoLink2),sticker)
	    	   break

				//API = c1d3324fe90ee77b39d101b8a389469b9f4ce1b9
				//Busca de Dados sobre Covid
				case 'covid':


				break

				// Mecanismo de Busco antigo - Usa a base de dados do Pinterest 
                case 'OLD_imagens':
                case 'OLD_imagem':
                case 'OLD_images':
                if (comandStatus === 0) return reply('Comandos desativados')
                    tels = body.slice(8)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
                    //if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*Achei* 🤖 - ${tels}`})
					break

				// Mecanismo de busca que usa o Google Search
				case 'imagem':
				//return reply("Não foi possível executar o comando, talvez não funcione com burros 😳")
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				    if (comandStatus === 0) return reply('Comandos desativados')
				    if (!isGroup) return reply(mess.only.group)
                    userSearch = body.slice(8)
                	resultsIndexSequence = Math.floor(Math.random() * 15);  //default : 100
                	
                	googleImageSearch(userSearch, logResults);
					async function logResults(error, results) {
					  if (error) {
					  	reply('⚠️ - O link que eu Encontrei estava inacessível, Tente Novamente')
					    console.log(error);
					  }
					  else {
					  	try {
					  	console.log('Resultado', resultsIndexSequence)
					  	reply('_Buscando Imagens... 🕑_')
					  	console.log(JSON.stringify(results[resultsIndexSequence]))
					  	googleImalink = JSON.parse(JSON.stringify(results[resultsIndexSequence]))
					  	console.log(googleImalink.url)
					  	
					  	rawImage = await getBuffer(googleImalink.url)
					  	client.sendMessage(from, rawImage, image, { quoted: mek, caption: `*Achei* 🤖 - ${userSearch}\n\n`})
					    //console.log(JSON.stringify(results[1], null,   '));
					} catch (e) {
						console.log('Erro.')
						reply('Ocorreu um Erro ao Enviar a imagem, tente novamente.')
					  }
					}
					}
				break

			// Buscar imagem com versículo no google imagens
			case 'versiculo':
			case 'versículo':
				//return reply("Não foi possível executar o comando, talvez não funcione com burros 😳")
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					if (comandStatus === 0) return reply('Comandos desativados')
					if (!isGroup) return reply(mess.only.group)
					userSearch = "versículo"
					resultsIndexSequence = Math.floor(Math.random() * 80);  //default : 100
					
					googleImageSearch(userSearch, logResults4);
					async function logResults4(error, results) {
						if (error) {
							reply('⚠️ - O link que eu Encontrei estava inacessível, Tente Novamente')
						console.log(error);
						}
						else {
							try {
							console.log('Resultado', resultsIndexSequence)
							reply('_Buscando um versículo inspirador... 🕑_')
							console.log(JSON.stringify(results[resultsIndexSequence]))
							googleImalink = JSON.parse(JSON.stringify(results[resultsIndexSequence]))
							console.log(googleImalink.url)
							
							rawImage = await getBuffer(googleImalink.url)
							client.sendMessage(from, rawImage, image, { quoted: mek, caption: `*Achei 🤖🤌🏻*\n\n`})
						//console.log(JSON.stringify(results[1], null,   '));
					} catch (e) {
						console.log('Erro.')
						reply('Ocorreu um Erro ao Enviar a imagem, tente novamente.')
						}
					}
					}
				break

				/*
				// --- desativado, usa o motor do pinterest ---- 
                case 'template':
                case 'meme':
                case 'base':
                    tels = body.slice(8)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=template meme`, {method: 'get'})
                    //if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*Achei uma base pro seu meme* 🤖 - ${tels}`})
					break
*/
				// Novo - Usa o Google Imagens 
				case 'base':
				case 'meme':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				    if (comandStatus === 0) return reply('Comandos desativados')
                    userSearch = 'Base para memes'
                	resultsIndexSequence = Math.floor(Math.random() * 100); 
                	
                	googleImageSearch(userSearch, logResults2);
					async function logResults2(error, results) {
					  if (error) {
					  	reply('⚠️ - O link que eu Encontrei estava inacessível, Tente Novamente')
					    console.log(error);
					  }
					  else {
					  	console.log('Resultado', resultsIndexSequence)
					  	reply('_Buscando Imagens... 🕑_')
					  	console.log(JSON.stringify(results[resultsIndexSequence]))
					  	googleImalink = JSON.parse(JSON.stringify(results[resultsIndexSequence]))
					  	console.log(googleImalink.url)
					  	rawImage = await getBuffer(googleImalink.url)
					  	client.sendMessage(from, rawImage, image, { quoted: mek, caption: `*Achei* 🤖 - ${userSearch}\n\n_Google Imagens_`})
					    //console.log(JSON.stringify(results[1], null,   '));
					  }
					}
				break

				case 'dog':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				    if (comandStatus === 0) return reply('Comandos desativados')
                    userSearch = 'dog'
                	resultsIndexSequence = Math.floor(Math.random() * 100); 
                	
                	googleImageSearch(userSearch, logResults3);
					async function logResults3(error, results) {
					  if (error) {
					  	reply('⚠️ - O link que eu Encontrei estava inacessível, Tente Novamente')
					    console.log(error);
					  }
					  else {
					  	console.log('Resultado', resultsIndexSequence)
					  	reply('_Buscando Imagens... 🕑_')
					  	console.log(JSON.stringify(results[resultsIndexSequence]))
					  	googleImalink = JSON.parse(JSON.stringify(results[resultsIndexSequence]))
					  	console.log(googleImalink.url)
					  	rawImage = await getBuffer(googleImalink.url)
					  	client.sendMessage(from, rawImage, image, { quoted: mek, caption: `Aqui um doguinho Fofo 🐶`})
					    //console.log(JSON.stringify(results[1], null,   '));
					  }
					}
				break

				/*
                case 'dog':
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
                    tels = body.slice(8)
					client.updatePresence(from, Presence.composing) 
					//data = await fetchJson(`https://api.fdci.se/rep.php?gambar=dog`, {method: 'get'})
					//data = await fetchJson(`https://source.unsplash.com/1920x1080/?dog`, {method: 'get'})
                    //if (!isUser) return reply(mess.only.daftarB)
					reply('_Buscando imagens..._', text)
					//n = JSON.parse(JSON.stringify(data));
					//nimek =  n[Math.floor(Math.random() * n.length)];
					imglink = 'https://source.unsplash.com/1920x1080/?dog'
					pok = await getBuffer(imglink)
					//getimage = 'https://source.unsplash.com/1920x1080/?dog'
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Aqui um doguinho Fofo 🐶 `})
					break
					*/

                case 'cat':
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	  				reply('_Buscando imagens..._', text)
					imglink = 'https://source.unsplash.com/1920x1080/?cat'
					pok = await getBuffer(imglink)
     				client.sendMessage(from, pok, image, { quoted: mek, caption: `Aqui um Gatinho 🐱`})
					break

                case 'comida':
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	  				reply('_Buscando imagens..._', text)
					imglink = 'https://source.unsplash.com/1920x1080/?food'
					pok = await getBuffer(imglink)
     				client.sendMessage(from, pok, image, { quoted: mek, caption: `🥪`})
					break

			    case 'natureza':
			    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
			    if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	  				reply('_Buscando imagens..._', text)
					imglink = 'https://source.unsplash.com/1920x1080/?landscape'
					pok = await getBuffer(imglink)
     				client.sendMessage(from, pok, image, { quoted: mek, caption: `🌳`})
					break
                
			    case 'flor':
			    if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
			    if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
	  				reply('_Buscando imagens..._', text)
					imglink = 'https://source.unsplash.com/1920x1080/?flower'
					pok = await getBuffer(imglink)
     				client.sendMessage(from, pok, image, { quoted: mek, caption: `🌹`})
					break

				//Online - Pokemons mais novos			
                case 'pokemon2':
                case 'pokémon2':
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					q7 = Math.floor(Math.random() * 890) + 1;
	  				reply('_Buscando imagens..._', text)
					imglink = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png'
					pok = await getBuffer(imglink)
     				client.sendMessage(from, pok, image, { quoted: mek, caption: `*Achei um pokemon* -  🤖`})
					break

				//Base de dados Local - Pokemons Clássicos
				case 'pokemon':
                case 'pokémon':
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					pokemonSequense = Math.floor(Math.random() * 805) + 1;
	  				reply('_Buscando imagens..._', text)
					imagemPokemon = './pokemons-webp/'+pokemonSequense+'.webp'
     				//client.sendMessage(from,fs.readFileSync(imagemPokemon), image, { quoted: mek, caption: `*Achei um pokemon* -  🤖`})
		            client.sendMessage(from,fs.readFileSync(imagemPokemon), sticker)
					break

				case 'setprefix':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`O prefix foi alterado com sucesso para : ${prefix}`)

					break
				case '_meme':
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case '_memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break

				case '_block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Pedidos recebidos, bloquear ${body.slice(8)}@c.us`, text)
					break

				case '_hilih':
					client.updatePresence(from, Presence.composing) 
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				
				//Tagall usado para clonar outro grupo
				case '__clonar':
				if(groupId2 === danau1id) return reply("Nada de usar este comando aqui, Malandrinho 😈")
				

				break


				//Chamar Todos os membros
				case 'tagall':
				case 'chamar':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
				//return reply ("Toda hora essa droga?")
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
                    //if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total de Membros no Grupo: ${groupMembers.length}\n\n`
					for (let mem of groupMembers) {
						teks += ` @${mem.jid.split('@')[0]} -`
						members_id.push(mem.jid)
					}
					//mentions('╔══✪〘 Chamando todos os Membros 〙✪══\n╠➥'+teks+'╚═〘 Eletrobot 🔥 〙', members_id, true)
					mentions('〘 Chamando todos os Membros 〙\n'+teks+' \n\n Eletrobot 🔥 ', members_id, true)
					//console.log(groupMembers)
					break

				// Chamar Membros Inativos 
				case 'tagall-inativos':
				case 'chamar-inativos':
				case 'tagall-salvos':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				//if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					//client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)

					//Variaveis de dados dos grupos
					contagemMembrosTotalGrupo1 = groupMembers.length
			    	contagemMembrosTotalGrupo2 = groupMembers.length
			        contagemMembrosAtivosGrupo1 = activeUsersG1.length
			        contagemMembrosAtivosGrupo2 = activeUsersG2.length
			        contagemMembrosInativosGrupo1 = contagemMembrosTotalGrupo1 - contagemMembrosAtivosGrupo1
			        contagemMembrosInativosGrupo2 = contagemMembrosTotalGrupo2 - contagemMembrosAtivosGrupo2

			        //console.log(activeUsersG1)
			        //Chamar !
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					
					//Verifica se é o Grupo 1
					if(groupId2 === danau1id)
					{
						//teks += `  Total de Membros Inativos: ${contagemMembrosInativosGrupo1}\n\n`
						for (let mem of groupMembers) {
							//console.log(mem)
							member_number = mem.jid
							//console.log(member_number)
							const membro_ativo = activeUsersG1.includes(member_number);
							//console.log(membro_ativo)

							if(!membro_ativo)
							{
								teks += `- @${mem.jid.split('@')[0]}\n`
								members_id.push(mem.jid)
								//console.log("É um membro Ativo")
							} //Fecha o If membro
						} //Fecha o For
					}//fecha o if grupo

					// Verifica se é o Grupo 2
					if(groupId2 === danau2id)
					{
						//teks += `  Total de Membros Inativos: ${contagemMembrosInativosGrupo2}\n\n`
						for (let mem of groupMembers) {
							//console.log(mem)
							member_number = mem.jid
							//console.log(member_number)
							const membro_ativo = activeUsersG2.includes(member_number);
							//console.log(membro_ativo)

							if(!membro_ativo)
							{
								teks += `- @${mem.jid.split('@')[0]}\n`
								members_id.push(mem.jid)
								//console.log("É um membro Ativo")
							} //Fecha o If membro
						} //Fecha o For
					}//fecha o if grupo
					//mentions('╔══✪〘 Chamando todos os Membros 〙✪══\n╠➥'+teks+'╚═〘 Eletrobot 🔥 〙', members_id, true)

					mentions('〘 Chamando os Membros que ainda não se apresentaram〙\n\n❌ *Atenção* ❌ \nNovos membros tem 1 hora para se apresentar, após passado esse período, os administradores irão decidir se o membro pode continuar no grupo, ou se é para ser removido.\n'+teks+' \n\n Eletrobot 🔥 ', members_id, true)
				break


				// Chamar Membros Inativos -  Listar para o ban
				case 'listar-inativos':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				//if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					//client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)

					//Variaveis de dados dos grupos
					contagemMembrosTotalGrupo1 = groupMembers.length
			    	contagemMembrosTotalGrupo2 = groupMembers.length
			        contagemMembrosAtivosGrupo1 = activeUsersG1.length
			        contagemMembrosAtivosGrupo2 = activeUsersG2.length
			        contagemMembrosInativosGrupo1 = contagemMembrosTotalGrupo1 - contagemMembrosAtivosGrupo1
			        contagemMembrosInativosGrupo2 = contagemMembrosTotalGrupo2 - contagemMembrosAtivosGrupo2

			        //console.log(activeUsersG1)
			        //Chamar !
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					
					//Verifica se é o Grupo 1
					if(groupId2 === danau1id)
					{
						//teks += `  Total de Membros Inativos: ${contagemMembrosInativosGrupo1}\n\n`
						for (let mem of groupMembers) {
							//console.log(mem)
							member_number = mem.jid
							console.log(member_number)
							const membro_ativo = activeUsersG1.includes(member_number);
							console.log(membro_ativo)

							if(!membro_ativo)
							{
								teks += `@${mem.jid.split('@')[0]} `
								members_id.push(mem.jid)
								//console.log("É um membro Ativo")
							} //Fecha o If membro
						} //Fecha o For
					}//fecha o if grupo

					// Verifica se é o Grupo 2
					if(groupId2 === danau2id)
					{
						//teks += `  Total de Membros Inativos: ${contagemMembrosInativosGrupo2}\n\n`
						for (let mem of groupMembers) {
							//console.log(mem)
							member_number = mem.jid
							console.log(member_number)
							const membro_ativo = activeUsersG2.includes(member_number);
							console.log(membro_ativo)

							if(!membro_ativo)
							{
								teks += `@${mem.jid.split('@')[0]} `
								members_id.push(mem.jid)
								//console.log("É um membro Ativo")
							} //Fecha o If membro
						} //Fecha o For
					}//fecha o if grupo
					//mentions('╔══✪〘 Chamando todos os Membros 〙✪══\n╠➥'+teks+'╚═〘 Eletrobot 🔥 〙', members_id, true)

					mentions(teks, members_id, true)
				break


/*                

                case '_tagall2':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mencionando Todos 〙✪══\n╠➥'+teks+'╚═〘 Toin BOT 〙', text, {quoted: mek})
					break
                case '_tagall3':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mencionando Todos 〙✪══\n╠➥'+teks+'╚═〘 Toin BOT 〙', text, {detectLinks: false, quoted: mek})
					break
                case '_tagall4':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}@c.us\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Mencionando Todos 〙✪══\n╠➥'+teks+'╚═〘 Toin BOT 〙', text, {quoted: mek})
					break

                case '_tagall5':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}@s.whatsapp.net\n`
						members_id.push(mem.jid)
					}
					reply('╔══✪〘 Mencionando Todos 〙✪══\n╠➥'+teks+'╚═〘 Toin BOT 〙')
					break
  */
				
				case '_send':
					var pc = body.slice(6)
					var nomor = pc.split("|")[0];
					var pesan = pc.split("|")[1];
					client.sendMessage(nomor+'@s.whatsapp.net', pesan, text)
					break
					case 'quotesnime':
					nimek = await fetchJson('https://animechanapi.xyz/api/quotes/random')
					hasil = `anime : ${nimek.data.anime}\nCharacter : ${nimek.data.character}\n${nimek.data.quote}`
					reply(hasil)
					break

				case '_setppbot':
					case '_setRestartBot':
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Envie fotos com legendas ${prefix}setbotpp ou tags de imagem que já foram enviadas`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Obrigado pelo novo perfil😗')
					break
				
				case 'bc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 BROADCAST 」*\n\n${body.slice(4)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('Transmissão de sucesso')
					}
					break
					
					case '_bcgc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 BC GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `*「 BC GROUP 」*\n*Group* : ${groupName}\n\n${body.slice(6)}`)
						}
						reply('Grupo de transmissão de sucesso')
					}
					break

				case 'alay':
                    client.updatePresence(from, Presence.composing) 
                    //if (!isUser) return reply(mess.only.daftarB)
                    data = await fetchJson(`https://arugaz.herokuapp.com/api/bapakfont?kata=${body.slice(6)}`)
                    reply(data.result)
                    break

                    case 'quotemaker':
                    gh = body.slice(12)
                    //if (!isUser) return reply(mess.only.daftarB)
                    teks1 = gh.split("|")[0];
                    teks2 = gh.split("|")[1];
                    teks3 = gh.split("|")[2]
                    data = await fetchJson(`https://terhambar.com/aw/qts/?kata=${teks1}&author=${teks2}&tipe=${teks3}`)
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek, caption: 'neh...'})
                    break

                    case 'glitch':
                    gh = body.slice(7)
                    //if (!isUser) return reply(mess.only.daftarB)
                    teks1 = gh.split("|")[0];
                    teks2 = gh.split("|")[1];
                    data = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=glitch&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
                    hasil = await getBuffer(data.result)
                    client.sendMessage(from, hasil, image, {quoted: mek, caption: 'neh...'})
                    break
                    
                    case '___leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                     setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'Sayonara👋', text) // ur cods
					}, 0)
                     break

				case 'chord':
					if (args.length < 1) return reply('onde está o título da música')
                                        //if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)					
					anu = await fetchJson(`https://arugaz.my.id/api/chord?q=${tels}`, {method: 'get'})
					reply(anu.result)
					break

                //Enviar a letra da música
				case 'letra':
					if (args.length < 1) return reply('Você precisa definir a Busca.')
					reply("_Buscando letra..._")
                    //if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					//anu = await fetchJson(`https://arugaz.my.id/api/lirik?judul=${tels}`, {method: 'get'})
					dados = await fetchJson(`https://freerestapi.herokuapp.com/api/lirik?l=${tels}`)
					letra = `${dados.data}`
					reply(letra)
					break
                 

			/* Enviar a letra da música
			case 'lirik':
			case 'música':
			case 'musica':
			if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
			if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
            if (args.length == 0) return client.reply(from, 'Comando incorreto | enviar .musica "nome da musica", para ser mais preciso, colocar o nome do artista, exemplo: .musica Céline Dion - My Heart Will Go On ', message.id)
            client.sendMessage(from, '_Buscando letra..._', text)
            const lagu = body.slice(7)
            console.log(lagu)
            const lirik = await liriklagu(lagu)
            client.sendMessage(from, lirik, text)
            break
			*/
			case 'igstalk':
			if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
                      hmm = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/igs?u=${body.slice(9)}`)
                     buffer = await getBuffer(hmm.data.profilehd)
                     hasil = `Nome completo : ${hmm.data.fullname}\nseguidores : ${hmm.data.follower}\nSegue : ${hmm.data.following}\nPrivate : ${hmm.data.private}\nVerified : ${hmm.data.verified}\nbio : ${hmm.data.bio}`
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    break
                    case 'ownergrup':
				  case 'ownergroup':
               client.updatePresence(from, Presence.composing) 
              options = {
          text: `Este proprietário do grupo é : @${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           client.sendMessage(from, options, text, { quoted: mek } )
				break

           case 'quran':
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					client.sendMessage(from, quran, text, {quoted: mek})
					break

           case 'nekonime':
           data = await fetchJson('https://waifu.pics/api/sfw/neko')
           //if (!isUser) return reply(mess.only.daftarB)
           hasil = await getBuffer(data.url)
           client.sendMessage(from, hasil, image, {quoted: mek})
           break
				case 'neko':
					gatauda = body.slice(6)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nekonime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break	


			case '_exe':
	              client.updatePresence(from, Presence.composing) 
	              if (!isOwner) return reply(mess.only.ownerB)
	               const cmd = body.slice(5)
	               exec(cmd, (err, stdout) => {
		           if(err) return client.sendMessage(from, "Comando Salah", text, { quoted: mek })
		           if (stdout) {
			       client.sendMessage(from, stdout, text, { quoted: mek })
		           }
	           })
                break
                
                case 'linkgroup':
				case 'linkgrup':
				case 'link':
				if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
				    if (!isGroupAdmins) return reply(mess.only.admin)
                    //if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode (from)
					yeh = `Olá, aqui está o link do grupo 👇🏻\n\nhttps://chat.whatsapp.com/${linkgc}\n\n*${groupName}*`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break

				case 'ig':
					if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
				    //if (!isGroupAdmins) return reply(mess.only.admin)
                    //if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = "https://www.instagram.com/cabo_danau/"
					yeh = `Olá, aqui está o link da Nossa Página no Instagram 👇🏻\n\n${linkgc}\n\n*•OS CABOS DANAU-MEMES OFICIAL•*`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break

                case 'qrcode':
                buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
				client.sendMessage(from, buff, image, {quoted: mek})
				break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja mas')
					}
					break

                     case 'bugreport':
                     const bug = body.slice(5)
                     // if (pesan.length > 300) return client.sendMessage(from, 'Desculpe, o texto é muito longo, máximo de 300 letras', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       teks1 = `*[RELATÓRIO]*\nNúmero : @${nomor.split("@s.whatsapp.net")[0]}\nmensagem : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage(NomerOwner, options, text, {quoted: mek})
                    reply('Problemas foram relatados ao proprietário do BOT, relatórios falsos não serão respondidos.')
                    break
               case 'apakah':
               client.updatePresence(from, Presence.composing) 

               random = apakah[Math.floor(Math.random() * (apakah.length))]
  	
			   hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}*`
			   reply(hasil)
			   break
              
              case 'bisakah':
                client.updatePresence(from, Presence.composing) 
              //if (!isUser) return reply(mess.only.daftarB)
                random = bisakah[Math.floor(Math.random() * (bisakah.length))]
  	
			   hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}*`
			   reply(hasil)
			   break
              
               case 'rate':
              client.updatePresence(from, Presence.composing) 
              if (!isUser) return reply(mess.only.daftarB)
                random = `${Math.floor(Math.random() * 100)}`
               hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random}%*`
              reply(hasil)
                break
	    
	    case 'kapankah':
               client.updatePresence(from, Presence.composing) 
                if (!isUser) return reply(mess.only.daftarB)
               random = kapankah[Math.floor(Math.random() * (kapankah.length))]
               random2 = `${Math.floor(Math.random() * 8)}`
               hasil = `Pertanyaan : *${body.slice(1)}*\n\nJawaban : *${random2} ${random}*`
              reply(hasil)
                break


         // Comando Michael
         case '__michael':    
         //if (comandStatus === 0) return client.reply(from, 'Comandos desativados', id)
         client.sendFile(from, './pessoas/michael.jpg', 'michael.jpg', '⚪ - Esse é Michael, criador do Eletrobot, ou seja, Meu Pai 😎, ele tem cara de Doido, mas é doido mesmo. 🤖\n\nSiga meu Instagram\nhttps://www.instagram.com/michaelrmartins/', message.id)
         break



				case 'fig':
					if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
					if (comandStatus === 0) return reply('Comandos desativados')
					if(isCmdBanido) return console.log('comando do Banido')
					//Criar figurinha estática
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                        //if (!isUser) return reply(mess.only.daftarB)
                        reply('_Processando Figurinha..._  🕑')
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								//console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Figurinha Pronta')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							//client.sendMessage(from,'Eletrobot 🔥', text)

						// Criar figurinha animada
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply('_Processando Figurinha Animada..._  🕑')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								//console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`⚠️ - Ocorreu um erro no momento da conversão ${tipe}, tente enviar um arquivo menor, ou envie um gif ao invés de um vídeo`)
							})
							.on('end', function () {
								console.log('Figurinha Animada Pronta')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								client.sendMessage(from,'Eletrobot 🔥', text)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else {
		                   
		                   reply(`⚠️ - Ocorreu um erro no momento da Conversão, tente enviar um video menor, *o limite é 8 segundos*, ou envie um gif ao invés de um vídeo`)

						}						
						break

					case 'figq':
					//Criar figurinha estática
					if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
					if (comandStatus === 0) return reply('Comandos desativados')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                        //if (!isUser) return reply(mess.only.daftarB)
                        reply('_Processando Figurinha..._  🕑')
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Figurinha Pronta')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})                                                                                                                           //pad=320:320:-1:-1:color=white@0.0
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(512,iw)':min'(512,ih)',fps=15,split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							//client.sendMessage(from,'Eletrobot 🔥', text)

						// Criar figurinha animada
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply('_Processando Figurinha Animada..._  🕑')
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Ocorreu um erro no momento da conversão ${tipe}, tente enviar um arquivo menor, ou envie um gif ao invés de um vídeo`)
							})
							.on('end', function () {
								console.log('Figurinha Animada Pronta')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								client.sendMessage(from,'Eletrobot 🔥', text)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)',fps=15, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}  else {

				             reply(`⚠️ - Ocorreu um erro no momento da Conversão, tente enviar um video menor, *o limite é 8 segundos*, ou envie um gif ao invés de um vídeo`)

						}
						
						break


				case 'animehug':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/hug&apikey=BotWeA', {method: 'get'})
                                        //if (!isUser) return reply(mess.only.daftarB)
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break

				// Transforma a Figurinha em imagem.
				case 'toimg':
				    client.updatePresence(from, Presence.composing)
                    //if (!isUser) return reply(mess.only.daftarB)
					if (!isQuotedSticker) return reply('Você deve selecionar Apenas Stickers')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						//fs.unlinkSync(media)
						//if (err) return reply('Ocorreu uma Falha ao converter Stickers em imagens, Tente novamente')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>/feito/<'})
						//fs.unlinkSync(ran)
					})
					break
                	
                	case 'tomp3':
                	client.updatePresence(from, Presence.composing) 
                    //if (!isUser) return reply(mess.only.daftarB)
					//if (!isQuotedVideo) return reply('Você deve responder Apenas Vídeos para que eu possa converter para mp3')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Ocorreu uma Falha ao converter vídeo para mp3, Tente novamente')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break

                case 'ninjalogo':
                      if (args.length < 1) return reply('Cadê o texto?')
                      if (!isUser) return reply(mess.only.daftarB)
                      gh = body.slice(11)
                      gl1 = gh.split("|")[0];
                      gl2 = gh.split("|")[1];
                      reply(mess.wait)
                      anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${gl1}&text2=${gl2}&apikey=BotWeA`, {method: 'get'})
                      buff = await getBuffer(anu.result)
                      client.sendMessage(from, buff, image, {quoted: mek})
                      break
             
            //case 'youtube':
            case 'baixar':
            	if(!isGroup) reply('Não vou 😳')
            	// return reply ('Não Quero 😳')
                if(!isActiveUserG1 && !isActiveUserG2) return reply('Você não pode Usar este comando porque não é um membro ativo do Grupo')
	            //if (!isUser) return reply('Comando Temporariamente Desativado')
                reply(mess.wait)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
                if (anu.error) return reply(anu.error)
                infomp3 = `*Vídeo Encontrado*\n: ${anu.result.title}\nOrigem: ${anu.result.source}\nTamanho : ${anu.result.size}\n\n*Convertendo para MP3, Aguarde..*`
                buffer = await getBuffer(anu.result.thumbnail)
                ylagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, ylagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek},  {caption: anu.title})
                break


                case 'infocuaca':
                   tels = body.slice(11)
                   anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cuaca?wilayah=${tels}&apikey=BotWeA`, {method: 'get'})
                   if (!isUser) return reply(mess.only.daftarB)
                   if (anu.error) return reply(anu.error)
                   hasil = ` *O lugar : ${anu.tempat}\nClima : ${anu.cuaca}\nVento : ${anu.angin}\nTemperatura : ${anu.suhu}\nUmidade : ${anu.kelembapan}`
                   client.sendMessage(from, hasil, text, {quoted: mek})
                   break
                              case 'game':
					anu = await fetchJson(`http://rt-files.000webhostapp.com/tts.php?apikey=rasitech`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban+'\n'+anu.result.desk, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
                    
                    case '_daftar':
					client.updatePresence(from, Presence.composing)
					if (isUser) return reply('você já está registrado')
					if (args.length < 1) return reply(`Parâmetro incorreto \nCommand : ${prefix}daftar nome|idade\nContoh : ${prefix}daftar Toin|18`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						user.push(sender)
						fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
						client.sendMessage(from, `\`\`\`O registro foi bem sucedido com SN: TM08GK8PPHBSJDH10J\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Número]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Era]: ${umure}\`\`\`\n\`\`\`Para usar o bot\`\`\`\n\`\`\`Por favor\`\`\`\n\`\`\`enviar ${prefix}help\`\`\`\n\`\`\`\nTotal de usuários ${user.length}\`\`\``, text, {quoted: mek})
					break
                    
                    case '_welcome':
                    case 'bot---ok':
					if (!isGroup) return reply(mess.only.group)
                     //if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('digite 1 para ativar')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('o recurso está ativo')
						welkom.push(from)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCESSO ❭ ')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, disable)
						fs.writeFileSync('./database/json/welkom.json', JSON.stringify(welkom))
						reply('❬ SUCESSO ❭ ')
					} else {
						reply('digite 1 para ativar, 0 para desativar o recurso')
					}
                    break
                    
                    case 'fakta':
					fakta = body.slice(1)
                    if (!isUser) return reply(mess.only.daftarB)
					const fakta =['Massa bumi mencapai 5.972.190.000.000.000.000.000.000 kg. Mesekipun sedemikian berat, faktanya bumi memiliki kecepatan 107.281 km per jam untuk mengitari matahari. Cepat sekali, bukan?','Massa berat bumi didominasi debu-debu antariksa dan dapat berkurang akibat gas seperti hidrogen yang berkurang tiga kilogram setiap detiknya. Fakta unik ini menunjukkan bahwa bumi akan kehilangan 95 ribu ton massa setiap tahunnya','Pada 2018 populasi manusia diperkirakan mencapai 7,6 miliar orang. Meskipun bumi dipenuhi manusia, fakta unik mengungkapkan bahwa manusia tidak memengaruhi massa bumi. Hal ini dikarenakan manusia terbentuk dari atom dalam bentuk oksigen 65 persen, karbon 18,5 persen, dan hidrogen 9,5 persen.','bumi dipenuhi oleh 70 persen air sehingga kerap wajar jika bumi disebut dengan nama planet air. Lautan bumi yang paling dalam adalah Palung Mariana dengan kedalaman 10.994 meter di bawah air. Fakta unik dibalik Palung Mariana adalah jika kamu meletakkan Gunung Everest di sana, puncak tertingginya bahkan masih berada di bawah permukaan laut sejauh 1,6 kilometer!','Faktanya bumi yang manusia tinggali hanya satu persen bagian dari keseluruhan planet bumi. Fakta unik ini menunjukkan bahwa masih banyak bagian bumi yang memiliki misteri kehidupan. Tertarik melakukan penjelajahan untuk menguak misteri sekaligus fakta unik di bagian bumi lainnya','Terdapat sebuah kota di Rusia yang jalanannya tertata rapi dengan sebuah istana yang didesain seperti catur yang megah. Pembuatan pemukiman tersebut didalangi oleh presiden yang terobsesi dengan catur bernama Kirsan Ilyumzhinov.','Apakah kamu tahu fakta unik mengenai mozzarella yang dibuat dari susu kerbau dan bukan susu sapi? Sekitar 500 tahun yang lalu di Campania, Italia, mozzarella dibuat pertama kali menggunakan susu kerbau. Fakta unik dibalik penggunaan susu kerbau ini karena kandungan protein susu kerbau 10-11% lebih banyak daripada susu sapi.','Bali memiliki fakta unik karena memliki banyak hari libur yang disumbangkan oleh sejumlah hari raya besar keagamaan. Hampir setiap hari besar keagamaan ini setiap orang akan mendapatkan libur. Beberapa hai libur diantaranya adalah hari raya galungan, kuningan, nyepi, pagerwesi, saraswati, dan sejumlah upacara besar lainnya seperti piodalan (pujawali).','Ibukota Jakarta memiliki banyak pesona juga fakta unik yang mungkin belum kamu ketahui. Sebelum diberi nama Jakarta, Ibukota Indonesia ini telah memiliki beberapa kali perubahan nama. Nama Ibukota Indonesia sesuai urutan perubahannya diantaranya adalah Sunda Kelapa, Jayakarta, Batavia, Betawi, Jacatra, Jayakarta, dan Jakarta.','Pada tahun 1952 jendela pesawat didesain dalam bentuk persegi namun penggunaannya dinilai cacat sehingga tidak  diterapkan kembali. Jendela yang bulat dirancang untuk menyiasati perbedaan tekanan udara dalam dan luar pesawat untuk menghindari kegagalan struktural yang dapat menyebabkan kecelakaan pesawat.','Makanan utama dari nyamuk jantan dan betina pada umumnya adalah nektar dan zat manis yang sebagian besar diperoleh dari tanaman. Namun nyamuk membutuhkan protein tambahan unuk bertelur yang bisa didapatkan dari manusia sedangkan nyamuk jantan tidak membutuhkan zat protein tambahan untuk bertelur.','Jembatan suramadu (surabaya-madura) adalah jembatan terpanjang di Asia Tenggara (5438 m).','Tertawa dan bahagia meningkatkan imun, terutama produksi sel-sel pembunuh alamiah yang membantu melindungi tubuh dari penyakit','Kecoa kentut setiap 15 menit dan terus mengeluarkan gas metana (kentut) selama 18 jam setelah kematian.','Mengoleskan jeruk nipis dapat mencerahkan bagian lutut / siku yang hitam.','Energi yang dihasilkan oleh angin ribut (topan) selama 10 menit lebih besar dibandingkan energi dari bom saat perang','Satu-satunya indera manusia yang tidak berfungsi saat tidur adalah indera penciuman.','Para astronot dilarang makan makanan berjenis kacang-kacangan sebelum pergi ke luar angkasa. Karena bisa menyebabkan mereka mudah kentut. Dan gas kentut sangat membahayakan bagi baju luar angkasa mereka.','Di AS saja, kucing membunuh miliaran hewan dalam kurun waktu setahun. Mereka bertanggung jawab atas kematian 1,4 - 73,7 miliar burung dan 6,9 - 20,7 miliar mamalia setiap tahun. Bukan hanya itu, sejauh ini mereka benar-benar memusnahkan total 33 spesies dari dunia.','Ikan hiu kehilangan gigi lebih dari 6000buah setiap tahun, dan gigi barunya tumbuh dalam waktu 24 jam.','Semut dapat mengangkat Beban 50 kali tubuhnya.','Mulut menghasilkan 1 liter ludah setiap hari.','Siput bisa tidur selama 3 tahun','Kecoak bisa hidup 9 hari tanpa kepala, dan akan mati karena kelaparan','Mata burung unta lebih besar dari otaknya']
					const keh = fakta[Math.floor(Math.random() * fakta.length)]
					client.sendMessage(from, 'fakta : '+ keh, { quoted: mek })
					break
                                case 'water':
					if (args.length < 1) return reply(mess.blank)
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					if (tels.length > 15) return reply('O texto é muito longo, até 20 caracteres')
					reply(mess.wait)
					anu = await fetchJson(`https://kocakz.herokuapp.com/api/flamingtext/water?text=${tels}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				
					case 'firetext':
					if (args.length < 1) return reply(mess.blank)
                                        if (!isUser) return reply(mess.only.daftarB)
					tels = body.slice(7)
					if (tels.ength > 10) return reply('O texto é longo, até 9 caracteres')
					reply(mess.wait)
					anu = await fetchJson(`https://zeksapi.herokuapp.com/api/tlight?text=${tels}&apikey=vinzapi`, {method: 'get'})
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
                    
                    case 'gantengcek':
					if (isUser) return reply(mess.only.daftarB)
					ganteng = body.slice(1)
					const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					client.sendMessage(from, 'Questão : *'+ganteng+'*\n\nResponda : '+ teng+'%', text, { quoted: mek })
					break
					
					case 'cantikcek':
					if (isUser) return reply(mess.only.daftarB)
					cantik = body.slice(1)
					const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, 'Questão : *'+cantik+'*\n\nResponda : '+ tik+'%', text, { quoted: mek })
					break
				
				    case 'watak':
				    if (isUser) return reply(mess.only.daftarB)
					watak = body.slice(1)
					const wa =['peny ayang','pem urah','Pem arah','Pem aaf','Pen urut','Ba ik','bap eran','Baik Hati','peny abar','Uw u','top deh, poko knya','Suka Memb antu']
					const tak = wa[Math.floor(Math.random() * wa.length)]
					client.sendMessage(from, 'Questão : *'+watak+'*\n\nResponda : '+ tak, text, { quoted: mek })
				    break
				case 'hobby':
				if (isUser) return reply(mess.only.daftarB)
					hobby = body.slice(1)
					const hob =['Memasak','Membantu Atok','Mabar','Nobar','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nResponda : '+ by, text, { quoted: mek })
					break
                                case 'nsfwneko':
				    try{
						if (!isNsfw) return reply('❌ *NSFW NAUM ATIVADO* ❌')
                                                if (!isUser) return reply(mess.only.daftarB)
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'mesum'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
                                case 'shota':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomshota?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
                                                if (!isUser) return reply(mess.only.daftarB)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nich'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
				
					case 'logowolf':
					var gh = body.slice(11)
					var teks1 = gh.split("|")[0];
					var teks2 = gh.split("|")[1];
					if (args.length < 1) return reply(`onde está o texto? exemplo ${prefix}logowolf Toin|BOT`)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo1&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break				
                                 case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('digite 1 para ativar')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('o recurso está ativo')
						nsfw.push(from)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCESSO ❭ ativado o recurso nsfw neste grupo')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/json/nsfw.json', JSON.stringify(nsfw))
						reply('❬ SUCESSO ❭ desativado o recurso nsfw neste grupo')
					} else {
						reply('digite 1 para ativar, 0 para desativar o recurso')
					}
					break	
				case 'bucin':
					gatauda = body.slice(7)					
					anu = await fetchJson(`https://arugaz.my.id/api/howbucins`, {method: 'get'})
					reply(anu.desc)
					break	
				case 'quotes2':
					gatauda = body.slice(8)					
					anu = await fetchJson(`https://arugaz.my.id/api/randomquotes`, {method: 'get'})
					reply(anu.quotes)
					break		
			    case 'waifu':
					gatauda = body.slice(7)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://arugaz.my.id/api/nekonime`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image,{quoted: mek})
					break
				case 'randomanime':
					gatauda = body.slice(13)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break						
                                case 'husbu':
                                        gatauda = body.slice(13)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'husbu2':
					gatauda = body.slice(13)
					reply(mess.wait)
                                        if (!isUser) return reply(mess.only.daftarB)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu2?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
				case 'logowolf2':
					var gh = body.slice(11)
					var teks1 = gh.split("|")[0];
					var teks2 = gh.split("|")[1];
					if (args.length < 1) return reply(`onde está o texto? exemplo ${prefix}logowolf Toin|BOT`)
                                        if (!isUser) return reply(mess.only.daftarB)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=wolflogo2&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break	
                    
                    case 'delete':
					case 'del':
					if(isCmdBanido) return reply('Você foi banido de Enviar Comandos!') 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply ('Este comando só pode ser usado pelo Michael')
                    //if (!isUser) return reply(mess.only.daftarB)
					if (!isGroupAdmins)return reply(mess.only.admin)
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
                    
                    case 'phlogo':
					var gh = body.slice(7)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply(`Cadê o texto, hum\nExemplo: ${prefix}phlogo |Toin|BOT`)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/textpro?theme=pornhub&text1=${gbl1}&text2=${gbl2}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
                case 'truth':
					const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					break
                                case 'dare':
					const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "ðŸ¦„ðŸ’¨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
					break	
                case 'level':
                if (!isLevelingOn) return reply(mess.levelnoton)
                if (!isGroup) return reply(mess.only.group)
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
                sem = sender.replace('@s.whatsapp.net','')
                resul = `◪ *LEVEL*\n  ├─ ❏ *Nome* : ${sem}\n  ├─ ❏ *User XP* : ${userXp}\n  └─ ❏ *User Level* : ${userLevel}`
               client.sendMessage(from, resul, text, { quoted: mek})
                .catch(async (err) => {
                        console.error(err)
                        await reply(`Error!\n${err}`)
                    })
            break
				case 'fitnah':
				if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
				var gh = body.slice(7)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					client.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
            

            case 'leveling':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.admin)
                if (args.length < 1) return reply('Digite 1 para ativar o recurso')
                if (args[0] === '1') {
                    if (isLevelingOn) return reply('*o recurso de nível já estava ativo antes*')
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.levelon)
                } else if (args[0] === '0') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.leveloff)
                } else {
                    reply(` *Digite o comando 1 para ativar, 0 para desativar *\n * Exemplo: ${prefix}leveling 1*`)
                }
            break
                                case 'infogempa':
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/infogempa?apikey=BotWeA`, {method: 'get'})
                                        if (!isUser) return reply(mess.only.daftarB)
                                        if (anu.error) return reply(anu.error)
                                        hasil = `*Kedalaman* : ${anu.kedalaman}\n*Koordinat* : ${anu.koordinat}\n*Lokasi* : ${anu.lokasi}\n*Magnitude* : ${anu.magnitude}\n*Map* : ${anu.map}\n*Potensi* : ${anu.potensi}\n*Waktu* : ${anu.waktu}`
                                        client.sendMessage(from, hasil, text, {quoted:mek})
                                        break
                                case 'nsfwtrap':
                                        try{
                                                if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
                                                if (!isUser) return reply(mess.only.daftarB)
                                                res = await fetchJson(`https://tobz-api.herokuapp.com/nsfwtrap?apikey=BotWeA`, {method: 'get'})
                                                buffer = await getBuffer(res.result)
                                                client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih gambarnya kak...'})
                                        } catch (e) {
                                                console.log(`*Error* :`, color(e,'red'))
                                                reply('❌ *ERROR* ❌')
                                        }
										break
										case 'randomhentaio': 
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'hentai teros'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwloli':
						try {
							//if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://api.lolis.life/random?nsfw=true`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwbobs': 
						try {
							//if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/biganimetiddies`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'a'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwblowjob':
						try {
							//if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwneko':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://api.computerfreaker.cf/v1/neko`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'trap':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://api.computerfreaker.cf/v1/trap`, {method: 'get'})
							buffer = await getBuffer(res.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
					break
				case 'nsfwass':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`'https://meme-api.herokuapp.com/gimme/animebooty`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tai a bunda que vc queria'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwsidebobs':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/sideoppai`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'aaaah'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
					    break
					case 'nsfwahegao':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/ahegao`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'fodar'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwthighs':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animethighss`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'aaah q bosta'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
					case 'nsfwfeets':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animefeets`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tai mais fia sapoha no cu'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌') 
						}
						break
					case 'nsfwarmpits':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animearmpits`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tai'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
						case 'nsfwtoin':
						try {
							if (!isNsfw) return reply('❌ *NSFW Desativado* ❌')
							res = await fetchJson(`https://tobz-api.herokuapp.com/nsfwtrap?apikey=BotWeA`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tai os peitos que vc queria\npunhetero de merda'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ *ERROR* ❌')
						}
						break
                       

	                   
	                    case 'neonlogo':
	                            var gh = body.slice(9)
	                            var teks1 = gh.split("|")[0];
	                            if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}neonlogo Eletrobot`)
	                            reply(mess.wait)
	                            anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_light&text=${teks1}&apikey=BotWeA`, {method: 'get'})
	                            buffer = await getBuffer(anu.result)
	                            client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
	                            break
	                    case 'neonlogo2':
	                            var gh = body.slice(10)
	                            teks1 = gh.split("|")[0];
	                            if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}neonlogo2 Eletrobot`)
	                            reply(mess.wait)
	                            anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=neon_technology&text=${text1}&apikey=BotWeA`, {method: 'get'})
	                            buffer = await getBuffer(anu.result)
	                            client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
	                            break
	                    case 'lionlogo':
	                            var gh = body.slice(9)
	                            var teks1 = gh.split("|")[0];
	                            var teks2 = gh.split("|")[1];
	                            if (args.length < 1) return reply(`teksnya mana um\nContoh: ${prefix}lionlogo Toin|BOT`)
	                            reply(mess.wait)
	                            anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=lionlogo&text1=${text1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
	                            buffer = await getBuffer(anu.result)
	                            client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
	                            break
	                    /*case 'jsholat':
	                            tels = body.slice(8)
	                            if (args.length < 1) return reply('Daerahnya dimana kak?')
	                            anu = await fetchJson(`https://tobz-api.herokuapp.com/api/jadwalshalat?q=${tels}&apikey=BotWeA`, {method: 'get'})
	                            reply(anu.result)
	                            break*/
	                    case 'jokerlogo':
	                            var gh = body.slice(10)
	                            var teks1 = gh.split("|")[0];
	                            if (args.length < 1) return reply(`onde está o texto um \nExemplo: ${prefix}jokerlogo Eletrobot`)
	                            reply(mess.wait)
	                            anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${teks1}&apikey=BotWeA`, {method: 'get'})
	                            buffer = await getBuffer(anu.result)
	                            client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
	                            break
	                    case 'jadwaltvnow':  
				if (!isUser) return reply(mess.only.daftarB)
                               reply(mess.wait)
		               anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/jadwaltvnow?&apiKey=administrator`, {method: 'get'})
			       reply(anu.result.jadwalTV)
					break
                                case 'afk':
                                        tels = body.slice(4)
                                        if (args.length < 1) return reply('kakak afk karena apa?')
                                        if (!isUser) return reply(mess.only.daftarB)
                                        var nom = mek.participant
                                        const tag = {
                                                text: `@${nom.split("@s.whatsapp.net")[0]} *TO AFK CCT ${tels} NAUM PERTURBE OKEI?*`,
                                                contextInfo: { mentionedJid: [nom] }
                                        }
                                        client.sendMessage(from, tag, text, {quoted: mek})
										break
                                case 'shadow':
                                        var gh = body.slice(7)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}shadow Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=shadow&text=${text1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'burnpaper':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}burnpaper Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=burn_paper&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'coffee':
                                        var gh = body.slice(7)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}coffee Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=coffee&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'lovepaper':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}lovepaper Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=love_paper&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'woodblock':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}woodblock Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wood_block&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'qowheart':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}qowheart Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=quote_on_wood_heart&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'mutgrass':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}mutgrass Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=message_under_the_grass&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'undergocean':
                                        var gh = body.slice(12)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}undergocean Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=underwater_ocean&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'woodenboards':
                                        var gh = body.slice(13)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}woodenboards Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wooden_boards&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'wolfmetal':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}wolfmetal Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case 'metalictglow':
                                        var gh = body.slice(14)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}metalictglow Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=metalic_text_glow&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case '-8bit':
                                        var gh = body.slice(5)
                                        var teks1 = gh.split("|")[0];
                                        var teks2 = gh.split("|")[1];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}8bit Toin|BOT`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=bit8&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eh...'})
                                        break
                                case '-randomkpop':
                                        gatauda = body.slice(6)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomkpop?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih kpopnya kak...'})
                                        break
                                case '-fml2':
                                        getauda = body.slice(6)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        data = await fetchJson(`https://tobz-api.herokuapp.com/randomfmylife?apikey=BotWeA`, {method: 'get'})
                                        hasil = `*Fuck My Life*\n${data.result}`
                                        reply(hasil)
                                        break
                                case 'tiktok':
					if (args.length < 1) return reply('Urlnya mana um?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/tiktok?url=${args[0]}&apiKey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {quoted: mek})
					break
				
				case 'ttp':
					if (args.length < 1) return reply('Textnya mana um?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(4).trim()
					anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${BarBarKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
                    case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Pronto Senor')
					break
				case '_simi':
					if (args.length < 1) return reply('Onde está o texto?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case '_simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('O modo Simi está ativado')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Ativado com sucesso o modo simi neste grupo ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Desativando o modo simi com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					break
				case 'perfil':
					if (!isGroup) return reply(mess.only.group)
					//if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('A tag alvo que você deseja clonar')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Você Precisa Marcar alguém')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.sendMessage(from, buffer, MessageType.image, {caption: 'Aff, que susto kkkk'})
						//client.updateProfilePicture(botNumber, buffer)
						//mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Perfil com Foto Privada')
					}
					break
                                /*case 'magernulis':
                                        var gh = body.slice(11)
                                        var teks7 = gh.split("|")[0];
                                        var teks2 = gh.split("|")[1];
                                        var teks3 = gh.split("|")[2];
                                        if (args.length < 1) return reply('teks, nama, kelas nya mana kak?\nContoh: ${prefix}magernulis teks|nama|kelas\nContoh pemakaian: ${prefix}magernulis NazwaCanss|Nazwa|10C')
                                        if (!isUser) return reply(mess.only.daftarB)
                                        anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/joki-nulis?text=${teks7}&nama=${teks2}&kelas=${teks3}&apiKey=administrator`, {method: 'get'})
                                        buffer = await getBuffer(anu.result.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih kak...'})
                                        break*/
                                case 'pubglogo':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        var teks2 = gh.split("|")[1];
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}pubglogo Toin|BOT`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih logonya kak...'})
                                        break
                                case 'herrypotter':
                                case 'harrypotter':
                                        var gh = body.slice(12)
                                        if (args.length < 1) return reply(`onde está o texto hum\nExemplo: ${prefix}harrypotter Eletrobot`)
                                        if (!isUser) return reply(mess.only.daftarB)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=harry_potter&text=${gh}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Nih kak gambarnya...'})
                                        break
			 	case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        //if (!isUser) return reply(mess.only.daftarB)
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
		      				})
					} else {
						reply('Mi ama senor?')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else 

					{
						//console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
												
						// ============= Monitoramento de palavrões ================
						//const palavrasProibidas = ['porra', 'pnc', 'vsf', 'caralho','crl','wtf','wtf?', 'prr', 'cu', 'bct', 'piranha', 'viado', 'arrombado', 'foda', 'foda-se','fodido', 'fodida',' foder',  'cuzão', 'cuzao', 'otario', 'otário', 'imbecil', ]
						//const palavrasProibidas = filtroPalavras
						const violacoes = budy.toLowerCase().split(" ").filter((palavra) => palavrasProibidas.includes(palavra));
						
						// ============ Monitoramento ============
						//const palavrasRita = ['rita', 'eletrobot', 'bot', 'rita,']
						const palavrasRita = ['cringe']
						const chamouRita = budy.toLowerCase().split(" ").filter((palavra) => palavrasRita.includes(palavra));

						// ============ Agradecer ============
						const palavrasAgradecer = ['Obrigado', 'Obrigada']
						const agradeceuBot = budy.toLowerCase().split(" ").filter((palavra) => palavrasAgradecer.includes(palavra));

						// ============ Pedidos Rita ===========
						const palavrasLinkRita = ['link', 'link?']
						const pedidoLinkRita = budy.toLowerCase().split(" ").filter((palavra) => palavrasLinkRita.includes(palavra));
						
						// ============ Algumas palavras ===========
						const palarasVoceRita = ['você', 'vc', 'voce']
						const pedidoVoceRita = budy.toLowerCase().split(" ").filter((palavra) => palarasVoceRita.includes(palavra));

						// ============ Algumas palavras ===========
						const palarasBomRita = ['bom', 'boa', 'voce']
						const pedidoBomRita = budy.toLowerCase().split(" ").filter((palavra) => palarasBomRita.includes(palavra));

						// Log de Quantidade de palavras cadastradas
						//console.log(palavrasProibidas.length)
						//console.log(violacoes.length)
					    if (violacoes.length > 0)
					     {
					     	//reply("Este tipo de palavra não é Permitida")

					     	texto = `❌Atenção, este tipo de palavra é proíbida aqui no grupo❌\n\nEstarei Marcado aqui os administradores para que analisem esta conduta.\n\n`
							contador = 0
							for (let admon of groupAdmins)
							{
								contador += 1
								texto += `[${contador.toString()}] @${admon.split('@')[0]}\n`
							}
							mentions(texto, groupAdmins, true);
						}
					
							
						if(chamouRita.length)
						{
							reply("demais kkkk")
							console.log(chamouRita)
						}
						

						if(agradeceuBot.length)
						{
							reply("Por nada  kkk")
							console.log(agradeceuBot)
						}

						/*
						if(chamouRita.length && palarasBomRita.length)
						{
							reply("Ahh, pra você também 🙏🏻")
							console.log(chamouRita)
						}


						//Pedido do link do grupo para a Rita
						if(pedidoVoceRita.length && pedidoLinkRita.length)
						{
							
							linkgc = await client.groupInviteCode (from)
							yeh = `Ok, aqui está o link do grupo 👇🏻\n\nhttps://chat.whatsapp.com/${linkgc}\n\n*${groupName}*`
							client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
							
							console.log(chamouRita)
						}

							*/

					//
					

					// -----------  Contador de Mensagens - Detectar membros ativos e inativos -----------

							//Grupo 1
							if(groupId2 === danau1id){
							  if(!isActiveUserG1){
							  	activeUsersG1.push(sender)
							  	fs.writeFileSync('./database/json/membrosAtivosG1.json', JSON.stringify(activeUsersG1))
							  	client.sendMessage(from, '🔆 - _Novo Usuário Registrado_⠀⠀⠀⠀⠀', text)
							    console.log('Registrado Usuario do Grupo 1')
							  	}// Fechamento do Segundo iff
							}// Fechamento do primemiro if

							//Grupo 2
							if(groupId2 === danau2id){
							  if(!isActiveUserG2){
							  	activeUsersG2.push(sender)
							  	fs.writeFileSync('./database/json/membrosAtivosG2.json', JSON.stringify(activeUsersG2))
							  	console.log('Registrado Usuario do Grupo 2')
							  	}// Fechamento do Segundo iff
							}// Fechamento do primemiro if


					} // Fechamento do Else 
					  
                }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()