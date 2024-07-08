import { RxExternalLink } from "react-icons/rx";
import ReviewBar from "./reviewBar";

export function About({ company }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Company Overview</h1>
      <div className="flex item-center space-x-32">
        <p className="text-lg font-medium">Website</p>
        <a
          className=" text-lg flex items-center gap-1 text-gray-700"
          target="_blank"
          rel="noopener noreferrer"
          href={company.website}
        >
          {" "}
          {company.name} <RxExternalLink size={16} />
        </a>
      </div>
      <div className="flex item-center space-x-32">
        <p className="text-lg font-medium">Industry</p>
        <p className="text-lg text-gray-700">{company.category}</p>
      </div>
      <div className="flex item-center space-x-[73px]">
        <p className="text-lg font-medium">Company Size</p>
        <p className="text-lg text-gray-700">{company.companySize}</p>
      </div>
      <div className="flex item-center space-x-16">
        <p className="text-lg font-medium">Primary location</p>
        <p className="text-lg text-gray-700">{company.location}</p>
      </div>
      <p className="mt-4 text-lg text-gray-600">{company.description}</p>
      <div>
        <h1 className="text-2xl font-semibold mb-8 mt-8">Company Reviews</h1>
        <ReviewBar company={company} />
      </div>
    </div>
  );
}
