<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JalurPendaftaran;
use Illuminate\Http\Request;

class JalurPendaftaranController extends Controller
{
    public function index()
    {
        return JalurPendaftaran::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'icon' => 'nullable',
            'gradient' => 'nullable',
        ]);

        return JalurPendaftaran::create($data);
    }

    public function show($id)
    {
        return JalurPendaftaran::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = JalurPendaftaran::findOrFail($id);

        $data = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'icon' => 'nullable',
            'gradient' => 'nullable',
        ]);

        $item->update($data);

        return $item;
    }

    public function destroy($id)
    {
        JalurPendaftaran::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
