const { networkInterfaces } = require('os')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { initializeData } = require('./cache')
const routes = require('./routes')

const app = express()
const SERVER_PORT = parseInt(process.env['SERVER_PORT'])
const IPAdress = getIPAddress()

app.use(express.static('public'))
app.use(express.json())
// remove cors on production because server anh client will running on the same port
app.use(cors({
    origin: 'http://localhost:3000'
}))
// routing api and init fetch data from database
routes(app)
// route everything else to React
app.get('*', (req, res) => {
    // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // console.log(`${ip} connected at ${new Date}`)
    res.sendFile(`${__dirname}/public/index.html`)
})

function getIPAddress() {
    const nets = networkInterfaces()
    const results = {}
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = []
                }
                results[name].push(net.address);
            }
        }
    }
    return results
}
// Init data from database and start server
initializeData()
    .then(() => {
        app.listen(SERVER_PORT || 3000, () => {
            console.log('\x1b[32m%s\x1b[0m', `Server is running: http://localhost:${SERVER_PORT}`)
            Object.keys(IPAdress).forEach(key => {
                IPAdress[key].forEach(IP => {
                    console.log('\x1b[32m%s\x1b[0m', `On your network: http://${IP}:${SERVER_PORT}`)
                })
            })
        })
    })
    .catch(error => {
        console.log('\x1b[31m%s\x1b[0m', `Fail to starting server: ${error.message}`)
    })