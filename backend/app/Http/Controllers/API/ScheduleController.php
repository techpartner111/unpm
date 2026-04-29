<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;


class ScheduleController extends Controller
{
    // GET
    public function index()
    {
        return response()->json(Schedule::all());
    }

    // STORE
    public function store(Request $request)
    {
        $request->validate([
            'gelombang' => 'required',
            'pendaftaran' => 'required',
            'jalur' => 'required|array',
        ]);

        $data = Schedule::create([
            'gelombang' => $request->gelombang,
            'pendaftaran' => $request->pendaftaran,
            'jalur' => $request->jalur, // langsung array
            'daftar' => $request->daftar
        ]);

        return response()->json([
            'message' => 'Berhasil tambah',
            'data' => $data
        ]);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);

        $schedule->update([
            'gelombang' => $request->gelombang,
            'pendaftaran' => $request->pendaftaran,
            'jalur' => $request->jalur,
            'daftar' => $request->daftar
        ]);

        return response()->json([
            'message' => 'Berhasil update'
        ]);
    }

    // DELETE
    public function destroy($id)
    {
        Schedule::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Berhasil hapus'
        ]);
    }
}