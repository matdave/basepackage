<?php
namespace BasePackage\Model;

use xPDO\xPDO;

/**
 * Class Item
 *
 * @property string $title
 * @property string $description
 * @property boolean $featured
 * @property string $start_date
 * @property string $photo
 *
 * @package BasePackage\Model
 */
class Item extends \xPDO\Om\xPDOSimpleObject
{
}
