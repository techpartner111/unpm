<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeasiswaSyarat extends Model
{
    protected $fillable = ['beasiswa_id', 'syarat'];

    public function beasiswa()
    {
        return $this->belongsTo(Beasiswa::class);
    }
}
