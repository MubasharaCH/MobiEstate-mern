import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from "@material-tailwind/react";
import { MdChair } from "react-icons/md";
import { BsSignNoParkingFill } from "react-icons/bs";
import { FaBath, FaBed } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { BsEmojiTear } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'

import { useSelector } from 'react-redux';
import { Contact } from '../components/Contact';

export const Listing = () => {
 
  SwiperCore.use([Navigation])
 const params=useParams();
 const [listing,setListing]=useState(null)
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState(false)
 const [contact,setContact]=useState(false)
 const {currentUser}=useSelector((state)=>state.user)

 //console.log(currentUser)

 useEffect(()=>{
 const fetchListing= async()=>{
 try{

  setLoading(true)
  const res=await fetch(`/api/listing/get/${params.listingId}`);
 const data= await res.json();
 if(data.success===false){
  setError(true)
  setLoading(false)
   console.log(data.message)
   return;
 }
setListing(data)
setLoading(false)
setError(false)
 }catch(err){
  setError(true)
 }

 

    }
    fetchListing();
 },[])
  return (
    <main>
      {loading && <p className='text-3xl text-slate-700 text-center mt-40 mx-auto'>
        Loading<Spinner className='h-16 w-16 items-center text-slate-900/50 mx-auto'/></p>}
        {error && <p className='text-3xl text-slate-700 text-center mt-40 mx-auto'>
          Something Wents Wrong!<BsEmojiTear className='text-black bg-yellow-400 rounded-full text-center mx-auto' size={50} /></p>}
          {listing && !loading && !error &&
       <div className=''>
       <Swiper navigation>
        {listing.imageUrls.map((url)=>(
          <SwiperSlide key={url}>
          <div className='h-[510px] object-contain max-w-full' 
          style={{background: `url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
          </SwiperSlide>
        ))}
       </Swiper>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600'>
              <MdLocationPin className='text-green-700' size={20}/>
              {listing.address}
            </p>
            <div className='flex gap-4'>
             <p className='bg-red-900 w-full max-w-[200px]
              text-white text-center rounded-md p-1'>
                {listing.type === 'rent' ? "For Rent": "For Sale"}
                </p>
                {
               listing.offer && (
               <p className='bg-green-900 w-full max-w-[200px]
              text-white text-center rounded-md p-1'>
                ${+listing.regularPrice - listing.discountPrice} OFF
                </p>
                   )
                }
                
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>
                Description - </span>{listing.description}
                </p>
                <ul className='text-green-900 font-semibold  flex flex-wrap items-center gap-4 sm:gap-6'>  
                  <li className='flex items-center gap-1 whitespace-nowrap'><FaBed  size={30}/>
                  {listing.badrooms > 1 ? `${listing.badrooms} beds` :`${listing.badrooms} bed` }
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'><FaBath  size={30}/>
                  {listing.bathrooms > 1 ? `${listing.bathrooms} baths` :`${listing.bathrooms} bath` }
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'> 
                    { listing.parking ? <p className='flex items-center gap-1 whitespace-nowrap'><FaSquareParking size={30}/>Parking sport </p>:
                     <p className='flex items-center gap-1 whitespace-nowrap '><BsSignNoParkingFill size={30} />No parking</p>

                    }
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap'>
                  <MdChair size={30}/>
                  { listing.furnished ? "Furnished" : " Not furnished"}
                  </li>
                </ul>
                { currentUser && listing.userRef !== currentUser._id && !contact && (
                <button className='bg-slate-700 text-white rounded-lg object-cover p-3
                  hover:opacity-95 ' onClick={()=>setContact(true)}>Contact Landlord</button>
                ) }
                {contact && <Contact listing={listing}/>}
            </div>
      
       </div>
          }
         
      </main>
  )
}
