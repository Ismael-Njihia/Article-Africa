import React from 'react'
import {useSelector} from 'react-redux'


const UsersListPage = () => {
    const {userInfo} = useSelector(state => state.auth)

    console.log(userInfo.isAdmin)
  return (
    <div className='container mx-auto p-4'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Header 1</th>
            <th className='py-2 px-4 border-b'>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-2 px-4 border-b border-gray-300'>Data 1</td>
            <td className='py-2 px-4 border-b border-gray-300'>Data 2</td>
          </tr>
          <tr className='bg-gray-100'>
            <td className='py-2 px-4 border-b border-gray-300'>Data 1</td>
            <td className='py-2 px-4 border-b border-gray-300'>Data 2</td>
          </tr>
          <tr>
            <td className='py-2 px-4 border-b border-gray-300'>Data 1</td>
            <td className='py-2 px-4 border-b border-gray-300'>Data 2</td>
          </tr>
          <tr className='bg-gray-100'>
            <td className='py-2 px-4 border-b border-gray-300'>Data 1</td>
            <td className='py-2 px-4 border-b border-gray-300'>Data 2</td>
          </tr>
        </tbody>

      </table>

    </div>
  )
}

export default UsersListPage