import axios from 'axios'
import React, { useEffect, useState } from 'react'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const PopularAuthor = () => {
  const [popularUser, setPopularUser] = useState([])
  const getAllUsers = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.get(`/api/user/allUsers`, {
=======
      const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/user/allUsers`, {
>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
        withCredentials: true
      })
      if (res.data.success) {
        setPopularUser(res.data.users)

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col space-y-4 items-center'>
          <h1 className='text-3xl md:text-4xl font-bold pt-10 '>Popular Authors</h1>
          <hr className=' w-24 text-center border-2 border-red-500 rounded-full' />
        </div>
        <div className='flex items-center justify-around my-10 px-4 md:px-0'>
          {
            popularUser?.slice(0, 3)?.map((user, index) => {
              return <div key={index} className='flex flex-col gap-2 items-center'>
                <img src={user.photoUrl || user.logo} alt="" className='rounded-full h-16 w-16 md:w-32 md:h-32' />
                <p className='font-semibold'>{user.firstName} {user.lastName}</p>
              </div>

            })
          }

        </div>
      </div>
    </div>
  )
}

export default PopularAuthor
