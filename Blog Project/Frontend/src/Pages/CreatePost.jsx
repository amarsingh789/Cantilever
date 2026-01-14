import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('Technology')
    const [coverImage, setCoverImage] = useState(null)

    const navigate = useNavigate()

    const categories = ['Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Business', 'Travel', 'Food', 'Sports', 'Finance']

    const handleSumbit = async (e)=>{
        e.preventDefault()
        // image upload logic 
        const formData = new FormData()
        formData.append('title', title)
        formData.append('category', category)
        formData.append('coverImage', coverImage)
        formData.append('content', content)

        try{

            const response = await axiosInstance.post('/posts/create', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${token}`
                }
            })
            if(response.status === 201){
                alert('Post Created Successfully')
                navigate('/home')
            }
        }catch(err){
            console.error('Error creating post:', err)
            alert(err.response?.data?.message || 'Failed to create post')
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create Blog Post</h2>
        </div>
        <form action="" className='mt-8 space-y-6' onSubmit={handleSumbit}>
            <div className='rounded-md shadow-sm space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Post Title</label>
                    <input
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                     type="text" className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black' placeholder='Enter blog title' required />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Post Category</label>
                    <select name="category" id="category"
                    value={category} onChange={(e)=> setCategory(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black'>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Cover Image</label>
                    <input type="file" required accept='image/*' onChange={(e) => setCoverImage(e.target.files[0])} 
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black' />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Post Content</label>
                    <textarea rows={6} required placeholder='Write your blog content here...' value={content} onChange={(e) => setContent(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-black focus:border-black'/>
                </div>
            </div>
            <div>
                <button type="submit" className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black '>Publish Post</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
