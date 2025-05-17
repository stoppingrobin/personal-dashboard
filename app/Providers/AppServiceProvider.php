<?php

namespace App\Providers;

use App\Http\Repositories\BirthdayRepository;
use App\Http\Repositories\Interfaces\BirthdaysRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            BirthdaysRepositoryInterface::class,
            BirthdayRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
