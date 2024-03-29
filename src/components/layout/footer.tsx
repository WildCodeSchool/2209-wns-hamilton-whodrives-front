type FooterItems = {
  path: string;
  name: string;
};

const footerItems: FooterItems[] = [
  { path: "/about-us", name: "Qui sommes-nous ?" },
  { path: "/contact-us", name: "Contactez-nous" },
];

export default function FooterComponent(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full h-20 px-8 bg-layoutBlue header-text">
      <div className="flex flex-col gap-2 text-xs text-center sm:gap-28 lg:gap-60 sm:flex-row">
        {footerItems.map((item: FooterItems, index: number) => {
          return (
            <div key={index}>
              <a href={item.path}>{item.name}</a>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xxs">Copyright - Whodrives 2023</p>
    </div>
  );
}
