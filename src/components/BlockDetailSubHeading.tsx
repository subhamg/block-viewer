import React from 'react'

interface IProps {
    field: string;
    value: string;
}

export const BlockDetailSubHeading = ({field, value}: IProps) => {
  return (
    <div className='flex items-center text-xl gap-x-1'>
        <div className='font-medium text-gray-900'>{field} :</div>
        <div className='font-normal text-gray-700'>{value}</div>
    </div>
  )
}
