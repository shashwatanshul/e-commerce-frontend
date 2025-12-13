import React, { useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProductImg = ({ images }) => {
    const [mainImg, setMainImg] = useState(images[0].url)
    return (
        <div className='flex flex-col-reverse md:flex-row gap-5 w-full justify-center md:justify-start'>
            <div className='flex md:flex-col gap-4 overflow-x-auto md:overflow-visible py-2 md:py-0 w-full md:w-auto justify-start md:justify-center'>
                {
                    images.map((img, index) => {
                        return <img key={index} onClick={()=>setMainImg(img.url)} src={img.url} alt="" className='cursor-pointer w-20 h-20 border shadow-lg rounded-md object-cover shrink-0 hover:border-pink-500 transition-all' />
                    })
                }

            </div>
            <div className="w-full relative">
                <Zoom>
                    <img src={mainImg} alt="" className='w-full md:max-w-[500px] h-auto object-cover border shadow-lg rounded-lg mx-auto md:mx-0'/>
                </Zoom>
            </div>
        </div>
    )
}

export default ProductImg
