<?php
namespace BasePackage\Model\mysql;

use xPDO\xPDO;

class Item extends \BasePackage\Model\Item
{

    public static $metaMap = array (
        'package' => 'BasePackage\\Model\\',
        'version' => '3.0',
        'table' => 'bp_item',
        'tableMeta' => 
        array (
            'engine' => 'InnoDB',
        ),
        'fields' => 
        array (
            'title' => '',
            'description' => '',
            'featured' => 0,
            'start_date' => NULL,
            'photo' => '',
        ),
        'fieldMeta' => 
        array (
            'title' => 
            array (
                'dbtype' => 'varchar',
                'precision' => '191',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
                'index' => 'fulltext',
            ),
            'description' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
                'index' => 'fulltext',
            ),
            'featured' => 
            array (
                'dbtype' => 'tinyint',
                'precision' => '1',
                'phptype' => 'boolean',
                'null' => false,
                'default' => 0,
            ),
            'start_date' => 
            array (
                'dbtype' => 'datetime',
                'phptype' => 'datetime',
                'null' => true,
            ),
            'photo' => 
            array (
                'dbtype' => 'text',
                'phptype' => 'string',
                'null' => false,
                'default' => '',
            ),
        ),
        'indexes' => 
        array (
            'item_content' => 
            array (
                'alias' => 'item_content',
                'primary' => false,
                'unique' => false,
                'type' => 'FULLTEXT',
                'columns' => 
                array (
                    'title' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                    'description' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
            'start_date' => 
            array (
                'alias' => 'start_date',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'start_date' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => true,
                    ),
                ),
            ),
            'featured' => 
            array (
                'alias' => 'featured',
                'primary' => false,
                'unique' => false,
                'type' => 'BTREE',
                'columns' => 
                array (
                    'featured' => 
                    array (
                        'length' => '',
                        'collation' => 'A',
                        'null' => false,
                    ),
                ),
            ),
        ),
    );

}
