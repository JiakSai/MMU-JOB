<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployerController extends Controller
{
    public function createEmployer(Request $request)
    {
        try {
            //Validated
            $validateEmployer = Validator::make($request->all(), 
            [
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:6'
            ]);

            if($validateEmployer->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateEmployer->errors()
                ], 401);
            }

            $employer = Employer::create([
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Employer Created Successfully',
                'token' => $employer->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginEmployer(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $employer = Employer::where('email', $credentials['email'])->first();

        if (!$employer || !Hash::check($credentials['password'], $employer->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Email or Password does not match with our record.'], 401);
        }

        $token = $employer->createToken('authToken', ['employer'])->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Employer Logged In Successfully',
            'token' => $token], 200);
    }

    public function logoutEmployer(){
        if (Auth::guard('employer')->check()) {
            Auth::guard('employer')->user()->tokens()->delete();
            return response()->json([
                'status' => true,
                'message' => 'Employer Logged Out Successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No authenticated user'
            ], 401);
        }
    }

}
