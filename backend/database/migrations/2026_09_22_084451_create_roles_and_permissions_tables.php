<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * TSK-S1-03: Perancangan Skema DDL Database Inti & RBAC
     * Membuat tabel roles, permissions, dan pivot tables untuk 7 role pengguna.
     */
    public function up(): void
    {
        // Tabel roles - 7 role: Owner, Manager, FO, Tim Design, Kepala Produksi, QC, Staf Gudang
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g. 'owner', 'manager', 'front_office'
            $table->string('display_name');   // e.g. 'Owner', 'Manager', 'Front Office'
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Tabel permissions - granular permissions per modul
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g. 'inventory.view', 'order.create'
            $table->string('display_name');
            $table->string('module');         // e.g. 'MOD-01', 'MOD-02'
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Pivot: role_permissions - many-to-many antara role dan permission
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            $table->foreignId('permission_id')->constrained('permissions')->onDelete('cascade');
            $table->unique(['role_id', 'permission_id']);
            $table->timestamps();
        });

        // Tambah kolom role_id ke tabel users (relasi ke roles)
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null')->after('id');
        });

        // Tabel audit_logs dasar (immutable, no delete/update policy)
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('action');          // e.g. 'login', 'stock.transfer', 'order.create'
            $table->string('model_type')->nullable(); // e.g. 'App\Models\Order'
            $table->unsignedBigInteger('model_id')->nullable();
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('created_at')->useCurrent(); // read-only, no updated_at

            // Indexes untuk pencarian cepat
            $table->index(['user_id', 'created_at']);
            $table->index(['model_type', 'model_id']);
            $table->index('action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
        });

        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles');
    }
};
