<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSliderController extends Controller
{
    // 🔹 GET semua data
    public function index()
    {
        $sliders = HeroSlider::all();
        return response()->json($sliders);
    }

    // 🔹 GET data aktif saja (optional kalau mau tetap dipakai)
    public function active()
    {
        $sliders = HeroSlider::where('is_active', 1)->get();
        return response()->json($sliders);
    }

    // 🔹 CREATE data


public function store(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpg,jpeg,png|max:10240',
        'is_active' => 'required|boolean',
    ]);

    $path = $request->file('image')->store('hero_sliders', 'public');

    $slider = HeroSlider::create([
        'image' => $path,
        'is_active' => $request->is_active,
    ]);

    return response()->json($slider);
}

    // 🔹 GET detail by ID
    public function show($id)
    {
        $slider = HeroSlider::find($id);

        if (!$slider) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($slider);
    }

    // 🔹 UPDATE data
public function update(Request $request, $id)
{
    $slider = HeroSlider::findOrFail($id);

    if ($request->hasFile('image')) {
        // hapus lama
        if ($slider->image) {
            Storage::disk('public')->delete($slider->image);
        }

        $path = $request->file('image')->store('hero_sliders', 'public');
        $slider->image = $path;
    }

    $slider->is_active = $request->is_active;
    $slider->save();

    return response()->json($slider);
}

    // 🔹 DELETE data
    public function destroy($id)
    {
        $slider = HeroSlider::find($id);

        if (!$slider) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $slider->delete();

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}