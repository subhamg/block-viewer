import { IBlock } from '@/interfaces'
import { Button } from '@mantine/core';
import React from 'react'
import { BlockDetailSubHeading } from './BlockDetailSubHeading';
import { BlockTransactionTable } from './BlockTransactionTable';

interface IProps {
    block: IBlock;
    backClick: () => void;
}

export const BlockDetail = ({block, backClick}: IProps) => {
  return (
    <div className='flex items-center justify-center flex-col gap-y-10 mt-4'>
        <Button color='blue' variant='filled' size='md' className='bg-blue-500 hover:bg-blue-600 font-medium' onClick={backClick}>Back to All Blocks</Button>
        <div className='font-normal flex flex-col items-center justify-center gap-y-3'>
            <BlockDetailSubHeading field='Showing Transactions from Block Number' value={block.number.toString()} />
            <BlockDetailSubHeading field='Block Hash' value={block.hash} />
            <BlockDetailSubHeading field='Block Gas Limit' value={block.gasLimit} />
            <BlockDetailSubHeading field='Transaction Count' value={block.transactions.length.toString()} />
        </div>
        <div className='mx-auto container flex flex-col gap-y-7 justify-center items-center'>
        <BlockTransactionTable transactions={block.transactions} />
        </div>
    </div>
  )
}
