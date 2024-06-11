<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Rating extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'user_id',
        'company_id',
        'rating',
        'employeeType',
        'jobTitle',
        'headline',
        'review',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function company()
    {
        return $this->belongsTo('App\Models\Company');
    }
}
