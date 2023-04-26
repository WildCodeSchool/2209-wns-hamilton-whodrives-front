export default function HeaderComponent(): JSX.Element {
  return (
    <div className="w-screen h-20 bg-layoutBlue">
      <div className="flex flex-row justify-end gap-20 text-white">
        <div className="flex flex-row">
          <img
            className="fill-white"
            src="/assets/icons/search.png"
            alt="search icon"
          />
          <p>Rechercher</p>
        </div>
        <div className="flex flex-row">
          <img src="/assets/icons/car.png" alt="car icon" />
          <p>Publier un trajet</p>
        </div>
        <div className="flex flex-row">
          <img src="/assets/icons/user.png" alt="user icon" />
          <img src="/assets/icons/chevron-down.png" alt="chevron down icon" />
        </div>
      </div>
    </div>
  );
}
