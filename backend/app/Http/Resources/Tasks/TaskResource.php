<?php

namespace App\Http\Resources\Tasks;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => [
                'name' => $this->createdBy->name,
                'email' => $this->createdBy->email,
            ],
            'assigned_to' => [
                'name' => $this->assignedTo->name,
                'email' => $this->assignedTo->email,
            ],
            'is_completed' => $this->is_completed,
            'task_completed_date' => $this->task_completed_date,
            'published_at' => $this->created_at,
        ];
    }
}
