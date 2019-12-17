var cbor = require('cbor');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function bufferFromBufferString(bufferStr) {
  bufferStr = "<Buffer a2 64 6e 61 6d 65 6c 48 6f 72 61 63 65 20 47 72 61 6e 74 63 61 67 65 18 1a>";
  return Buffer.from(
      bufferStr
          .replace(/[<>]/g, '') // remove < > symbols from str
          .split(' ') // create an array splitting it by space
          .slice(1) // remove Buffer word from an array
          .reduce((acc, val) => 
              acc.concat(parseInt(val, 16)), [])  // convert all strings of numbers to hex numbers
   )
}

function convertToCbor(anything){
  return cbor.encode(anything)
}

function decodeCborObject(encryptedObj){
  let decoded;

  decoded = cbor.decode(encryptedObj, function(error, obj) {
    return obj;
  });

  return decoded;
}

function decodeFromBufferString(buffer){
  return bufferFromBufferString(buffer);
}

function saveToFile(textFile){

  fs.writeFile("testing.js", textFile, function(err) {

    if(err) {
        return console.log(err);
    }
  
    console.log("The file was saved!");
  }); 
}

function readFromFile(){
  return fs.readFileSync("bufferString.txt", 'utf8');
}

function menu(){
  readline.question(`What would you like to do?\n 1) Encrypt\n 2) Decrypt\n Option: `, (Op) => {
    switch(Op){
      case '1': readline.question(`What word would you like to encrypt? `, (name) => {
          let res = convertToCbor(name)
          console.log("Encrypted results:", res)
          readline.close()
        })
        break;
      case '2': readline.question(`What word would you like to decrypt? `, (name) => {
          let res = bufferFromBufferString(name)
          console.log("Decrypted results:", res)
          readline.close()
        })
        break;
      default: console.log("Input does not match any options, Try again!\n\n")
        menu();
        break;
    }
  })
}

menu();
