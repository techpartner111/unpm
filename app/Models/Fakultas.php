<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fakultas extends Model
{
    protected $fillable = ['nama', 'jenjang_id'];

    public function prodis()
    {
        return $this->hasMany(Prodi::class);
    }

    public function jenjang()
    {
        return $this->belongsTo(Jenjang::class);
    }
}
