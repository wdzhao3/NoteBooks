/**
 * Module dependencies
 */
const fs = require('fs')
  , stdin = process.stdout
  , stdout = process.stdout;



fs.readdir(process.cwd(), function(err, files) {
  console.log('')
  if(!files.length) {
    return console.log('NO files to show \n')
  }
  console.log('select which file or director you want to see \n')

  function file(i) {
    let filename = files[i]
    fs.stat(__dirname+'/'+filename, function(err, stat) {
      if(stat.isDirectory()) {
        console.log('    ' + i + '   ' + filename + '   ' )
      } else {
        console.log('    ' + i + '   ' + filename + '   ' )
      }
      i++
      if (i == files.length) {
        read()
      } else {
        file(i)
      }
    })
  }
  file(0)

  function read() {
    console.log('')
    process.stdout.write('Enter your choice: ')
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', option)
  }
  
  function option(data) {
    var filename = files[Number(data)]
    if(!filename) {
      process.stdout.write(' Enter your choice: ')
    } else {
      process.stdin.pause()
      fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
        console.log('')
        console.log(data)
      })
    }
  }
})