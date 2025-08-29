<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class OrderTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_types')->insert([
            'name' => 'Envió a domicilio',
            'icon' => 'icono_domicilio.png',
        ]);

        DB::table('order_types')->insert([
            'name' => 'Comer en local',
            'icon' => 'icono_local.png',
        ]);

        self::saveImage("icono_domicilio.png");
        self::saveImage("icono_local.png");
    }

    public static function saveImage(String $name)
    {
        $file = File::get(public_path("/img/{$name}"));
        if($file)
            Storage::put("order_types/{$name}", $file);
    }
}
