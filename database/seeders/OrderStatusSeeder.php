<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_statuses')->insert([
            'name' => 'Pendiente',
        ]);

        DB::table('order_statuses')->insert([
            'name' => 'Cancelado',
        ]);

        DB::table('order_statuses')->insert([
            'name' => 'Preparando',
        ]);

        DB::table('order_statuses')->insert([
            'name' => 'Enviado',
        ]);

        DB::table('order_statuses')->insert([
            'name' => 'Completo',
        ]);
    }
}
