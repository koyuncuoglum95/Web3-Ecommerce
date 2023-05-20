const EtherCommerce = artifacts.require('EtherCommerce');

module.exports = async function (deployer) {
    await deployer.deploy(EtherCommerce);
}