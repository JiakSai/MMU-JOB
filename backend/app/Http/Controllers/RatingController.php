<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RatingController extends Controller
{
    public function store(Request $request, $companyId)
    {
        $user = $request->user();

        $company = Company::find($companyId);

        if (!$company) {
            return response()->json([
                'status' => 'error',
                'message' => 'Company not found'
            ], 404);
        }

        if($user->ratings()->where('company_id', $companyId)->exists()){
            return response()->json([
                'status' => 'error',
                'message' => 'You have already rate the company'
            ], 401);
        }
        
        $validator = Validator::make($request->all(), [
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required',
            'employeeType' => 'required',
            'jobTitle' => 'required',
            'headline' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 400);
        }

        $rating = new Rating;
        $rating->user_id = $user->id;
        $rating->company_id = $companyId;
        $rating->rating = $request->rating;
        $rating->employeeType = $request->employeeType;
        $rating->jobTitle = $request->jobTitle;
        $rating->headline = $request->headline;
        $rating->review = $request->review;
        $rating->save();
        
        return response()->json([
            'status' => 'true',
            'message' => 'Rating submitted successfully',
            'data' => $rating
        ], 200);
    }
}
