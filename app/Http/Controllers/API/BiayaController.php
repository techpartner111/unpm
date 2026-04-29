<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Biaya;
use Illuminate\Http\Request;

class BiayaController extends Controller
{
    // GET semua data
    public function index()
    {
        return Biaya::orderBy('id')->get();
    }

    public function store(Request $request) {
    return Biaya::create($request->all());
}

public function update(Request $request, $id) {
    $data = Biaya::findOrFail($id);
    $data->update($request->all());
    return $data;
}

public function destroy($id) {
    Biaya::destroy($id);
    return response()->json(['message' => 'deleted']);
}
}