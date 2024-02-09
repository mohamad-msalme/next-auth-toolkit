import React from 'react'
import { CardWrapper } from '../card-wrapper'
import { FaExclamationTriangle } from 'react-icons/fa'
export const ErrorCard: React.FC = () => {
  return (
    <CardWrapper
      headerDescription="Oops! Somthing went wrong"
      backBtnLabel={'Back to login'}
      backBtnHref={'/auth/login'}
    >
      <div className=" w-full flex justify-center items-center">
        <FaExclamationTriangle />
      </div>
    </CardWrapper>
  )
}
