require('dotenv').config()
const fetch = require('node-fetch')
const fs = require('fs');
const { test } = require('./src/functions/queries')

async function main(){
    const res = await fetch(`https://api.hypixel.net/key?key=${process.env.API_KEY}`) 
    const data = await res.json()
    fs.writeFileSync('responce.json', JSON.stringify(data, null, 4));
}

main()