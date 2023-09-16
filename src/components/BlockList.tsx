import { IBlock } from '@/interfaces';
import { Table } from '@mantine/core'
import moment from 'moment';
import React from 'react'

interface IProps {
    blocks: IBlock[];
    blockClick: (block: IBlock) => void;
}

export const BlockList = ({blocks, blockClick}: IProps) => {


    const ths = (
        <tr className='bg-gray-100'>
          <th className=' !text-xl !text-black !font-medium'>Block Number</th>
          <th className=' !text-xl !text-black !font-medium'>Block hash</th>
          <th className=' !text-xl !text-black !font-medium'>Gas Limit</th>
          <th className=' !text-xl !text-black !font-medium'>Transaction Count</th>
          <th className=' !text-xl !text-black !font-medium'>Timestamp</th>
        </tr>
      );

      // Create timestamp like "Today at 10:58 PM" from timestamp
      const getTimestamp = (timestamp: number) => {
        return moment.unix(timestamp).calendar();
      }

      const rows = blocks.map((block: IBlock) => (
        <tr key={block.hash}>
          <td><button className='underline ' onClick={() => blockClick(block)}>{block.number}</button></td>
          <td>{block.hash.substring(0,6)}...{block.hash.substring(block.hash.length-5)}</td>
          <td>{block.gasLimit}</td>
          <td>{block.transactions.length}</td>
          <td>{getTimestamp(block.timestamp)}</td>
        </tr>
      ));

      
  return (
    <Table withBorder withColumnBorders verticalSpacing="lg" fontSize="lg" className='text-center'>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
    </Table>
  )
}
