import axios from 'axios'

export const getUsdPrice = () => axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then((res) => res.data.USD)
