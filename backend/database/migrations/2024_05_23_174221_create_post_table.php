<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('employer_id');
            $table->string('jobTitle');
            $table->string('jobType');
            $table->string('jobCategory');
            $table->integer('minSalary');
            $table->integer('maxSalary');
            $table->string('jobLocation');
            $table->string('locationType');
            $table->string('experience');
            $table->string('requirement');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post');
    }
};
