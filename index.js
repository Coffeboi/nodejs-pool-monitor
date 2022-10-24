#! /usr/bin/env node

import colors from 'colors';
import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
colors.enable();
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
    let address = await addressPrompt();
    const response = await fetch('https://norpool.org/api/stats_address?address=' + address);
    const data = await response.json();
    let workers = data.workers;

    console.log('NorPool worker stats for ' + address);
    for (const worker in data.workers) {
        console.log('name: '.green + (data.workers[worker]["name"]));
        console.log('hashrate: '.yellow + ((data.workers[worker]["hashrate"] / 1000) + 'KH/s'));
        console.log('--------------------'.red);
    }
}

async function main() {
    getPool();
    poolPicker();
}

main();