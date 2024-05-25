<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 
        'job_title', 
        'job_level',
        'vacancy_count', 
        'employment_type',
        'job_location', 
        'salary', 
        'education_level', 
        'experience',
        'skills', 
        'specifications'
    ];

    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }
}