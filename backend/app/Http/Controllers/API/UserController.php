<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // ✅ GET semua user
    public function index()
    {
        $users = User::latest()->get();
        return response()->json($users);
    }

    // ✅ GET detail user
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // ✅ UPDATE user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,$id",
            'password' => 'nullable|min:6',
            'role' => 'required|in:admin,user'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        // kalau password diisi
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'User berhasil diupdate',
            'user' => $user
        ]);
    }

    // ✅ DELETE user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User berhasil dihapus'
        ]);
    }
}