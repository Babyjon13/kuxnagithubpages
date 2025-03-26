'use client'

import Header from "../components/Header"
import ImageCollage from "../components/ImageCollage"
import ImageSlider from "../components/ImageSlider"
import styles from "./page.module.css"
import data from '@/data/data.json'
import Image from "next/image"

export default function Home(){
    return(
        <>
        <ImageSlider 
        images={[
            "/lala/loli.jpg",
            "/lala/loli2.png",
            "/lala/pngwing.com(4).png",
            "/uploads/1741887767307_salat-cezar-klassicheskii-s-kuricei_1611309202_16_max.jpg",
            "/icon/banner_gl.png"
          ]}
        />
        


        </>
    )
}