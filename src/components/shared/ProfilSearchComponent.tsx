import React from 'react';
interface propsProfil{
    nameProfil:string
}
function ProfilSearchComponent({nameProfil }:propsProfil) {
    return (
   
            <div className='w-24 border-whodrivesGrey p-2 mr-8 ml-10'>
                <img src="/assets/images/blue.png" alt="" className='mb-2'/>
                <p>{nameProfil}</p>
            </div>
  
    );
}

export default ProfilSearchComponent;