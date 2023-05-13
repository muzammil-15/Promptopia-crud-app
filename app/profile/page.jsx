'use client'

import {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation"

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
    
        if(session?.user.id) fetchPosts();
        
    
      },[]);
    

    const handleEdit = (post)=> {
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this post?");
      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          })
          const filteredPrompt = posts.filter((p) => p._id!== post._id);
          setPosts(filteredPrompt);
        } catch (error) {
          console.log(error)
        }
      }
    }
  return (
    <div>
      <Profile 
        name ='my'
        desc = "welcome to your personal profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
      />
    </div>
  )
}

export default MyProfile;
