<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiayaRpl extends Model
{
    protected $table = 'biaya_rpl';

    protected $fillable = [
        'program_studi',
        'biaya_semester',
        'pkkmb',
        'bpi_gel_1',
        'bpi_gel_2',
        'bpi_gel_3'
    ];
}