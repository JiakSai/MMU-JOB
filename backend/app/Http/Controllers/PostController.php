<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    public function store(){
        $validate = Validator::make($request->all(),
        [   
            'job_title' => 'required|min:3',
            'job_level' => 'required',
            'vacancy_count' => 'required|int',
            'employment_type' => 'required',
            'job_location' => 'required',
            'salary' => 'required',
            'education_level' => 'required',
            'experience' => 'required',
            'skills' => 'required',
            'specifications' => 'sometimes|min:5',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        // If validation passes
        
    }
}
