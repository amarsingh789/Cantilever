import axiosInstance from '../utils/axiosInstance';
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Link } from 'react-router-dom';
import Footer from '../componenets/Footer';

const Profile = () => {
    const {user} = useContext(UserDataContext);
    const [myPosts, setMyPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try{
                const response = await axiosInstance.get('/posts/my-posts', {
                    headers: {
                        // Authorization: `Bearer ${token}`
                    }
                })
                setMyPosts(response.data.posts)
                setLoading(false)
            }catch(err){
                console.log("Error fetching my posts:", err);
                setLoading(false)
            }
        }
        fetchUserPosts()
    }, [])
    if (loading) return <div className='text-center mt-10'>Loading Profile...</div>
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <div className='max-w-6xl mx-auto px-4 w-full flex-grow py-10'>
        {/* User info */}
        <div className='bg-white rounded-xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center gap-6'>
            {/* Avatar Circle */}
            <div className='w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold'>
                {user?.fullname?.firstname?.[0]?.toUpperCase()}
            </div>
            {/* User Details */}
            <div className='text-center md:text-left'>
                <h1 className='text-3xl font-bold capitalize'>{user?.fullname?.firstname} {user?.fullname?.lastname}</h1>
                <p className='text-gray-500'>{user?.email}</p>
                <p className='text-sm font-semibold mt-2 text-blue-600'>Total Blog Posts: {myPosts.length}</p>
            </div>
            {/* btn */}
            <div className='md:ml-auto'>
                <Link to='/createpost' className='bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition'>Write New Blog</Link>
            </div>
        </div>
        {/* My Blog Grid */}
        <h2 className='text-2xl font-bold mb-6'>My Blogs</h2>
        {myPosts.length === 0 ? (
            <div className='text-center py-20 bg-white rounded-xl shadow-sm'>
                <p className='text-gray-500 text-lg'>You haven't written any blogs yet.</p>
                <Link to='/createpost' className='text-blue-600 font-medium hover:underline mt-2 inline-block'>Start Writing Now!</Link>
            </div>
        ): (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {myPosts.map((post) => {
                    return (
                        <div key={post._id} className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition'>
                            <div className='h-48 w-full relative'>
                                <img src={post.coverImage} alt={post.title} className='w-full h-full object-cover' />
                                <span className='absolute top-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-bold uppercase'>{post.category}</span>
                            </div>
                            {/* Content */}
                            <div className='p-5'>
                                <h3 className='text-xl font-bold mb-2 line-clamp-2'>{post.title}</h3>
                                <p className='text-gray-600 text-sm line-clamp-3 mb-4'>{post.content}</p>
                                {/* Action */}
                                <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                                    <Link to={`/post/${post._id}`} className='text-blue-600 text-sm font-medium hover:underline'>
                                        Read more
                                    </Link>
                                    <div className='flex gap-2'>
                                        <Link to={`/edit/${post._id}`} className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200'>
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )}
      </div>
     <Footer/>
    </div>
    
  )
}

export default Profile
