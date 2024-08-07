<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Employer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class EmployerController extends Controller
{
    public function showEmployerAndCompany()
    {
        $employer = Employer::with('company')->get();

        if (!$employer) {
            return response()->json([
                'status' => false,
                'message' => 'Employer not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'employer' => $employer,
        ]);
    }

    public function showForEmployer(Request $request)
    {
        $employer = $request->user();

        $employer->load('posts');
        $employer->totalPosts = $employer->posts->count();

        foreach ($employer->posts as $post){
            $post->time_ago = $post->created_at->diffForHumans();
        }

        return response()->json($employer->posts, 200);
    }

    public function showPendingApplications()
    {
        $employer = Auth::guard('employer')->user();
        $applications = $employer->applications()
                                    ->where('status', 'Pending')
                                    ->with('user', 'user.experience', 'user.education' ,'post')
                                    ->get();
        
        $applications->transform(function ($application) {
            $application->created_at_formatted = $application->created_at->format('d/m/Y');
            return $application;
        });

        return response()->json([
            'status' => 'success',
            'data' => $applications
        ], 200);
    } 

    public function showAcceptedApplications()
    {
        $employer = Auth::guard('employer')->user();
        $applications = $employer->applications()
                                    ->where('status', 'Accepted')
                                    ->with('user', 'user.experience', 'user.education' ,'post')
                                    ->get();
        
        $applications->transform(function ($application) {
            $application->created_at_formatted = $application->created_at->format('d/m/Y');
            return $application;
        });
        
        return response()->json([
            'status' => 'success',
            'data' => $applications
        ], 200);
    } 

    public function showRejectedApplications()
    {
        $employer = Auth::guard('employer')->user();
        $applications = $employer->applications()
                                    ->where('status', 'Rejected')
                                    ->with('user', 'user.experience', 'user.education' ,'post')
                                    ->get();
        
        $applications->transform(function ($application) {
            $application->created_at_formatted = $application->created_at->format('d/m/Y');
            return $application;
        });
        
        return response()->json([
            'status' => 'success',
            'data' => $applications
        ], 200);
    } 

    public function updateApplicationStatus(Request $request, $id)
    {
        $application = Application::find($id);

        // Check if application exists
        if (!$application) {
            return response()->json([
                'status' => 'error',
                'message' => 'Application not found'
            ], 404);
        }

        // Check if the employer is authorized to update the application
        if ($application->employer_id != Auth::guard('employer')->id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        // Validate the request
        $request->validate([
            'status' => 'required|in:Accepted,Rejected'
        ]);

        // Update the application status
        $application->status = $request->status;
        $application->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Application status updated',
            'application' => $application
        ], 200);
    }

    public function showOwnCompany(Request $request)
    {
        $employerId = auth()->guard('employer')->id();
        $employer = Employer::find($employerId);
        $company = $employer->company;

        if (!$company) {
            return response()->json([
                'status' => false,
                'message' => 'Company not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'company' => $company,
            'employerEmail' => $employer->email
        ], 200);
    }
    
    public function createEmployer(Request $request)
    {
        try {
            //Validated
            $validateEmployer = Validator::make($request->all(), 
            [
                'email' => 'required|email|unique:employers,email',
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
            'token' => $token
        ], 200);
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

    public function destroy(Request $request, Employer $employer)
    {
        $admin = auth()->guard('admin')->user();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }
        
        if($employer->company){
            $employer->company->delete();
        }

        if($employer->posts){
            $employer->posts()->delete();
        }
        
        $employer->delete();

        return response()->json([
            'status' => 'true',
            'message' => 'Employer deleted successfully',
        ], 200);
    }

}
