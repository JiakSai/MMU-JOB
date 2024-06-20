import { FaStar } from "react-icons/fa";

export default function ReviewBar({ company }) {
  // Ensure ratingPercentages is defined and has default values
  const ratingPercentages = company.ratingPercentages || {
    1: "0.00%",
    2: "0.00%",
    3: "0.00%",
    4: "0.00%",
    5: "0.00%",
  };

  return (
    <div className="ml-4 flex items-center space-x-8">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-3xl">{company.rating}</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < company.rating ? "#FFEA00" : "gray"}
              size={30}
            />
          ))}
        </div>
        <div>
          <span className="text-xl font-semibold">{company.totalRatings} &nbsp; </span>
          <span className="text-2xl indent-8"> rating&nbsp; in&nbsp; total</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        {[...Array(5)].map((_, index) => {
          const starCount = 5 - index;
          return (
            <div key={index} className="flex items-center">
              <p className="w-28 text-lg text-right mr-2">{starCount}</p>
              <div className="progressbar bg-gray-300 h-4 w-64 rounded-lg">
                <div
                  className="h-full bg-customyellow transition-width duration-500 rounded-lg"
                  style={{ width: ratingPercentages[starCount] }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
