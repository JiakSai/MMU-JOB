<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'employer_id', 
        'jobTitle', 
        'jobType',
        'jobCategory',
        'salary', 
        'jobLocation', 
        'locationType',
        'experience',
        'requirement', 
        'description'
    ];

    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }

    public function employer()
    {
        return $this->belongsTo('App\Models\Employer');
    }
}