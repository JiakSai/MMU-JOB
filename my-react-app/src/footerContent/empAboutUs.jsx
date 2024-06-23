import EmployerHeader from "../employer/employerHeader"
import EmployerFooter from "../employer/employerFooter"
import AboutImg from "/src/photo/aboutUs.jpg"
import EmployerImg from "/src/photo/recruiter.png"
import JobSeekerImg from "/src/photo/jobseeker.png"
import CommunityImg from "/src/photo/comunity.png"

export default function EmpAboutUs() {
    return(
        <>
        <EmployerHeader></EmployerHeader>
        <div className="mt-[150px] mb-[30px] mx-[120px]">
            <div className="max-w-10xl">
                    <div className="flex flex-row w-100 space-x-32">
                        <div className="flex-1 w-100">
                            <h1 className="text-3xl font-bold mb-4">About MMU JOB</h1>
                            <p className="text-xl leading-7	mt-6" >
                                MMU JOB is the career portal for MMU students and graduates. Our platform provides immediate access to exclusive job openings from a wide range of companies, ensuring that your skills remain relevant and in-demand. With features designed for seamless job searches, quick applications using personalized profiles, and comprehensive company research, we streamline the entire job application process. This efficient approach not only reduces the stress and uncertainty typically associated with job hunting but also enhances your employment opportunities. At MMU JOB, we are committed to helping you secure employment more effectively and start your career with confidence.
                            </p>
                        </div>
                        <div className="ml-10">
                            <img src={AboutImg}  className="w-[700px] h-[500px] rounded-lg" />
                        </div>
                    </div>
            </div>
            <div>
            <div className="mt-20 text-center">
                    <div className="flex flex-col justify-center w-full">
                        <h2 className="text-3xl font-semibold mb-6">What We Do</h2>
                        <p className="mx-72 text-xl leading-7">Wherever you are on your career journey, MMU JOB makes it easier for workers and companies to find the perfect match.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-10 pb-2">
                        <div>
                            <img src={JobSeekerImg} alt="Job Seekers" className="mb-2 w-[500px] h-auto" />
                            <h3 className="text-xl font-semibold">For Job Seekers</h3>
                            <p className="text-base leading-6 pt-2 pb-4 mx-6">We simplify your search, so you can apply for jobs with confidence. Filter jobs postings, research the companies, and get smart on salary then apply with ease.</p>
                            <a href="/userRegister" className="text-customPink font-medium hover:font-semibold">Join MMU JOB</a>
                        </div>
                        <div>
                            <img src={CommunityImg} alt="Comunity" className="mb-2 w-[500px] h-auto"/>
                            <h3 className="text-xl font-semibold">For MMU Community</h3>
                            <p className="text-base leading-6 pt-2 pb-4 mx-6">We amplify your voice so you can enhance your work experience. Allow you to post reviews of companies to promote transparency in the job market.</p>
                            <a href="/userRegister" className="text-customPink font-medium hover:font-semibold">Join MMU JOB </a>
                        </div>
                        <div>
                            <img src={EmployerImg} alt="Employers" className="mb-2 w-[500px] h-auto pt-[27px] pb-[30px]" />
                            <h3 className="text-xl font-semibold">For Employers</h3>
                            <p className="text-base leaduing-6 pt-2 pb-[40px] mx-6">We offer a platform to post job openings and find high-quality talent quickly. Engage with graduates who are ready to join the workforce.</p>
                            <a href="/employerRegister" className="text-customPink font-medium hover:font-semibold">Create Company Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <EmployerFooter></EmployerFooter>
        </>
    );
}