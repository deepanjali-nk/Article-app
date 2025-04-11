'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
    const router = useRouter();
    const [userName, setUserName] = useState('User');
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/'); 
        } else{
            try{
               const decodedToken:{name?: string} = jwtDecode(accessToken); 
               console.log('Decoded token:', decodedToken);
               setUserName(decodedToken.name || 'User');
            }
            catch (error){
                console.error('Error decoding token:', error);
                setUserName('User');
            }
        }
    }
    , [router]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        router.push('/');
    }

    const createArticle = () => {
        router.push('/articles/create'); 
    }

    const viewArticles = () => {
        router.push('/articles/view'); 
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-4 text-black text-center">Welcome to ArticleHub</h1>
                    <p className="text-gray-700 text-center">This is your dashboard, {userName}</p>
                    <button onClick={createArticle} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Article</button>
                    <button onClick={viewArticles} className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">View Articles</button>

                    <button
                        onClick={handleLogout}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition">Logout 
                    </button>     
                </div>
                
            </div>
        </div>
    );
    }
export default Dashboard;