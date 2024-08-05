const fetch = require('node-fetch');
const { ethers } = require("hardhat");
import { multicallABI } from './multicallABI';
// Connect to a BSC node
const bscNode = 'https://bsc-dataseed.bnbchain.org';
const provider = new ethers.providers.JsonRpcProvider(bscNode);
module.exports = {
    multicallABI
  };
// Multicall ABI and address (replace with actual ABI and address)
const multicallAddress = "0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C";
  

const pairAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const MC_CONTRACT = new ethers.Contract(
    multicallAddress, 
    multicallABI,
    provider
  );

const pancakeSwapV2FactoryABI = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"constant":true,"inputs":[],"name":"INIT_CODE_PAIR_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const sushiSwapFactoryABI = [{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token0","type":"address"},{"indexed":true,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"}],"name":"PairCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"allPairsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"}],"name":"createPair","outputs":[{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeToSetter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"getPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairCodeHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_feeTo","type":"address"}],"name":"setFeeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeToSetter","type":"address"}],"name":"setFeeToSetter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const pancakeSwapV2FactoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'; // BSC addresses
const sushiSwapFactoryAddress = '0xc35DADB65012eC5796536bD9864eD8773aBc74C4';

const pancakeSwapV2FactoryContract = new ethers.Contract(pancakeSwapV2FactoryABI, pancakeSwapV2FactoryAddress);
const sushiSwapFactoryContract = new ethers.Contract(sushiSwapFactoryABI, sushiSwapFactoryAddress);


async function getTokenAddressesFromPairs(pairs) {
    // Initialize an array to store token addresses
    const tokenAddresses = [];

    // Iterate over each pair address
    for (const pairAddress of pairs) {
        // Create a contract instance for the pair using ethers.Contract
        const pairContract = new ethers.Contract(pairAddress, pairAbi);

        // Get token addresses from the pair contract
        const token0 = await pairContract.token1();
        const token1 = await pairContract.token2();

        // Add token addresses to the array
        tokenAddresses.push(token1, token2);
    }

    // Return the array of token addresses
    return tokenAddresses;
}




function getFunctionSelector(funcSignature) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(funcSignature)).slice(0, 10);
}

const selector = getFunctionSelector('getReserves()');
console.log('Function Selector:', selector);
const result = await MC_CONTRACT    .callStatic.aggregate(Params);

const  decoded = iface.decodeFunctionResult('getReserves', result );

async function getPrices(pairs, factoryContract, isSushiSwap = false) {
    const calls = await Promise.all(pairs.map(async (pair) => {
        const pairContract = new ethers.Contract(pairAbi, pair);
        const token0 = await pairContract.methods.token0().call();
        const token1 = await pairContract.methods.token1().call();
        return {
            address: pair,
            abi: pairAbi.find(f => f.name === 'getReserves'),
            params: [],
            returns: ['uint112', 'uint112', 'uint32'],
            tokens: [token0, token1],
            isSushiSwap
        };
    }));

    return aggregateCalls(calls);
}

// ...

async function getAllPairs(factoryContract, length = 100) {
    const calls = [];
    for (let i = 0; i < length; i++) {
        calls.push({
            address: factoryContract._address,
            abi: {
                name: 'allPairs',
                inputs: [{ type: 'uint256' }],
                outputs: [{ type: 'address' }]
            },
            params: [i]
        });
    }

    const results = await aggregateCalls(calls);
    return results.map(result => result[0]);
}

async function aggregateCalls(calls) {
    const targets = calls.map(call => call.address);
    const callData = calls.map(call => ethers.abi.encodeFunctionCall({
        name: call.abi.name,
        type: 'function',
        inputs: call.abi.inputs
    }, call.params));

    const response = await multicallContract.methods.multiCall(targets, callData).call();
    return response.map((data, index) => ethers.abi.decodeParameters(calls[index].abi.outputs, data));
}

function isArbitrageProfitable(price1, price2) {
    const profitMargin = 0.01; // Set your desired profit margin
    return Math.abs(price1 - price2) > profitMargin;
}
// Define global variables for pairs
let pancakePairs = [];
let sushiPairs = [];

// ...[Other function definitions]
const iface = new ethers.utils.Interface([
    "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
]);

async function filterPairsWithLiquidity(pairs, factoryContract) {
    const pairsWithLiquidity = [];
    await Promise.all(pairs.map(async (pairAddress) => {
        const pairContract = new ethers.Contract(pairAbi, pairAddress);
        const reserves = await pairContract.methods.getReserves().call();
        const reserve0 = reserves[0];
        const reserve1 = reserves[1];

        // Define a minimum reserve threshold
        const MINIMUM_RESERVE_THRESHOLD = 10000;

        if (reserve0 >= MINIMUM_RESERVE_THRESHOLD && reserve1 >= MINIMUM_RESERVE_THRESHOLD) {
            pairsWithLiquidity.push(pairAddress);
        }
    }));
    return pairsWithLiquidity;
}
async function fetchWithRetry(url, retries = 3, delay = 3000) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            console.warn(`Fetch error: ${error.message}. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, retries - 1, delay);
        } else {
            throw error;
        }
    }
}


let pancakePrices = []; // This should be populated similarly to how pancakePairs is populated
let sushiPrices = []; // Likewise for sushiPrices

async function checkArbitrageOpportunity(pancakePairs, sushiPairs, pancakePrices, sushiPrices) {
    pancakePairs.forEach(pairAddress => {
        const pancakePriceInfo = pancakePrices.find(info => info.address === pairAddress);
        const sushiPriceInfo = sushiPrices.find(info => info.address === pairAddress);

        if (pancakePriceInfo && sushiPriceInfo) {
            // Example: Calculate price based on reserves, adjust as necessary for your data
            const pancakePrice = pancakePriceInfo.reserve0 / pancakePriceInfo.reserve1;
            const sushiPrice = sushiPriceInfo.reserve0 / sushiPriceInfo.reserve1;

            console.log(`PancakeSwap Price for pair ${pairAddress}: ${pancakePrice}`);
            console.log(`SushiSwap Price for pair ${pairAddress}: ${sushiPrice}`);

            if (isArbitrageProfitable(pancakePrice, sushiPrice)) {
                console.log(`Arbitrage opportunity found for pair ${pairAddress}`);
            } else {
                console.log(`No arbitrage opportunity for pair ${pairAddress}`);
            }
        } else {
            console.log(`Pair ${pairAddress} not found or missing price on one of the exchanges`);
            
        }
    });
}

numberofPairs = 10000;

async function fetchTokenPairs(numberOfPairs) {
    try {
        // Fetch multiple pairs from PancakeSwap
        const pancakePairs = await getAllPairs(pancakeSwapV2FactoryContract, numberOfPairs);
        const pancakeTokenPairs = await Promise.all(
            pancakePairs.map(async (pairAddress) => {
                const pairContract = new ethers.Contract(pairAddress, pairAbi);
                const token0 = await pairContract.token0();
                const token1 = await pairContract.token1();
                return [token0, token1];
            })
        );

        // Fetch multiple pairs from SushiSwap
        const sushiPairs = await getAllPairs(sushiSwapFactoryContract, numberOfPairs);
        const sushiTokenPairs = await Promise.all(
            sushiPairs.map(async (pairAddress) => {
                const pairContract = new ethers.Contract(pairAddress, pairAbi);
                const token0 = await pairContract.token0();
                const token1 = await pairContract.token1();
                return [token0, token1];
            })
        );

        return {
            pancake: pancakeTokenPairs,
            sushi: sushiTokenPairs,
        };
    } catch (error) {
        console.error('Error fetching token pairs:', error);
        throw error;
    }
}

// Example usage:
async function main() {
    try {
        const numberOfPairs = 5; // Set the desired number of pairs to fetch
        const tokenPairs = await fetchTokenPairs(numberOfPairs);
        console.log('PancakeSwap Token Pairs:', tokenPairs.pancake);
        console.log('SushiSwap Token Pairs:', tokenPairs.sushi);

        // Continue with the rest of your logic...
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Run the main function
main();


async function main() {
    while (true) {
        try {
            const { token1, token2 } = await fetchPairs(); // Fetch the latest pair data and extract tokens
            pancakePrices = await getPrices([token1, token2], pancakeSwapV2FactoryContract);
            sushiPrices = await getPrices([token1, token2], sushiSwapFactoryContract, true);
            await checkArbitrageOpportunity(token1, token2, pancakePrices, sushiPrices);

            // Wait for some time before the next check
            await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
        } catch (error) {
            console.error(error);
            const data = await fetchWithRetry('https://bsc-dataseed.bnbchain.org/');
            console.log(data);
            console.error('Failed to fetch:', error);
            // Implement a delay here to handle API limit errors or similar issues
            const delayDuration = 30000; // Delay for 30 seconds, adjust as needed
            console.log(`Encountered an error. Retrying after a delay of ${delayDuration / 1000} seconds.`);
            await new Promise(resolve => setTimeout(resolve, delayDuration));
        }
    }
}



main();