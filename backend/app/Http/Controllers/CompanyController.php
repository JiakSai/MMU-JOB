<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::withCount('ratings as totalReviews')
                            ->withAvg('ratings as averageRating', 'rating')
                            ->get();

        $companiesArray = [];

        foreach ($companies as $company) {
            $companiesArray[] = [
                'company' => $company->only(['id', 'logo', 'name']),
                'averageRating' => number_format((float)$company->averageRating, 1, '.', ''),
                'totalReviews' => $company->totalReviews,
            ];
        }
        
        return response()->json($companiesArray, 200);
    }

    public function show(Company $company)
    {
        $averageRating = $company->ratings->avg('rating');
        $company->rating = number_format((float)$averageRating, 1, '.', '');

        $company->load(['ratings' => function ($query) {
            $query->with(['user' => function ($query) {
                $query->select('id', 'profilePic');
            }]);
        }]);

        $company->totalRatings = $company->ratings->count();

        $ratingCounts = [
            1 => 0,
            2 => 0,
            3 => 0,
            4 => 0,
            5 => 0,
        ];

        foreach ($company->ratings as $rating) {
            if (isset($ratingCounts[$rating->rating])) {
                $ratingCounts[$rating->rating]++;
            }
            $rating->userProfilePic = $rating->user->profilePic;
            $rating->time_ago = $rating->created_at->diffForHumans();
            unset($rating->user);
        }

        $ratingPercentages = [];
        foreach ($ratingCounts as $score => $count) {
            $percentage = $company->totalRatings > 0 ? ($count / $company->totalRatings) * 100 : 0;
            $ratingPercentages[$score] = number_format($percentage, 2) . '%';
        }
        
        $company->ratingPercentages = $ratingPercentages;
        
        return response()->json($company, 200);
    
    }

    public function showCompanyPosts(Company $company)
    {
        $company->load('posts');
        $company->totalPosts = $company->posts->count();

        foreach ($company->posts as $post) {
            $post->time_ago = $post->created_at->diffForHumans();
        }

        return response()->json($company, 200);
    }

    public function store(Request $request)
    {
        $employer = $request->user();

        if ($employer->company) {
            return response()->json([
                'status' => false,
                'message' => 'You already have a company.',
            ], 400);
        }

        $validate = Validator::make($request->all(), 
        [
            'name' => 'required',
            'website' => 'required',
            'companySize' => 'required',
            'category' => 'required',
            'location' => 'required',
            'logo' => 'required|image|max:2999',
            'cover' => 'required|image|max:3999',
            'description' => 'required|min:5',
            'benefits' => 'required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        // If validation passes
        $company = new Company();
        $company->employer_id = $employer->id;
        $company->name = $request->name;
        $company->website = $request->website;
        $company->category = $request->category;
        $company->location = $request->location;
        $company->companySize = $request->companySize;
        $company->description = $request->description;
        $company->benefits = $request->benefits;

        if($request->hasFile('logo')){
            $logoFile = $request->file('logo');
            $logoFilename = time() . '_logo.' . $logoFile->getClientOriginalExtension();
            $logoFile->move(public_path('images/company'), $logoFilename);
            $company->logo = asset('images/company/'.$logoFilename);
        }
        
        if($request->hasFile('cover')){
            $coverFile = $request->file('cover');
            $coverFilename = time() . '_cover.' . $coverFile->getClientOriginalExtension();
            $coverFile->move(public_path('images/company'), $coverFilename);
            $company->cover = asset('images/company/'.$coverFilename);
        }

        $company->save();

        return response()->json([
            'status' => true,
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }

    public function update(Request $request)
    {
        $employer = $request->user();

        $validate = Validator::make($request->all(),
        [
            'name' => 'sometimes|required',
            'website' => 'sometimes|required',
            'companySize' => 'sometimes|required',
            'category' => 'sometimes|required',
            'location' => 'sometimes|required',
            'logo' => 'sometimes|image|max:2999',
            'cover' => 'sometimes|image|max:3999',
            'description' => 'sometimes|required|min:5',
            'benefits' => 'sometimes|required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }

        $company = $employer->company;

        if (!$company) {
            return response()->json([
                'status' => false,
                'message' => 'Company not found',
            ], 404);
        }

        $data = $request->all();

        if($request->hasFile('logo')){
            $logoFile = $request->file('logo');
            $logoFilename = time() . '_logo.' . $logoFile->getClientOriginalExtension();
            $logoFile->move(public_path('images/company'), $logoFilename);
            $data['logo'] = asset('images/company/'.$logoFilename);
        }

        if($request->hasFile('cover')){
            $coverFile = $request->file('cover');
            $coverFilename = time() . '_cover.' . $coverFile->getClientOriginalExtension();
            $coverFile->move(public_path('images/company'), $coverFilename);
            $data['cover'] = asset('images/company/'.$coverFilename);
        }

        $company->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Company updated successfully',
            'data' => $company
        ], 200);
    }

}
