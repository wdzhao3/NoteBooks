const net = require('net')

let count = 0
const server = net.createServer((conn) => {
    conn.write('\n135154'
    + '\n' + count
    + '\n4646464'
    + '\n > 44646464 enter: ')
    count++
    console.log('\033[90m  new connection!\033[90m')
})

server.listen(3001, () => {
    console.log('11134646')
})