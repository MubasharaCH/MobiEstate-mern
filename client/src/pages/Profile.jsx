import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { useRef } from 'react'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { updateUserStart,updateUserFailure,updateUserSuccess,
  deleteUserFailure,deleteUserStart,deleteUserSuccess 
  ,SignOutStart,signOutFailure,SignOutSuccess, signInSuccess
} from '../redux/user/userSlice'
import {Link} from "react-router-dom"


export const Profile = () => {
  const fileRef=useRef(null)
  const dispatch=useDispatch();
  const [file,setFile]=useState(undefined)
  const {currentUser,loading,error}=useSelector((state)=>state.user)
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
 const [updateSucess,setUpdateSucess]=useState(false)
 const [showListingError,setShowLisingError]=useState(false)
 const [userListing,setUserListing]=useState([])
// console.log(filePerc)
 //console.log(fileUploadError)
 //console.log(formData)
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
  const handleFileUpload=(file)=>{
   const storage=getStorage(app)
   const fileName=new Date().getTime() + file.name; //get unique file name
   const storageRef=ref(storage,fileName);
   const uploadTask=uploadBytesResumable(storageRef,file)

   uploadTask.on('state_changed',(snapshot)=>{
    const progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
   // console.log('upload is'+ progress + '%done');
   setFilePerc(Math.round(progress))
   },
   (error)=>{
   setFileUploadError(true)
   },
   ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL)=> setFormData({...formData,avatar:downloadURL})
    );
   }
   );

  }

//input
  const handleChange=  (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
   }
   //api 
    const handleSubmit= async(e)=>{
    e.preventDefault();
    //const id=currentUser._id;
    //console.log(id)
    try{
    dispatch(updateUserStart());
   
    const res= await fetch(`/api/user/update/${currentUser._id}`,{
      method:"POST",
      headers:{
       "Content-Type":"application/json",
      },
      body: JSON.stringify(formData),
    })
    const data= await res.json();
    if(data.success=== false){
      dispatch(updateUserFailure(data.message))
      return;
    }
    dispatch(updateUserSuccess(data))
    setUpdateSucess(true)
  }
    catch(error){
      dispatch(updateUserFailure(error.message))
    }
   }
   //delet user
   const handleDeleteUser= async ()=>{
    try{
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
      })
      const data= await res.json();
      if(data.success=== false){
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data))

    }
    catch(err){
      dispatch(deleteUserFailure(error.message))
    }
     
   }
   const handleSignOut= async()=>{
      try{
    dispatch(SignOutStart());
   const res= await fetch('/api/auth/Signout')
      
   const data= await res.json();
   if(data.success=== false){
     dispatch(signOutFailure(data.message))
     return;
   }
    dispatch(SignOutSuccess(data))
      }catch(err){
        dispatch(signOutFailure(err.message))
      }

   }
//Lisings of user
 const handleShowLisings= async()=>{
 try{
  setShowLisingError(false)
 const res= await fetch(`/api/user/listings/${currentUser._id}`)
  const data= await res.json();
   if(data.success===false){
    setShowLisingError(true)
    return;
   }
   setUserListing(data)
 } catch(err){
  setShowLisingError(true)
 }
 }
const handleDeleteLising= async(listingId)=>{
 try{
  const res=await fetch(`/api/listing/delete/${listingId}`,{
    method:'DELETE',
  })
  const data= await res.json();
  if(data.success===false){
    console.log(data.message)
    return;
  }
   setUserListing((prev)=>
   prev.filter((listing)=> listing._id !==listingId))

 }catch(err){
  console.log(err)
 }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl font-semibol text-center my-7'>Profile</h1>
      <form  className='flex flex-col gap-4'>
        <input  onChange ={(e)=>setFile(e.target.files[0])} type='file'  ref={fileRef} hidden accept='image/*'/>
        <img  onClick={()=>fileRef.current.click()}
        className='rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-2' 
        src={ formData.avatar || currentUser.avatar} alt='profile'/>
        <p className='text-sm self-center'>
          {fileUploadError ? (
             <span className='text-red-700'> Error Image
              upload</span>
              ) :  filePerc > 0 && filePerc < 100  ? (
            <span className='text-slate-700'>Uploading {filePerc} %
             </span>
            ) : filePerc === 100 ? 
            ( <span className='text-green-700'>
               Image Successfully Uploaded!</span>
               ): ("" 
               )}
        </p>
        
        <input type='text' defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type='email' defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg'  onChange={handleChange}/>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
        <button   disabled={loading} className='bg-slate-700 text-white p-3 uppercase rounded-lg 
       hover:opacity-95  disabled:opacity-80'
        onClick={handleSubmit}>{loading? 'loading':'Update Profile'}</button>
        
        <Link className='bg-green-700 text-white p-3
         text-center uppercase rounded-lg hover:opacity-95  
         disabled:opacity-80' to="/createlisting">
       Create Listing </Link>
      </form>

    <div className=' flex justify-between mt-5'>
    <span className='text-red-700 cursor-pointer ' onClick={handleDeleteUser}>Delete account</span>
    <span className='text-red-700 cursor-pointer'onClick={handleSignOut}>Sign out</span>
    </div>
     <p className='text-red-700 mt-5'>{error? error: ''}</p>
     <p className='text-green-700'>{updateSucess ?  `${currentUser.username} Profile Updated Sucessflly`:''}</p>

     <button className='text-green-700 w-full ' onClick={handleShowLisings}>Show Listings</button>
     <p className='text-red-700'>{showListingError? 'Error to showing listings': ""}</p>
     { userListing && userListing.length > 0 && 
       <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listing</h1>
          {userListing.map((listing)=>(
          <div key={listing._id} className='border flex 
          justify-between items-center p-3 gap-4'>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing cover" 
            className='h-16 w-16 object-contain'/>
          </Link>
          <Link to={`/listing/${listing._id}`}  className=' flex-1 text-slate-700 font-semibold hover:underline truncate'>
          <p>{listing.name}</p>
          </Link>
          <div className='flex flex-col items-center'>
             <button className='text-red-700 uppercase' onClick={()=>handleDeleteLising(listing._id)}>Delete</button>
             <Link to={`/update-listing/${listing._id}`}>
             <button className='text-green-700 uppercase'>edit</button>
             </Link>
          </div>
         </div>
        ) )  }
    </div>}
    </div>
  )
}
