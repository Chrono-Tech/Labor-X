module.exports = {
  mocha: {
    useColors: true,
    timeout: 0,
    test_timeout: 0,
    before_timeout: 0
  },
  networks: {
    'live': {
      network_id: 1,
      host: 'localhost',
      gas: 3290337
    },
    'morden': {
      network_id: 2,
      host: 'localhost',
      test_timeout: 0,
      before_timeout: 0,
      gas: 3290337
    },
    'ropsten': {
      network_id: 3,
      host: 'localhost',
      port: 8545,
      test_timeout: 0,
      before_timeout: 0,
      gas: 5494621
    },
    'staging': {
      network_id: 1337 // custom private network
      // use default rpc settings
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0x00D451BEDd4f8567631b5811C1D3d57CfD410dDd',
      password: 'QWEpoi123',
      gas: 5494621
    }
  },
  migrations_directory: './migrations'
}
