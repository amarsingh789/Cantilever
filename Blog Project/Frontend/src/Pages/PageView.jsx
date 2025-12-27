import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const PageView = () => {
    const {id} =useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await axios.get(`/posts/get/${id}`);
                setPost(response.data.post)
                setLoading(false)
            }catch(err){
                console.log("Error fetching post:", err);
                setLoading(false)
            }
        }
        fetchPost();
    }, [id])

    if(loading) return (
        <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-gray-500">
            Loading blog...
        </div>
    )
    if(!post) return (
        <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-red-500">
            Blog not found
        </div>
    )

  return (
    <div className='min-h-screen bg-gray-50 pb-10'>
        <nav className='p-5 max-w-4xl mx-auto'>
            <Link to='/home' className='flex items-center gap-2 text-gray-600 hover:text-black transition'>Back to home</Link>
        </nav>
        <article className='max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden'>
            <div className="h-[400px] w-full relative">
                <img src={post.coverImage} alt={post.title} className='w-full h-full object-cover' />
                <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8'>
                    <span className='bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block'>{post.category}</span>
                    <h1 className='text-3xl md:text-5xl font-bold text-white leading-tight capitalize'>{post.title}</h1>
                </div>
            </div>
            {/* Author information */}
            <div className='px-8 py-6 border-b border-gray-100 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div
                    className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg'
                    >{post.author?.fullname?.firstname?.[0]?.toUpperCase()}</div>
                    <div>
                        <p className='font-bold text-gray-900 capitalize'>{post.author?.fullname?.firstname} {post.author?.fullname?.lastname}</p>
                        <p className='text-xs text-gray-500'>Author</p>
                    </div>
                </div>
                <div className='text-sm text-gray-500'>
                    Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',})}
                </div>
            </div>
            {/* Post Content */}
            <div className='px-8 py-10'>
                <p className='text-lg text-gray-800 leading-relaxed whitespace-pre-wrap'>{post.content}</p>
            </div>
        </article>
    </div>
  )
}

export default PageView
