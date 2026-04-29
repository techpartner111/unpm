<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // ✅ WAJIB
use App\Models\ScheduleImage;
use Illuminate\Http\Request;

class ScheduleImageController extends Controller
{
    // GET (ambil gambar)
    public function index()
    {
        $image = ScheduleImage::first();

        return response()->json([
            'image' => $image ? asset('storage/' . $image->image) : null
        ]);
    }

    // POST/PUT (upload / update gambar)
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $file = $request->file('image')->store('jadwal', 'public');

        $data = ScheduleImage::first();

        if ($data) {
            // ❗ hapus file lama (best practice)
            if ($data->image && file_exists(storage_path('app/public/' . $data->image))) {
                unlink(storage_path('app/public/' . $data->image));
            }

            $data->update(['image' => $file]);
        } else {
            ScheduleImage::create(['image' => $file]);
        }

        return response()->json([
            'message' => 'Image saved',
            'image' => asset('storage/' . $file)
        ]);
    }
}