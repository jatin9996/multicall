import { expect, assert } from 'chai'
import {impersonateFundErc20} from '../utils/utilities.js'
import { ethers } from ('@nomiclabs/hardhat-ethers')

import abi from ('../artifacts/contracts/interfaces/IERC20.sol/IERC20.json');




const provider = waffle.provider;

describe("Token Contract", () => {
  let FLASHSWAP = undefined,
    BORROW_AMOUNT = undefined,
    FUND_AMOUNT = undefined,
    initialFundingHuman = undefined,  
    txArbitrage = undefined
    totalGasUSD = undefined

  
  const DECIMALS = 18;
  const USDT_WHALE = "0xa180fe01b906a1be37be6c534a3300785b20d947";
  const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const USDT = "0x55d398326f99059fF775485246999027B3197955";
  const BASE_TOKEN_ADDRESS = USDT;

  const tokenBase = new ethers.Contract(BASE_TOKEN_ADDRESS, abi, provider);

  beforeEach(async () =>{
    // Get owner as signer
    const PANCAKE_FACTORY = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
    const PANCAKE_ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const SUSHI_FACTORY = "0xc35DADB65012eC5796536bD9864eD8773aBc74C4";
    const SUSHI_ROUTER = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";

    const  [owner] = await ethers.getSigners();

    // Ensure that the WHALE has a balance
    const whale_balance = await provider.getBalance(USDT_WHALE);
    expect(whale_balance).not.equal("0");
    
    //Deploy smart contract
    console.log("Deploying FlashSwap contract...");
    const FlashSwap = await ethers.getContractFactory("PancakeSushi")
    FLASHSWAP = await FlashSwap.deploy(PANCAKE_FACTORY, PANCAKE_ROUTER, SUSHI_ROUTER, SUSHI_FACTORY);
    await FLASHSWAP.deployed();
    console.log(`FlashSwap contract deployed at address: ${FLASHSWAP.address}`);

    // Configure our borrowing
    const borrowAmountHuman = "100"
    BORROW_AMOUNT = ethers.utils.parseUnits(borrowAmountHuman, DECIMALS)
    // Configure funding - FOR TESTING ONLY
    initialFundingHuman ="1000"
    FUND_AMOUNT = ethers.utils.parseUnits(initialFundingHuman, DECIMALS)

    // Fund our contract - FOR TESTING ONLY
    await impersonateFundErc20(
      tokenBase,
      USDT_WHALE,
      FLASHSWAP.address,
      initialFundingHuman,
      { gasLimit: 8000000 } // Gas test
    )
  })
  
  describe("Arbitrage Execution", () => {
    it('ensures the contract is funded', async () =>{
      console.log('Checking contract funding...');
      const flashSwapBalance = await FLASHSWAP.getBalanceOfToken(
        BASE_TOKEN_ADDRESS
      );

      const flashSwapBalanceHuman = ethers.utils.formatUnits(
        flashSwapBalance,
        DECIMALS
      );
      console.log(`Contract funded with: ${flashSwapBalanceHuman} tokens`);

      expect(Number(flashSwapBalanceHuman)).equal(Number(initialFundingHuman));
    });
    it('executes the arbitrage', async () => {
      console.log('Executing arbitrage...');
      const GAS_LIMIT = 8000000; // Adjust this value based on your needs
      try {
          txArbitrage = await FLASHSWAP.startArbitrage(BASE_TOKEN_ADDRESS, BORROW_AMOUNT, {
              gasLimit: GAS_LIMIT
          });
          console.log(`Arbitrage transaction hash: ${txArbitrage.hash}`);
          assert(txArbitrage);
          // ... rest of your test code ...
      } catch (error) {
          console.error('Error executing arbitrage:', error);
      }
      // Print balances
      const contractBalanceWBNB = await FLASHSWAP.getBalanceOfToken(WBNB);
      const formattedBalWBNB = Number(
        ethers.utils.formatUnits(contractBalanceWBNB, DECIMALS)
      );
      console.log('Balance of WBNB: ' + formattedBalWBNB);
      const contractBalanceUSDT = await FLASHSWAP.getBalanceOfToken(USDT);
      const formattedBalUSDT = Number(
        ethers.utils.formatUnits(contractBalanceUSDT, DECIMALS)
      );
      console.log('Balance of USDT: ' + formattedBalUSDT);

      describe('Transaction Tests', () => {
        it('Provides GAS output', async () => {
          const txReceipt = await provider.getTransactionReceipt(txArbitrage.hash)
          const effGasPrice = ethers.BigNumber.from(txReceipt.effectiveGasPrice)
          const txGasUsed = ethers.BigNumber.from(txReceipt.gasUsed)      
          // Calculate the total gas used in BNB
          const gasUsedBNB = effGasPrice.mul(txGasUsed)      
          // Fetch the live BNB price in USD
          const bnbPriceUSD = await getBNBPrice()      
          // Handle the case where the BNB price couldn't be fetched
          if (!bnbPriceUSD) {
            console.log('Could not fetch the BNB price.')
            return
          }      
          // Convert the gas used in BNB to a human-readable format and then to USD
          const totalGasUSD = ethers.utils.formatEther(gasUsedBNB) * bnbPriceUSD;
          console.log(`Total Gas USD: ${totalGasUSD.toFixed(2)}`);
      
          // Use Chai's 'expect' to make the assertion more readable
          expect(gasUsedBNB.gt(0), 'Gas used should be greater than 0').to.be.true
        })
      })
    })
  })
})