 const {ethers} =require('ethers');
const fs = require('fs').promises;
const path = require('path');

async function main() {
    const amountIn = ethers.utils.parseUnits("1.0", "ether"); // 1 ETH in Wei
    const tokenInAddress = "0x0000000000000000000000000000000000000000"; // Placeholder address for the input token
    const tokenOutAddress = "0x1111111111111111111111111111111111111111"; // Placeholder address for the output token


const jsonPath = path.join(__dirname, 'getblock.config.json');

let jsonContent;
try {
    jsonContent = await fs.readFile(jsonPath, 'utf8');
} catch (error) {
    console.error('Failed to read the configuration file:', error);
    return; // Exit the function if the file cannot be read
}

let jsonData;
try {
    jsonData = JSON.parse(jsonContent);
} catch (error) {
    console.error('Failed to parse the configuration file:', error);
    return; // Exit the function if the JSON is malformed
}
//const jsonContent = await fs.readFile(jsonPath, 'utf8');
//const jsonData = JSON.parse(jsonContent);

const jsonRpcUrl = `https://go.getblock.io/${jsonData.shared.eth.sepolia.jsonRpc[0]}`;


const provider = new ethers.providers.JsonRpcProvider('https://go.getblock.io/ac3e3bfe265c4cefa75a9fa61d25b507');

const multicallAddress = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441';
const multicallAbi =  [{"inputs":[{"components":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"}],"internalType":"struct Multicall.Call[]","name":"calls","type":"tuple[]"}],"name":"aggregate","outputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"},{"internalType":"bytes[]","name":"returnData","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getBlockHash","outputs":[{"internalType":"bytes32","name":"blockHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockCoinbase","outputs":[{"internalType":"address","name":"coinbase","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockDifficulty","outputs":[{"internalType":"uint256","name":"difficulty","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockGasLimit","outputs":[{"internalType":"uint256","name":"gaslimit","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentBlockTimestamp","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getEthBalance","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLastBlockHash","outputs":[{"internalType":"bytes32","name":"blockHash","type":"bytes32"}],"stateMutability":"view","type":"function"}];


const multicallContract = new ethers.Contract(multicallAddress, multicallAbi, provider);


const calls = [
    {
        target:' 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
        callData: ethers.utils.defaultAbiCoder.encode(
            ['uint256', 'address[]'],
            [amountIn, [tokenInAddress, tokenOutAddress]]
        )
    },
    {
        target: 'D43C718714eb63d5aA57B78B54704E256024E',
        callData: ethers.utils.defaultAbiCoder.encode(
            ['uint256', 'address[]'],
            [amountIn, [tokenInAddress, tokenOutAddress]]
        )
    }
  
];

async function executeMulticall() {
    try {
        const [blockNumber, returnData] = await multicallContract.aggregate(calls);
        console.log('Block number:', blockNumber);
        console.log('Return data:', returnData);

       
    } catch (error) {
        console.error('Error executing multicall:', error);
    }
}
}
main().catch(console.error);


executeMulticall();
