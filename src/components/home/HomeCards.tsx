import "../../styles/global.css";

type CardItems = {
  icon: string;
  title: string;
  text: string;
  alt: string;
  color: string;
};

const cardItems: CardItems[] = [
  {
    icon: "/assets/icons/euro-pink.svg",
    title: "Vos trajets à petit prix",
    text: "Où que vous alliez, trouvez le trajet idéal parmi notre large choix de destinations à petits prix.",
    alt: "euro icon",
    color: "whodrivesPink",
  },
  {
    icon: "/assets/icons/users-green.svg",
    title: "Voyagez en toute confiance",
    text: "Nous vérifions les avis, les profils et les pièces d’identité. Vous savez donc avec qui vous allez voyager.",
    alt: "users icon",
    color: "whodrivesGreen",
  },
  {
    icon: "/assets/icons/speed-blue.svg",
    title: "Recherchez, cliquez, réservez",
    text: "Facile d'utilisation et dotée de technologies avancées, notre appli vous permet de réserver un trajet à proximité en un clic.",
    alt: "speed icon",
    color: "validBlue",
  },
];

export default function HomeCardsComponent(): JSX.Element {
  return (
    <div className="flex flex-row justify-between m-12">
      {cardItems.map((item: CardItems, index: number) => {
        const cardClassName = `border-4 border-${item.color} w-1/4 h-auto border-solid flex flex-col gap-4 py-4`;
        const cardTitleClassName = `text-${item.color} text-center pressStart2p-text`;

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
