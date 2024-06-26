<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profilePic',
        'phoneNumber',
        'gender',
        'nationality',
        'state',
        'city',
        'major',
        'skills',
        'resume',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function education()
    {
        return $this->hasMany('App\Models\Education');
    }

    public function experience()
    {
        return $this->hasMany('App\Models\Experience');
    }

    public function applications()
    {
        return $this->hasMany('App\Models\Application');
    }

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating');
    }
}
