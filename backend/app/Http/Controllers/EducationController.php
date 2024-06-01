<?php


namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EducationController extends Controller
{
    public function store(Request $request)
    {   
        $user = $request->user();

        $validate = Validator::make($request->all(), 
        [
            'school' => 'required',
            'degree' => 'required',
            'startDate' => 'required|date_format:m-Y' ,
            'endDate' => 'required|date_format:m-Y|after:startDate',
            'grade' => 'required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        // If validation passes
        $education = new Education();
        $education->user_id = $user->id;
        $education->school = $request->school;
        $education->degree = $request->degree;
        $education->startDate = $request->startDate;
        $education->endDate = $request->endDate;
        $education->grade = $request->grade;
        $education->save();

        return response()->json([
            'status' => true,
            'message' => 'Education Added Successfully',
            'data' => $education
        ], 200);
        
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), 
        [
            'school' => 'sometimes | required',
            'degree' => 'sometimes | required',
            'startDate' => 'sometimes | required | date_format:m-Y',
            'endDate' => 'sometimes | required | date_format:m-Y | after:startDate',
            'grade' => 'sometimes | required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        // If validation passes
        $education = Education::find($id);
        if($education && $education->user_id == $user->id) {
            $education->update($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Education Updated Successfully',
                'data' => $education
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Education not found or not owned by the user',
            ], 404);
        }
    }
}
