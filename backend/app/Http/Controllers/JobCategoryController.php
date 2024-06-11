<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobCategory;
use Illuminate\Support\Facades\Validator;

class JobCategoryController extends Controller
{
    public function index(){
        $jobcategory = JobCategory::all();
        return response()->json($jobcategory, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validator->errors()
            ], 401);
        }

        $post = JobCategory::create($validator->validated());

        return response()->json([
            'status' => true,
            'message' => 'Job Category created successfully',
            'data' => $post
        ], 201);
    }

}
