const { WebSocketServer, WebSocket } = require('ws')

const webSocketServer = new WebSocketServer({ port: 9090, path: '/publish' })

const clientMap = () => {
    const clients = {}

    const subscribers = key => {
        clients[key] ??= new Set()
        return clients[key]
    }

    const subscribe = ({key}, ws) => {
        subscribers(key).add(ws)
    }

    const unsubscribe = ({key}, ws) => subscribers(key).delete(ws)

    const send = ({topic, message}, _) => {
        for (let ws of subscribers(topic))
            if (ws.readyState === WebSocket.OPEN) 
                ws.send(JSON.stringify(message))
    }

    const close = (_, ws) => {
        if (ws.readyState === WebSocket.OPEN) 
            ws.close()
        for(let k in clients)
            clients[k].delete(ws)
    }

    return { subscribe, unsubscribe, send, close }
}

const clients = clientMap()

webSocketServer.on('connection', (ws, req) => {
    ws.on('message', message => {
        const { type, ...params } = JSON.parse(message)
        if (clients[type])
            clients[type](params, ws)
        else
            console.error(`Incorrect message: '${message}' from ${req.socket.remoteAddress} (${req.socket.remoteFamily})`)
    })
    ws.on('close', () => clients.close({}, ws))
})

console.log('Pub/Sub server listening on 9090')
