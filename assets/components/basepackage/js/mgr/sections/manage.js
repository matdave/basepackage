basepackage.page.Manage = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [
            {
                xtype: 'basepackage-panel-manage',
                renderTo: 'basepackage-panel-manage-div'
            }
        ]
    });
    basepackage.page.Manage.superclass.constructor.call(this, config);
};
Ext.extend(basepackage.page.Manage, MODx.Component);
Ext.reg('basepackage-page-manage', basepackage.page.Manage);
