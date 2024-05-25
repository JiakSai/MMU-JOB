<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\jobcategory;

class JobCategoryController extends Controller
{
    public function index(){
        $jobcategory = jobcategory::all();
        return response()->json($jobcategory, 200);
    }

    public function create(){
        return view('create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $post = jobcategory::create($data);
        return redirect(route('index'));
    }

}
