interface IpropsFilter {
  filterByPriceClick: React.MouseEventHandler<HTMLButtonElement>;
  changeHourRange: (key: number) => void;
  rangeSelected: number | null;
  hoursRange: {
    min: string;
    max: string;
  }[];
}
export default function FilterSearchComponent({
  filterByPriceClick,
  changeHourRange,
  rangeSelected,
  hoursRange,
}: IpropsFilter) {
  return (
    <div className="flex flex-col w-1/3 pr-5 border-r-4 h-5/6">
      <h3 className="mb-2 font-semibold">FILTRES</h3>
      <button className="flex justify-start mb-1 hover:text-validBlue">
        Reset
      </button>
      <h3 className="mb-2 font-semibold">TRIER PAR</h3>
      <div className="flex-wrap justify-between w-1/1 ">
        <button className="w-1/2 mb-2 text-left hover:text-validBlue">
          Date
        </button>
        <button className="w-1/2 mb-2 text-left hover:text-validBlue">
          Disponibilité
        </button>
        <button
          className="w-1/2 mb-2 text-left hover:text-validBlue"
          onClick={filterByPriceClick}
        >
          Prix
        </button>
        <button className="w-1/2 mb-2 text-left hover:text-validBlue">
          Notes
        </button>
      </div>

      <h3 className="mb-2 font-semibold">HEURE DE DEPART</h3>

      <div className="flex flex-wrap justify-between w-1/1">
        {hoursRange.map((v, key) => {
          return (
            <button
              onClick={() => changeHourRange(key)}
              key={key}
              className="border w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white"
            >
              {v.min}-{v.max}
            </button>
          );
        })}
        {/* <button className="border  w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          12:01-18:00
        </button>
        <button className="border w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          18:01-00:00
        </button>
        <button className="border  w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white">
          00:01-06:00
        </button> */}
      </div>

      <h3 className="mb-2 font-semibold">PREFERENCES</h3>
      <div className="flex flex-row">
        <img src="/assets/icons/wind-black.svg" alt="" />
        <img src="/assets/icons/animal-blue.svg" alt="" />
        <img src="/assets/icons/music-blue.svg" alt="" />
      </div>
    </div>
  );
}
