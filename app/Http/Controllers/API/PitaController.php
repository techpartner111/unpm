<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PitaController extends Controller
{
    public function index()
    {
        return response()->json(Pita::first());
    }

    public function update(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $pita = Pita::first();

        // kalau belum ada, buat baru
        if (!$pita) {
            $pita = new Pita();
        } else {
            // hapus gambar lama
            if ($pita->image && Storage::disk('public')->exists($pita->image)) {
                Storage::disk('public')->delete($pita->image);
            }
        }

        // upload gambar baru
        $path = $request->file('image')->store('pita', 'public');

        $pita->image = $path;
        $pita->save();

        return response()->json([
            'message' => 'Pita berhasil diupdate',
            'data' => $pita
        ]);
    }
}