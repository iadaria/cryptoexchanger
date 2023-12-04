// https://blog.arashtad.com/blog/how-to-transfer-usdt-on-tron-network-using-tronweb/
//https://tronweb.network/
// https://developers.tron.network/reference/wallet-getcontract
// https://developers.tron.network/docs/networks

import TronWeb from "tronweb";

const config = {
  MAINNAT: {
    network: "https://api.trongrid.io",
    contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  },
  TESTNET_SHASTA: {
    network: "https://api.shasta.trongrid.io",
    contract: "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs",
  },
  TESTNET_NILE: {
    network: "https://api.nileex.io/",
    eventApi: "https://event.nileex.io/",
    //network: "https://nile.trongrid.io",
    contract: "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf",
  },
};

const reciever = "TSG4BtfPMeycE5jQeG4CPJ2p1C8iRXug4W";
const { TESTNET_NILE } = config;

const tronWeb = new TronWeb({
  fullHost: TESTNET_NILE.network,
  //headers: { "TRON-PRO-API-KEY": config.TESTNET_NILE.privateKey },
});

const options = {
  feeLimit: 10 ** 7,
  callValue: 0,
};

await tronWeb.setPrivateKey(TESTNET_NILE.privateKey);
const contract = await tronWeb.contract().at(TESTNET_NILE.contract);
const hash = await contract.transfer(reciever, options.feeLimit).send();
console.log({ hash });
