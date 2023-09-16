import {  provider } from '@/services'
import { BlockList } from '@/components/BlockList'
import { useEffect, useState } from 'react'
import { IBlock, ITransaction } from '@/interfaces'
import { BlockDetail } from '@/components/BlockDetail'


export default function Home() {


  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [showblock, setShowBlock] = useState<boolean>(false);
  const [blockDetail, setBlockDetail] = useState<IBlock>();

  // // Listen for new blocks, and retrieve all transactions in each block
  provider.on("block", async (number) => {
    setRender(false);
    if(number!==blockNumber) {
      setBlockNumber(number);
    }
  });

  const getBlockDetail = async () => {
    const blockRes = await provider.getBlockWithTransactions(blockNumber);
    if(blockRes === null || blocks.some(block => block.hash === blockRes.hash)) {
      return;
    }
    const block: IBlock = {
      number: blockRes.number,
      hash: blockRes.hash,
      gasLimit: blockRes.gasLimit.toString(),
      timestamp: blockRes.timestamp,
      transactions: blockRes.transactions.map((transaction) => 
        ( {
          hash: transaction.hash,
          blockNumber: transaction.blockNumber,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value.toString(),
          gasLimit: transaction.gasLimit.toString(),
          timestamp: blockRes.timestamp,
        } as ITransaction))
    };
    if(blocks.length === 10) {
      const newBlocks = blocks;
      newBlocks.pop();
      newBlocks.unshift(block);
      setBlocks(newBlocks);
    } else {
      const newBlocks = blocks;
      newBlocks.unshift(block);
      setBlocks(newBlocks);
    }
    setRender(true);
  }

  const onBlockClick = async(block: IBlock) => {
    setShowBlock(true);
    setBlockDetail(block);
  }

  const goBack = () => {
    setShowBlock(false);
  }


  useEffect(() => {
    const getBlocks = async () => {
      if(blockNumber !== 0) await getBlockDetail();
    }
    getBlocks();
  }
  ,[blockNumber])


  return (
    <div className={'mx-20  my-20 '}>
      <div className="mx-auto container flex flex-col gap-y-7 justify-center items-center">
        <div className='flex flex-col gap-y-10 mx-auto justify-center items-center'>
          <div className='text-7xl font-bold'>Block Viewer</div>
        </div>
        {showblock && blockDetail ? 
      (<BlockDetail block={blockDetail} backClick={goBack}/>):
      (<><div className='text-lg' >* 10 Latest blocks are shown</div>
        <BlockList blocks={blocks} blockClick={onBlockClick}/>
      </>)
      }
       </div>
   </div>
  )
}
