import "../../styles/global.css";

type CardItems = {
  icon: string;
  title: string;
  text: string;
  border: string;
  alt: string;
  color: string;
};

const cardItems: CardItems[] = [
  {
    icon: "/assets/icons/euro-pink.svg",
    title: "Vos trajets à petit prix",
    text: "Où que vous alliez, trouvez le trajet idéal parmi notre large choix de destinations à petits prix.",
    alt: "euro icon",
    color: "text-whodrivesPink",
    border: "border-whodrivesPink",
  },
  {
    icon: "/assets/icons/users-green.svg",
    title: "Voyagez en toute confiance",
    text: "Nous vérifions les avis, les profils et les pièces d’identité. Vous savez donc avec qui vous allez voyager.",
    alt: "users icon",
    color: "text-whodrivesGreen",
    border: "border-whodrivesGreen",
  },
  {
    icon: "/assets/icons/speed-blue.svg",
    title: "Recherchez, cliquez, réservez",
    text: "Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de réserver un trajet à proximité en un clic.",
    alt: "speed icon",
    color: "text-validBlue",
    border: "border-validBlue",
  },
];

export default function HomeCardsComponent(): JSX.Element {
  return (
    <div className="m-6 md:m-12 md:justify-between md:flex md:flex-row">
      {cardItems.map((item: CardItems, index: number) => {
        const cardClassName = `border-4 ${item.border} lg:w-1/4 md:w-1/3 md:mx-2 my-4 md:my-0 h-auto border-solid flex flex-col gap-4 py-4`;
        const cardTitleClassName = `${item.color} text-center pressStart2p-text`;

        return (
          <div className={cardClassName} key={index}>
            <img src={item.icon} alt={item.alt} className="h-10"></img>
            <p className={cardTitleClassName}>{item.title}</p>
            <p className="flex px-3 font-bold text-justify roboto-text">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
