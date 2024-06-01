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
        $user = $request->user();

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
        $experience->user_id = $user->id;
        $experience->title = $request->title;
        $experience->jobType = $request->jobType;
        $experience->companyName = $request->companyName;
        $experience->location = $request->location;
        $experience->locationType = $request->locationType;
        $experience->startDate = $request->startDate;
        $experience->endDate = $request->endDate;
        $experience->description = $request->description;
        $experience->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Experience created successfully', 
            'data' => $experience
        ], 201);
    }

    public function update(Request $request, $id){

        $user = $request->user();

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
        if($experience && $experience->user_id == $user->id){
            $experience->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Experience Updated Successfully',
                'data' => $experience
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Experience not found or not owned by the user',
            ], 404);
        }
    }
    
}
