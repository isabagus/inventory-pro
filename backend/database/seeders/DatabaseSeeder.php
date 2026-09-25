<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * DatabaseSeeder - Orkestrasi semua seeder dalam urutan dependency yang benar.
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Urutan: RolePermission (dependency) -> User (depends on Role)
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class, // TSK-S1-04 & S1-08: 7 Role + Permission Matrix
            UserSeeder::class,           // TSK-S1-08: 7 Akun Dummy per Role
        ]);
    }
}
