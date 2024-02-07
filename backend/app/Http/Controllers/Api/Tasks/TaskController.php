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
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'created_by' => 'required',
            'assigned_to' => 'required',
        ]);
        if (!User::find($request->created_by)) {
            return response()->json([
                'message' => 'Author was not found'
            ], 400);
        }
        if (!User::find($request->assigned_to)) {
            return response()->json([
                'message' => 'User assigned was not found'
            ], 400);
        }

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
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);
        $this->existsTaskValidation($request, $id);

        try {
            Task::find($id)
                ->where('created_by', $request->createdBy()->id)
                ->where('is_completed', false)
                ->update([
                    'title' => $request->title,
                    'assigned_to' => $request->assigned_to,
                ]);
    
            return response()->json([
                'message' => "Task '{$request->title}' was updated successfully!",
            ], 200);
        } catch(Throwable $e) {
            report($e);
            return response()->json([
                'message' => "The task was not found or it was not posible remove"
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function assign(Request $request, string $id)
    {
        $this->existsTaskValidation($request, $id);

        try {
            Task::find($id)
                ->where('created_by', $request->user()->id)
                ->where('is_completed', false)
                ->update(['assigned_to' => $request->assigned_to]);

            return response()->json([
                'message' => "Task '{$id}' was updated successfully!",
            ], 200);
        } catch(Throwable $e) {
            report($e);
            return response()->json([
                'message' => "The task was not found or it was not posible update"
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function toCompleteRequest ($request, string $id)
    {
        $request->validate([
            'is_completed' => ['required', 'boolean'],
            'assigned_to' => 'required',
        ]);
        if (!User::find($request->assigned_to)) {
            return response()->json([
                'message' => 'User assigned was not found'
            ], 400);
        }

        try {
            Task::find($id)
                ->where('assigned_to', $request->user()->id)
                ->update([ 'is_completed' => $request->is_completed ]);
            
            return response()->json([
                'message' => "Task '{$id}' was updated successfully!",
            ], 200);
        } catch(Throwable $e) {
            report($e);
            return response()->json([
                'message' => "The task was not found or it was not possible update"
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Task::find($id)
                ->where('created_by', $request->user()->id)
                ->where('is_completed', false)
                ->delete();
            
                return response()->json([], 204);
        } catch(Throwable $e) {
            report($e);
            return response()->json([
                'message' => "The task was not found or it was not possible remove"
            ], 400);
        }
    }

    private function existsTaskValidation(Request $request, string $id) {
        $request->validate([
            'created_by' => 'required',
            'assigned_to' => 'required',
        ]);

        if (!User::find($request->assigned_to)) {
            return response()->json([
                'message' => 'User assigned was not found'
            ], 400);
        }
        $task = Task::find($id)
            ->where('created_by', $request->user()->id)
            ->where('is_completed', false);
        if (!$task) {
            return response()->json([
                'message' => "Task {$id} was not found or was completed!"
            ], 404);
        }
    }
}
