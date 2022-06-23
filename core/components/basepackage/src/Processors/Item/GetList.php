<?php
namespace BasePackage\Processors\Item;

use MODX\Revolution\Processors\Model\GetListProcessor;
use BasePackage\Model\Item;
use xPDO\Om\xPDOQuery;

class GetList extends GetListProcessor
{
    use \BasePackage\Traits\GetList;
    public $classKey = Item::class;
    public $alias = 'Item';
    public $languageTopics = ['basepackage:default'];
    public $defaultSortField = 'start_date';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'basepackage.item';
    public $dynamicFilter = ['query'=>['title:LIKE','OR:description:LIKE']];
}
