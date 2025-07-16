<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('TasksDashboard', [
            'auth' => auth()->user(),
            'tasks' => Task::all(),
        ]);
    }

    public function apiIndex()
    {
        return response()->json(Task::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Task::create($validated);

        return back()->with('message', 'Task created successfully');
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task->update($validated);

        return back()->with('message', 'Task updated successfully');
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();

        return back()->with('message', 'Task deleted successfully');
    }
}
