<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Statistik;
use Illuminate\Http\Request;

class StatistikController extends Controller
{
    // ambil semua data
    public function index()
    {
        return response()->json(Statistik::all());
    }

    // tambah / update (simple karena sedikit data)
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string',
            'value' => 'required|string'
        ]);

        $data = Statistik::create($request->all());

        return response()->json($data);
    }

    // update
    public function update(Request $request, $id)
    {
        $stat = Statistik::findOrFail($id);

        $stat->update($request->all());

        return response()->json($stat);
    }

    // delete
    public function destroy($id)
    {
        Statistik::destroy($id);

        return response()->json(['message' => 'Berhasil dihapus']);
    }
}
