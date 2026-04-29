<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'gelombang',
        'pendaftaran',
        'jalur',
        'daftar'
    ];

    protected $casts = [
        'jalur' => 'array' // ✅ otomatis jadi array di React
    ];
}
