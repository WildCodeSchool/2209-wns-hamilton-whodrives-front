import React from 'react';
import SearchTrip from '../../components/shared/SearchTrip';

function searchTripPage() {
    return (
        <div className='flex item-center  flex-col w-1/1 font-{{theme.fontFamily.pressStart2p}}'>
            <h1 className='text-whodrivesPink'>JE CHERCHE UN TRAJET</h1>
            <SearchTrip/>
        </div>
    );
}

export default searchTripPage;