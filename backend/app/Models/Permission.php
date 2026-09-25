<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Permission model - Granular permissions per modul sistem.
 * Contoh: 'inventory.view', 'order.create', 'qc.inspect'
 */
class Permission extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'display_name', 'module', 'description'];

    /**
     * Roles yang memiliki permission ini.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }
}
