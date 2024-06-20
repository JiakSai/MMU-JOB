<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


class ResetPasswordController extends Controller
{
    public function sendOTP(Request $request)
    {
         // Validate if the email exists in either job_seekers or employers tables
        // $exists = DB::table('users')->where('email', $request->email)->exists() ||
        // DB::table('employers')->where('email', $request->email)->exists();

        $user = DB::table('users')->where('email', $request->email)->first();
        $employer = null;
        if (!$user) {
            $employer = Employer::with('company')->where('email', $request->email)->first();
        }

        if ($user || $employer) {

            $token = rand(100000, 999999);  // Generate a unique token
            $validUntil = Carbon::now()->addMinutes(10)->format('d/m/Y h:i:s A');
        
            $email = $request->email;
            $token = $token;
            $now = Carbon::now();

            $recordExists = DB::table('password_reset_tokens')->where('email', $email)->exists();

            if ($recordExists) {
                // Update existing record
                DB::table('password_reset_tokens')->where('email', $email)->update([
                    'token' => $token,
                    'created_at' => $now
                ]);
            } else {
                // Insert new record
                DB::table('password_reset_tokens')->insert([
                    'email' => $email,
                    'token' => $token,
                    'created_at' => $now
                ]);
            }

            $name = $user ? $user->name : $employer->company->name;

            // Send email with the reset link or OTP
            Mail::send('emails.passwordReset', ['name'=> $name, 'token' => $token, 'validUntil'=> $validUntil], function ($message) use ($request) {
                $message->to($request->email);
                $message->subject('Password Reset OTP');
            });

            return response()->json([
                'status' => true,
                'message' => 'Reset password link sent on your email id.'
            ], 200);

        }

        return response()->json([
            'status' => false,
            'message' => 'Email not found.'
        ], 404);
    }

    public function resetPassword(Request $request)
    {
        $record = DB::table('password_reset_tokens')
        ->where('token', $request->token)
        ->where('created_at', '>=', Carbon::now()->subMinutes(10))
        ->first();

        if ($record) {
            // Determine which table to update
            $table = DB::table('users')->where('email', $record->email)->exists() ? 'users' : 'employers';

            // Update the user's password
            DB::table($table)->where('email', $record->email)->update([
                'password' => Hash::make($request->password)  // Encrypt the new password
            ]);

            // Delete the token
            DB::table('password_reset_tokens')->where('token', $request->token)->delete();

            return response()->json(['message' => 'Password has been successfully reset.']);
        }

        return response()->json(['message' => 'Invalid token or token has expired.'], 400);
    }
}
