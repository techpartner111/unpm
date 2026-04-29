<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Beasiswa;
use Illuminate\Support\Facades\Storage;

class BeasiswaApiController extends Controller
{
    // ✅ GET /beasiswas
    public function index()
    {
        $data = Beasiswa::latest()->get();

        // Tambahin URL gambar biar bisa dipakai di React
        $data->map(function ($item) {
            $item->gambar = $item->gambar 
                ? asset('storage/' . $item->gambar) 
                : null;
            return $item;
        });

        return response()->json($data);
    }

    // ✅ POST /beasiswas
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'slug' => 'required',
            'deskripsi' => 'nullable',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:20480',
        ]);

        $gambarPath = null;

        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('beasiswa', 'public');
        }

        $data = Beasiswa::create([
            'nama' => $request->nama,
            'slug' => $request->slug,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $data
        ]);
    }

    // ✅ GET /beasiswas/{id}
    public function show($id)
    {
        $data = Beasiswa::findOrFail($id);

        if ($data->gambar) {
            $data->gambar = asset('storage/' . $data->gambar);
        }

        return response()->json($data);
    }

    // ✅ PUT /beasiswas/{id}
    public function update(Request $request, $id)
    {
        $data = Beasiswa::findOrFail($id);

        $request->validate([
            'nama' => 'required',
            'slug' => 'required',
            'deskripsi' => 'nullable',
            'gambar' => 'nullable|image|mimes:jpg,jpeg,png|max:20480',
        ]);

        // upload gambar baru
        if ($request->hasFile('gambar')) {

            // hapus gambar lama
            if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
                Storage::disk('public')->delete($data->gambar);
            }

            $data->gambar = $request->file('gambar')->store('beasiswa', 'public');
        }

        $data->update([
            'nama' => $request->nama,
            'slug' => $request->slug,
            'deskripsi' => $request->deskripsi,
        ]);

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $data
        ]);
    }

    // ✅ DELETE /beasiswas/{id}
    public function destroy($id)
    {
        $data = Beasiswa::findOrFail($id);

        // hapus gambar
        if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
            Storage::disk('public')->delete($data->gambar);
        }

        $data->delete();

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}