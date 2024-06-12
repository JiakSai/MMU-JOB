<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Company extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'employer_id',
        'name',
        'logo',
        'category',
        'location',
        'companySize',
        'description',
        'benefits',
        'website',
        'cover'
    ];

    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating');
    }

}
