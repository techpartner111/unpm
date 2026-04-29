<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Jenjang;
use App\Models\Fakultas;
use App\Models\Prodi;
use Illuminate\Http\Request;


class ProgramStudiController extends Controller
{
    // ✅ GET semua data
    public function index()
    {
        $data = Jenjang::with('fakultas.prodis')->get();
        return response()->json($data);
    }

    // ✅ STORE (insert nested)
    public function store(Request $request)
{
    // ================= JENJANG =================
    if ($request->type === 'jenjang') {
        return Jenjang::create([
            'nama' => $request->nama
        ]);
    }

    // ================= FAKULTAS =================
    if ($request->type === 'fakultas') {
        return Fakultas::create([
            'nama' => $request->nama,
            'jenjang_id' => $request->jenjang_id
        ]);
    }

    // ================= PRODI =================
    if ($request->type === 'prodi') {
        return Prodi::create([
            'nama' => $request->nama,
            'fakultas_id' => $request->fakultas_id
        ]);
    }

    return response()->json(['error' => 'Type tidak valid'], 400);
}

    // ✅ UPDATE (replace semua isi)
   public function update(Request $request, $id)
{
    if ($request->type === 'jenjang') {
        Jenjang::findOrFail($id)->update([
            'nama' => $request->nama
        ]);
    }

    if ($request->type === 'fakultas') {
        Fakultas::findOrFail($id)->update([
            'nama' => $request->nama
        ]);
    }

    if ($request->type === 'prodi') {
        Prodi::findOrFail($id)->update([
            'nama' => $request->nama
        ]);
    }

    return response()->json(['message' => 'Berhasil update']);
}
    // ✅ DELETE
public function destroy(Request $request, $id)
{
    $type = $request->query('type');

    try {
        if ($type === 'jenjang') {
            $jenjang = Jenjang::findOrFail($id);

            foreach ($jenjang->fakultas as $fak) {
                Prodi::where('fakultas_id', $fak->id)->delete();
            }

            Fakultas::where('jenjang_id', $jenjang->id)->delete();
            $jenjang->delete();
        }

        elseif ($type === 'fakultas') {
            $fakultas = Fakultas::findOrFail($id);

            Prodi::where('fakultas_id', $fakultas->id)->delete();
            $fakultas->delete();
        }

        elseif ($type === 'prodi') {
            $prodi = Prodi::findOrFail($id);
            $prodi->delete();
        }

        else {
            return response()->json([
                'error' => 'Type tidak valid'
            ], 400);
        }

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ], 500);
    }
}
}