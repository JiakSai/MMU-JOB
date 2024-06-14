import { FaStar } from "react-icons/fa";

export default function ReviewBar({company}) {

  const progressBarWidths = [80, 60, 40, 20, 10];

  return (
    <div className="ml-4 flex items-center space-x-8">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-3xl">{company.rating}</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} color={index < company.rating ? '#FFEA00' : 'gray'} size={30} />
          ))}
        </div>
        <div>
        <span className="text-xl font-semibold">{company.totalRatings} &nbsp; </span>
        <span className="text-2xl indent-8"> rating&nbsp; in&nbsp; total</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center">
            <p className="w-28 text-lg text-right mr-2">{5 - index}</p>
            <div className="progressbar">
              <div
                className="h-full bg-customyellow transition-width duration-500"
                style={{ width: `${progressBarWidths[index]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
