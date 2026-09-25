<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Role model - Merepresentasikan 7 role pengguna dalam sistem RBAC.
 * Roles: owner, manager, front_office, tim_design, kepala_produksi, quality_control, staf_gudang
 */
class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'display_name', 'description'];

    /**
     * Permissions yang dimiliki role ini.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    /**
     * Users dengan role ini.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Cek apakah role ini memiliki permission tertentu.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->permissions()->where('name', $permission)->exists();
    }
}
