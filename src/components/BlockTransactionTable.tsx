import { IBlock, ITransaction } from '@/interfaces';
import { Table } from '@mantine/core'
import { ethers } from 'ethers';
import moment from 'moment';
import React from 'react'

interface IProps {
    transactions: ITransaction[];
}

export const BlockTransactionTable = ({transactions}: IProps) => {


    const ths = (
        <tr className='bg-gray-100'>
          <th className=' !text-xl !text-black !font-medium'>Transaction Hash	</th>
          <th className=' !text-xl !text-black !font-medium'>From</th>
          <th className=' !text-xl !text-black !font-medium'>To</th>
          <th className=' !text-xl !text-black !font-medium'>Value</th>
        </tr>
      );

      // Create timestamp like "Today at 10:58 PM" from timestamp
      const getTimestamp = (timestamp: number) => {
        return moment.unix(timestamp).calendar();
      }

      const rows = transactions.map((transaction: ITransaction) => (
        <tr key={transaction.hash}>
          <td className=' !px-6	text-gray-700'>{transaction.hash}</td>
          <td  className=' !px-6	text-gray-700'>{transaction.from}</td>
          <td className=' !px-6	text-gray-700'>{transaction.to}</td>
          <td  className=' !px-6	text-gray-700'>{ethers.utils.formatEther(transaction.value)} ETH</td>
        </tr>
      ));

      
  return (
    <Table withBorder withColumnBorders verticalSpacing="lg" fontSize="lg" className='text-center whitespace-pre-wrap break-words table-fixed' >
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
    </Table>
  )
}
