
const { ethers } = require('ethers');
jest.mock('ethers');

const mockAggregate = jest.fn();
ethers.Contract = jest.fn().mockImplementation(() => ({
  aggregate: mockAggregate.mockResolvedValue([
    123, // Mock block number
    ['0x'] // Mock return data
  ]),
}));

const { executeMulticall } = require('./multical');

describe('executeMulticall', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockAggregate.mockClear();
    ethers.Contract.mockClear();
  });

  it('should execute multicall successfully', async () => {
    // Execute the function
    await executeMulticall();

    // Assertions
    expect(ethers.Contract).toHaveBeenCalled();
    expect(mockAggregate).toHaveBeenCalledWith([
      {
        target: expect.anything(), // Use specific values if necessary
        callData: expect.anything() // Use specific values if necessary
      },
      {
        target: expect.anything(), // Use specific values if necessary
        callData: expect.anything() // Use specific values if necessary
      }
    ]);
    // You can add more specific assertions here based on the expected behavior of your function
  });

  it('should log the correct block number and return data', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await executeMulticall();
    expect(consoleLogSpy).toHaveBeenCalledWith('Block number:', 123);
    expect(consoleLogSpy).toHaveBeenCalledWith('Return data:', ['0x']);
    consoleLogSpy.mockRestore();
  });

  it('should handle errors gracefully', async () => {
    mockAggregate.mockRejectedValue(new Error('Test Error'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await executeMulticall();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error executing multicall:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});