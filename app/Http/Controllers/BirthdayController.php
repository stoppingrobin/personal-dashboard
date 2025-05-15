<?php

namespace App\Http\Controllers;

use App\Enums\HttpCodes;
use App\Models\Birthday;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class BirthdayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $birthdays = Birthday::all();
            return response()->json($birthdays, HttpCodes::SUCCESS);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch all birthdays.' . $e], HttpCodes::ERROR,);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'birthdate' => 'required|date',
            ]);

            $birthday = Birthday::create($validated);

            return response()->json([
                'message' => 'Birthday created successfully.',
                'data' => $birthday,
            ], HttpCodes::CREATED_SUCCESS);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create birthday.' . $e], HttpCodes::ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $birthday = Birthday::findOrFail($id);
            return response()->json($birthday, HttpCodes::SUCCESS);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUNT);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch birthday.' . $e], HttpCodes::ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'birthdate' => 'required|date',
            ]);

            $birthday = Birthday::findOrFail($id);
            $birthday->update($validated);

            return response()->json([
                'message' => 'Birthday updated successfully.',
                'data' => $birthday,
            ], HttpCodes::SUCCESS);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUNT);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update birthday.' . $e], HttpCodes::ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $birthday = Birthday::findOrFail($id);
            $birthday->delete();

            return response()->json([
                'message' => 'Birthday deleted successfully.',
            ], HttpCodes::SUCCESS);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUNT);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to delete birthday.' . $e], HttpCodes::ERROR);
        }
    }
}
