<?php
namespace BasePackage\Processors\Item;

use MODX\Revolution\Processors\Model\UpdateProcessor;
use BasePackage\Model\Item;

class Update extends UpdateProcessor
{
    public $classKey = Item::class;
    public $languageTopics = ['basepackage:default'];
    public $objectType = 'basepackage.item';

    /**
     * Return the success message
     *
     * @return array
     */
    public function cleanup(): array
    {
        $cleaned = $this->object->toArray();
        unset($cleaned['description']);
        return $this->success('', $cleaned);
    }
}
