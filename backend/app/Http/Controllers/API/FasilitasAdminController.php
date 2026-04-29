<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fasilitas;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FasilitasAdminController extends Controller
{
    public function index()
    {
        return Fasilitas::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'deskripsi' => 'required',
            'thumbnail' => 'image|mimes:jpg,png,jpeg|max:20480'
        ]);

        $thumbnail = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store('fasilitas', 'public');
        }

        $data = Fasilitas::create([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'thumbnail' => $thumbnail,
            'slug' => Str::slug($request->nama)
        ]);

        return response()->json($data);
    }

    public function show($id)
    {
        return Fasilitas::where('slug', $id)->first();
    }

    public function update(Request $request, $id)
    {
        $fasilitas = Fasilitas::findOrFail($id);

        $request->validate([
            'nama' => 'required',
            'deskripsi' => 'required'
        ]);

        if ($request->hasFile('thumbnail')) {
            $fasilitas->thumbnail = $request->file('thumbnail')->store('fasilitas', 'public');
        }

        $fasilitas->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'slug' => Str::slug($request->nama)
        ]);

        return response()->json($fasilitas);
    }

    public function destroy($id)
    {
        Fasilitas::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}