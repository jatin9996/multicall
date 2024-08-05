// SPDX-License-Identifier: Unlicense
pragma solidity 0.6.6;
pragma experimental ABIEncoderV2;

// Uniswap interface and library imports
import "./libraries/UniswapV2Library.sol";
import "./libraries/SafeERC20.sol";
import "./interfaces/IUniswapV2Router01.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IERC20.sol";
import "../test/testsearch.js";


contract PancakeSushi {
    using SafeERC20 for IERC20;
    address private owner;
    modifier onlyOwner() {
    require(msg.sender == owner, "Caller is not the owner");
    _;
    }
    //Factory and routing address
    address private PANCAKE_FACTORY = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
    address private PANCAKE_ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E;
    address private SUSHI_FACTORY = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4;
    address private SUSHI_ROUTER = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;    

    address private constant USDT_ADDRESS = 0x55d398326f99059fF775485246999027B3197955;
    address private constant token0 = USDT_ADDRESS;
    address private token1;
    address private token2;

    uint256 private constant MAX_INT =
        115792089237316195423570985008687907853269984665640564039457584007913129639935;

    function checkArbitrageOpportunity(
        address token1,
        address token2,
        uint amountIn
    ) external view returns (uint pancakeSwapAmount, uint sushiSwapAmount) {
        // Define the token path
        address[] memory path = new address[](2);
        path[0] = token1;
        path[1] = token2;

        // Get amounts from PancakeSwap
        pancakeSwapAmount = IUniswapV2Router01(PANCAKE_ROUTER).getAmountsOut(amountIn, path)[1];

        // Get amounts from SushiSwap
        sushiSwapAmount = IUniswapV2Router01(SUSHI_ROUTER).getAmountsOut(amountIn, path)[1];
    }
    constructor (
    address _PANCAKE_FACTORY,
    address _PANCAKE_ROUTER,
    address _SUSHI_FACTORY,
    address _SUSHI_ROUTER,
    address _token1,
    address _token2
    ) public {
    PANCAKE_FACTORY = _PANCAKE_FACTORY;
    PANCAKE_ROUTER = _PANCAKE_ROUTER;
    SUSHI_FACTORY = _SUSHI_FACTORY;
    SUSHI_ROUTER = _SUSHI_ROUTER;
    token1 = _token1;
    token2 = _token2;
    }

    // FUND SMART CONTRACT
    // Provides a function to allow contract to be funded
    function fundFlashSwapContract(
        address _owner, 
        address _token, 
        uint256 _amount
    ) public {
        IERC20(_token).transferFrom(_owner, address(this), _amount);
    }
    // GET CONTRACT BALANCE
    // ALLOWS for public view of balance for contract
    function getBalanceOfToken(address _address) public view returns (uint256) {
        return IERC20(_address).balanceOf(address(this));
    }
    // PLACE A TRADE
    // Execute placing a trade
    function placeTrade(
        address _fromToken,
        address _toToken,
        uint256 _amountIn,
        address factory,
        address router
    ) private returns (uint256) {
        uint256 deadline = block.timestamp + 1 days;

        IERC20(_fromToken).approve(address(router), MAX_INT);
        address pair = IUniswapV2Factory(factory).getPair(
            _fromToken, 
            _toToken
        );
        require(pair != address(0), "Pool does not exist");
        //Calculate Amount Out
        address[] memory path = new address[](2);
        path[0] = _fromToken;
        path[1] = _toToken;

        uint256 amountRequired = IUniswapV2Router01(router).getAmountsOut(_amountIn, path)[1];

        // console.log("amountRequired", amountRequired);
        //Perform arbitrage - Swap for another token
        uint256 amountReceived = IUniswapV2Router01(PANCAKE_ROUTER)
            .swapExactTokensForTokens(
                _amountIn,// amount in
                amountRequired,// amountOutMin
                path,// path
                address(this),// address to
                deadline// deadline
            )[1];
    
        // console.log("amountReceived", amountReceived);

        require(amountReceived > 0, "Aborted Tx: Trade returned zero");

        return amountReceived;
        
    }


    // CHECK PROFITABILITY
    // Checks whether > output > input
    function checkProfitability (uint256 _input, uint256 _output) 
        private
        pure 
        returns (bool) 
        {
        return _output > _input;
    }
    // Address updates
    mapping(string => address) private tokenAddresses;

    // Function to update token address, restricted to only the owner
    function updateTokenAddress(string memory tokenSymbol, address newAddress) public onlyOwner {
        require(newAddress != address(0), "New address is the zero address");
        tokenAddresses[tokenSymbol] = newAddress;
    }
    // Safe approvals
    function executeSafeApprove(address token, address spender) private {
        require(token != token0, "PancakeSushi: token address is the zero address");
        require(spender != token0, "PancakeSushi: spender address is the zero address");
        IERC20(token).approve(spender, MAX_INT);
    }
    function startArbitrage(address _tokenBorrow, uint256 _amount) external {

        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(_tokenBorrow, token0);
        require(pair != address(0), "Pool does not exist");
        
        address token1 = IUniswapV2Pair(pair).token1();

        uint amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint amount1Out = _tokenBorrow == token1 ? _amount : 0;

        // Encode the data to pass to the flash swap
        bytes memory data = abi.encode(_tokenBorrow, _amount, msg.sender);

        // Execute the swap (flash loan)
        IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
    }



    function pancakeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external {
        // Ensure this request came from the contract
        address token1 = IUniswapV2Pair(msg.sender).token1();
        address pair = IUniswapV2Factory(PANCAKE_FACTORY).getPair(
            token0,
            token1
        );
        require(msg.sender == pair, "The sender needs to match the pair");
        require(_sender == address(this), "Sender should match this contract");
        // Decode data for calculating the repayment
        (address tokenBorrow, uint256 amount, address myAddress) = abi.decode(
            _data, 
            (address, uint256, address)
        );

        //Calculate the amount to repay at the end
        uint256 fee = ((amount *3) / 997) + 1;
        uint256 amountToRepay = amount + fee;
        //Do arbitrage
        //!!!!!!!!!!!!!!!!!

        //Assign loan amount
        uint256 loanAmount = _amount0 > 0 ? _amount0 : _amount1;
        //Place Trades
        uint256 trade1Acquired = placeTrade(
            token0,
            token1,
            loanAmount,
            PANCAKE_FACTORY,
            PANCAKE_ROUTER
        );

        // Place trade 2
        uint256 trade2Acquired = placeTrade(
            token1,
            token0,
            trade1Acquired,
            SUSHI_FACTORY,
            SUSHI_ROUTER
        );
        //Check Profitability
        bool profCheck = checkProfitability(amountToRepay, trade2Acquired);
        require(profCheck,"Arbitrage not profitable");
        //Pay yourself
        if (profCheck) {
            IERC20 otherToken = IERC20(token0);
            otherToken.transfer(myAddress, trade2Acquired);
        }


        //Pay loan back)
        IERC20(tokenBorrow).transfer(pair, amountToRepay);
    }
}