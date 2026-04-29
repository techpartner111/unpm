<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RplSection;
use Illuminate\Http\Request;

class RplSectionController extends Controller
{
    public function index()
    {
        return RplSection::orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'title' => 'nullable|string',
            'content' => 'nullable|string',
            'extra' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'order' => 'nullable|integer'
        ]);

        // default order kalau kosong
        $data['order'] = $data['order'] ?? 0;

        if ($request->hasFile('extra')) {
            $data['extra'] = $request->file('extra')->store('rpl', 'public');
        }

        return RplSection::create($data);
    }

    public function show($id)
    {
        return RplSection::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $rpl = RplSection::findOrFail($id);

        $data = $request->validate([
            'type' => 'required|string',
            'title' => 'nullable|string',
            'content' => 'nullable|string',
            'extra' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
            'order' => 'nullable|integer'
        ]);

        $data['order'] = $data['order'] ?? $rpl->order;

        if ($request->hasFile('extra')) {
            $data['extra'] = $request->file('extra')->store('rpl', 'public');
        }

        $rpl->update($data);

        return $rpl;
    }

    public function destroy($id)
    {
        RplSection::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}