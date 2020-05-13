const net = require('net')

let client = net.connect(6667, 'irc.freenode.net')
client.setEncoding('utf-8')
client.on('connect', () => {
    console.log('111')
})
client.on('connect', () => {
    client.write('NICK mynick\r\n')
    client.write('USER mynick 0 * :realname\r\n')
    client.write('JOIN #node.js\r\n')
})