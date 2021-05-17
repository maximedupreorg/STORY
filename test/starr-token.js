const StarrToken = artifacts.require('StarrToken');

contract('StarrToken', (accounts) => {
    it.only('should have the STARR symbol', async () => {
        const instance = await StarrToken.new();

        const symbol = await instance.symbol();

        assert.equal(symbol, 'STARR', 'token symbol');
    });

    it('should have the StarrToken name', async () => {
        const instance = await StarrToken.new();

        const name = await instance.name();

        assert.equal(name, 'StarrToken', 'token name');
    });
});
