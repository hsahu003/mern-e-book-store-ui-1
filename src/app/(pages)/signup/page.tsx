"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Styles from "./Signup.module.css"


const apiUrl = process.env.NEXT_PUBLIC_API_URL

console.log("url",apiUrl)

const SignUp = () => {

  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmpassword:""  
    });
  const router = useRouter(); 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const{name, email, password, confirmpassword} = formData;

    if(password !== confirmpassword){
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password, confirmpassword})
      });

      if(response.ok){
        router.push("/login");
      } else {
        const data = await response.json();
        console.error("Signup failed:", data);
      }
    }catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  }

  return (
    <div className={Styles.createAccountContainer}>
        <Image 
        src="https://m.media-amazon.com/images/G/01/kfw/landing/img_logo._CB611756372_.png"
        alt='Logo'
        width={150} 
        height={50} 
        className={Styles.logo}
        />
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Your name</label>
            <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required/>
        
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
    
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="At least 6 characters" value={formData.password} onChange={handleChange} required/>
            <p className={Styles.passwordInfo}>Password must be atleast 6 characters</p>

            <label htmlFor="password-again">Password Again</label>
            <input type="password" id="confirmpassword" value={formData.confirmpassword} onChange={handleChange} required/>
    
            <button type="submit" className={Styles.createAccountButton}>Create your account</button> 
        </form>

        <p className={Styles.alreadyHaveAccount}>Already have an account? <a href="/login">Sign in</a></p>

    </div>
  )
}

export default SignUp