#! /usr/bin/env node

import colors from 'colors';
import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
const prompt = promptSync(); ({ sigint: true });
colors.enable();

//Clears the console
function clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J"); console.clear();
}

//Prompts user about pool.
async function getPool() {
    clearConsoleAndScrollbackBuffer()
    console.log('Which pool are you mining on?'.green)
    console.log('1. NorPool')
    console.log('2. SwePool')
    console.log('3. Gamersnest')
    console.log('4. Göta Pool')
    let pool = prompt();
    return pool;
}

//Prompts user about address.
async function addressPrompt() {
    clearConsoleAndScrollbackBuffer()
    console.log('Enter XKR address: ')
    let address = prompt();
    return address;
}

//Handles pool prompt.
async function poolPicker(pool) {
    if (pool = 1) {
        let address = await addressPrompt();

        async function norpoolData() {
            clearConsoleAndScrollbackBuffer()
            const response = await fetch('https://norpool.org/api/stats_address?address=' + address);
            const data = await response.json()
            clearConsoleAndScrollbackBuffer()
            console.log('Worker stats for ' + address);
            console.log('--------------------'.red);
            for (const worker in data.workers) {
                console.log('name: '.green + (data.workers[worker]["name"]));
                console.log('hashrate: '.yellow + ((data.workers[worker]["hashrate"] / 1000) + 'KH/s'));
                console.log('--------------------'.red);
            }
        }
        setInterval(norpoolData, 5000);
    }

    else if (pool = 2) {
        let address = await addressPrompt();

        async function swepoolData() {
            clearConsoleAndScrollbackBuffer()
            const response = await fetch('https://swepool.org/api/stats_address?address=' + address);
            const data = await response.json();
            console.log('Worker stats for ' + address);
            console.log('--------------------'.red);
            for (const worker in data.workers) {
                console.log('name: '.green + (data.workers[worker]["name"]));
                console.log('hashrate: '.yellow + ((data.workers[worker]["hashrate"] / 1000) + 'KH/s'));
                console.log('--------------------'.red);
            }
        }
        setInterval(swepoolData, 5000);
    }

    else if (pool = 3) {
        let address = await addressPrompt();

        async function gnData() {
            clearConsoleAndScrollbackBuffer()
            const response = await fetch('https://pool.gamersnest.org/api/stats_address?address=' + address);
            const data = await response.json();
            console.log('Worker stats for ' + address);
            console.log('--------------------'.red);
            for (const worker in data.workers) {
                console.log('name: '.green + (data.workers[worker]["name"]));
                console.log('hashrate: '.yellow + ((data.workers[worker]["hashrate"] / 1000) + 'KH/s'));
                console.log('--------------------'.red);
            }
        }
        setInterval(gnData, 5000);
    }

    else if (pool = 4) {
        let address = await addressPrompt();

        async function götaData() {
            clearConsoleAndScrollbackBuffer()
            const response = await fetch('https://pool.kryptokrona.se/api/stats_address?address=' + address);
            const data = await response.json();
            console.log('Worker stats for ' + address);
            console.log('--------------------'.red);
            for (const worker in data.workers) {
                console.log('name: '.green + (data.workers[worker]["name"]));
                console.log('hashrate: '.yellow + ((data.workers[worker]["hashrate"] / 1000) + 'KH/s'));
                console.log('--------------------'.red);
            }
        }
        setInterval(götaData, 5000);
    }

    else {
        console.log('Whoops! Please enter a number from 1 to 4.');
        return;
    }
};

async function main() {
    getPool();
    poolPicker();
}

main();