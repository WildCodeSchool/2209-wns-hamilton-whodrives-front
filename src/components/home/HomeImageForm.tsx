export default function HomeImageFormComponent(): JSX.Element {
  return (
    <div>
      {/* <div className="top-0 w-full h-full bg-center bg-no-repeat md:bg-auto md:bg-whodrives-bg"></div> */}
      <img
        src="/assets/images/wd.gif"
        alt="background"
        className="hidden w-full h-full md:block"
      />
      <img
        src="/assets/images/wd-sm.gif"
        alt="background"
        className="w-full h-full md:hidden"
      />
    </div>
  );
}
