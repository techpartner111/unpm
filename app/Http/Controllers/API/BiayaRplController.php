<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BiayaRpl;
use Illuminate\Http\Request;

class BiayaRplController extends Controller
{
    public function index()
    {
        return BiayaRpl::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'program_studi' => 'required',
            'biaya_semester' => 'nullable',
            'pkkmb' => 'nullable',
            'bpi_gel_1' => 'nullable',
            'bpi_gel_2' => 'nullable',
            'bpi_gel_3' => 'nullable',
        ]);

        return BiayaRpl::create($data);
    }

    public function update(Request $request, $id)
    {
        $item = BiayaRpl::findOrFail($id);

        $data = $request->validate([
            'program_studi' => 'required',
            'biaya_semester' => 'nullable',
            'pkkmb' => 'nullable',
            'bpi_gel_1' => 'nullable',
            'bpi_gel_2' => 'nullable',
            'bpi_gel_3' => 'nullable',
        ]);

        $item->update($data);

        return $item;
    }

    public function destroy($id)
    {
        BiayaRpl::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
