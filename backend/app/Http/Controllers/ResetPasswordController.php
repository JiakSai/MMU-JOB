<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class ResetPasswordController extends Controller
{
    public function sendOTPUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email|exists:users'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Email not found.'
            ], 404);
        }

        $token = rand(100000, 999999);  // Generate a unique token
        $validUntil = Carbon::now()->addMinutes(10)->format('d/m/Y h:i:s A');

        $recordExists = DB::table('password_reset_tokens')->where('email', $request->email)->exists();

        if ($recordExists) {
            // Update existing record
            DB::table('password_reset_tokens')->where('email', $request->email)->update([
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
        } else {
            // Insert new record
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
        }

        $name = User::where('email', $request->email)->first()->name;

        // Send email with the reset link or OTP
        Mail::send('emails.passwordReset', ['name'=> $name, 'token' => $token, 'validUntil'=> $validUntil], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Password Reset OTP');
        });

        return response()->json([
            'status' => true,
            'message' => 'Reset password link sent on your email.'
        ], 200);
        
    }

    public function resetPasswordUser(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'password' => 'required|min:6|confirmed',
            'token' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()->first()
            ], 400);
        }

        $record = DB::table('password_reset_tokens')
                    ->where('token', $request->token)
                    ->where('created_at', '>=', Carbon::now()->subMinutes(10))
                    ->first();

        if ($record) {
            // Update the user's password
            User::where('email', $record->email)->update([
                'password' => Hash::make($request->password)
            ]);
            
            // Delete the token
            DB::table('password_reset_tokens')->where('token', $request->token)->delete();

            return response()->json([
                'statis' => true,
                'message' => 'Password has been successfully reset.'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid token or token has expired.'
        ], 400);
    }

    public function sendOTPEmployer(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email|exists:employers'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Email not found.'
            ], 404);
        }

        $token = rand(100000, 999999);  // Generate a unique token
        $validUntil = Carbon::now()->addMinutes(10)->format('d/m/Y h:i:s A');

        $recordExists = DB::table('password_reset_tokens')->where('email', $request->email)->exists();

        if ($recordExists) {
            // Update existing record
            DB::table('password_reset_tokens')->where('email', $request->email)->update([
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
        } else {
            // Insert new record
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
        }

        $name = Employer::with('company')->where('email', $request->email)->first()->company->name;

        // Send email with the reset link or OTP
        Mail::send('emails.passwordReset', ['name'=> $name, 'token' => $token, 'validUntil'=> $validUntil], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Password Reset OTP');
        });

        return response()->json([
            'status' => true,
            'message' => 'Reset password link sent on your email.'
        ], 200);
        
    }

    public function resetPasswordEmployer(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'password' => 'required|min:6|confirmed',
            'token' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()->first()
            ], 400);
        }

        $record = DB::table('password_reset_tokens')
                    ->where('token', $request->token)
                    ->where('created_at', '>=', Carbon::now()->subMinutes(10))
                    ->first();

        if ($record) {
            // Update the employer's password
            Employer::where('email', $record->email)->update([
                'password' => Hash::make($request->password)
            ]);
            
            // Delete the token
            DB::table('password_reset_tokens')->where('token', $request->token)->delete();

            return response()->json([
                'statis' => true,
                'message' => 'Password has been successfully reset.'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid token or token has expired.'
        ], 400);
    }

}
