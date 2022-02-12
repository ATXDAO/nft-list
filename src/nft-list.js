'use strict';

const { ethers } = require('ethers');
const { zipObject } = require('lodash');
const globalObject = (function () { return this; }).call(this);
const NFTIteratorArtifact = require('./artifacts/contracts/NFTIterator.sol/NFTIterator');

const signer = ethers.Wallet.createRandom().connect((
  (globalObject.ethereum && new ethers.providers.Web3Provider(globalObject.ethereum)) ||
  new ethers.providers.InfuraProvider('mainnet', process.env.NEXT_PUBLIC_INFURA_PROJECT_ID)
  ));
const factory = new ethers.ContractFactory(
  NFTIteratorArtifact.abi,
  NFTIteratorArtifact.bytecode,
  signer
);

const nft = '0x63f8F23ce0f3648097447622209E95A391c44b00';

exports.getOwnerList = async () => {
  const [list] = ethers.utils.defaultAbiCoder.decode(
    ['address[]'],
    await signer.provider.call({
      data: factory.getDeployTransaction(nft).data
    })
  );
  const owners = zipObject(
    list,
    Array(199)
      .fill(0)
      .map((_, i) => i)
  );
  delete owners[ethers.constants.AddressZero];
  return owners;
};
