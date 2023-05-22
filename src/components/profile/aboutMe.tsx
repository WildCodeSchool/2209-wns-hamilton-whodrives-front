import "../../styles/profile.css"
// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";

export default function AboutMeComponent(): JSX.Element {
  return (
    <div className="flex ">
      <div className="w-40 profilePictureCard">
        <img src="assets/images/dot-megachx.jpg" alt="" className="profilPicture" />
        <h4>GigaCheum</h4>
        <div className="flex">
          <a href="/#">Profil vérifié</a> <img src="assets/icons/validated-blue.svg" alt="" />
        </div>
        <p>4,9 / 5</p>
        <a href="/#">Voir mes notes</a>
      </div>
      <div>
        <div className="aboutMe">
          <h3 className="bg-layoutBlue">A propos de moi</h3>
          <p>Salut, je m’appelle Valentin, j’ai 34 ans et j’habite à Bayonne(64).</p>
          <h4>description</h4>
          <ul>
            <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum adipisci obcaecati iste enim totam facere</li>
          </ul>
          <h4>Mes préférences</h4>
          <div className="flex justify-star">
                <img src="assets/icons/chat-blue.svg" alt="" />
                <img src="assets/icons/music-blue.svg" alt="" />
                <img src="assets/icons/animal-black.svg" alt="" />
                <img src="assets/icons/wind-grey.svg" alt="" />
          </div>
          
        </div>
        <div>
          <h3 className="bg-layoutBlue">Ma voiture</h3>
          <div className="flex carDescription">
            <img src="assets/images/green-car.png" alt="" className="imgMainCard" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum adipisci obcaecati iste enim totam facere</p>
          </div>
        </div>
      </div>
    </div>

  );
}