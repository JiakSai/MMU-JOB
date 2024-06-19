<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('company')->get();

        foreach ($posts as $post) {
            $post->time_ago = $post->created_at->diffForHumans();
        }
        
        return response()->json($posts, 200);
    }

    public function showAdmin()
    {
        $posts = Post::with('employer')->get();

        foreach ($posts as $post) {
            $post->created_at_formatted = $post->created_at->format('d/m/y');
        }

        return response()->json($posts, 200);
    }

    public function SearchAndFilter(Request $request)
    {   
        $query = Post::query();

        if($request->has('search'))
        {
            $search = $request->input('search');
            $query->where('jobTitle', 'LIKE', "%$search%");
        }

        // Job Location filter
        if($request->has('jobLocation')) {
            $jobLocation = $request->input('jobLocation');
            $query->where('jobLocation', 'LIKE', "%$jobLocation%");
        }
    
        // Location type filter
        if($request->has('locationType')) {
            $locationType = $request->input('locationType');
            $query->where('locationType', $locationType);
        }
    
        // Job category filter
        if($request->has('jobCategory')) {
            $jobCategory = $request->input('jobCategory');
            $query->where('jobCategory', $jobCategory);
        }

        // Salary filter
        $minSalary = $request->input('minSalary');
        $maxSalary = $request->input('maxSalary');

        if ($minSalary !== null && $maxSalary !== null) {
            $query->where(function($query) use ($minSalary, $maxSalary) {
                $query->where(function($q) use ($minSalary) {
                    $q->where('minSalary', '<=', $minSalary)
                      ->where('maxSalary', '>=', $minSalary);
                })->orWhere(function($q) use ($maxSalary) {
                    $q->where('minSalary', '<=', $maxSalary)
                      ->where('maxSalary', '>=', $maxSalary);
                });
            });
        } elseif ($minSalary !== null) {
            $query->where('maxSalary', '>=', $minSalary);
        } elseif ($maxSalary !== null) {
            $query->where('minSalary', '<=', $maxSalary);
        }
        
        // Execute the query and get the results
        $posts = $query->get();
    
        // Check if we have any posts
        if ($posts->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No posts found matching the criteria.',
            ], 404);
        }
    
        // Return the filtered posts
        return response()->json($posts, 200);
    }

    public function store(Request $request)
    {
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
            'jobTitle' => 'required|min:3',
            'jobType' => 'required',
            'jobCategory' => 'required',
            'minSalary' => 'required|numeric|lt:maxSalary',
            'maxSalary' => 'required|numeric|gte:minSalary',
            'jobLocation' => 'required',
            'locationType' => 'required',
            'educationLevel' => 'required',
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

        $postData = array_merge(['company_id' => auth()->user()->company->id], ['employer_id'=>$employer->id], $request->all());

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

    public function update(Request $request, Post $post)
    {
        $employer = $request->user();

        $validate = Validator::make($request->all(),
        [   
            'jobTitle' => 'sometimes|required|min:3',
            'jobType' => 'sometimes|required',
            'jobCategory' => 'sometimes|required',
            'minSalary' => 'sometimes|required|numeric|lt:maxSalary',
            'maxSalary' => 'sometimes|required|numeric|gte:minSalary',
            'jobLocation' => 'sometimes|required',
            'locationType' => 'sometimes|required',
            'experience' => 'sometimes|required',
            'requirement' => 'sometimes|required',
            'description' => 'sometimes|min:5',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        if($post->employer_id == $employer->id){

            $post->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Post updated successfully',
                'data' => $post
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Posts not found or not owned by the user',
            ], 404);
        }
            
    }

    public function destroy(Request $request, Post $post)
    {
        $employer = $request->user();

        if($post->employer_id == $employer->id){
            $post->delete();

            return response()->json([
                'status' => true,
                'message' => 'Post deleted successfully',
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Posts not found or not owned by the user',
            ], 404);
        }
    }

    public function adminDestroy(Request $request, Post $post)
    {
        $admin = auth()->guard('admin')->user();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $post->delete();

        return response()->json([
            'status' => 'true',
            'message' => 'Post deleted successfully',
        ], 200);
    }
}
