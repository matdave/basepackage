basepackage.window.Item = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _("basepackage.item.create"),
        closeAction: "close",
        isUpdate: false,
        autoHeight: true,
        url: MODx.config.connector_url,
        action: "BasePackage\\Processors\\Item\\Create",
        fields: this.getFields(config),
    });

    config.width = 600;
    basepackage.window.Item.superclass.constructor.call(this, config);

    this.on("afterrender", function () {
        if (typeof TinyMCERTE !== "undefined") {
            TinyMCERTE.loadForTVs();
        }
    });
};
Ext.extend(basepackage.window.Item, MODx.Window, {
    getFields: function (config) {
        var fields = [
            {
                xtype: "textfield",
                name: "id",
                anchor: "100%",
                hidden: true,
            },
            {
                xtype: "textfield",
                fieldLabel: _("basepackage.item.title"),
                name: "title",
                anchor: "100%",
                allowBlank: false,
            },
            {
                xtype: "textarea",
                fieldLabel: _("basepackage.item.description"),
                name: "description",
                cls: "modx-richtext",
                anchor: "100%",
                allowBlank: false,
                height: 270,
                grow: false,
            },
            {
                xtype: "xcheckbox",
                boxLabel: _("basepackage.item.featured"),
                hideLabel: true,
                name: "featured",
                anchor: "100%",
            },
            {
                xtype: "xdatetime",
                fieldLabel: _("basepackage.item.start_date"),
                hideLabel: true,
                name: "start_date",
                anchor: "100%",
                allowBlank: true,
            },
            {
                xtype: "modx-combo-browser",
                fieldLabel: _("basepackage.item.photo"),
                source: MODx.config.default_media_source,
                hideSourceCombo: true,
                name: "photo",
                anchor: "100%",
            }
        ];

        return fields;
    },
});
Ext.reg("basepackage-window-item", basepackage.window.Item);
