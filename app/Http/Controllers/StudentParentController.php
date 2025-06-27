<?php

namespace App\Http\Controllers;

use App\Models\StudentParent;
use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\StudentParentResource;
use DateTime;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : AnonymousResourceCollection
    {
        return StudentParentResource::collection(StudentParent::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
            $formFields = $request->validated();
            $formFields['password'] = Hash::make($formFields['password']);
            $formFields['last_login_date'] = new DateTime();
            $parent = StudentParent::create($formFields);
            $response = new StudentParentResource($parent);
            return response()->json([
                'parent' => $response,
                'message' => __('Parent created successfuly !')
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {
        $formFields = $request->validated();
        // $formFields['password'] = Hash::make($formFields['password']);
        // for updating the password will not be required
         if (!empty($formFields['password'])) {
        $formFields['password'] = Hash::make($formFields['password']);
    } else {
        unset($formFields['password']);
    }
        $parent->update($formFields);
        return response()->json([
                'parent' => $parent,
                'message' => __('Parent updated successfuly !')
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $parent)
    {
        $parent->delete();
        return new StudentParentResource($parent);
    }
}
