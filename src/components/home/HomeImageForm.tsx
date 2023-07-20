export default function HomeImageFormComponent(): JSX.Element {
  return (
    <div>
      <div className="hidden h-[calc(100vh-5rem)] md:block">
        <div className="w-full h-full bg-center bg-no-repeat md:bg-cover md:bg-whodrives-bg">
          <div className="pt-12 text-center text-white section-title">
            <h1 className=" text-8xl">WHODRIVES</h1>
            <h3 className="pt-4 text-2xl">Votre application de covoiturage</h3>
          </div>
        </div>
      </div>
      <img
        src="/assets/images/wd-sm.gif"
        alt="background"
        className="w-full h-full md:hidden"
      />
    </div>
    //   <img
    //     src="/assets/images/whod.gif"
    //     alt="background"
    //     className="hidden w-full h-full m-auto md:block"
    //   />
    //   <img
    //     src="/assets/images/wd-sm.gif"
    //     alt="background"
    //     className="w-full h-full md:hidden"
    //   />
    // </div>
  );
}
