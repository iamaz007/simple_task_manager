<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('page.dashboard.index');
});

Route::get('/projects', [ProjectController::class,'index']);
Route::post('/projects', [ProjectController::class,'read']);
Route::post('/project/store', [ProjectController::class,'store']);
Route::post('/project/update', [ProjectController::class,'update']);
Route::post('/project/delete', [ProjectController::class,'destroy']);

Route::get('/tasks', [TaskController::class,'index']);
Route::post('/tasks', [TaskController::class,'read']);
Route::post('/task/store', [TaskController::class,'store']);
Route::post('/task/update', [TaskController::class,'update']);
Route::post('/task/delete', [TaskController::class,'destroy']);
Route::post('/task/sort', [TaskController::class,'sort']);
