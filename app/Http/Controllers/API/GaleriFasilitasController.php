<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GaleriFasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GaleriFasilitasController extends Controller
{
    // ================= GET BY FASILITAS =================
    public function index($fasilitas_id)
    {
        return GaleriFasilitas::where('fasilitas_id', $fasilitas_id)->latest()->get();
    }

    // ================= STORE =================
    public function store(Request $request)
    {
        $request->validate([
            'fasilitas_id' => 'required|exists:fasilitas,id',
            'gambar' => 'required|image|mimes:jpg,jpeg,png|max:20480'
        ]);

        $path = $request->file('gambar')->store('galeri-fasilitas', 'public');

        $data = GaleriFasilitas::create([
            'fasilitas_id' => $request->fasilitas_id,
            'gambar' => $path
        ]);

        return response()->json($data);
    }

    // ================= DELETE =================
    public function destroy($id)
    {
        $galeri = GaleriFasilitas::findOrFail($id);

        // hapus file
        if ($galeri->gambar && Storage::disk('public')->exists($galeri->gambar)) {
            Storage::disk('public')->delete($galeri->gambar);
        }

        $galeri->delete();

        return response()->json(['message' => 'Deleted']);
    }
}