<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jenjang extends Model
{
    protected $fillable = ['nama'];

    public function fakultas()
    {
        return $this->hasMany(Fakultas::class);
    }
}
