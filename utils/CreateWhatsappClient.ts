import makeWASocket, { makeInMemoryStore, proto, useMultiFileAuthState } from '@whiskeysockets/baileys'
import qrcode from "qrcode-terminal"
import { io } from '../app'
import { User } from '../models/users/user.model'
const fs = require("fs")

export var clients: { client_id: string, client: {} }[] = []
export let users: { id: string }[] = []

export function userJoin(id: string) {
    let user = { id }
    users.push(user)
    return user
}

export function getCurrentUser(id: string) {
    return users.find(user => user.id === id)
}

export function userLeave(id: string) {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1)
        return users.splice(index, 1)[0]
}

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

export async function CreateWhatsappClient(client_id: string) {
    const { socket: client, saveCreds } = await CreateSocket(client_id)
    client.ev.on('connection.update', async (conn) => {
        if (conn.connection === "close") {
            if (io)
                io.to(client_id).emit("disconnected_whatsapp", client_id)
            let user = await User.findOne({ client_id: client_id })
            if (user) {
                await User.findByIdAndUpdate(user._id, {
                    connected_number: null
                })
            }
            clients = clients.filter((client) => { return client.client_id === client_id })
            fs.rmSync(`sessions/${client_id}`, { recursive: true, force: true })
        }
        if (conn.connection === "connecting") {
            if (io)
                io.to(client_id).emit("loading");
            console.log(`loading ${client_id}`)
        }
        if (conn.qr) {
            qrcode.generate(conn.qr, { small: true }, (qr) => {
                if (io)
                    io.to(client_id).emit("qr", qr);
                clients = clients.filter((client) => { return client.client_id === client_id })
                console.log("qr generated", qr, client_id)
            })
        }
        if (conn.connection === "open") {
            console.log("connected", client.authState.creds.me?.id)
            if (io)
                io.to(client_id).emit("ready", client.authState.creds.me?.id)

            let user = await User.findOne({ client_id: client_id })
            if (user)
                await User.findByIdAndUpdate(user._id, {
                    connected_number: client.authState.creds.me?.id
                })
            if (!clients.find((client) => client.client_id === client_id))
                clients.push({ client_id: client_id, client: client })

        }
    })
    client.ev.on('creds.update', saveCreds)
    client.ev.on('messages.upsert', async (data) => {
        console.log(data.messages)
        data.messages.forEach(async (msg) => {
            let id = msg.key.remoteJid
            if (id)
                await client.sendPresenceUpdate('composing', id)
            if (msg && id && !msg.key.fromMe) {
                // await HandleMessage(id, socket, msg)
            }
        })
    })
}

