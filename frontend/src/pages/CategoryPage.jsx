import React from 'react'
import { useParams } from 'react-router-dom'


const CategoryPage = () => {
    const { name } = useParams()
  return (
    <div>{name}</div>
  )
}

export default CategoryPage