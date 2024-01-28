<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tariff extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'percent',
        'available',
    ];

    protected $visible = [
        'id',
        'name',
        'price',
        'description',
        'percent',
        'available',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public static function findByDepositeSum(int $deposite): ?int
    {
        return Tariff::query()
            ->select(['id'])
            ->where('price', '<=', $deposite)
            ->orderByDesc('price')
            ->limit(1)
            ->value('id');
    }

    public static function findMinimalDeposite(): ?int
    {
        return Tariff::query()
            ->select(['id'])
            ->orderBy('price')
            ->limit(1)
            ->value('id');
    }

    public static function findForDashboard()
    {
        return \App\Models\Tariff::query()->select(['id', 'name', 'percent', 'available'])->where('available', '=', 1)->get();
    }
}
