<?php

namespace App\Http\Controllers;

use App\Models\Subscribes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class SubscribeController extends Controller
{   
    public function show()
    {
        return response()->json(Subscribes::all());
    }

    public function store()
    {
        $validate = Validator::make(request()->all(), [
            'email' => 'required|email|unique:subscribes,email'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Email already subscribed.'
            ], 400);
        }

        Subscribes::create([
            'email' => request('email')
        ]);

        // Send email with the subscription confirmation
        Mail::send('emails.subscriptionConfirmation', ['email' => request('email')], function ($message) {
            $message->to(request('email'));
            $message->subject('Subscription Confirmation');
        });

        return response()->json([
            'status' => true,
            'message' => 'Email subscribed successfully.'
        ], 201);
    }

    public function sendNewsEmail(Request $request)
    {
        $emails = $request->input('emails'); // Assuming 'emails' is an array of email addresses

        foreach ($emails as $email) {
            // Send email with the news
            Mail::send('emails.news', ['content' => 'Your news content here'], function ($message) use ($email) {
                $message->to($email);
                $message->subject('Latest News');
            });
        }

        return back()->with('success', 'News emails sent successfully.');

        
    }
}