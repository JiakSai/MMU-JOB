<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class EmploymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $employerId = DB::table('employers')->insertGetId([
            'email' => 'employer@example.com',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $companyId = DB::table('companies')->insertGetId([
            'employer_id' => $employerId,
            'name' => 'Intel',
            'website'=> 'https://www.intel.com/content/www/us/en/jobs/life-at-intel.html',
            'description' => 'Intel Corporation (NASDAQ:INTC) expands the boundaries of technology to make the most amazing experiences possible. You may know us for our processors, but we do so much more. From powering the latest devices and the cloud you depend on, to driving policy, diversity, sustainability and education, we create value for our stockholders, customers and society. Intel Corporation chose Penang, Malaysia as its first offshore location outside of the United States in 1972. Intel’s initial investment in Malaysia has grown significantly since then and as a result, Malaysia’s operations has further expanded to Kulim, Kedah in 1996, becoming one of Intel’s most comprehensive sites.',
            'logo'=>'http://127.0.0.1:8000/images/company/intel_logo.jpg',
            'cover'=>'http://127.0.0.1:8000/images/company/intel_cover.jpg',
            'category'=>'IT & Telecommunication',
            'companySize'=>'More than 10,000 employees',
            'location'=>'Penang',
            'benefits'=> 'Medical, Miscellaneous allowance, Education support, Dental, Sports (e.g. Gym), Parking, Vision, Meal subsidy, Daily free fruits, Mother room and more!',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $post = [
            [
                'jobTitle' => 'Software Engineer',
                'jobType' => 'Full-Time',
                'jobCategory' => 'Information Technology',
                'minSalary' => 5000,
                'maxSalary' => 10000,
                'description' => 'We are looking for a Software Engineer to join our team! As a Software Engineer, you will be responsible for developing and maintaining software applications. Your duties will include working with other developers to write code, perform code reviews, and testing applications. You will also be responsible for fixing any bugs or issues that arise during the development process.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Bachelor\'s degree in Computer Science or related field and 1 to 3 Years of Experience',
                'educationLevel' => 'Bachelor\'s degree',
                'experience' => '1 to 3 Years of Experience',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Data Analyst',
                'jobType' => 'Full-Time',
                'jobCategory' => 'Information Technology',
                'minSalary' => 4000,
                'maxSalary' => 8000,
                'description' => 'We are looking for a Data Analyst to join our team! As a Data Analyst, you will be responsible for analyzing data and providing insights to help drive business decisions. Your duties will include collecting and analyzing data, creating reports and visualizations, and presenting findings to stakeholders. You will also be responsible for identifying trends and patterns in data to help inform business strategy.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Bachelor\'s degree in Statistics, Mathematics, or related field and Fresh Graduate',
                'educationLevel' => 'Bachelor\'s degree',
                'experience' => 'Fresh Graduate',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Network Engineer',
                'jobType' => 'Full-Time',
                'jobCategory' => 'Information Technology',
                'minSalary' => 6000,
                'maxSalary' => 12000,
                'description' => 'We are looking for a Network Engineer to join our team! As a Network Engineer, you will be responsible for designing, implementing, and maintaining network infrastructure. Your duties will include configuring network devices, monitoring network performance, and troubleshooting network issues. You will also be responsible for ensuring network security and compliance with industry standards.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Bachelor\'s degree in Computer Science, Information Technology, or related field and 4 to 7 Years of Experience',
                'educationLevel' => 'Master\'s degree',
                'experience' => '4 to 7 Years of Experience',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'UX Designer',
                'jobType' => 'Full-Time',
                'jobCategory' => 'Creative',
                'minSalary' => 4000,
                'maxSalary' => 8000,
                'description' => 'We are looking for a UX Designer to join our team! As a UX Designer, you will be responsible for creating user-centered design solutions that meet user needs and business goals. Your duties will include conducting user research, creating wireframes and prototypes, and testing designs with users. You will also be responsible for collaborating with other designers, developers, and stakeholders to create a cohesive user experience.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Bachelor\'s degree in Design, Human-Computer Interaction, or related field and 8 to 10 Years of Experience',
                'educationLevel'=> 'Bachelor\'s degree',
                'experience' => '8 to 10 Years of Experience',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Product Manager',
                'jobType' => 'Full-Time',
                'jobCategory' => 'Product Management',
                'minSalary' => 8000,
                'maxSalary' => 15000,
                'description' => 'We are looking for a Product Manager to join our team! As a Product Manager, you will be responsible for defining and executing the product strategy. Your duties will include conducting market research, defining product requirements, and working with cross-functional teams to bring products to market. You will also be responsible for analyzing product performance and making data-driven decisions to drive product growth.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Bachelor\'s degree in Business, Marketing, or related field and Over 10 Years of Experience',
                'educationLevel' => 'Bachelor\'s degree',
                'experience' => 'Over 10 Years of Experience',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Software Engineering Intern',
                'jobType' => 'Internship',
                'jobCategory' => 'Information Technology',
                'minSalary' => 1000,
                'maxSalary' => 2000,
                'description' => 'We are seeking a Software Engineering Intern to join our team! As an intern, you will have the opportunity to gain hands-on experience in software development. Your responsibilities will include assisting with coding tasks, participating in code reviews, and collaborating with the development team. This internship is a great opportunity to enhance your skills and contribute to real-world projects.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Minimum pursuing a diploma in Computer Science or related field and No prior experience required',
                'experience' => 'Intern',
                'educationLevel' => 'Diploma',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Data Analyst Intern',
                'jobType' => 'Internship',
                'jobCategory' => 'Information Technology',
                'minSalary' => 800,
                'maxSalary' => 1500,
                'description' => 'We are seeking a Data Analyst Intern to join our team! As an intern, you will have the opportunity to learn and apply data analysis techniques. Your responsibilities will include collecting and analyzing data, creating reports, and assisting with data-driven decision-making. This internship is a great opportunity to develop your analytical skills and gain practical experience in the field of data analysis.',
                'jobLocation' => 'Penang',
                'locationType' => 'On-site',
                'requirement' => 'Minimum pursuing a diploma in Statistics, Mathematics, or related field and Intern',
                'experience' => 'Intern',
                'educationLevel' => 'Diploma',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Frontend Developer (Part-Time)',
                'jobType' => 'Part-Time',
                'jobCategory' => 'Information Technology',
                'minSalary' => 20,
                'maxSalary' => 30,
                'description' => 'We are looking for a Frontend Developer to join our team on a part-time basis! As a part-time Frontend Developer, you will be responsible for developing and maintaining the user interface of our web applications. Your duties will include implementing designs, writing clean and efficient code, and collaborating with the development team. This position is ideal for students or individuals looking to gain experience while pursuing other commitments.',
                'jobLocation' => 'Penang',
                'locationType' => 'Remote',
                'requirement' => 'Minimun have a professional qualification in Computer Science or related field and 1 to 3 Years of Experience',
                'experience' => '1 to 3 Years of Experience',
                'educationLevel' => 'Professional qualification',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'jobTitle' => 'Marketing Intern (Part-Time)',
                'jobType' => 'Part-Time',
                'jobCategory' => 'Marketing & Communications',
                'minSalary' => 15,
                'maxSalary' => 25,
                'description' => 'We are seeking a Marketing Intern to join our team on a part-time basis! As a part-time Marketing Intern, you will have the opportunity to assist with various marketing activities. Your responsibilities will include conducting market research, creating content for social media, and assisting with marketing campaigns. This position is ideal for students or individuals looking to gain practical experience in the field of marketing.',
                'jobLocation' => 'Penang',
                'locationType' => 'Hybrid',
                'requirement' => 'Minimun have a professional qualification in Marketing, Business, or related field and Intern',
                'experience' => 'Intern',
                'educationLevel' => 'Professional qualification',
                'company_id' => $companyId,
                'employer_id' => $employerId,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];

        DB::table('posts')->insert($post);
    }
}
