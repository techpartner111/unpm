<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beasiswa extends Model
{
    protected $fillable = ['nama', 'slug', 'deskripsi', 'gambar'];

    public function manfaats()
    {
        return $this->hasMany(BeasiswaManfaat::class);
    }

    public function syarats()
    {
        return $this->hasMany(BeasiswaSyarat::class);
    }
}
