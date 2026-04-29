<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brosur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrosurController extends Controller
{
    // ambil semua brosur
    public function index()
    {
        return response()->json(Brosur::latest()->get());
    }

    // upload brosur
public function store(Request $request)
{
    $request->validate([
        'file' => 'required|file|max:51200', // 🔥 sementara bebas dulu
    ]);

    $file = $request->file('file');

    $filePath = $file->store('brosur', 'public');

    $brosur = Brosur::create([
        'file' => $filePath,
        'image' => $filePath, // kalau gambar → tampil, kalau pdf → fallback
        'judul' => $request->judul
    ]);

    return response()->json([
        'message' => 'Brosur berhasil ditambahkan',
        'data' => $brosur
    ]);
}

    // delete brosur
    public function destroy($id)
    {
        $brosur = Brosur::findOrFail($id);

        if (Storage::disk('public')->exists($brosur->file)) {
            Storage::disk('public')->delete($brosur->file);
        }

        if ($brosur->image && Storage::disk('public')->exists($brosur->image)) {
            Storage::disk('public')->delete($brosur->image);
        }

        $brosur->delete();

        return response()->json(['message' => 'Brosur dihapus']);
    }
}