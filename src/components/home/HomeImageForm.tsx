export default function HomeImageFormComponent(): JSX.Element {
  return (
    <div>
      {/* <div className="top-0 w-full h-full bg-center bg-no-repeat md:bg-auto md:bg-whodrives-bg"></div> */}
      <img
        src="/assets/images/whod.gif"
        alt="background"
        className="hidden w-full h-full m-auto md:block"
      />
      <img
        src="/assets/images/wd-sm.gif"
        alt="background"
        className="w-full h-full md:hidden"
      />
    </div>
  );
}
