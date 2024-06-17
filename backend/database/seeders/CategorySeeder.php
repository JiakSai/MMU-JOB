<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            'Accounting / Finance',
            'Admin / Human Resources',
            'Building / Construction',
            'Creative',
            'Customer Service',
            'Education / Training',
            'Engineering',
            'Financial Services & Banking',
            'Healthcare',
            'Information Technology',
            'Legal',
            'Manufacturing',
            'Marketing & Communications',
            'Product Management',
            'Project Management',
            'Sales',
            'Sciences',
            'Supply Chain & Logistics',
            'Others'
           
        ];

        foreach ($categories as $category) {
            DB::table('job_categories')->insert([
                'name' => $category
            ]);
        }
    }
}
