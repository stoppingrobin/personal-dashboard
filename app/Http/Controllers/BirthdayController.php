<?php

namespace App\Http\Controllers;

use App\Enums\HttpCodes;
use App\Http\Repositories\Interfaces\BirthdaysRepositoryInterface;
use App\Models\Birthday;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class BirthdayController extends Controller
{

    public function __construct(
        private BirthdaysRepositoryInterface $birthdayRepository
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $birthdays = $this->birthdayRepository->getBirthdayRecords(auth()->id());
            return response()->json($birthdays, HttpCodes::SUCCESS->value);
        } catch (Exception $e) {
            return response()->json(['ERROR' => 'Failed to fetch all birthday records. ' . $e->getMessage()], HttpCodes::ERROR->value);
        }
    }


    public function upcoming() : JsonResponse
    {
        try {
            $birthdays = $this->birthdayRepository->upcoming(auth()->id());
            return response()->json($birthdays, HttpCodes::SUCCESS->value);
        } catch (Exception $e) {
            return response()->json(['ERROR' => 'Failed to fetch upcoming birthday records. ' . $e->getMessage()], HttpCodes::ERROR->value);
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
                'user_id' => 'required|string|max:36'
            ]);

            $birthday = Birthday::create($validated);

            return response()->json([
                'message' => 'Birthday created successfully.',
                'data' => $birthday,
                'user_id' => auth()->id()
            ], HttpCodes::CREATED_SUCCESS->value);
        } catch (Exception $e) {
            return response()->json(['ERROR' => 'Failed to create birthday.' . $e], HttpCodes::ERROR->value);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $birthday = Birthday::findOrFail($id);
            return response()->json($birthday, HttpCodes::SUCCESS->value);
        } catch (ModelNotFoundException $e) {
            return response()->json(['ERROR' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUND->value);
        } catch (Exception $e) {
            return response()->json(['ERROR' => 'Failed to fetch birthday.' . $e], HttpCodes::ERROR->value);
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
                'birthdate' => 'required|date'
            ]);

            $birthday = Birthday::findOrFail($id);
            $birthday->update($validated);

            return response()->json([
                'message' => 'Birthday updated sucessfully.',
                'data' => $birthday
            ], HttpCodes::SUCCESS->value);
        } catch (ModelNotFoundException $e) {
            return response()->json(['ERROR' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['ERROR' => 'Failed to update birthday.' . $e], HttpCodes::ERROR->value);
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
                'message' => 'Birthday deleted successfully.'
            ], HttpCodes::SUCCESS->value);

        } catch (ModelNotFoundException $e) {
            return response()->json(['ERROR->value' => 'Birthday not found.' . $e], HttpCodes::NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['ERROR->value' => 'Failed to delete birthday.' . $e], HttpCodes::ERROR->value);
        }
    }
}
