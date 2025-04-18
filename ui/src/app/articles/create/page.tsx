'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateArticlePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        description: '',
        published: ''
    });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found. Please log in.');
            router.push('/'); // Redirect to login page if no access token is found
            return;
        }
        const payload = {
            ...formData,
            published: formData.published === 'true' // converts string to boolean
        };
    
        try {
            const response= await axios.post('http://localhost:3002/articles', payload,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Article created successfully:', response.data);
            router.push('/articles/view'); 
        } catch (error) {
            console.error('Error creating article:', error);
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-black text-center">Create Article</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
                            Body
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 h-[200px]"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="published" className="block text-gray-700 font-medium mb-2">
                            Published
                        </label>
                        <input
                            type="text"
                            id="published"
                            name="published"
                            value={formData.published}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        Create Article
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateArticlePage;