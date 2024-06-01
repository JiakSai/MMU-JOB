<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'jobType' => 'required',
            'companyName' => 'required',
            'location' => 'required',
            'locationType' => 'required',
            'startDate' => 'required|date_format:m-Y',
            'endDate' => 'required|date_format:m-Y|after:startDate',
            'description' => 'sometimes|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 401);
        }

        $experience = new Experience();
        $experience->user_id = $request->user_id;
        $experience->title = $request->title;
        $experience->jobType = $request->jobType;
        $experience->companyName = $request->companyName;
        $experience->location = $request->location;
        $experience->locationType = $request->locationType;
        $experience->start_date = $request->start_date;
        $experience->end_date = $request->end_date;
        $experience->description = $request->description;
        $experience->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Experience created successfully', 
            'data' => $experience
        ], 201);
    }

    public function update(Request $request, $id){
        
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes | required',
            'jobType' => 'sometimes | required',
            'companyName' => 'sometimes | required',
            'location' => 'sometimes | required',
            'locationType' => 'sometimes | required',
            'startDate' => 'sometimes | required | date_format:m-Y',
            'endDate' => 'sometimes | required | date_format:m-Y | after:startDate',
            'description' => 'sometimes | min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 401);
        }

        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json([
                'status' => false,
                'message' => 'Experience not found',
            ], 404);
        }

        $experience->title = $request->title ?? $experience->title;
        $experience->jobType = $request->jobType ?? $experience->jobType;
        $experience->companyName = $request->companyName ?? $experience->companyName;
        $experience->location = $request->location ?? $experience->location;
        $experience->locationType = $request->locationType ?? $experience->locationType;
        $experience->start_date = $request->start_date ?? $experience->start_date;
        $experience->end_date = $request->end_date ?? $experience->end_date;
        $experience->description = $request->description ?? $experience->description;
        $experience->save();

        return response()->json([
            'status' => true,
            'message' => 'Experience updated successfully',
            'data' => $experience
        ], 200);
    }
    
}
