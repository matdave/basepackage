<?php
namespace BasePackage\Processors\Item;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use BasePackage\Model\Item;

class UpdateFromGrid extends UpdateProcessor
{
    use \BasePackage\Traits\UpdateFromGrid;

    public $classKey = Item::class;
    public $languageTopics = ['basepackage:default'];
    public $objectType = 'basepackage.item';
}
