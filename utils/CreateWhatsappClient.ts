import makeWASocket, { makeInMemoryStore, proto, useMultiFileAuthState } from '@whiskeysockets/baileys'
import qrcode from "qrcode-terminal"


const store = makeInMemoryStore({})

store.readFromFile('./baileys_store.json')

setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10000)


async function CreateSocket(session_folder: string) {
    const { state, saveCreds } = await useMultiFileAuthState(`sessions/${session_folder}`)
    const socket = makeWASocket({ auth: state })
    store.bind(socket.ev)
    return { socket, saveCreds }
}

export async function HandleSocket(session_id: string) {
    const { socket, saveCreds } = await CreateSocket(session_id)
    socket.ev.on('connection.update', async (conn) => {
        if (conn.connection === "close") {
            HandleSocket(session_id)
        }
        if (conn.connection === "connecting") {
            console.log(`loading ${session_id}`)
        }
        if (conn.qr)
            qrcode.generate(conn.qr, { small: true }, (qrcode) => {
                console.log(qrcode)
            })
    })
    socket.ev.on('creds.update', saveCreds)
    socket.ev.on('messages.upsert', async (data) => {
        console.log(data.messages)
        data.messages.forEach(async (msg) => {
            let id = msg.key.remoteJid
            if (id)
                await socket.sendPresenceUpdate('composing', id)
            if (msg && id && !msg.key.fromMe) {
                await HandleMessage(id, socket, msg)
            }
        })
    })
}

async function HandleMessage(id: string, socket: any, message: proto.IWebMessageInfo) {

    // const id = 'abcd@s.whatsapp.net' // the WhatsApp ID 
    // send a simple text!

    // send a reply messagge
    await socket.sendMessage(id, { text: 'oh hello there' }, { quoted: message })
    // send a mentions message
    await socket.sendMessage(id, { text: '@12345678901', mentions: ['12345678901@s.whatsapp.net'] })
    // send a location!
    await socket.sendMessage(
        id,
        { location: { degreesLatitude: 24.121231, degreesLongitude: 55.1121221 } }
    )
    // send a contact!
    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
        + 'VERSION:3.0\n'
        + 'FN:Jeff Singh\n' // full name
        + 'ORG:Ashoka Uni;\n' // the organization of the contact
        + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n' // WhatsApp ID + phone number
        + 'END:VCARD'
    await socket.sendMessage(
        id,
        {
            contacts: {
                displayName: 'Jeff',
                contacts: [{ vcard }]
            }
        }
    )


    const reactionMessage = {
        react: {
            text: "💖", // use an empty string to remove the reaction
            key: message.key
        }
    }
    // send a link
    await socket.sendMessage(id, { text: 'Hi, this was sent using https://github.com/adiwajshing/baileys' })
    await socket.sendMessage(
        id,
        {
            video: { url: "https://www.w3schools.com/tags/movie.mp4" }, mimetype: 'video/mp4',
            caption: "hello!"
        }
    )
    await socket.sendMessage(
        id,
        {
            document: { url: "https://ik.imagekit.io/ghzlr9kj8/Agarson%20Catlouge.pdf?updatedAt=1699345149889" }, mimetype: "*",
            caption: "hello! pdf"
        }
    )

    // send an audio file
    await socket.sendMessage(
        id,
        { audio: { url: "https://www.w3schools.com/html/horse.ogg" }, mimetype: 'audio/mp4' },
    )
    await socket.sendMessage(id, reactionMessage)
}