<?php

namespace App\Http\Controllers\Dashboard\Location;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeocodeController extends Controller
{
    public function index(Request $request)
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');

        if ($lat && $lon) {
            $response = Http::get('https://geocode.maps.co/reverse', [
                'lat' => $lat,
                'lon' => $lon,
                'api_key' => env("MIX_GEOCODE_API_KEY")
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return response()->json([
                    'address' => $data['address'] ?? []
                ]);
            }
        }

        return response()->json([
            'address' => [
                'city' => null,
                'country' => null,
            ]
        ], 400);
    }
}