<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Beasiswa;

class BeasiswaController extends Controller
{
    // GET list
    public function index()
    {
        $data = Beasiswa::all()->map(function ($item) {
            return [
                'id' => $item->slug,
                'nama' => $item->nama,
                'gambar' => $item->gambar ? asset('storage/' . $item->gambar) : null,
            ];
        });

        return response()->json($data);
    }

    // GET detail
    public function show($slug)
    {
        $beasiswa = Beasiswa::with(['manfaats', 'syarats'])
            ->where('slug', $slug)
            ->first();

        if (!$beasiswa) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json([
            'nama' => $beasiswa->nama,
            'gambar' => $beasiswa->gambar ? asset('storage/' . $beasiswa->gambar) : null,
            'deskripsi' => $beasiswa->deskripsi,
            'manfaat' => $beasiswa->manfaats->pluck('manfaat'),
            'syarat' => $beasiswa->syarats->pluck('syarat'),
        ]);
    }
}
