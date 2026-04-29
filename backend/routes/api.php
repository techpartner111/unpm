<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\HeroSliderController;
use App\Http\Controllers\API\PitaController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\BrosurController;
use App\Http\Controllers\API\StatistikController;
use App\Http\Controllers\API\ProgramStudiController;
use App\Http\Controllers\API\ScheduleController;
use App\Http\Controllers\API\ScheduleImageController;
use App\Http\Controllers\Api\BeasiswaController;
use App\Http\Controllers\Api\BeasiswaApiController;
use App\Http\Controllers\Api\BeasiswaManfaatController;
use App\Http\Controllers\Api\BeasiswaSyaratController;
use App\Http\Controllers\Api\FasilitasController;
use App\Http\Controllers\Api\FasilitasAdminController;
use App\Http\Controllers\Api\GaleriFasilitasController;
use App\Http\Controllers\Api\BiayaController;
use App\Http\Controllers\Api\BiayaRplController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Api\RplSectionController;
use App\Http\Controllers\Api\JalurPendaftaranController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/sliders', [HeroSliderController::class, 'index']);
Route::get('/pita', [PitaController::class, 'index']);
Route::get('/video', [VideoController::class, 'index']);
Route::get('/brosur', [BrosurController::class, 'index']);
Route::get('/statistik1', [StatistikController::class, 'index']);
Route::get('/program-studi', [ProgramStudiController::class, 'index']);
Route::get('/schedules', [ScheduleController::class, 'index']);
Route::get('/schedule-image', [ScheduleImageController::class, 'index']);
Route::get('/beasiswas', [BeasiswaController::class, 'index']);
Route::get('/beasiswas/{slug}', [BeasiswaController::class, 'show']);
Route::get('/fasilitas', [FasilitasController::class, 'index']);
Route::get('/fasilitas/{slug}', [FasilitasController::class, 'show']);
Route::get('/biaya', [BiayaController::class, 'index']);
Route::get('/rpl-section', [RplSectionController::class, 'index']);
Route::get('/biaya-rpl', [BiayaRplController::class, 'index']);
Route::get('/jalur', [JalurPendaftaranController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    
    Route::apiResource('hero-sliders', HeroSliderController::class);
    Route::get('hero-sliders-active', [HeroSliderController::class, 'active']);
    Route::post('/pita', [PitaController::class, 'update']);
    Route::post('/video', [VideoController::class, 'update']);
    Route::post('/brosur', [BrosurController::class, 'store']);
    Route::delete('/brosur/{id}', [BrosurController::class, 'destroy']);
    Route::apiResource('statistik', StatistikController::class);
    Route::apiResource('program-studi-admin', ProgramStudiController::class);
    Route::apiResource('schedules-admin', ScheduleController::class);
    Route::post('/schedule-image', [ScheduleImageController::class, 'store']);

    Route::apiResource('beasiswas-admin', BeasiswaApiController::class);
    Route::apiResource('manfaat-beasiswa', BeasiswaManfaatController::class);
    Route::apiResource('syarat-beasiswa', BeasiswaSyaratController::class);

    Route::apiResource('fasilitas-admin', FasilitasAdminController::class);
    Route::get('galeri-fasilitas/{fasilitas_id}', [GaleriFasilitasController::class, 'index']);
    Route::post('galeri-fasilitas', [GaleriFasilitasController::class, 'store']);
    Route::delete('galeri-fasilitas/{id}', [GaleriFasilitasController::class, 'destroy']);

    Route::apiResource('biaya-admin', BiayaController::class);
    Route::apiResource('rpl-section-admin', RplSectionController::class);
    Route::apiResource('biaya-rpl-admin', BiayaRplController::class);
    Route::apiResource('jalur-admin', JalurPendaftaranController::class);

    Route::apiResource('users', UserController::class);


});
