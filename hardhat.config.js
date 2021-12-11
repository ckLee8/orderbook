require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.2",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/05acbea0f8c24377b51954e6f3e31ac2",
      accounts: [`0x${process.env.REACT_APP_PRIVATE_KEY}`] 
    }
  }
};
