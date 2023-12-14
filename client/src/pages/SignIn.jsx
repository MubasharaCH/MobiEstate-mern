import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { OAuth } from '../components/OAuth'



export const SignIn = () => {
  //const [error,setError]=useState(null)
 // const [loading,setLoading]=useState(false)
 const {loading,error}= useSelector((state)=>state.user)
  const [formData,setFormData]=useState({})
  const navigate=useNavigate();
  const dispatch =useDispatch();
  const handleChange=(e)=>{
   setFormData({
    ...formData,[e.target.id]:e.target.value,
   })

  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      //setLoading(true)
      const res= await fetch('/api/auth/signin',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      })
      const data= await res.json();
      if(data.success=== false){
        dispatch(signInFailure(data.message))
        //setError(data.message)
        //setLoading(false)
        return;
      }
      dispatch(signInSuccess(data))
     // setLoading(false)
     // setError(null)
      navigate('/')
    } catch(error){
      dispatch(signInFailure(error.message))
     // setLoading(false)
  //  setError( error.message)
    }
  
  
  }
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 text-white p-3 uppercase rounded-lg 
       hover:opacity-95  disabled:opacity-80'>{loading? 'loading':'Sign In'}</button>
       <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
      <p>Don't have an account?</p>
      <Link to="/signup"><span className='text-blue-700'>Sign Up</span></Link>
      </div>
     {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn;