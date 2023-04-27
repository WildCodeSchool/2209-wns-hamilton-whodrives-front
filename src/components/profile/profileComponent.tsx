export default function ProfileComponent(): JSX.Element {
  return (
    <div className="w-screen h-screen bg-whodrivesGreen">
      <div>
        <img src="/assets/images/whodrives-sm.png" alt="" />
        <h3>Username</h3>
        <h3>?/?</h3>
        <a href="/#">Voir mes notes</a>
      </div>
      <div>
        <h3>A propos de moi</h3>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel, nostrum, aut sapiente cum soluta voluptas veniam exercitationem nam ullam dignissimos consequatur possimus dolores labore fuga harum adipisci doloribus temporibus?</p>
          <div>
            <h4>Description</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore vel, nostrum, aut sapiente cum soluta voluptas veniam exercitationem nam ullam dignissimos consequatur possimus dolores labore fuga harum adipisci doloribus temporibus?</p>
          </div>
          <div>
            <h4>Mes préférences</h4>
            <div className="flex">
              <img src="/assets/images/whodrives-sm.png"  alt="" />
              <img src="/assets/images/whodrives-sm.png"  alt="" />
              <img src="/assets/images/whodrives-sm.png"  alt="" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Mes voitures</h3>
        <div className="flex">
          <div>
            <img src="/assets/images/whodrives-sm.png"  alt="" />
          </div>
          <div>
              <p>Ma voiture est une Peugeot 206 bleue qui possède 4 places.</p>
          </div>
          <div>
            <h4>Caractéristiques</h4>
            <ul>
              <li>Moteur : ?</li>
              <li>Mise en circulation :  ?</li>
            </ul>
          </div>
          <div>
            <h4>Options</h4>
            <ul>
              <li>?</li>
              <li>?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}