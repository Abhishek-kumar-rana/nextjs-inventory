import { getPlants } from '@/actions/plant.action';
import InventryTable from '@/components/InventryTable';
import { stackServerApp } from '@/stack/server'
import { SignUp } from '@stackframe/stack';
import React from 'react'

async function page() {

    const user = await stackServerApp.getUser();
    const app= stackServerApp.urls;

    const plants= await getPlants();
    // console.log("app url");
    // console.log("plants data in plant page",plants);
  return (
    <>

    {user? (
        <div className=' mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6 '>
            <div className=' lg:col-span-full '>
                 <InventryTable plants={plants}/>
                 </div>
        </div>

    ):(
        <div className=' flex mt-10 items-center justify-center  '>
            <SignUp/>
        </div>
    )}

    
    </>
  )
}

export default page