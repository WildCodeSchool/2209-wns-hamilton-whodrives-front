import { useState } from "react";
import SearchTrip from "../../components/shared/SearchTrip";
import "../../styles/searchTrip.css";
import SearchTripResult from "../../components/searchTrip/SearchTripResult";

function searchTripPage() {

  const handleclick = () => {

  };
  return (
    <div className="flex h-screen items-center flex-col w-screen">
      <h1 className="text-whodrivesPink mt-10">JE CHERCHE UN TRAJET</h1>
      <SearchTrip onclick={handleclick} />

      <SearchTripResult />
      <SearchTripResult />

    </div>
  );
}

export default searchTripPage;
