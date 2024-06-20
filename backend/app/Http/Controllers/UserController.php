<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class UserController extends Controller
{   
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show()
    {
        $user = Auth::user()->load('education', 'experience');
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
            'name' => 'sometimes|required',
            'profilePic' => 'sometimes|required|mimes:jpeg,jpg,png',
            'phoneNumber' => 'sometimes|required',
            'gender' => 'sometimes|required',
            'nationality' => 'sometimes|required',
            'state' => 'sometimes|required',
            'city' => 'sometimes|required',
            'major' => 'sometimes|required',
            'skills' => 'sometimes|required',
            'resume' => 'sometimes|required|mimes:pdf',
        ]);
        
        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validateUser->errors()
            ], 401);
        }
    
        $data = $request->only('name', 'phoneNumber','gender', 'nationality', 'state', 'city', 'major', 'skills');

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
            'gender'=> 'required',
            'nationality' => 'required',
            'state' => 'required',
            'city' => 'required',
            'major' => 'required',
            'resume' => 'sometimes|mimes:pdf',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        $data = $request->only('name', 'phoneNumber', 'gender', 'nationality', 'state', 'city', 'major');
        
        if($request->hasFile('resume')){
            $resume = $request->file('resume');
            $resumeName = time().'_resume'.$resume->getClientOriginalName();
            $resume->move(public_path('resume'), $resumeName);
            $data['resume'] = asset('resume/'.$resumeName);
        }

        $user->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Sign up finished successfully',
            'data' => $user
        ], 200);
           
    }

    public function showApplications()
    {
        $user = Auth::user();

        $applications = Application::where('user_id', $user->id)
        ->with('post.company')
        ->get()
        ->map(function($application){
            return [
                'id' => $application->id,
                'post_title' => $application->post->jobTitle,
                'company_name' => $application->post->company->name,
                'status' => $application->status,
                'created_at' => $application->created_at->format('d/m/Y'),
            ];
        });

        return response()->json([
            'status' => true,
            'message' => 'Applications fetched successfully',
            'data' => $applications
        ], 200);
       
    }    

    public function destroy(Request $request, User $user)
    {
        $admin = auth()->guard('admin')->user();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully',
        ], 200);
    }
}
