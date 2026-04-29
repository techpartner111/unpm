<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        return response()->json(Video::first());
    }

    public function update(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:mp4,mov,avi|max:100000'
        ]);

        $video = Video::first();

        if (!$video) {
            $video = new Video();
        } else {
            // hapus video lama
            if ($video->file && Storage::disk('public')->exists($video->file)) {
                Storage::disk('public')->delete($video->file);
            }
        }

        $path = $request->file('file')->store('videos', 'public');

        $video->file = $path;
        $video->judul = "Video Profil";
        $video->save();

        return response()->json([
            'message' => 'Video berhasil diupdate',
            'data' => $video
        ]);
    }
}