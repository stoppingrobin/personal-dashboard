<?php

namespace App\Http\Repositories;

use App\Enums\HttpCodes;
use App\Http\Repositories\Interfaces\BirthdaysRepositoryInterface;
use App\Models\Birthday;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BirthdayRepository implements BirthdaysRepositoryInterface
{
    public function getBirthdayRecords(string $userId): mixed
    {
        return Birthday::where('user_id', $userId)->get();
    }


    /**
     * (WIDGET VIEW) Returns upcoming birthdays next week (or 3 next birthdays if none is planned for next week)
     *
     *
     * @param string $userId
     * @return mixed
     */
    public function upcoming(string $userId): mixed
    {
        $today = now()->startOfDay();
        $birthdays = Birthday::where('user_id', $userId)->get();

        $upcoming = $birthdays->map(function ($birthday) use ($today) {
            try {
                // Try to parse the date, expecting 'd-m-Y'
                $bday = Carbon::createFromFormat('d/m/y', $birthday->date);

                $nextOccurrence = $bday->copy()->year($today->year);

                if ($nextOccurrence->lt($today)) {
                    $nextOccurrence->addYear();
                }

                $daysLeft = $today->diffInDays($nextOccurrence);
                $minutesLeft = $today->diffInMinutes($nextOccurrence);

                $timeLeft = $daysLeft > 1
                    ? "$daysLeft days and $minutesLeft minutes left"
                    : "$daysLeft day left";

                return [
                    'name' => $birthday->name,
                    'date' => $birthday->date,
                    'next_occurrence' => $nextOccurrence->format('d/m/Y'),
                    'days_left' => $daysLeft,
                    'minutes_left' => $minutesLeft,
                    'time_left' => $timeLeft,
                ];
            } catch (\Exception $e) {
                return null;
            }
        })
            ->filter()
            ->sortBy('next_occurrence')
            ->values()
            ->take(3);

        return $upcoming;
    }


    public function createBirthdayRecord(Request $request) : JsonResponse
    {
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
    }

}