<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
        ]);

        $ownerRole = Role::where('slug', 'owner')->first();

        User::factory()->create([
            'name' => 'Owner User',
            'email' => 'owner@example.com',
            'role_id' => $ownerRole?->id,
            'is_active' => true,
        ]);
    }
}
