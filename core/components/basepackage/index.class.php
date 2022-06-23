<?php
abstract class BasePackageBaseManagerController extends modExtraManagerController {
    /** @var \BasePackage\BasePackage $basepackage */
    public $basepackage;

    public function initialize(): void
    {
        $this->basepackage = $this->modx->services->get('basepackage');

        $this->addCss($this->basepackage->getOption('cssUrl') . 'mgr.css');
        $this->addJavascript($this->basepackage->getOption('jsUrl') . 'mgr/basepackage.js');

        $this->addHtml('
            <script type="text/javascript">
                Ext.onReady(function() {
                    basepackage.config = '.$this->modx->toJSON($this->basepackage->config).';
                });
            </script>
        ');

        parent::initialize();
    }

    public function getLanguageTopics(): array
    {
        return array('basepackage:default');
    }

    public function checkPermissions(): bool
    {
        return true;
    }
}
