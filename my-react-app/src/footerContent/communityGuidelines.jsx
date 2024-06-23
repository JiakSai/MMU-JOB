import Header from "../Header";
import Footer from "../Footer";
import { RiInformationLine } from "react-icons/ri";

export default function CommunityGuideLine() {
    return(
        <>
        <Header></Header>
        <div className="mt-[100px] mb-[30px] mx-[120px]">
            <div className="mt-[100px] mb-[30px] mx-[120px]">
                <div className="flex flex-col">
                    <div className="pb-6">
                        <h1 className="text-3xl font-bold pb-6">Community Guidelines</h1>
                        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 flex items-center space-x-2 ">
                            < RiInformationLine className="h-5 w-5 text-blue-500" />
                            <span className="text-blue-700"><i>Last updated on 2nd June 2024</i></span>
                        </div>
                    </div>
                    <div className="bg-white shadow-xl py-4 px-14 leading-6">
                        <p className="font-bold pt-8">MMU JOB is the job discovery platform that helps job seekers make the right move at any point in their career. With some cooperation from both job seekers and employers, we can create an easy, exciting, and effective job-seeking experience for all.</p>
                        <br></br><br></br>
                        <p className="font-bold">We've created these Community Guidelines so you can help us nurture and protect this amazing community.</p>
                        <br></br>
                        <p className="font-bold">Community Guidelines for Job Seekers</p>
                        <br></br>
                        <p>For those new to job searching, MMU JOB provides exclusive insights to help you discover your ideal workplace. With job recommendations and career advice tailored to your experience, impress employers easily when you chat live with them on the platform. You'll be able to grab any opportunity wherever you are with instant application updates and quick responses on the app.</p>
                        <br></br>
                        <p>As you progress in your career, our experienced recruiters from MMU JOB will match you to your next opportunity. No matter your experience or industry, MMU JOB makes job searching easy and fast.</p>
                        <br></br>
                        <p>Here are some basic guidelines to optimise your job search experience:</p>
                        <br></br>
                        <p className="font-bold">1. Upload an accurate, truthful and professional resume.</p>
                        <p>Your resume is your golden ticket to land your dream job. It is also your chance to make a good first impression on prospective hiring managers. Please ensure that you have included complete and accurate information on your resume. Here are some basic things you should have in your resume:</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Your name</li>
                            <li>E-mail address</li>
                            <li>Current location (Eg. Petaling Jaya, Malaysia)</li>
                            <li>Contact number</li>
                            <li>Educational background</li>
                            <li>Working experience (if any)</li>
                            <li>Special skills</li>
                            <li>Past achievements and activities</li>
                        </ul>
                        <br />
                        <p className="font-bold">2. Complete your profile.</p>
                        <p>It's important to fill up your profile honestly and completely. In addition to your resume, employers will also be able to see your profile, as this is the standard practice with all job platforms. Your profile serves as a summary that employers can easily look through before diving into your resume.</p>
                        <br />
                        <p>It’s also highly recommended that you record a video cover letter on your profile as well. This video cover letter is sent along with your application to the employers, so take the opportunity to stand out and share your personality.</p>
                        <br />
                        <p className="font-bold">DO:</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Use a proper name for your account. Employers will see the name you chose that is displayed alongside your resume.</li>
                            <li>Write a simple but informative summary about you. Tell employers who you are and what kind of opportunities you are looking for.</li>
                            <li>Record a quick 30-second video cover letter that is professional and informative.</li>
                        </ul>
                        <br />
                        <p className="font-bold">DO NOT:</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Provide any false or inappropriate information.</li>
                        </ul>
                        <br /><br />
                        <p className="font-bold">3. Pick a professional profile picture.</p>
                        <p>It is optional to have a profile picture on MMU JOB. If you do upload one, you should aim to look professional and presentable.</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Ensure that your photo is clear.</li>
                            <li>Only use a picture of yourself.</li>
                            <li>Make sure that your face can be clearly seen.</li>
                            <li>Keep it professional.</li>
                        </ul>
                        <br />
                        <p className="font-bold">4. Communicate in English.</p>
                        <p>MMU JOB uses English as its main language across its platforms to ensure clear communication between all parties. The use of other languages is accepted and welcomed, however all written information must also be presented in English alongside the chosen language.</p>
                        <br />
                        <p>For example, if you want to upload your resume in another language, you must at least ensure that you’ve presented all the same information in English too — in the same document with page 1 is in English and page 2 is all the same information in Bahasa Melayu.</p>
                        <br />
                        <p className="font-bold">5. Apply for jobs responsibly.</p>
                        <p>Using the filters available, we encourage you to apply to jobs that are relevant and of interest to you. Do not send applications to jobs that you are not seriously interested in. Read the job description before sending your application.</p>
                        <br />
                        <p>Do your best to attend any interviews that have been set and communicate respectfully with employers.</p>
                        <br />
                        <p className="font-bold">6. Review-Specific Guidelines.</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li><span className="font-bold">Honest and Opinion-based:</span> Your review should be honest and constitute your own personal opinion and experience with your current or former employer. We don’t take sides when it comes to factual disputes, so we expect you to stand behind your statements expressed in your content.</li>
                            <li><span className="font-bold">One Review, Per Employer, Per Year:</span> Each individual is allowed one review, per employer, per year, per review type. If a user updates a review within a year, the older review will be archived and the newer review will be listed. Your content should be related to jobs you have held (or interviews you have had) within the last five years so it’s relevant to today’s job seeker.</li>
                            <li><span className="font-bold">Balanced is Recommended:</span> We encourage you to think about work from a few perspectives and include both a pro and a con to provide a balanced review. While not required, we do believe balanced reviews make for a better community experience.</li>
                            <li><span className="font-bold">Extreme Language:</span> We realize talking about work can get emotionally charged, but we don't approve reviews that include certain profanities, threats of violence, or discriminatory language targeted at an individual or group. We may allow reviews that mention race, religion, nationality, gender, sexual orientation, and the like if we believe the comment is used to describe a workplace situation. General discussions of workplace misconduct are allowed, including most discussions of illegal activities, discrimination, and sexual harassment.</li>
                            <li><span className="font-bold">Originality Required:</span> All reviews should be original, without substantial quoted material from other sources, including (but not limited to) websites, e-mail correspondence, other reviews, etc.</li>
                            <li><span className="font-bold">Professionally Irrelevant or Spam:</span> We also reject content that does not relate to an employer, is only a review of the product or service, or is otherwise not relevant to understanding workplace culture.</li>
                            <li><span className="font-bold">Content Quality:</span> Your writing doesn't have to be perfect, but we need to be able to understand it. We reject reviews for excessive capitalization or filler words/characters. And remember, your review will be more credible if you use good grammar, spelling, and punctuation.</li>
                            <li><span className="font-bold">Privacy:</span> To safeguard privacy, we do not allow you to identify yourself or include any contact information (about yourself or others) in your reviews.</li>
                            <li><span className="font-bold">Links:</span> Advertising, self-promotion, and other irrelevant links are not allowed in reviews.</li>
                        </ul>
                        <br />
                        <p className="font-bold">7. Respect copyright.</p>
                        <p>Only use and upload documents that you have made or have been authorised to use. This includes any information, resumes, pictures, projects, etc. Copyrighted material will be removed immediately upon request of the rightful owner.</p>
                        <br />
                        <p className="font-bold">8. We value your privacy.</p>
                        <p>MMU JOB respects the privacy of individuals with regards to personal data and is committed to protecting the privacy of its users, and strives to provide a safe, secure user experience. If you have noticed any misuse or abuse of your personal information, please contact our team as soon as possible. Learn more about MMU JOB's privacy policy <a href="/policy" className="text-[#2471A3] font-medium underline underline-offset-2 hover:font-semibold ">here</a>.</p>
                        <br />
                        <p>Please note that our MMU JOB consultants are allowed to contact you for career opportunities as part of headhunting services. Employers advertising on MMU JOB can reach out to you directly if you've enabled a toggle indicating your interest in being discoverable. However, if you’ve been contacted for commercial purposes or notice an abuse of your information, you may inform us as this would be considered misconduct according to the Employer community guidelines.</p>
                        <br />
                        <p className="font-bold">9. One account only.</p>
                        <p>All users on MMU JOB are allowed to have only one account each. This is to ensure the best possible experience and proper management of your information. Duplicate accounts will be removed automatically upon detection.</p>
                        <br />
                        <p className="font-bold">10. Follow the Law.</p>
                        <p>Users are personally responsible to ensure that they fulfil and comply with any existing regulations. This includes but is not limited to permits, employment passes and employment regulations. MMU JOB is a platform that does not support any illegal practices or businesses.</p>
                        <br />
                        <p className="font-bold">Community Guidelines for Employers:</p>
                        <br />
                        <p>MMU JOB is a full-fledged recruitment platform that makes it easy to hire junior to mid level talent. Our platform includes a job portal and headhunting service, which you can use separately or synergistically together as a hybrid solution.</p>
                        <br />
                        <p>The guidelines below will help you to optimise your hiring solutions as well as create a safe job searching experience for all:</p>
                        <br />
                        <p className="font-bold">1. Create an insightful, transparent and genuine Company Profile.</p>
                        <p>Your company profile gives candidates an insight into what it’s like working for your company by allowing them to have a closer look at your people, culture and work environment.</p>
                        <br />
                        <p className="font-bold">DO:</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Provide as much information about your company background and culture. Transparency gives candidates a sense of confidence and attracts like-minded candidates that are aligned to your company values.</li>
                            <li>Provide accurate information such as your nature of business, address, website, benefits etc.</li>
                            <li>Be honest about your company’s vision and mission.</li>
                            <li>Use updated photos of your company’s workspace.</li>
                        </ul>
                        <br />
                        <p className="font-bold">DO NOT:</p>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>Be dishonest about your office culture. Every company is different and if you are looking for the right candidate that matches your company, the key is to be accurate.</li>
                            <li>Use fake or copyrighted photos that do not belong to you.</li>
                            <li>Use your company profile as a platform to sell any of your products. MMU JOB is strictly a job advertisement platform only.</li>
                        </ul>
                        <br />
                        <p className="font-bold">2. Put up informative, accurate and frank job postings.</p>
                        <p>Job descriptions should be simple but concise, these help candidates understand the job and requirements easily. We highly encourage employers to fill up as much information as they can accurately such as job type, experience level, salary, job preference etc. This will also help serious candidates easily narrow down their search to the most relevant jobs.</p>
                        <br />
                        <p className="font-bold">3. Communicate in English.</p>
                        <p>MMU JOB uses English as its main language across its platforms to ensure clear communication between all parties. The use of other languages is accepted and welcomed, however all written information must also be presented in English alongside the chosen language. For example, a job description written in Malay must be accompanied by a version written in English.</p>
                        <br />
                        <p className="font-bold">4. Equal Opportunity Policy.</p>
                        <p>MMU JOB believes that one the foundations of a great company begin with equal access to employment opportunities for all individuals, irrespective of race, colour, gender or other criteria that appear to favour discrimination. All candidates should be treated equally and respectfully.</p>
                        <br />
                        <p>It is important to build teams that allow individuals to realise their full potential based on their aptitudes and merits, not their identity. As such, we have guidelines for all content featured on our platform, which are detailed within our <a href="/termsAndConditions" className="text-[#2471A3] font-medium underline underline-offset-2 hover:font-semibold "> Terms & Conditions</a>. We treat any breach of our policies or procedures seriously and will remove any content that does not comply with these guidelines.</p>
                        <br />
                        <p>MMU JOB strongly values the unique spirit of diversity and unity in Malaysia, believing that our differences should not be evaluated as part of employment decisions.</p>
                        <br />
                        <p className="font-bold">5. Please adhere to the privacy policy.</p>
                        <p>MMU JOB respects the privacy of individuals with regards to personal data and is committed to protecting the privacy of its users, and strives to provide a safe, secure user experience for both candidates and employers alike. This includes the management of any candidate information obtained from MMU JOB. Information viewed or obtained from MMU JOB may only be used for the purpose of hiring and employment of individuals. Commercial use or abuse of any information obtained from MMU JOB is strictly prohibited. Learn more about MMU JOB's privacy policy <a href="/policy" className="text-[#2471A3] font-medium underline underline-offset-2 hover:font-semibold ">here</a>.</p>
                        <br />
                        <p className="font-bold">6. Follow the law.</p>
                        <p>MMU JOB is an advertising platform for career opportunities and thus will do its best to not interfere in any hiring processes between candidates and employers. Employers are personally responsible to ensure that prospective candidates fulfil and comply with any existing regulations. This includes but is not limited to permits, employment passes and employment regulations. MMU JOB is a platform that will not support any illegal practices or businesses.</p>
                        <br />
                        <p className="font-bold">By using MMU JOB, you agree to our guidelines and <a href="/termsAndConditions" className="text-[#2471A3] font-medium underline underline-offset-2 hover:font-semibold "> Terms & Conditions</a>. We are committed to these guidelines and we hope you will adhere to them. Misconduct on MMU JOB may result in accounts being disabled or other restrictions.</p>
                        <br />
                        <p className="font-bold">Thank you for helping us create the best platform for job seekers and employers to find each other.</p>
                        <br />
                        <p className="pb-8">The MMU JOB team.</p>
                    
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}