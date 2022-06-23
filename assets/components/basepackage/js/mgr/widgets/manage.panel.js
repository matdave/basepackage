basepackage.panel.Manage = function (config) {
    config = config || {};
    Ext.apply(config, {
        border: false,
        baseCls: 'modx-formpanel',
        cls: 'container',
        items: [
            {
                html: '<h2>' + _('basepackage.manage.page_title') + '</h2>',
                border: false,
                cls: 'modx-page-header'
            },
            {
                xtype: 'modx-tabs',
                defaults: {
                    border: false,
                    autoHeight: true
                },
                border: true,
                activeItem: 0,
                hideMode: 'offsets',
                items: [
                    {
                        title: _('basepackage.manage.page_title'),
                        layout: 'form',
                        items: [
                            {
                                xtype: "basepackage-grid-item",
                                preventRender: true,
                                cls: "main-wrapper",
                            },
                        ]
                    }
                ]
            }
        ]
    });
    basepackage.panel.Manage.superclass.constructor.call(this, config);
};
Ext.extend(basepackage.panel.Manage, MODx.Panel);
Ext.reg('basepackage-panel-manage', basepackage.panel.Manage);
