<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes;

    protected $fillable = ['email', 'password'];

    protected $appends = ['role'];

    public function getRoleAttribute(){
        return 'admin';
    }

}
