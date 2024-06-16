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
            'description' => 'Intel Corporation (NASDAQ:INTC) expands the boundaries of technology to make the most amazing experiences possible. You may know us for our processors, but we do so much more. From powering the latest devices and the cloud you depend on, to driving policy, diversity, sustainability and education, we create value for our stockholders, customers and society.
Intel Corporation chose Penang, Malaysia as its first offshore location outside of the United States in 1972. Intel’s initial investment in Malaysia has grown significantly since then and as a result, Malaysia’s operations has further expanded to Kulim, Kedah in 1996, becoming one of Intel’s most comprehensive sites.',
            'logo'=>'http://127.0.0.1:8000/images/company/intel_logo.jpg',
            'cover'=>'http://127.0.0.1:8000/images/company/intel_cover.jpg',
            'category'=>'IT & Telecommunication',
            'companySize'=>'More than 10,000 employees',
            'location'=>'Penang, Malaysia',
            'benefits'=> 'Medical, Miscellaneous allowance, Education support, Dental, Sports (e.g. Gym), Parking, Vision, Meal subsidy, Daily free fruits, Mother room and more!',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $post = [
            ['jobTitle' => 'Software Engineer', 'jobType' => 'Full Time', 'jobCategory' => 'IT', 'salary' => 'RM 5,000 - RM 10,000', 'description' => 'We are looking for a Software Engineer to join our team! As a Software Engineer, you will be responsible for developing and maintaining software applications. Your duties will include working with other developers to write code, perform code reviews, and testing applications. You will also be responsible for fixing any bugs or issues that arise during the development process.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Bachelor\'s degree in Computer Science or related field', 'experience' => '2+ years of software development experience', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Data Analyst', 'jobType' => 'Full Time', 'jobCategory' => 'IT', 'salary' => 'RM 4,000 - RM 8,000', 'description' => 'We are looking for a Data Analyst to join our team! As a Data Analyst, you will be responsible for analyzing data and providing insights to help drive business decisions. Your duties will include collecting and analyzing data, creating reports and visualizations, and presenting findings to stakeholders. You will also be responsible for identifying trends and patterns in data to help inform business strategy.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Bachelor\'s degree in Statistics, Mathematics, or related field', 'experience' => '1+ years of data analysis experience', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Network Engineer', 'jobType' => 'Full Time', 'jobCategory' => 'IT', 'salary' => 'RM 6,000 - RM 12,000', 'description' => 'We are looking for a Network Engineer to join our team! As a Network Engineer, you will be responsible for designing, implementing, and maintaining network infrastructure. Your duties will include configuring network devices, monitoring network performance, and troubleshooting network issues. You will also be responsible for ensuring network security and compliance with industry standards.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Bachelor\'s degree in Computer Science, Information Technology, or related field', 'experience' => '3+ years of network engineering experience', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'UX Designer', 'jobType' => 'Full Time', 'jobCategory' => 'Design', 'salary' => 'RM 4,000 - RM 8,000', 'description' => 'We are looking for a UX Designer to join our team! As a UX Designer, you will be responsible for creating user-centered design solutions that meet user needs and business goals. Your duties will include conducting user research, creating wireframes and prototypes, and testing designs with users. You will also be responsible for collaborating with other designers, developers, and stakeholders to create a cohesive user experience.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Bachelor\'s degree in Design, Human-Computer Interaction, or related field', 'experience' => '2+ years of UX design experience', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Product Manager', 'jobType' => 'Full Time', 'jobCategory' => 'Business', 'salary' => 'RM 8,000 - RM 15,000', 'description' => 'We are looking for a Product Manager to join our team! As a Product Manager, you will be responsible for defining and executing the product strategy. Your duties will include conducting market research, defining product requirements, and working with cross-functional teams to bring products to market. You will also be responsible for analyzing product performance and making data-driven decisions to drive product growth.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Bachelor\'s degree in Business, Marketing, or related field', 'experience' => '5+ years of product management experience', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Software Engineering Intern', 'jobType' => 'Internship', 'jobCategory' => 'IT', 'salary' => 'RM 1,000 - RM 2,000', 'description' => 'We are seeking a Software Engineering Intern to join our team! As an intern, you will have the opportunity to gain hands-on experience in software development. Your responsibilities will include assisting with coding tasks, participating in code reviews, and collaborating with the development team. This internship is a great opportunity to enhance your skills and contribute to real-world projects.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Currently pursuing a degree in Computer Science or related field', 'experience' => 'No prior experience required', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Data Analyst Intern', 'jobType' => 'Internship', 'jobCategory' => 'IT', 'salary' => 'RM 800 - RM 1,500', 'description' => 'We are seeking a Data Analyst Intern to join our team! As an intern, you will have the opportunity to learn and apply data analysis techniques. Your responsibilities will include collecting and analyzing data, creating reports, and assisting with data-driven decision-making. This internship is a great opportunity to develop your analytical skills and gain practical experience in the field of data analysis.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'On-site', 'requirement' => 'Currently pursuing a degree in Statistics, Mathematics, or related field', 'experience' => 'No prior experience required', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Frontend Developer (Part-Time)', 'jobType' => 'Part-Time', 'jobCategory' => 'IT', 'salary' => 'RM 20 - RM 30 per hour', 'description' => 'We are looking for a Frontend Developer to join our team on a part-time basis! As a part-time Frontend Developer, you will be responsible for developing and maintaining the user interface of our web applications. Your duties will include implementing designs, writing clean and efficient code, and collaborating with the development team. This position is ideal for students or individuals looking to gain experience while pursuing other commitments.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'Remote', 'requirement' => 'Currently pursuing a degree in Computer Science or related field', 'experience' => 'No prior experience required', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['jobTitle' => 'Marketing Intern (Part-Time)', 'jobType' => 'Part-Time', 'jobCategory' => 'Marketing', 'salary' => 'RM 15 - RM 25 per hour', 'description' => 'We are seeking a Marketing Intern to join our team on a part-time basis! As a part-time Marketing Intern, you will have the opportunity to assist with various marketing activities. Your responsibilities will include conducting market research, creating content for social media, and assisting with marketing campaigns. This position is ideal for students or individuals looking to gain practical experience in the field of marketing.', 'jobLocation' => 'Penang, Malaysia', 'locationType' => 'Hybrid', 'requirement' => 'Currently pursuing a degree in Marketing, Business, or related field', 'experience' => 'No prior experience required', 'company_id' => $companyId, 'employer_id'=>$employerId, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        DB::table('posts')->insert($post);
    }
}
