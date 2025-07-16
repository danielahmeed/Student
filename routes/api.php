use App\Http\Controllers\TaskController;

Route::get('/tasks', [TaskController::class, 'apiIndex']);