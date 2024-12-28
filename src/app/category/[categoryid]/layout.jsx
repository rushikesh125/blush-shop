import CategoryArea from '@/components/CategoryArea'
import React from 'react'

const CatLayout = ({children}) => {
  return (
   <>
    <div className=" w-full ">
      <CategoryArea />
    </div>
    <div>{children}</div>
   </>
  )
}

export default CatLayout