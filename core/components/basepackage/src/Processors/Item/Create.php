<?php
namespace BasePackage\Processors\Item;

use MODX\Revolution\Processors\Model\CreateProcessor;
use BasePackage\Model\Item;

class Create extends CreateProcessor
{
    public $classKey = Item::class;
    public $languageTopics = ['basepackage:default'];
    public $objectType = 'basepackage.item';
}
