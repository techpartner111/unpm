<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RplSection extends Model
{
    protected $fillable = [
        'type',
        'title',
        'content',
        'extra',
        'order'
    ];
}