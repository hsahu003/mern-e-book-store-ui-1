"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Image from 'next/image'

export const page = () => {
  const router = useRouter()
  return (
    <div className={styles.c1}>
          <div className={styles.c11}>
          <Image
                src="https://m.media-amazon.com/images/G/01/kfw/landing/img_logo._CB611756372_.png"
                alt='Logo'
                className={styles.logo}
                width={500}
                height={500}
            />
        <p className={styles.t1}>Take your stories whereever you go</p>
        <div className={styles.btnRow}>
          <button className={styles.btn1}
              onClick={()=>{
                router.push('/signup')
            }}
          >
            Create an Account
          </button>
          <button className={styles.btn2}
              onClick={()=>{
                router.push('/login')
            }}
          >
            <Image
                src="https://m.media-amazon.com/images/G/01/kfw/landing/icon-amazon-a2x._CB611757832_.png"
                alt='Logo'
                className={styles.btnicon}
                width={20}
                height={20}
            />
            <span>Sign In</span>
          </button>
        </div>
    </div>
      <Image 
            src="https://m.media-amazon.com/images/G/01/kfw/landing/img_kindleWeb_IN._CB610886625_.png"
            alt='Screenshot'
            className={styles.bottomimg}
            width={1000}
            height={500}
        />
    </div>
  )
}

export default page