<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CompanyController extends Controller
{
    public function index(){
        $companies = Company::all();
        return response()->json($companies, 200);
        // return view('index', ['companies' => $company]);
    }

    public function create(){
        return view('company.create');
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
            'logo' => 'required|image|max:2999',
            'cover' => 'required|image|max:3999',
            'description' => 'required|min:5',
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
        $company->description = $request->description;

        if($request->hasFile('logo')){
            $logoFile = $request->file('logo');
            $logoFilename = time() . '_logo.' . $logoFile->getClientOriginalExtension();
            $logoFile->move(public_path('images/company'), $logoFilename);
            $company->logo = $logoFilename;
        }
        
        if($request->hasFile('cover')){
            $coverFile = $request->file('cover');
            $coverFilename = time() . '_cover.' . $coverFile->getClientOriginalExtension();
            $coverFile->move(public_path('images/company'), $coverFilename);
            $company->cover = $coverFilename;
        }

        $company->save();

        return response()->json([
            'status' => true,
            'message' => 'Company created successfully',
            'data' => $company
        ], 201);
    }
    
}
