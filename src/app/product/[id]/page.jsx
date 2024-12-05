import React from 'react'

const Product = async({params}) => {
    const {id} = await params;
  return (
    <div>Product {id}</div>
  )
}

export default Product