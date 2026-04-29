<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fasilitas extends Model
{
    protected $fillable = [
    'nama',
    'deskripsi',
    'thumbnail',
    'slug'
];
public function galeri()
{
    return $this->hasMany(GaleriFasilitas::class);
}
}
