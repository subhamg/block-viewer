export interface IBlock {
    number: number;
    hash: string;
    gasLimit: string;
    timestamp: number;
    transactions: ITransaction[];
}

export interface ITransaction {
    hash: string;
    blockNumber: number;
    from: string;
    to: string;
    value: string;
    gasLimit: string;
    timestamp: number;
}

