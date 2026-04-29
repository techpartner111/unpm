<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BeasiswaSyarat;
use Illuminate\Http\Request;

class BeasiswaSyaratController extends Controller
{
    public function index()
    {
        return response()->json(
            BeasiswaSyarat::with('beasiswa')->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'beasiswa_id' => 'required|exists:beasiswas,id',
            'syarat' => 'required'
        ]);

        $data = BeasiswaSyarat::create($request->all());

        return response()->json([
            'message' => 'Berhasil ditambahkan',
            'data' => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = BeasiswaSyarat::findOrFail($id);

        $request->validate([
            'beasiswa_id' => 'required|exists:beasiswas,id',
            'syarat' => 'required'
        ]);

        $data->update($request->all());

        return response()->json([
            'message' => 'Berhasil diupdate'
        ]);
    }

    public function destroy($id)
    {
        BeasiswaSyarat::destroy($id);

        return response()->json([
            'message' => 'Berhasil dihapus'
        ]);
    }
}
