<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    // GET semua fasilitas
    public function index()
    {
        return Fasilitas::all();
    }

    // GET detail + galeri
    public function show($slug)
    {
        return Fasilitas::with('galeri')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    // POST
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'deskripsi' => 'required',
            'slug' => 'required|unique:fasilitas',
        ]);

        return Fasilitas::create($request->all());
    }

    // DELETE
    public function destroy($id)
    {
        Fasilitas::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}