<?php

namespace App\Http\Controllers\Api\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Resources\Tasks\TaskResource;
use App\Models\Task;
use App\Models\User;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(Task::latest()->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!$request->created_by || !User::find($request->created_by)) {
            return response()->json([
                'message' => 'Author was not found'
            ], 400);
        }
        if (!$request->assigned_to || !User::find($request->assigned_to)) {
            return response()->json([
                'message' => 'User assigned was not found'
            ], 400);
        }
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $task = Task::create([
            'title' => $request->title,
            'created_by' => $request->created_by,
            'assigned_to' => $request->assigned_to,
            'is_completed' => false,
        ]);

        return response()->json([
            'message' => "Task '{$task->title}' was created successfully!",
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new TaskResource(Task::find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function assign(Request $request, string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function toCompleteRequest ($request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
