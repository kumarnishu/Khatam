import makeWASocket, { makeInMemoryStore, useMultiFileAuthState } from '@whiskeysockets/baileys'
import qrcode from "qrcode-terminal"
import fs from "fs"


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
        console.log(conn)
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
    socket.ev.on('messages.upsert', (data) => {
        console.log(data.messages)
        data.messages.forEach(async (msg) => {
            let id = msg.key.remoteJid
            if (msg && id && !msg.key.fromMe) {
                await socket.sendMessage(id, {
                    video: { url: "https://www.w3schools.com/tags/movie.mp4" }
                })
            }
        })
        socket.logout()
    })
}