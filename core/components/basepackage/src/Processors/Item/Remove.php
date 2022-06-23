<?php
namespace BasePackage\Processors\Item;

use MODX\Revolution\Processors\Model\RemoveProcessor;
use BasePackage\Model\Item;

class Remove extends RemoveProcessor
{
    public $classKey = Item::class;
    public $languageTopics = ['basepackage:default'];
    public $objectType = 'basepackage.item';
}
