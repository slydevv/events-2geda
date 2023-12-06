"use client"

import Image from "next/image";
import Header from "@/app/components/header"
import SignIn from "./component/signIn";
import { useAppSelector } from "@/redux/store"
import {currentAuthState} from "@/redux/slices/authSlice"
import SignUp from "./component/signUp";



export default function page() {
    const authState = useAppSelector(currentAuthState);
  
  return (
    <>
    
      <div className="flex flex-row- max-w-[2000px] gap-x-10 h-full lg:gap-x-20 mx-auto px-7 lg:pr-20 bg-black text-white">
        {/* Blue block*/}
        <section className="hidden md:block bg-orange-300 h-[820px] md:w-3/5 rounded-md mt-7">
          {/* Text in block*/}
          <div className="flex flex-col px-20 pb-20 h-full justify-between">
            <div className="mt-32">
              <h2 className="md:text-4xl md:max-w-[250px] lg:max-w-md lg:text-7xl text-white">
                See all the moments together
              </h2>
              <p className="text-[#8992C4] mt-5 max-w-sm">
                Join the first community that cares about connecting healthcare
                professionals to suitable jobs and opportunities.
              </p>
            </div>

            {/* Lower part*/}
            <div className="flex flex-col items-center">
              <div className="bg-[#1F2C7B] rounded-md py-5 pl-5 md:pr-10 lg:pr-20 w-full">
                <h3 className="text-white font-normal max-w-md">
                  I like that I can now experince all that happened at the event through the lens of everyone!
                  Its good to share memories with one another 
                </h3>
                <p className="text-white mt-5">Small David</p>
               
              </div>
              <div className="flex flex-row space-x-3 mt-5">
                <div className="border border-white bg-white rounded-full w-3 h-3"></div>
                <div className="border border-white rounded-full w-3 h-3"></div>
                <div className="border border-white rounded-full w-3 h-3"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Form*/}
        <section data-test="form-header" className=" w-full md:w-2/5">
          {authState == 0 ?  <SignIn /> : <SignUp />}
         
        </section>
      </div>
    </>
  );
}
