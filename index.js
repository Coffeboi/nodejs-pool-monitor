#! /usr/bin/env node

import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
const prompt = promptSync(); ({ sigint: true });

//Clears the console
function clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();
}

//Prompts user about address.
async function addressPrompt() {
    console.log('Enter XKR address: ')
    let address = prompt();
    clearConsoleAndScrollbackBuffer()
    return address;
}

//Prompts user about pool.
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

//Handles pool prompt.
async function poolPicker(pool) {
    if (pool = 1) {
        norpoolStats();
    }
    else if (pool = 2) {
        swepoolStats();
    }
    else if (pool = 3) {
        gamersnestStats();
    }
    else if (pool = 4) {
        götaStats();
    }
    else {
        console.log('Whoops! Please enter a number from 1 to 4.');
        return pool;
    };
}

//Function for fetching pool url api.
async function norpoolStats() {
    let address = await addressPrompt()
    const response = await fetch('https://norpool.org/api/stats_address?address=' + address);
    const data = await response.json();
    console.log((data.stats['hashrate'] / 1000) + 'KH/s');
}

async function swepoolStats() {
    let address = await addressPrompt()
    const response = await fetch('https://swepool.org/api/stats_address?address=' + address);
    const data = await response.json();
    console.log((data.stats['hashrate'] / 1000) + 'KH/s');
}

async function gamersnestStats() {
    let address = await addressPrompt()
    const response = await fetch('https://https://pool.gamersnest.org/api/stats_address?address=' + address);
    const data = await response.json();
    console.log((data.stats['hashrate'] / 1000) + 'KH/s');
}

async function götaStats() {
    let address = await addressPrompt()
    const response = await fetch('https://https://pool.kryptokrona.se/api/stats_address?address=' + address);
    const data = await response.json();
    console.log((data.stats['hashrate'] / 1000) + 'KH/s');
}


async function main() {
    getPool();
    poolPicker();
}

main();