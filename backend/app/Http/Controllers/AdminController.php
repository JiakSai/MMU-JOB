<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $admin = Admin::where('email', $credentials['email'])->first();

        if (!$admin || !Hash::check($credentials['password'], $admin->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Email or Password does not match with our record.'], 401);
        }

        $token = $admin->createToken('authToken', ['admin'])->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Admin Logged In Successfully',
            'token' => $token
        ], 200);
    }
}
