import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Contact = ({listing}) => {
    const [landlord,setLandlord]=useState(null);
    const [message,setMessage]=useState('')
    useEffect(()=>{
       const fectLandlord=async ()=>{
        try{
            const res= await fetch(`/api/user/${listing.userRef}`)
            const data= await res.json();
            setLandlord(data)
          
        }catch(err){
         console.log(err)
        }
       }
       fectLandlord();
    },[listing.userRef])

     const handleChange=(e)=>{
        setMessage(e.target.value)
     }
  return (
    < >
    {  landlord && (
        <div className='flex flex-col gap-2'>
        <p>Contact <span className='font-semibold'> {landlord.username}</span>  {''}for  {''} <span className='font-semibold'
        >{listing.name.toLowerCase()}
         </span></p>
         <textarea name='message' id=' message' placeholder='Enter your message here...'
          rows='2' value={message} className='w-full border rounded-lg p-3  
           border-gray-300'
          onChange={handleChange}></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding
           ${listing.name}&body=${message}`} 
           className='bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95 uppercase'>send Message</Link>

         </div>
    )

    }
    
    </>
  )
}
