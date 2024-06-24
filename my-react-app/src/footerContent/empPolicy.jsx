import EmployerHeader from "../employer/employerHeader"
import EmployerFooter from "../employer/employerFooter"
import { RiInformationLine } from "react-icons/ri";

export default function EmpPolicy() {
    return(
        <>
        <EmployerHeader></EmployerHeader>
        <div className="mt-[100px] mb-[30px] mx-[120px]">
            <div className="mt-[100px] mb-[30px] mx-[120px]">
            <div className="flex flex-col">
                <div className="pb-6">
                    <h1 className="text-3xl font-bold pb-6">Privacy Policy</h1>
                    <div className="bg-pink-100 border border-pink-300 rounded-lg p-4 flex items-center space-x-2 ">
                        < RiInformationLine className="h-5 w-5 text-pink-500" />
                        <span className="text-pink-700"><i>Last updated on 2nd June 2024</i></span>
                    </div>
                </div>
                <div className="bg-white shadow-xl py-4 px-14 leading-6">
                    <p className="font-bold pt-8">Introduction</p>
                    <p className="pt-4">MMU JOB respects the privacy of individuals with regard to personal data and is committed to protecting the privacy of its users, and strives to provide a safe, secure user experience. MMU JOB places great importance and/or priority on data security and data protection.</p>
                    <br></br>
                    <p>Protecting personal rights is integral to MMU JOB’s corporate culture and built into MMU JOB’s services and products. Hence, MMU JOB continuously works to improve data security measures to protect you and your privacy. This Privacy Policy sets out our practices and policies with respect to your Personal Data (defined below) including its collection, purpose and disclosure (“Privacy Policy”), and this Privacy Policy also serves to give you notice pursuant to the Personal Data Protection Act 2010 and its regulations (collectively referred to as “PDPA”). </p>
                    <br></br>
                    <p>By continuing to access the Site, communicating with us, opting-in when presented with choices or voluntarily providing your personal data to us, you warrant that you are at least 18 years of age and expressly consent to our collection, storage, use and disclosure of your personal data as described in this Privacy Policy. We do not process any sensitive data and do not process personal data of children under 18 years of age. If you are using the Site on behalf of an entity, by using the Site you represent that you have the necessary rights and authority to agree the Privacy Policy on behalf of that entity.</p>
                    <p>Please refer to our Terms and Conditions (employers and jobseekers) which governs your use and access to our services when you access the Site. Our Terms and Conditions (employers and jobseekers) may be updated occasionally, and you should read and understand them which you shall be bound to by continuing to access the Site, providing your information or engaging in our services. </p>
                    <p>The Site may contain links to other sites or websites. However, please be aware that we, MMU JOB are not responsible for the content or privacy practices of such other sites or websites (including those of our subsidiaries). We distinguish these 3rd-party sites and websites by methods such as either opening them in a separate browser window or within a frame indicating the area within is not part of the Site. In these instances, our Privacy Policy herein will not apply. We encourage you to be aware when you leave the Site and to read the privacy statements of each and every website that you visit.</p>
                    <p>The following discloses MMU JOB’s information gathering and dissemination practices for the Site:</p>
                    <p className="font-bold">Types of Information Collected</p>
                    <p>In connection with your use of the Site, we ask for and may collect information from and about you in different ways and at different points on the Site. </p>
                    <br></br><br></br>                    
                    <p>The Personal Data (defined below) previously, being and/or that may be collected, obtained and/or received by us are from various sources, including from the following:</p>
                    <br></br>
                    <p>1. From you:</p>
                    <br></br>
                    <ul className="list-disc pl-[18px] space-y-2">
                        <li>First, in order to participate in the Site, you must sign up for an account on the relevant MMU JOB domains or sub-domains. When you join the Site,  we collect Personal Data including but not limited to your name, contact number, address (physical and email), general educational and professional background,  qualification histories, academic records, LinkedIn and all other public social media account links (if relevant), billing details ("<strong>Member Information</strong>") and all other personal data as defined in the PDPA (collectively referred to as “<strong>Personal Data</strong>”) was previously, is being and/or may be collected, held, obtained, received, stored and/or processed (as defined in the PDPA) by us or on our behalf. Second, to begin using the Site, you will be asked to register by opening a personal user account or a business account (as the case may be). Through the online registration form certain information, including job type, salary range, desired location of employment and your resume ("<strong>Registration Information</strong>") is collected. An asterisk indicates which information is mandatory in order to complete the registration process. Third, if you choose to submit information for a particular job posting, you may be asked to complete a more extensive employer-specific questionnaire (an "<strong>Employer Questionnaire</strong>") to provide additional information to fine-tune your qualifications and candidacy for that specific job posting ("<strong>Candidacy Information</strong>"). Your Membership Information, Registration Information and Candidacy Information are collectively referred to below as your "<strong>Employment Information.</strong>"</li>
                        <br></br><br></br>
                        <li>Additionally, we may collect Personal Data when you:</li>
                        <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                            <li>visit or use the Site;</li>
                            <li>make inquiries or provide us with your feedback;</li>
                            <li>subscribe to our newsletter; or</li>
                            <li>otherwise contact, communicate or otherwise deal with us whether in person, by phone, by email, by post or via any means to make enquiries, complaints, suggestions or provide information.</li>
                        </ol>
                        <li>We may also require you to provide signed consent (including via electronic signing or via call logger and/or recorder software for verbal consent recorded digitally) to enable us to collect Personal Data from you or third parties to process, store and disclose the Personal Data. Such consent should only be given after you have read and understood this Privacy Policy. </li>
                    </ul>
                    <br></br>
                    <p>1. From our authorized personnel / head-hunters / recruiters when/if you contact, communicate or otherwise deal with them.                    </p>
                    <br></br><br></br><br></br>
                    <p>1. From sources where such information is available or accessible to the public.</p>
                    <br></br><br></br><br></br>
                    <p>1. From sources which are obtained with your consent or legally purchased.</p>
                    <br></br>
                    <p>You do not have to give us any personal information in order to perform job searches or to read the content portions of the Site. However, we may collect the following general types of information about you when you visit the Site even if you choose to remain anonymous unless expressly stated otherwise: personal information, demographic information, behavioural information, and indirect information. Sometimes we collect combinations of all these types of information. In each case, it is indicated on the Site whether any personal or demographic data must be provided to use the requested service or not:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>Personal Information is information that can be used to identify you, or any other individual to whom the information may relate, personally. We do not collect personal information unless you choose to provide it to us as stated above.</li>
                        <li>Demographic Information is information that is not unique to you in the sense that it refers to selected population characteristics, such as your ZIP code or postal code, age, preferences, gender, race or ethnicity, occupation, career history, interests and favourites.</li>
                        <li>We also collect behavioural information regarding how you use the Site and mobile applications, the areas of the Site that you visit, what services you access, and information about your computer hardware and software including your IP address, geolocation, browser and operating system type, domain names, access times and referring website addresses. This information is necessary for analyzing the use of resources, troubleshooting problems, preventing fraud, and improving our services.</li>
                        <li>In addition, we may collect Indirect Information about you when you use certain third-party services on the Site and the collection of such information is considered necessary for that purpose.</li>
                    </ol>
                    <br></br><br></br><br></br>
                    <p>We do not collect sensitive personal data or confidential information such as the password of your email account; password of your MMU JOB account (as it is automatically encrypted and saved in the MMU JOB database when you create an account or register with MMU JOB and is not authorized for access by MMU JOB unless desired under any legal obligation); financial information such as Bank Account details or Credit Card or Debit Card or other payment related details; physical and mental or other health conditions or medical records and history; Biometric information such as fingerprints, voice & facial patterns and DNA or any other sensitive information which is confidential or sensitive by its nature.</p>
                    <br></br>
                    <p>We may personalize the advertising that you are shown on the Site with which we have a business relationship. In order to provide this personalization, in addition to information we collect about you on the Site, we acquire information (including personal, demographic, behavioural and indirect information) about you from third parties who provide it to us.</p>
                    <br></br>
                    <p>The provision of your Personal Data is voluntary. However, if you do not provide MMU JOB with your personal data, MMU JOB will not be able to process your Personal Data for the Purposes outlined below.</p>
                    <p className="font-bold">Purpose of Processing Personal Data</p>
                    <p>MMU JOB may process your personal Data for business and activities which shall include, but not limited to the following purposes (“<strong>Purposes</strong>”):</p>
                    <br></br><br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>To serve you (including but not to limited to providing our services),</li>
                        <li>To allow you to create an account; </li>
                        <li>To create a profile for you at the Site or other websites operated by our Affiliates based on information that you have provided to MMU JOB;</li>
                        <li>To inform you of other products or services available from MMU JOB or our Affiliates.</li>
                        <li>To better understand and analyse your needs and preferences, improve our services by conducting internal analysis, develop and provide services to meet your needs, and enhance your overall experience with our services and/or the Site.</li>
                        <li>To act on, process and/or respond to your complaints, inquiries, feedback, applications, interests or requests, and/or to otherwise contact/communicate with you.</li>
                        <li>To commence, proceed with or carry out any investigation, inquiry, recovery or other proceedings.</li>
                        <li>To provide information about you and your potential interest in job postings to employer customers.</li>
                        <li>To provide products and services to employer customers to complete the recruitment and hiring process, such as accessing the searchable resume database.</li>
                        <li>To provide products and services that enable users to network, post information on bulletin boards, view and compare profiles, and career background and experience.</li>
                        <li>To generate internal reports about the use of the Site; and to provide 'forward to a friend' features.</li>
                        <li>To create profiles and/or to carry out analysis, statistics, questionnaires, promotions and contests, market research and/or surveys to further develop our services and/or the Site and to provide the results thereof such as success stories and contest winners.</li>
                        <li>To contact you about the Site updates, informational and service-related communications, including newsletters, career advice and important security updates; however, out of respect for your privacy, we present to you the option to elect not to be informed of the updates.</li>
                        <li>To seek testimonials and your feedback on our services, which may be published on the Site and/or other digital and physical marketing collaterals.</li>
                        <li>To share your Employment Information with our Affiliate.</li>
                        <li>To utilise our Affiliate and third party service providers who perform functions on our behalf (including external consultants and professional advisers such as lawyers, auditors and accountants, technical support functions and IT consultants carrying out testing and development work on our IT systems) where we have an appropriate processing agreement (or similar protections) in place. These companies and individuals may be located in a country whose data protection legislation is different from your country, and they will have access to your Employment Information as necessary to perform their functions.</li>
                        <li>For our record keeping purposes.</li>
                        <li>To comply with the law and/or for such purpose as may be permitted by the law.</li>
                        <li>For such other purposes that are ancillary or incidental to the above.</li>
                    </ol>
                    <br></br>
                    <p>For the purposes of this paragraph, an “<strong>Affiliate</strong>” is a company or entity that is related to another company through ownership, control, or common ownership or control. Affiliates may include subsidiaries, parent companies, or other entities under the same ownership or control.                    </p>
                    <p>We only collect personal data we actually need for or directly related to our specific Purposes. To the extent that you access the Site or read or click on an email from us, we may also collect certain data automatically or through you providing it to us even if you choose to remain anonymous unless expressly stated otherwise, such as a browser cookie. If you do not supply us with your Personal Data that we describe as obligatory or mandatory, or if you limit such obligatory or mandatory Personal Data, then we may be unable to or be unable to continue to act on, respond to, process or proceed with your matter, or to provide you with our services.                     </p>
                    <p>The following discloses the purpose of processing Personal Data for each category of users:</p>
                    <br></br><br></br>
                    <p className="font-bold">FOR THE JOBSEEKER</p>
                    <br></br><br></br>
                    <p>Job Application: Once you have activated your personal user account, MMU JOB submits your Registration Information to the Site profiling engine to attempt to match your information with available job postings. Upon a match of your Registration Information with a job posting, MMU JOB will notify you via email if you have elected to receive such notifications. Upon reviewing a job posting, your Employment Information will be forwarded to that potential employer if you click on the "Apply" or "Submit" button, thereby instructing MMU JOB to forward the Employment Information to the potential employer. </p>
                    <br></br><br></br>
                    <p>Headhunting: If you have given consent, either verbally, via email, or through other means, the MMU JOB’s recruiters and/or headhunters will share your CV and other Employment Information with the employers registered with MMU JOB.</p>
                    <br></br><br></br>
                    <p>Talent Search or Resume Search: Through products like our searchable resume database and networking services, employers with a business account can access your personal information, including your CV, and may contact you. Your profile information may also be visible to other community members or employers using the Site. Additionally, portions of your searchable resume (excluding contact information) may be made public in your networking profile. Any information you post in public areas of the Site or place in the searchable resume database may be accessed, used, and stored by individuals worldwide, including those in countries without legislation guaranteeing adequate protection of personal information as per your country of residence. By providing your personal information for inclusion in our database, you acknowledge your consent to its use as described here.</p>
                    <br></br><br></br><br></br><br></br>
                    <p className="font-bold">FOR THE EMPLOYER</p>
                    <br></br><br></br>
                    <p>Once you have signed up for an account with MMU JOB or engaged MMU JOB’s services, the information you provided will be used to perform MMU JOB’s obligations in respect of any contract entered into with you, to facilitate and/or provide you with any service you have requested as envisaged under the Site  or based on the engagement that you have with MMU JOB and where relevant, to process your information to create your employer page with the Site for jobseekers to gain basic information about the employer.</p>
                    <br></br>
                    <p>The information is also used to validate payment made by the employer relating to services and products requested from the Site and to process cancellations and/or refunds for the services that have not been rendered to you, where applicable, subject to other specific terms and conditions for the services.                     </p>
                    <p className="font-bold">THIRD PARTIES</p>
                    <p>MMU JOB has contracted with a third party Application Service Provider (ASP) to implement and host the Site. Information collected from you and potential employers will be stored on the ASP's server and processed through its profiling engine. The ASP is not permitted to disclose your personally identifiable information to any third party without your consent.</p>
                    <br></br><br></br>
                    <p>Users who choose to sign up or log in via Single Sign-On (“<strong>SSO</strong>”) methods are subject to the terms and conditions of the respective SSO provider, and any data exchange or sharing will be governed by the policies of those providers. </p>
                    <br></br><br></br>
                    <p>When you opt to use SSO authentication, certain information from your SSO account may be accessed and utilised by our platform in accordance with our Privacy Policy. This may include but is not limited to your Employment Information, and other relevant information provided by the SSO provider.</p>
                    <br></br><br></br>
                    <p>By utilising SSO authentication, you consent to the exchange of information between our Site and the SSO provider for the purpose of authentication and account setup. You understand that this information exchange is necessary for the proper functioning of our services.</p>
                    <br></br><br></br>
                    <p>We take the security of your information seriously and implement appropriate measures to safeguard any data exchanged through SSO authentication. However, we cannot guarantee the security of information transmitted via the internet or through third-party systems, and you acknowledge and accept any associated risks.</p>
                    <p className="font-bold">Users' Consent to MMU JOB to Use the Information</p>
                    <p>By registering with MMU JOB, by managing your profile, or opting in when presented with choices, you have explicitly consented for us to use your information, subject to local law for the aforementioned Purposes. </p>
                    <br></br><br></br>
                    <p>While MMU JOB takes measures to safeguard your information from unauthorized access or inappropriate use by third parties, MMU JOB does not control these third parties and we are not responsible for their use of information you post or otherwise make available in public areas of the Site. Accordingly, you should ensure that you do not post sensitive information, including personality profiles, to the Site.</p>
                    <br></br><br></br>
                    <p className="font-bold">Use and Disclosure of the Information We Collect</p>
                    <p>MMU JOB cannot ensure that all of your private communications and other personal information will never be disclosed in ways not otherwise described in this Privacy Policy. Therefore, although we are committed to protecting your privacy, we do not promise, and you should not expect, that your personal information or private communications will always remain private. As a user of the Site, you understand and agree that you assume all responsibility and risk for your use of the Site, the internet generally, and the documents you post or access and for your conduct on and off in the Site.</p>
                    <br></br><br></br>
                    <p className="font-bold">REVOCATION OF CONSENT OR ACCESSING, LIMITING, CORRECTING AND UPDATING YOUR PERSONAL DATA</p>
                    <p>Subject to any exceptions under applicable laws of Malaysia, you are entitled:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>To request access to and to request correction of your Personal Data where your Personal Data is inaccurate, incomplete, misleading or not up-to-date.</li>
                        <li>To revoke or withdraw your consent to the processing of your Personal Data whether generally or for specific purposes.</li>
                        <li>To restrict or limit the processing of your Personal Data (including personal data relating to other persons who may be identified from that Personal Data).</li>
                        <li>To erase your Personal Data from all of our databases.</li>
                        <li>To opt-out of receiving direct marketing materials at any time by sending an email, selecting “unsubscribe” via email requesting to be removed from our mailing list or elect not to be informed of the updates.</li>
                    </ol>
                    <br></br>
                    <p>For any of the above, or if you have questions, concerns, inquiries, complaints or if you require any clarification regarding this Privacy Policy and/or your Personal Data, please contact us by:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>calling our telephone number: 603-0000 0000 or</li>
                        <li>emailing to us: mmujob1@email.com</li>
                    </ol>
                    <br></br><br></br>
                    <p>While you can ask for the deletion of your Personal Data in accordance with the PDPA and to contact us with any enquiries or complaints in respect of your Personal Data, we may or shall:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>charge a prescribed fee for processing your request for access or correction and shall respond within 21 days from the date of data access request; and</li>
                        <li>reserve the right to refuse your request to access and/or make any corrections to your personal data for legitimate reasons and for reasons permitted under the law, taking into account the administrative costs involved to process such request. If we refuse to comply with such request, we will inform you of our refusal and the reason for our refusal.</li>
                    </ol>
                    <br></br><br></br>
                    <p>Take note that once your data is erased, you may not be able to continue using our services or any benefits that we offer on the Site.</p>
                    <br></br><br></br><br></br>
                    <p className="font-bold">Transfer</p>
                    <br></br><br></br>
                    <p>We may transfer and/or store your Personal Data at a place outside Malaysia where it is necessary in the course of business for us to disclose and transfer the Personal Data to our Affiliates whose system are hosted outside Malaysia. However, please be assured that we take all reasonable precautions and measures to keep your Personal Data confidential and to protect and safeguard your Personal Data in accordance with the law. Your Personal Data is protected both online and off.</p>
                    <p>In the event your personal data is transferred outside Malaysia, we will take organisational and technical measures by transferring to those locations where the target location is compliant with data protection legislation or have the same or comparable data protection laws as Malaysia’s PDPA and by means of transfer which have adequate safeguards applied.</p>
                    <p>When you enter Personal Data in the Site, that information is encrypted and protected in transit with the TLS/SSL (Secure Sockets Layer) encryption protocol. While on all secured pages in the Site, there will be indicators shown within the address and/or status bars of the web browser such as padlock icons, which signifies that the HTTPS protocol is currently in use.</p>
                    <p className="font-bold">Disclosure of Information to Others</p>
                    <p>We may share, disclose and/or make available or accessible your Personal Data to the following persons/parties (within or outside Malaysia) for the aforementioned Purposes:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>To our officers (including directors) and employees, and to companies and entities within the MMU JOB group of companies (including our parent and subsidiary companies) and their respective officers and employees.</li>
                        <li>To employers who have posted job opportunities that may be of interest to you on the Site when you apply for those jobs.</li>
                        <li>To potential employers whereby your Employment Information is released only when you choose to do so, and your information is only released to the potential employer who posted the job to which you are responding. Once your Employment Information has been forwarded to a potential employer, all correspondences are directly between you and that potential employer. Employers have agreed not to disclose your Employment Information to third parties. As a user of the Site, you may restrict distribution of your Employment Information by indicating such restrictions in your account.</li>
                        <li>To third parties who help us in the delivery of our own products and services to you.</li>
                        <li>To our data processors, professional advisors, and/or service providers (including service providers carrying out our marketing activities, processing credit card payments, providing customer service, and/or surveys, and/or providing us with outsourced data storage).</li>
                        <li>To our Affiliates whose location may be based outside of Malaysia, authorized personnel, head hunters, recruiters.</li>
                        <li>To our insurers.</li>
                        <li>To the government and/or such authority, body, entity, court, tribunal, person or party that we are required in law to disclose to or if we believe in good faith that such action is necessary to: (a) conform to legal requirements or comply with legal process; (b) protect our rights or property or our affiliated companies; (c) prevent a crime or protect national security; or (d) protect the personal safety of users or the public.</li>
                        <li>To a third party who acquires any or all of MMU JOB's business units, whether such acquisition is by way of merger, consolidation or purchase of all or a substantial portion of our assets. In addition, in the event MMU JOB becomes the subject of a bankruptcy proceeding, whether voluntary or involuntary, MMU JOB or its liquidator, administrator, receiver or administrative receiver may sell, license or otherwise dispose of such information in a transaction approved by the court. You will be notified of the sale of all or a substantial portion of our business to a third party via e-mail or through a prominent notice posted on the Site.</li>
                        <li>To MMU JOB's clients, partners, other Site visitors, and other third parties regarding aggregated anonymous information about visitors to the Site so that they can understand the kinds of visitors to the Site and how those visitors use the Site in order to serve advertisements to you on the Site or other sites with which we have a business relationship. We may also aggregate on an anonymous basis data regarding job qualifications, schooling, age, experience level, or other information relevant to the job search or competition among job seekers for any such job. Such aggregated data does not identify users individually, and may be made available to employers or fellow job seekers or community members.</li>
                        <li>To other third parties if you consent to such disclosure.</li>
                        <ul className="list-disc pl-10 space-y-2">
                            <li>For example, if you make your resume searchable, then all parties with access to our searchable resume database (or copies thereof) will have access to your resume. If you indicate that you would like to receive information about the opportunities, products or services of third parties at the time you register for a MMU JOB account, we supply your contact information to third parties such as employers, recruiters, data aggregators, marketers or others for the purpose of sending you email or otherwise communicating with you)</li>
                            <li>For example, if you indicate that you would like to receive information about the opportunities, products or services of third parties at the time you register for a MMU JOB account, we supply your contact information to third parties such as employers, recruiters, data aggregators, marketers or others for the purpose of sending you email or otherwise communicating with you.</li>
                        </ul>
                    </ol>
                    <br></br>
                    <p className="font-bold">Use of Cookies</p>
                    <br></br><br></br>
                    <p>We use "cookies" to help personalize and maximize your online experience and time online. A cookie is a text file that is placed on your hard drive by a Web page server. Cookies are uniquely assigned to your computer, and can only be read by a Web server in the domain that issued the cookie to you.</p>
                    <br></br><br></br>
                    <p>One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize the Site pages, or register for services, a cookie helps us to recall your specific information (such as user name, password and preferences). Because of our use of cookies, we can deliver faster and more accurate results and a more personalized site experience. When you return to the Site, the information you previously provided can be retrieved, so you can easily use the features that you customized. We also use cookies to track click streams and for load balancing.</p>
                    <br></br><br></br>
                    <p>Most browsers automatically accept cookies, but you can usually modify your browser setting to decline all cookies if you prefer. Alternatively, you may be able to modify your browser setting to notify you each time a cookie is tendered and permit you to accept or decline cookies on an individual basis.</p>
                    <br></br><br></br>
                    <p className="font-bold">Third-party cookies and functions</p>
                    <br></br><br></br>
                    <p>The Site may use third-party vendors to serve or track advertisements on the Site and gather data on your interaction with the Site, including but not limited to activities such as viewing, clicking, bookmarking, and various other user engagements. Among other things, these third parties may use cookies, pixel tags and other technologies to enable such third parties to record which ads your browser has loaded and which pages you may have been interacting when the ads were delivered or accessed. The information collected through these functions is subject to the privacy policies of those third parties.</p>
                    <p className="font-bold">EMBEDDED URLS</p>
                    <p>The Site and the ASP may use a tracking technique that employs embedded URLs to allow use of the Site without cookies. Embedded URLs allow limited information to follow you as you navigate the Site, but is not associated with personal information and is not used beyond the session.</p>
                    <p className="font-bold">EMBEDDED PIXELS</p>
                    <p>The Site and the ASP may use embedded pixel technologies on selected pages for the purposes of identifying unique user visits to the Site, as opposed to aggregate hits, and to identify the pages you have interacted with. We may also use embedded pixel technologies to determine whether the recipient of an email has opened a particular message. The information provided by these technologies may be re-associated with personal information by the Site.</p>
                    <p className="font-bold">RETENTION OF PERSONAL DATA</p>
                    <p>We take the responsibility of the management and security of your Personal Data. We follow the following key principles of data protection, which require the Personal Data to be:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>Processed lawfully, fairly and in a transparent manner.</li>
                        <li>Collected for specified and legitimate purposes.</li>
                        <li>Adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed.</li>
                        <li>Accurate and kept up to date, taking every reasonable step to ensure that Personal Data that are inaccurate are processed, erased, or rectified without unreasonable delay.</li>
                        <li>Kept for no longer than is necessary for the purposes for which the Personal Data are processed.</li>
                        <li>Processed in a manner that ensures appropriate security of the Personal Data, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage, using appropriate technical or organizational measures.</li>
                    </ol>
                    <br></br><br></br><br></br>
                    <p>However, relevant Personal Data may be retained subject to the conditions below:</p>
                    <br></br>
                    <ol style={{ listStyleType: 'decimal' }} className="pl-10">
                        <li>as and when required under any applicable laws or legislation of Malaysia;</li>
                        <li>where legal actions have arisen and are pending; and</li>
                        <li>for commercial and/or operational purposes of MMU JOB.</li>
                    </ol>
                    <br></br>
                    <p>In order to protect your personal data against accidental, unlawful or unauthorised access, MMU JOB acting as a data user/controller and data processor, will implement appropriate technical or organisational measures to protect the confidentiality and security of the personal data that we collect and process which may include but not limited to the following:</p>
                    <br></br>
                    <ul className="list-disc pl-10 space-y-2">
                        <li>Where applicable, online credit card transactions are protected during transit using secured encryption;</li>
                        <li>Personal Data stored on the Site using third party cloud services are in encrypted form; and</li>
                        <li>Personal Data and/or signed consent forms kept physically are treated with strict procedures and means.</li>
                    </ul>
                    <br></br>
                    <p>MMU JOB shall take all reasonable steps to ensure that all Personal Data and sensitive personal data is destroyed or permanently deleted when no longer required for the above-mentioned Purposes.</p>
                    <p className="font-bold">DISCLAIMER</p>
                    <p>Where you furnish or supply us with Personal Data you are deemed to have understood, agreed and consented to the collection, holding, obtaining, receipt, storage, processing and/or use of your Personal Data as set out in this Privacy Policy, and where you furnish or supply us with Personal Data that relates to any other individual, we assume that you have procured the said individual’s agreement and consent for the collection, holding, obtaining, receipt, storage, processing and/or use of the said individual’s Personal Data as set out in this Privacy Policy.</p>
                    <p>If you revoke your consent for us to process your Personal Data, we may be unable to continue providing our services to you at the same or expected level of service. We will inform you of the likely consequences of such withdrawal of consent when we receive your notice of revocation of consent.</p>
                    <p>We reserve the right at any time and from time to time to amend our Privacy Policy. We will post our latest Privacy Policy (as amended) on the Site. Please view our Privacy Policy on the Site from time to time for our current/latest Privacy Policy.</p>
                    <p className="pb-8">In accordance with Section 7(3) of the PDPA, this Privacy Policy is issued in both English and Bahasa Malaysia. In the event of any discrepancies or inconsistencies arising between the English and Malay versions, the English version shall apply and prevail.</p>
                </div>
                </div>
            </div>


        </div>
        <EmployerFooter></EmployerFooter>
        </>
    );
}