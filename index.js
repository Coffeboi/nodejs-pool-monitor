#! /usr/bin/env node

import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
const prompt = promptSync(); ({ sigint: true });
let i = "";

function clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();
}

async function welcome() {
    console.log('Enter XKR address: ')
    let address = prompt();
    clearConsoleAndScrollbackBuffer()
    return address;
}

async function getPool() {
    console.log('Which pool are you mining on?')
    console.log('1. NorPool')
    console.log('2. SwePool')
    console.log('3. Gamersnest')
    console.log('4. Göta Pool')
    let pool = prompt();
    clearConsoleAndScrollbackBuffer()
    return pool;
}

async function getStats() {
    let address = await welcome()
    const response = await fetch('https://norpool.org/api/stats_address?address=' + address);
    const data = await response.json();
    console.log((data.stats['hashrate'] / 1000) + 'KH/s');
}

async function main() {
    getPool();
}

main();