<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BeasiswaManfaat;
use Illuminate\Http\Request;

class BeasiswaManfaatController extends Controller
{
    public function index()
    {
        return response()->json(BeasiswaManfaat::with('beasiswa')->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'beasiswa_id' => 'required|exists:beasiswas,id',
            'manfaat' => 'required'
        ]);

        $data = BeasiswaManfaat::create($request->all());

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $data
        ]);
    }

    public function show($id)
    {
        return BeasiswaManfaat::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $data = BeasiswaManfaat::findOrFail($id);

        $request->validate([
            'beasiswa_id' => 'required|exists:beasiswas,id',
            'manfaat' => 'required'
        ]);

        $data->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diupdate'
        ]);
    }

    public function destroy($id)
    {
        BeasiswaManfaat::destroy($id);

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}
