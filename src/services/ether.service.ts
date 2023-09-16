import {ethers} from 'ethers';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_KEY;

export const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);





    