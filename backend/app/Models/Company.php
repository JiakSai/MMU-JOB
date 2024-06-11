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

}