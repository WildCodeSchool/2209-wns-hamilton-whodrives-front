interface IpropsFilter {
  filterByPrice: React.MouseEventHandler<HTMLButtonElement>;
  changeHourRange: (key: number) => void;
  rangeSelected: number | null;
  filterByDate: React.MouseEventHandler<HTMLButtonElement>;
  filterReset: React.MouseEventHandler<HTMLButtonElement>;
  hoursRange: {
    min: string;
    max: string;
  }[];
}

export default function FilterSearchComponent({
  filterByPrice,
  changeHourRange,
  rangeSelected,
  hoursRange,
  filterByDate,
  filterReset,
}: IpropsFilter) {
  return (
    <div className="flex flex-col w-1/3 pr-5 border-r-4 h-5/6">
      <div className="mb-2">
        <h3 className="my-2">FILTRES</h3>
        <div className="flex mx-2 ">
          <button onClick={filterReset}>
            <p className="hover:text-validBlue">Réinitialiser les filtres</p>
          </button>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="my-2">TRIER PAR</h3>
        <div className="flex gap-6 mx-2 ">
          <button onClick={filterByDate}>
            <p className="hover:text-validBlue">Date</p>
          </button>
          <button onClick={filterByPrice}>
            <p className="hover:text-validBlue">Prix</p>
          </button>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="my-2">HEURE DE DEPART</h3>
        <div className="flex flex-wrap justify-between w-1/1">
          {hoursRange.map((v, key) => {
            return (
              <button
                onClick={() => changeHourRange(key)}
                key={key}
                className="border-1 border border-black w-[45%] p-1 mb-4 bg-whodrivesGrey font-medium hover:bg-validBlue hover:text-white"
              >
                {`${v.min.split(":")[0]}:${v.min.split(":")[1]}`} -{" "}
                {`${v.max.split(":")[0]}:${v.max.split(":")[1]}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
