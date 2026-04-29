<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $roles)
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message'=>'Unauthenticated'], 401);
        }

        $allowed = explode('|', $roles); // bisa 'admin|editor'
        if (! in_array($user->role, $allowed)) {
            return response()->json(['message'=>'Forbidden: insufficient role'], 403);
        }

        return $next($request);
    }
}
