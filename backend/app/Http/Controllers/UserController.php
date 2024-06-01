<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show()
    {
        $user = Auth::user()->load('education');
        return response()->json($user, 200);
    }
    public function createUser(Request $request)
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:6'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
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
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logoutUser(){
        if (Auth::guard('user')->check()) {
            Auth::guard('user')->user()->tokens()->delete();
            return response()->json([
                'status' => true,
                'message' => 'User Logged Out Successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No authenticated user'
            ], 401);
        }
    }

    public function updateUser(Request $request){
        
        $user = $request->user();

        $validate = Validator::make($request->all(),
        [
            'name' => 'sometimes | required',
            'profilePic' => 'sometimes | required | mimes:jpeg,jpg,png',
            'phoneNumber' => 'sometimes | required',
            'nationality' => 'sometimes | required',
            'state' => 'sometimes | required',
            'city' => 'sometimes | required',
            'education.university_name' => 'sometimes|required',
            'education.education_level' => 'sometimes|required',
            'major' => 'sometimes | required',
            'experience' => 'sometimes | required',
            'resume' => 'sometimes | required | mimes:pdf',
        ]);
        
        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateUser->errors()
            ], 401);
        }
    
        $data = $request->only('name', 'phoneNumber', 'nationality', 'state', 'city', 'education', 'major', 'experience');

        if($request->hasFile('profilePic')){
            $profilePic = $request->file('profilePic');
            $profilePicName = time().'_profilePic'.$profilePic->getClientOriginalName();
            $profilePic->move(public_path('images/User'), $profilePicName);
            $data['profilePic'] = asset('images/User/'.$profilePicName);
        }
    
        if($request->hasFile('resume')){
            $resume = $request->file('resume');
            $resumeName = time().'_resume'.$resume->getClientOriginalName();
            $resume->move(public_path('resume'), $resumeName);
            $data['resume'] = asset('resume/'.$resumeName);
        }
    
        $user->update($data);
    
        return response()->json([
            'status' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);

    }

    public function finishSignup(Request $request){

        $user = $request->user();

        $validate = Validator::make($request->all(),
        [
            'name' => 'required',
            'phoneNumber' => 'required',
            'nationality' => 'required',
            'state' => 'required',
            'city' => 'required',
            'major' => 'required',
            'experience' => 'sometimes',
            'resume' => 'sometimes | mimes:pdf',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        $data = $request->only('name', 'phoneNumber', 'nationality', 'state', 'city', 'major', 'experience');
        
        if($request->hasFile('resume')){
            $resume = $request->file('resume');
            $resumeName = time().'_resume'.$resume->getClientOriginalName();
            $resume->move(public_path('resume'), $resumeName);
            $data['resume'] = asset('resume/'.$resumeName);
        }

        $user->updateOrCreate(
            ['id' => $user->id],
            $data
        );

        return response()->json([
            'status' => true,
            'message' => 'Sign up finished successfully',
            'data' => $user
        ], 200);
           
    }

}
