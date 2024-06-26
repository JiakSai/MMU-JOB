<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Rating;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $userId = DB::table('users')->insertGetId([
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'name' => 'John Doe',
            'profilePic' =>'http://127.0.0.1:8000/images/User/user_example.jpg',
            'phoneNumber' => '0123456789',
            'gender' => 'Male',
            'nationality' => 'Malaysia',
            'state' => 'Selangor',
            'city' => 'Cyberjaya',
            'major' => 'Information Technology',
            'skills' => 'PHP, Laravel, MySQL, HTML, CSS, JavaScript, ReactJS',
            'resume' => 'http://127.0.0.1:8000/resume/1719339418_resumeresume_example.pdf',
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $educationID = DB::table('education')->insertGetId([
            'user_id' => $userId,
            'school' => 'Multimedia University',
            'degree' => 'Diploma in Information Technology',
            'startDate' => 'October 2022',
            'endDate' => 'November 2024',
            'grade' => '3.96',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $experienceID = DB::table('experiences')->insertGetId([
            'user_id' => $userId,
            'companyName' => 'Intel',
            'title' => 'IT Intern',
            'jobType' => 'Internship',
            'startDate' => 'July 2024',
            'endDate' => 'October 2024',
            'location' => 'Penang',
            'locationType'=> 'On-site',
            'description' => 'As an IT Intern at Intel, I was responsible for assisting the IT team in various tasks and projects. I gained hands-on experience in troubleshooting hardware and software issues, setting up and maintaining computer systems, and providing technical support to employees. I also had the opportunity to work on IT infrastructure projects and contribute to the development and implementation of new technologies. Overall, my internship at Intel provided me with valuable insights into the IT industry and helped me enhance my technical skills.',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $ratingID = DB::table('ratings')->insertGetId([
            'user_id' => $userId,
            'company_id' => 1,
            'rating' => 5,
            'employeeType' => 'Former Employee',
            'jobTitle' => 'IT Intern',
            'headline' => 'Great internship experience at Intel',
            'review' => 'I had a great experience working as an IT Intern at Intel. The company provided me with valuable opportunities to learn and grow in the IT industry. The team was supportive and I had the chance to work on interesting projects. I gained hands-on experience in troubleshooting hardware and software issues, setting up and maintaining computer systems, and providing technical support. Overall, my internship at Intel was a valuable learning experience and I highly recommend it.',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
