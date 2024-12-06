'use client'
import Link from 'next/link'
import React from 'react'

const CategoryArea = () => {
  return (
    <>
    <div className="Category-options  gap-x-8 hidden md:flex justify-center mt-5 py-5">
        <Link href={`/`} className="hover:text-pink-400">All Products</Link>
        <Link href={`/`} className="hover:text-pink-400">Top</Link>
        <Link href={`/`} className="hover:text-pink-400">Pant</Link>
        <Link href={`/`} className="hover:text-pink-400">Dress</Link>
        <Link href={`/`} className="hover:text-pink-400">Coord set</Link>
        <Link href={`/`} className="hover:text-pink-400">Bundles</Link>
        <Link href={`/`} className="hover:text-pink-400">Under ₹499</Link>
      </div>
    </>
  )
}

export default CategoryArea