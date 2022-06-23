<?php
require_once dirname(dirname(__FILE__)) . '/index.class.php';

class BasePackageManageManagerController extends BasePackageBaseManagerController
{

    public function process(array $scriptProperties = []): void
    {
    }

    public function getPageTitle(): string
    {
        return $this->modx->lexicon('basepackage');
    }

    public function loadCustomCssJs(): void
    {
        $this->addTinyRTE();
        $this->addLastJavascript($this->basepackage->getOption('jsUrl') . 'mgr/widgets/manage.panel.js');
        $this->addLastJavascript($this->basepackage->getOption('jsUrl') . 'mgr/sections/manage.js');
        $this->addLastJavascript($this->basepackage->getOption('jsUrl') . 'mgr/sections/item.window.js');
        $this->addLastJavascript($this->basepackage->getOption('jsUrl') . 'mgr/sections/item.grid.js');

        $this->addHtml(
            '
            <script type="text/javascript">
                Ext.onReady(function() {
                    MODx.load({ xtype: "basepackage-page-manage"});
                });
            </script>
        '
        );
    }

    public function getTemplateFile(): string
    {
        return $this->basepackage->getOption('templatesPath') . 'manage.tpl';
    }

}
