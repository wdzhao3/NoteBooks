const net = require('net')
// telnet 127.0.0.1 3001
let count = 0,
    users = {}
const server = net.createServer((conn) => {
    // 设置编码
    conn.setEncoding('utf8')

    let nickname;
    let res = '';
    // 客户端发来的数据
    conn.on('data', (data) => {
        // data = data.replace('\r\n', '') // 清楚回车键
        console.log(data)
        if(data != '\r\n') {
            res += data
            return
        } else {
            data = res
        }
        if (!nickname) {
            if (users[data]) {
                conn.write('name already in use. try again')
                return
            } else {
                count++
                nickname = data
                users[nickname] = conn

                broadcast('\r\nwelcome ' + nickname + ' joined the Room \r\n')
            }
        } else {
            // 其他链接的客户端视为聊天信息
            broadcast(' > ' + nickname + ': ' + data + '\r\n', true)
        }
        res = ''
    })
    // 客户端显示的数据
    conn.write('\r\n now Room(' + count + ')'
        + '\r\n Login'
        + '\r\n > your name and press enter: ')
    // 客户端连接关闭事件,错误关闭时也会触发close，而不会触发end事件
    conn.on('close', () => {
        console.log('链接-1')
        delete users[nickname]
        count--
        broadcast(' > ' + nickname + ' : left the Room' +  + '\r\n')
    })
    // 连接发生错误时
    conn.on('error', () => {
        console.log('这里连接发生了错误！')
    })
    function broadcast(msg, exceptMyself) {
        for (let i in users) {
            if (!exceptMyself || i != nickname) {
                users[i].write(msg)
            }
        }
    }

    console.log('\033[90m  new connection!\033[90m')
})

server.listen(3001, () => {
    console.log('11134646')
})