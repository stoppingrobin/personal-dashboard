<?php

namespace App\Http\Repositories\Interfaces;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface BirthdaysRepositoryInterface
{
    public function getBirthdayRecords(string $userId): mixed;
    public function upcoming(string $userId): mixed;
    public function createBirthdayRecord(Request $request) : JsonResponse;

}