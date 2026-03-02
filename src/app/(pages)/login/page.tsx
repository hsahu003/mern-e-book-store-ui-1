"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Styles from './Login.module.css'

const SingIn = () => {
    const router = useRouter();
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = formData;
      try {
        const response = await fetch(apiurl + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        alert('Login successful');
        // Store token or handle login success (e.g., redirect)
        console.log('Token:', data.token);
      router.push('/kindle-library')
      } 

      else {
        const data = await response.json();
        alert(data.message);
      }

    }
    catch (error) {
      console.error('Error:', error);
      alert('Error logging in');
    }

  }

  return (
    <div className={Styles.signInContainer}>
      <Image 
        src="https://m.media-amazon.com/images/G/01/kfw/landing/img_logo._CB611756372_.png"
        alt='Logo'
        width={150} 
        height={50} 
        className={Styles.logo}
      />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required/>

        <div style={{
          display: 'flex', 
          justifyContent: 'space-between',
          width:'100%',
          alignItems: 'end'
          }}>
          <label htmlFor="password">Password</label>
          <a href="/#" className={Styles.fp}>Forgot Password?</a>
        </div>
        
        <input type="password" id="password" value={formData.password} onChange={handleChange} required/>

        <button type="submit" className={Styles.signInButton}>Sign In</button>  
      </form>
      <p className={Styles.dontHaveAccount}>
        Don&apos;t have an account? 
        <a href="/signup" className={Styles.signupLink}>Sign Up</a>
      </p>
    </div>
  )
}

export default SingIn