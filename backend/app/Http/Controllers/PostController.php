<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index(){
        $posts = Post::with('company')->get();
        return response()->json($posts, 200);
    }

    public function store(Request $request){

        $employer = $request->user(); // Get the authenticated user

        // Check if the employer has a company
        if (!$employer->company) {
            return response()->json([
                'status' => false,
                'message' => 'No company associated with the user.',
            ], 400);
        }

        $validate = Validator::make($request->all(),
        [   
            'job_title' => 'required|min:3',
            'job_type' => 'required',
            'salary' => 'required',
            'job_location' => 'required',
            'education_level' => 'required',
            'experience' => 'required',
            'requirement' => 'required',
            'description' => 'sometimes|min:5',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        $postData = array_merge(['company_id' => auth()->user()->company->id], $request->all());

        $post = Post::create($postData);
        if ($post) {
            return response()->json([
                'status' => true,
                'message' => 'Post created successfully',
                'data' => $post
            ], 201);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Post could not be created',
            ], 400);
        }
        
    }
}
