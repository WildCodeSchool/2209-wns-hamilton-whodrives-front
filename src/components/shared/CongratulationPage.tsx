import React from 'react';
import "../../styles/global.css";

function CongratulationPage() {
    return (
        <div className='flex flex-col items-center mt-16'>
            <h3 className='congrats-title'>FELICITATION !</h3>
            <img src="/assets/images/yellow-car.png" alt="" className='w-1/2 h-auto'/>
            <h4>VOUS AVEZ REJOINT LE TRAJET</h4>
            <p></p>
            <p></p>
        </div>
    );
}

export default CongratulationPage;