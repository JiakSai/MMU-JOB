<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Application;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{  
    public function store(Request $request, $postId)
    {   
        $post = Post::find($postId);

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Post not found'
            ], 404);
        }

        $user = $request->user();

        if ($user->applications()->where('post_id', $postId)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already applied for this job'
            ], 401);
        }

        $application = new Application;
        $application->user_id = $user->id;
        $application->post_id = $postId;
        $application->employer_id = $post->employer_id;
        $application->save();

        return response()->json([
            'status' => 'true',
            'message' => 'Application submitted successfully',
            'data' => $application
        ], 200);

    }
}
