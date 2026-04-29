<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeasiswaManfaat extends Model
{
    protected $fillable = ['beasiswa_id', 'manfaat'];

    public function beasiswa()
    {
        return $this->belongsTo(Beasiswa::class);
    }
}
