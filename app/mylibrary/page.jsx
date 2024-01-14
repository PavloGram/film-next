import React from 'react'
import FilmCardWrap from '../components/FilmCardWrap'
import Modal from '../components/Modal'

export const metadata = {
  title: "My library",
 
};


function page() {
  return (
    <>
    <FilmCardWrap/>
    <Modal/>
    </>
    
  )
}

export default page