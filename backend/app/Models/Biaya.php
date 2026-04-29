<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Biaya extends Model
{
    protected $fillable = [
        'prodi',
        'per_bulan',
        'per_semester',
        'bpi',
        'pkkmb',
        'daftar_ulang_a',
        'daftar_ulang_b'
    ];
}