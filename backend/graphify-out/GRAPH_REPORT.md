# Graph Report - .  (2026-09-24)

## Corpus Check
- 118 files · ~62,405 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 742 nodes · 649 edges · 109 communities (99 shown, 10 thin omitted)
- Extraction: 21% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- composer.json
- scripts
- concurrently
- Data Models (User.php)
- Application Providers (Application Setup)
- Project Rules (Ground Rules (read before you start))
- A. Validation & HTTP input
- Advanced Query Best Practices
- Architecture Best Practices
- Caching Best Practices
- Add Indexes for Measured Query Patterns
- Application Providers (Apply Global Scopes Sparingly)
- Cache Event Discovery During Production Deployment
- Define Foreign-Key Constraints Deliberately
- Back Off Transient Failures
- Application Providers (Apply Cross-Site Request Forgery Protection)
- Basic Usage
- Application Providers (Application Setup)
- Project Rules (Ground Rules (read before you start))
- A. Validation & HTTP input
- Advanced Query Best Practices
- Architecture Best Practices
- Caching Best Practices
- Add Indexes for Measured Query Patterns
- Application Providers (Apply Global Scopes Sparingly)
- Cache Event Discovery During Production Deployment
- Define Foreign-Key Constraints Deliberately
- Back Off Transient Failures
- Application Providers (Apply Cross-Site Request Forgery Protection)
- Basic Usage
- Application Providers (Application Structure & Architecture)
- Application Providers (Application Structure & Architecture)
- 1. Front Office (FO)
- **Sprint 1 (Minggu 1–2): Architecture Setup, API Gateway, Auth Service & Next.js Foundation**
- 1. Front Office (FO)
- Blade and View Best Practices
- Add Context to Exception Classes
- Bound Work Inside the Task
- Database
- Blade and View Best Practices
- Add Context to Exception Classes
- Bound Work Inside the Task
- Database
- 1. Informasi Umum & Tujuan Produk
- About Laravel
- Adding a cache to an existing environment
- Choose Between `cursor()` and `lazy()`
- A plaintext .env file committed to the repository
- Testing Framework (Fake HTTP Requests in Tests)
- Assert the Delivery Mode
- HTTP Controller (Keep Controllers Focused on HTTP Concerns)
- Convention and Style Best Practices
- Project Rules (Add Cross-Field Validation After Base Rules)
- Endpoint Coverage
- Common Errors
- Assertions
- Adding a cache to an existing environment
- Choose Between `cursor()` and `lazy()`
- A plaintext .env file committed to the repository
- Testing Framework (Fake HTTP Requests in Tests)
- Assert the Delivery Mode
- HTTP Controller (Keep Controllers Focused on HTTP Concerns)
- Convention and Style Best Practices
- Project Rules (Add Cross-Field Validation After Base Rules)
- Endpoint Coverage
- Common Errors
- Assertions
- Application Providers (AppServiceProvider.php)
- Consistency First
- Consistency First
- Arrange, Act, Assert
- File Layout
- Consistency First
- Consistency First
- Arrange, Act, Assert
- File Layout
- Testing Framework (Illuminate\Foundation\Testing\TestCase)
- Application Providers (Data Providers)
- Application Providers (Data Providers)
- Testing Framework (PHPUnit\Framework\TestCase)
- Built-in Laravel Assertion Methods
- Built-in Laravel Assertion Methods
- .mcp.json
- HTTP Controller (Controller.php)
- graphify
- Testing Framework (Security Tests)
- Workflow: graphify
- Testing Framework (Security Tests)
- graphify
- Robots

## God Nodes (most connected - your core abstractions)
1. `require-dev` - 9 edges
2. `scripts` - 9 edges
3. `Skill` - 8 edges
4. `Skill` - 8 edges
5. `Checklist` - 8 edges
6. `Advanced Queries` - 8 edges
7. `Architecture` - 8 edges
8. `Caching` - 8 edges
9. `Db Performance` - 8 edges
10. `Eloquent` - 8 edges

## Surprising Connections (you probably didn't know these)
- `ExampleTest` --inherits--> `TestCase`  [EXTRACTED]
  tests/Feature/ExampleTest.php → tests/TestCase.php

## Import Cycles
- None detected.

## Communities (109 total, 10 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.05
Nodes (41): pestphp/pest-plugin, php-http/discovery, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+33 more)

### Community 1 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, dev, post-autoload-dump, post-create-project-cmd, post-root-package-install, post-update-cmd, pre-package-uninstall, setup (+18 more)

### Community 2 - "concurrently"
Cohesion: 0.10
Nodes (20): concurrently, @laravel/multiplex, laravel-vite-plugin, devDependencies, concurrently, laravel-vite-plugin, tailwindcss, @tailwindcss/vite (+12 more)

### Community 3 - "Data Models (User.php)"
Cohesion: 0.16
Nodes (10): User, UserFactory, DatabaseSeeder, Illuminate\Database\Console\Seeds\WithoutModelEvents, Illuminate\Database\Eloquent\Factories\Factory, Illuminate\Database\Eloquent\Factories\HasFactory, Illuminate\Database\Seeder, Illuminate\Foundation\Auth\User (+2 more)

### Community 4 - "Application Providers (Application Setup)"
Cohesion: 0.22
Nodes (9): Application Setup, Build and Deploy, Cloud CLI, Configuration and Resources, Deploying with Laravel Cloud, Domains and Storage, Object Storage and File Visibility, Queues and Scheduling (+1 more)

### Community 5 - "Project Rules (Ground Rules (read before you start))"
Cohesion: 0.22
Nodes (9): Ground Rules (read before you start), Infer Conventions, Process, Step 0: Orient, Step 1: Predefined sweep, Step 2: Open-ended pass, Step 3: Confirm, Step 4: Record (+1 more)

### Community 6 - "A. Validation & HTTP input"
Cohesion: 0.22
Nodes (9): A. Validation & HTTP input, B. Controllers & routing, C. Authorization, D. Eloquent & models, Detection Checklist, E. Architecture & organization, F. Frontend & views, G. Database & migrations (+1 more)

### Community 7 - "Advanced Query Best Practices"
Cohesion: 0.22
Nodes (9): Advanced Query Best Practices, Combine Related Counts with Conditional Aggregates, Compare `whereHas()` with an `IN` Subquery, Create Dynamic Relationships with a Subquery Foreign Key, Design Composite Indexes for the Query, Measure Two Simple Queries Against One Complex Query, Reuse Loaded Parent Models with `setRelation()`, Select Single Relationship Values with Subqueries (+1 more)

### Community 8 - "Architecture Best Practices"
Cohesion: 0.22
Nodes (9): Architecture Best Practices, Depend on Contracts at Boundaries, Extract Focused Business Operations, Inject Required Dependencies, Specify a Deterministic Sort Order, Use `defer()` for Post-Response Work, Use `mb_*` String Functions, Use Atomic Locks for Race Conditions (+1 more)

### Community 9 - "Caching Best Practices"
Cohesion: 0.22
Nodes (9): Caching Best Practices, Configure Failover Cache Stores in Production, Consider `Cache::flexible()` for Stale-While-Revalidate, Use `Cache::add()` for Atomic Conditional Writes, Use `Cache::memo()` to Avoid Redundant Hits Within an Execution, Use `Cache::remember()` for Cache-Aside Reads, Use `once()` for In-Process Memoization, Use Cache Tags to Invalidate Related Groups (+1 more)

### Community 10 - "Add Indexes for Measured Query Patterns"
Cohesion: 0.22
Nodes (9): Add Indexes for Measured Query Patterns, Count Relationships Without Loading Them, Database Performance Best Practices, Eager Load Relationships Before Iterating, Keep Queries Out of Blade Templates, Prevent Lazy Loading in Development, Process Large Data Sets Incrementally, Select Only Needed Columns (+1 more)

### Community 11 - "Application Providers (Apply Global Scopes Sparingly)"
Cohesion: 0.22
Nodes (9): Apply Global Scopes Sparingly, Cast Date and Time Attributes, Define Attribute Casts, Define Precise Relationship Types, Eloquent Best Practices, Keep Application Queries Model-Aware, Use `whereBelongsTo()` for Relationship Queries, Use Local Scopes for Reusable Queries (+1 more)

### Community 12 - "Cache Event Discovery During Production Deployment"
Cohesion: 0.22
Nodes (9): Cache Event Discovery During Production Deployment, Dispatch Queued Notifications After Commit, Events and Notifications Best Practices, Queue Slow Notifications, Rely on Event Discovery, Route Notification Channels to Dedicated Queues, Use `ShouldDispatchAfterCommit` Inside Transactions, Use On-Demand Notifications for Non-User Recipients (+1 more)

### Community 13 - "Define Foreign-Key Constraints Deliberately"
Cohesion: 0.22
Nodes (9): Define Foreign-Key Constraints Deliberately, Design Indexes for Real Queries, Generate Migrations with Artisan, Make Rollbacks Honest, Migration Best Practices, Mirror Defaults Only When Unsaved Models Need Them, Stage Changes That Affect Existing Rows, Treat Deployed Migrations as Immutable (+1 more)

### Community 14 - "Back Off Transient Failures"
Cohesion: 0.22
Nodes (9): Back Off Transient Failures, Batch Jobs for Group Coordination, Configure Time-Based Retry Limits Deliberately, Handle Terminal Failure When Needed, Keep Reservation Time Longer Than Execution Time, Queue and Job Best Practices, Rate Limit External Calls, Use Unique Jobs for Dispatch Deduplication (+1 more)

### Community 15 - "Application Providers (Apply Cross-Site Request Forgery Protection)"
Cohesion: 0.22
Nodes (9): Apply Cross-Site Request Forgery Protection, Authorize Protected Actions, Bind Query Parameters, Control Mass Assignment, Escape Output in Its Context, Rate Limit Sensitive Endpoints, Security Best Practices, Validate and Store Uploads Safely (+1 more)

### Community 16 - "Basic Usage"
Cohesion: 0.22
Nodes (9): Basic Usage, CSS-First Configuration, Documentation, Import Syntax, Replaced Utilities, Spacing, Tailwind CSS Development, Tailwind CSS v4 Specifics (+1 more)

### Community 17 - "Application Providers (Application Setup)"
Cohesion: 0.22
Nodes (9): Application Setup, Build and Deploy, Cloud CLI, Configuration and Resources, Deploying with Laravel Cloud, Domains and Storage, Object Storage and File Visibility, Queues and Scheduling (+1 more)

### Community 18 - "Project Rules (Ground Rules (read before you start))"
Cohesion: 0.22
Nodes (9): Ground Rules (read before you start), Infer Conventions, Process, Step 0: Orient, Step 1: Predefined sweep, Step 2: Open-ended pass, Step 3: Confirm, Step 4: Record (+1 more)

### Community 19 - "A. Validation & HTTP input"
Cohesion: 0.22
Nodes (9): A. Validation & HTTP input, B. Controllers & routing, C. Authorization, D. Eloquent & models, Detection Checklist, E. Architecture & organization, F. Frontend & views, G. Database & migrations (+1 more)

### Community 20 - "Advanced Query Best Practices"
Cohesion: 0.22
Nodes (9): Advanced Query Best Practices, Combine Related Counts with Conditional Aggregates, Compare `whereHas()` with an `IN` Subquery, Create Dynamic Relationships with a Subquery Foreign Key, Design Composite Indexes for the Query, Measure Two Simple Queries Against One Complex Query, Reuse Loaded Parent Models with `setRelation()`, Select Single Relationship Values with Subqueries (+1 more)

### Community 21 - "Architecture Best Practices"
Cohesion: 0.22
Nodes (9): Architecture Best Practices, Depend on Contracts at Boundaries, Extract Focused Business Operations, Inject Required Dependencies, Specify a Deterministic Sort Order, Use `defer()` for Post-Response Work, Use `mb_*` String Functions, Use Atomic Locks for Race Conditions (+1 more)

### Community 22 - "Caching Best Practices"
Cohesion: 0.22
Nodes (9): Caching Best Practices, Configure Failover Cache Stores in Production, Consider `Cache::flexible()` for Stale-While-Revalidate, Use `Cache::add()` for Atomic Conditional Writes, Use `Cache::memo()` to Avoid Redundant Hits Within an Execution, Use `Cache::remember()` for Cache-Aside Reads, Use `once()` for In-Process Memoization, Use Cache Tags to Invalidate Related Groups (+1 more)

### Community 23 - "Add Indexes for Measured Query Patterns"
Cohesion: 0.22
Nodes (9): Add Indexes for Measured Query Patterns, Count Relationships Without Loading Them, Database Performance Best Practices, Eager Load Relationships Before Iterating, Keep Queries Out of Blade Templates, Prevent Lazy Loading in Development, Process Large Data Sets Incrementally, Select Only Needed Columns (+1 more)

### Community 24 - "Application Providers (Apply Global Scopes Sparingly)"
Cohesion: 0.22
Nodes (9): Apply Global Scopes Sparingly, Cast Date and Time Attributes, Define Attribute Casts, Define Precise Relationship Types, Eloquent Best Practices, Keep Application Queries Model-Aware, Use `whereBelongsTo()` for Relationship Queries, Use Local Scopes for Reusable Queries (+1 more)

### Community 25 - "Cache Event Discovery During Production Deployment"
Cohesion: 0.22
Nodes (9): Cache Event Discovery During Production Deployment, Dispatch Queued Notifications After Commit, Events and Notifications Best Practices, Queue Slow Notifications, Rely on Event Discovery, Route Notification Channels to Dedicated Queues, Use `ShouldDispatchAfterCommit` Inside Transactions, Use On-Demand Notifications for Non-User Recipients (+1 more)

### Community 26 - "Define Foreign-Key Constraints Deliberately"
Cohesion: 0.22
Nodes (9): Define Foreign-Key Constraints Deliberately, Design Indexes for Real Queries, Generate Migrations with Artisan, Make Rollbacks Honest, Migration Best Practices, Mirror Defaults Only When Unsaved Models Need Them, Stage Changes That Affect Existing Rows, Treat Deployed Migrations as Immutable (+1 more)

### Community 27 - "Back Off Transient Failures"
Cohesion: 0.22
Nodes (9): Back Off Transient Failures, Batch Jobs for Group Coordination, Configure Time-Based Retry Limits Deliberately, Handle Terminal Failure When Needed, Keep Reservation Time Longer Than Execution Time, Queue and Job Best Practices, Rate Limit External Calls, Use Unique Jobs for Dispatch Deduplication (+1 more)

### Community 28 - "Application Providers (Apply Cross-Site Request Forgery Protection)"
Cohesion: 0.22
Nodes (9): Apply Cross-Site Request Forgery Protection, Authorize Protected Actions, Bind Query Parameters, Control Mass Assignment, Escape Output in Its Context, Rate Limit Sensitive Endpoints, Security Best Practices, Validate and Store Uploads Safely (+1 more)

### Community 29 - "Basic Usage"
Cohesion: 0.22
Nodes (9): Basic Usage, CSS-First Configuration, Documentation, Import Syntax, Replaced Utilities, Spacing, Tailwind CSS Development, Tailwind CSS v4 Specifics (+1 more)

### Community 30 - "Application Providers (Application Structure & Architecture)"
Cohesion: 0.22
Nodes (9): Application Structure & Architecture, Conventions, Documentation Files, Foundational Context, Frontend Bundling, Laravel Boost Guidelines, Skills Activation, Verification Scripts (+1 more)

### Community 31 - "Application Providers (Application Structure & Architecture)"
Cohesion: 0.22
Nodes (9): Application Structure & Architecture, Conventions, Documentation Files, Foundational Context, Frontend Bundling, Laravel Boost Guidelines, Skills Activation, Verification Scripts (+1 more)

### Community 32 - "1. Front Office (FO)"
Cohesion: 0.22
Nodes (9): 1. Front Office (FO), 1.1. Ikhtisar Role (Overview), 1.2. Hak Akses & Modul Sistem (Next.js FE & API Gateway), 1.3. Rincian Alur Kerja (Detailed Workflow), 1.3.1. Autentikasi & Navigasi Utama, Daftar Isi, Dokumentasi Workflow & Flowchart ERP/CRM Percetakan (Microservices & Next.js), Ringkasan Arsitektur Sistem (+1 more)

### Community 33 - "**Sprint 1 (Minggu 1–2): Architecture Setup, API Gateway, Auth Service & Next.js Foundation**"
Cohesion: 0.22
Nodes (9): **Sprint 1 (Minggu 1–2): Architecture Setup, API Gateway, Auth Service & Next.js Foundation**, **Sprint 2 (Minggu 3–4): Inventory Microservice, Multi-Gudang, Multi-Brand & ROP Alert Engine**, **Sprint 3 (Minggu 5–6): Order Intake Microservice & BOM Engine Microservice**, 1. Alur Operasional Aplikasi & Komunikasi Microservices, 2. Struktur Tim & Pembagian Dual-Role, 3. Implementation Plan per Sprint (Agile Scrum-Kanban), Implementation Plan & Workflow Pengembangan Aplikasi (Per Sprint), Sistem Pengelolaan Inventori dan Pemantauan Produksi CV Solusi Inovasi Packaging (+1 more)

### Community 34 - "1. Front Office (FO)"
Cohesion: 0.22
Nodes (9): 1. Front Office (FO), 1.1. Ikhtisar Role (Overview), 1.2. Hak Akses & Modul Sistem, 1.3. Rincian Alur Kerja, 1.3.1. Autentikasi & Navigasi Utama, 1.3.2. Pemilihan Brand & Input Pesanan Baru, Dokumentasi Workflow & Flowchart ERP/CRM Percetakan, Microservices & Next.js (+1 more)

### Community 35 - "Blade and View Best Practices"
Cohesion: 0.25
Nodes (8): Blade and View Best Practices, Prefer Components for Explicit Interfaces, Return Blade Fragments for Partial Rendering, Share Compatible View Data with a View Composer, Share Parent Component Props with `@aware`, Use `$attributes->merge()` in Component Templates, Use `@pushOnce` for Per-Component Scripts, Blade Views

### Community 36 - "Add Context to Exception Classes"
Cohesion: 0.25
Nodes (8): Add Context to Exception Classes, Choose Where to Report and Render Exceptions, Define JSON Rendering for API Routes, Error Handling Best Practices, Mark Exceptions the Handler Should Not Report, Prevent Duplicate Reports of One Exception Instance, Throttle High-Volume Exception Reports, Error Handling

### Community 37 - "Bound Work Inside the Task"
Cohesion: 0.25
Nodes (8): Bound Work Inside the Task, Group Shared Configuration, Prevent Unwanted Overlap, Restrict Tasks by Environment, Run a Task on One Server, Run Eligible Commands in the Background, Task Scheduling Best Practices, Scheduling

### Community 38 - "Database"
Cohesion: 0.25
Nodes (8): Database, Fakes, Mocks, and Determinism, Framework Fakes, How to Isolate a Dependency, Mocking, Outbound HTTP Testing, Time and Randomness, Isolation

### Community 39 - "Blade and View Best Practices"
Cohesion: 0.25
Nodes (8): Blade and View Best Practices, Prefer Components for Explicit Interfaces, Return Blade Fragments for Partial Rendering, Share Compatible View Data with a View Composer, Share Parent Component Props with `@aware`, Use `$attributes->merge()` in Component Templates, Use `@pushOnce` for Per-Component Scripts, Blade Views

### Community 40 - "Add Context to Exception Classes"
Cohesion: 0.25
Nodes (8): Add Context to Exception Classes, Choose Where to Report and Render Exceptions, Define JSON Rendering for API Routes, Error Handling Best Practices, Mark Exceptions the Handler Should Not Report, Prevent Duplicate Reports of One Exception Instance, Throttle High-Volume Exception Reports, Error Handling

### Community 41 - "Bound Work Inside the Task"
Cohesion: 0.25
Nodes (8): Bound Work Inside the Task, Group Shared Configuration, Prevent Unwanted Overlap, Restrict Tasks by Environment, Run a Task on One Server, Run Eligible Commands in the Background, Task Scheduling Best Practices, Scheduling

### Community 42 - "Database"
Cohesion: 0.25
Nodes (8): Database, Fakes, Mocks, and Determinism, Framework Fakes, How to Isolate a Dependency, Mocking, Outbound HTTP Testing, Time and Randomness, Isolation

### Community 43 - "1. Informasi Umum & Tujuan Produk"
Cohesion: 0.25
Nodes (8): 1. Informasi Umum & Tujuan Produk, 2. Matriks Hak Akses Pengguna (RBAC - Tujuh Roles), 3. Spesifikasi Modul & Layanan Microservice, 4. Kebutuhan Non-Fungsional (NFR), 5. Batasan Sistem (System Boundary), Product Requirement Document (PRD), Sistem Pengelolaan Inventori dan Pemantauan Produksi dengan Fitur Prediksi Harga Bahan Baku, Prd Inventori

### Community 44 - "About Laravel"
Cohesion: 0.25
Nodes (8): About Laravel, Agentic Development, Code of Conduct, Contributing, Learning Laravel, License, Security Vulnerabilities, Readme

### Community 45 - "Adding a cache to an existing environment"
Cohesion: 0.29
Nodes (7): Adding a cache to an existing environment, Adding a database to an existing environment, Checklists for Multi-Step Operations, Custom domain setup, Full environment setup (app + database + cache + domain), New app from scratch, Checklists

### Community 46 - "Choose Between `cursor()` and `lazy()`"
Cohesion: 0.29
Nodes (7): Choose Between `cursor()` and `lazy()`, Collection Best Practices, Use `#[CollectedBy]` for Custom Collection Classes, Use `lazyById()` When Updating Records While Iterating, Use `toQuery()` for Bulk Operations on Collections, Use Higher-Order Messages for Simple Operations, Collections

### Community 47 - "A plaintext .env file committed to the repository"
Cohesion: 0.29
Nodes (7): A plaintext .env file committed to the repository, Configuration Best Practices, Name Repeated Domain Values, Protect Production Secrets, Read Environment Variables in Configuration Files, Use `App::environment()` for Environment Checks, Config

### Community 48 - "Testing Framework (Fake HTTP Requests in Tests)"
Cohesion: 0.29
Nodes (7): Fake HTTP Requests in Tests, Handle Errors Explicitly, HTTP Client Best Practices, Pool Independent Requests, Retry Only Safe Operations, Set Explicit Timeouts, Http Client

### Community 49 - "Assert the Delivery Mode"
Cohesion: 0.29
Nodes (7): Assert the Delivery Mode, Dispatch Queued Mail After Commit, Mail Best Practices, Queue Slow Mail Delivery, Separate Content and Delivery Tests, Use Markdown Mailables When They Fit, Mail

### Community 50 - "HTTP Controller (Keep Controllers Focused on HTTP Concerns)"
Cohesion: 0.29
Nodes (7): Keep Controllers Focused on HTTP Concerns, Organize Controllers Around Resources, Routing and Controller Best Practices, Scope Nested Bindings, Use Implicit Route Model Binding, Use Resource Routes for Resourceful Actions, Routing

### Community 51 - "Convention and Style Best Practices"
Cohesion: 0.29
Nodes (7): Convention and Style Best Practices, Follow Project Naming Conventions, Keep Presentation Code Maintainable, Prefer Clear, Idiomatic Syntax, Use Utilities When They Clarify Intent, Write Comments That Explain Why, Style

### Community 52 - "Project Rules (Add Cross-Field Validation After Base Rules)"
Cohesion: 0.29
Nodes (7): Add Cross-Field Validation After Base Rules, Express Conditional Rules Clearly, Extract Validation When It Improves the Boundary, Prefer Readable Rule Syntax, Use Only Intended Validated Data, Validation and Forms Best Practices, Validation

### Community 53 - "Endpoint Coverage"
Cohesion: 0.33
Nodes (7): Endpoint Coverage, Endpoint Tests, How to Write the Test, Tenant Isolation, Test Authorization at the Policy Level, Testing Validation, Which Layer Owns Which Case

### Community 54 - "Common Errors"
Cohesion: 0.29
Nodes (7): Common Errors, Global Fakes, How to Find a Slow Test, How to Run the Suite in Parallel, Test Environment, Test Suite Performance, Performance

### Community 55 - "Assertions"
Cohesion: 0.29
Nodes (7): Assertions, Coverage, Data and Determinism, Names and Structure, Reviewing Tests, Test Value, Review

### Community 56 - "Adding a cache to an existing environment"
Cohesion: 0.29
Nodes (7): Adding a cache to an existing environment, Adding a database to an existing environment, Checklists for Multi-Step Operations, Custom domain setup, Full environment setup (app + database + cache + domain), New app from scratch, Checklists

### Community 57 - "Choose Between `cursor()` and `lazy()`"
Cohesion: 0.29
Nodes (7): Choose Between `cursor()` and `lazy()`, Collection Best Practices, Use `#[CollectedBy]` for Custom Collection Classes, Use `lazyById()` When Updating Records While Iterating, Use `toQuery()` for Bulk Operations on Collections, Use Higher-Order Messages for Simple Operations, Collections

### Community 58 - "A plaintext .env file committed to the repository"
Cohesion: 0.29
Nodes (7): A plaintext .env file committed to the repository, Configuration Best Practices, Name Repeated Domain Values, Protect Production Secrets, Read Environment Variables in Configuration Files, Use `App::environment()` for Environment Checks, Config

### Community 59 - "Testing Framework (Fake HTTP Requests in Tests)"
Cohesion: 0.29
Nodes (7): Fake HTTP Requests in Tests, Handle Errors Explicitly, HTTP Client Best Practices, Pool Independent Requests, Retry Only Safe Operations, Set Explicit Timeouts, Http Client

### Community 60 - "Assert the Delivery Mode"
Cohesion: 0.29
Nodes (7): Assert the Delivery Mode, Dispatch Queued Mail After Commit, Mail Best Practices, Queue Slow Mail Delivery, Separate Content and Delivery Tests, Use Markdown Mailables When They Fit, Mail

### Community 61 - "HTTP Controller (Keep Controllers Focused on HTTP Concerns)"
Cohesion: 0.29
Nodes (7): Keep Controllers Focused on HTTP Concerns, Organize Controllers Around Resources, Routing and Controller Best Practices, Scope Nested Bindings, Use Implicit Route Model Binding, Use Resource Routes for Resourceful Actions, Routing

### Community 62 - "Convention and Style Best Practices"
Cohesion: 0.29
Nodes (7): Convention and Style Best Practices, Follow Project Naming Conventions, Keep Presentation Code Maintainable, Prefer Clear, Idiomatic Syntax, Use Utilities When They Clarify Intent, Write Comments That Explain Why, Style

### Community 63 - "Project Rules (Add Cross-Field Validation After Base Rules)"
Cohesion: 0.29
Nodes (7): Add Cross-Field Validation After Base Rules, Express Conditional Rules Clearly, Extract Validation When It Improves the Boundary, Prefer Readable Rule Syntax, Use Only Intended Validated Data, Validation and Forms Best Practices, Validation

### Community 64 - "Endpoint Coverage"
Cohesion: 0.33
Nodes (7): Endpoint Coverage, Endpoint Tests, How to Write the Test, Tenant Isolation, Test Authorization at the Policy Level, Testing Validation, Which Layer Owns Which Case

### Community 65 - "Common Errors"
Cohesion: 0.29
Nodes (7): Common Errors, Global Fakes, How to Find a Slow Test, How to Run the Suite in Parallel, Test Environment, Test Suite Performance, Performance

### Community 66 - "Assertions"
Cohesion: 0.29
Nodes (7): Assertions, Coverage, Data and Determinism, Names and Structure, Reviewing Tests, Test Value, Review

### Community 68 - "Consistency First"
Cohesion: 0.33
Nodes (6): Consistency First, Decision Rules, How to Apply, Laravel Best Practices, Rule Index, Skill

### Community 69 - "Consistency First"
Cohesion: 0.33
Nodes (6): Consistency First, How to Apply, Rule Index, Testing Best Practices, What to Test, Skill

### Community 70 - "Arrange, Act, Assert"
Cohesion: 0.40
Nodes (6): Arrange, Act, Assert, Assert a Known Value, Assert the Complete Result, Assertions, How to Find the Correct Assertion, Named Response Assertions

### Community 71 - "File Layout"
Cohesion: 0.33
Nodes (6): File Layout, Grouping, Naming and Structure, Naming Tests, Test Class and Methods, Naming

### Community 72 - "Consistency First"
Cohesion: 0.33
Nodes (6): Consistency First, Decision Rules, How to Apply, Laravel Best Practices, Rule Index, Skill

### Community 73 - "Consistency First"
Cohesion: 0.33
Nodes (6): Consistency First, How to Apply, Rule Index, Testing Best Practices, What to Test, Skill

### Community 74 - "Arrange, Act, Assert"
Cohesion: 0.40
Nodes (6): Arrange, Act, Assert, Assert a Known Value, Assert the Complete Result, Assertions, How to Find the Correct Assertion, Named Response Assertions

### Community 75 - "File Layout"
Cohesion: 0.33
Nodes (6): File Layout, Grouping, Naming and Structure, Naming Tests, Test Class and Methods, Naming

### Community 76 - "Testing Framework (Illuminate\Foundation\Testing\TestCase)"
Cohesion: 0.40
Nodes (3): Illuminate\Foundation\Testing\TestCase, ExampleTest, TestCase

### Community 77 - "Application Providers (Data Providers)"
Cohesion: 0.40
Nodes (5): Data Providers, Each Test Makes Its Own Data, Factories and Test Data, Record Construction, Test Data

### Community 78 - "Application Providers (Data Providers)"
Cohesion: 0.40
Nodes (5): Data Providers, Each Test Makes Its Own Data, Factories and Test Data, Record Construction, Test Data

### Community 80 - "Built-in Laravel Assertion Methods"
Cohesion: 0.67
Nodes (3): Built-in Laravel Assertion Methods, How to Find Test Framework Features, Finding Features

### Community 81 - "Built-in Laravel Assertion Methods"
Cohesion: 0.67
Nodes (3): Built-in Laravel Assertion Methods, How to Find Test Framework Features, Finding Features

## Knowledge Gaps
- **572 isolated node(s):** `php`, `Controller`, `$schema`, `name`, `type` (+567 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `scripts` connect `scripts` to `composer.json`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `php`, `Controller`, `$schema` to the rest of the system?**
  _572 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `concurrently` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._