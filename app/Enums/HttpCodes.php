<?php

namespace App\Enums;

enum HttpCodes : int
{
    case SUCCESS = 200;

    case CREATED_SUCCESS = 201;
    case ERROR = 500;
    case NOT_FOUNT = 404;
}
