<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Birthday extends Model
{
    use HasFactory, HasUuid;

     protected $fillable = [
         'name',
         'date',
         'notes'
     ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
