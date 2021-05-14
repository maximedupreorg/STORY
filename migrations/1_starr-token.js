const StarrToken = artifacts.require('StarrToken');

module.exports = function (deployer) {
    deployer.deploy(StarrToken);
};
