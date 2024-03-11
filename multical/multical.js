const Web3 = require('web3');
const fs = require('fs').promises;
const path = require('path');

let web3, multicallContract;

async function setup() {
    const jsonPath = path.join(__dirname, 'getblock.config.json');
    let jsonData;
    try {
        const jsonContent = await fs.readFile(jsonPath, 'utf8');
        jsonData = JSON.parse(jsonContent);
    } catch (error) {
        console.error('Error reading or parsing the configuration file:', error);
        throw error;
    }

    const jsonRpcUrl = `https://go.getblock.io/${jsonData.shared.eth.sepolia.jsonRpc[0]}`;
    web3 = new Web3(new Web3.providers.HttpProvider(jsonRpcUrl));

    const multicallAddress = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441';
    const multicallAbi = [
        // ABI details omitted for brevity
    ];
    multicallContract = new web3.eth.Contract(multicallAbi, multicallAddress);
}

async function executeMulticall(calls) {
    try {
        // Prepare calls for the Multicall contract
        const formattedCalls = calls.map(call => ({
            target: call.to,
            callData: call.data,
        }));

        // Assuming the Multicall contract has an 'aggregate' function
        const response = await multicallContract.methods.aggregate(formattedCalls).call();
        const { blockNumber, returnData } = response;

        console.log('Block number:', blockNumber);
        console.log('Return data:', returnData);
        return { blockNumber, returnData };
    } catch (error) {
        console.error('Error executing multicall:', error);
        throw error;
    }
}

async function main() {
    await setup();

    
    const pool1Address = '0xPool1ContractAddress';
    const pool2Address = '0xPool2ContractAddress';

    const liquidityPoolAbiFragment = [
        {
            "constant": true,
            "inputs": [],
            "name": "getReserves",
            "outputs": [
                {"name": "_reserve0", "type": "uint112"},
                {"name": "_reserve1", "type": "uint112"},
                {"name": "_blockTimestampLast", "type": "uint32"}
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Encoding function calls
    const pool1Contract = new web3.eth.Contract(liquidityPoolAbiFragment, pool1Address);
    const pool1Data = pool1Contract.methods.getReserves().encodeABI();

    const pool2Contract = new web3.eth.Contract(liquidityPoolAbiFragment, pool2Address);
    const pool2Data = pool2Contract.methods.getReserves().encodeABI();

    const calls = [
        { to: pool1Address, data: pool1Data },
        { to: pool2Address, data: pool2Data },
    ];

    // Execute multicall
    const result = await executeMulticall(calls);

  const decodedData = result.returnData.map(data =>
    web3.eth.abi.decodeParameters(['uint112', 'uint112', 'uint32'], data)
);
    console.log('Multicall result:', result);
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { executeMulticall, setup };