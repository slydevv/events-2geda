"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
 const router = useRouter();
  
 const { data: session, status } = useSession({
   required: true,
   onUnauthenticated() {
     router.push("/");
   },
 });

  return (
    <div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        Sign out
      </button>
      <h2>Hi {session?.user?.name }</h2>
      This is the dashboard
    </div>
  );
}
