<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriFasilitas extends Model
{
    protected $table = 'galeri_fasilitas';

    protected $fillable = [
        'fasilitas_id',
        'gambar'
    ];

    public function getGambarAttribute($value)
{
    return asset('storage/' . $value);
}

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}
