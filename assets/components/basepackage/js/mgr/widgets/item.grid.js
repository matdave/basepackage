basepackage.grid.Item = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        url: MODx.config.connector_url,
        baseParams: {
            action: "BasePackage\\Processors\\Item\\GetList",
            sort: "start_date",
        },
        autosave: true,
        save_action: "BasePackage\\Processors\\Item\\UpdateFromGrid",
        preventSaveRefresh: true,
        fields: ["id", "title", "description", "featured", "start_date", "photo"],
        paging: true,
        remoteSort: true,
        emptyText: _("basepackage.global.no_records"),
        columns: [
            {
                header: _("id"),
                dataIndex: "id",
                sortable: true,
                hidden: true,
            },
            {
                header: _("basepackage.item.title"),
                dataIndex: "title",
                editor: { xtype: "textfield" },
                sortable: true,
                width: 80,
            },
            {
                header: _("basepackage.item.description"),
                dataIndex: "description",
                editor: { xtype: "textfield" },
                sortable: true,
                width: 80,
            },
            {
                header: _("basepackage.item.featured"),
                dataIndex: "featured",
                sortable: true,
                width: 40,
                renderer: this.rendYesNo,
                editor: { xtype: "modx-combo-boolean", renderer: false },
            },
            {
                header: _("basepackage.item.start_date"),
                dataIndex: "start_date",
                sortable: true,
                width: 40,
                editor: { xtype: "xdatetime", allowBlank: true},
            },
            {
                header: _("basepackage.item.photo"),
                dataIndex: "photo",
                sortable: true,
                width: 40,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value) {
                        metaData.attr =
                            "ext:qtip=\"<img style='max-width:300px;max-height:300px;' src='" +
                            value +
                            "'/>\"";
                        return (
                            "<img style='max-width:100px;max-height:100px;' src=\"" +
                            value +
                            '" />'
                        );
                    }

                    return value;
                },
                editor: {
                    xtype: "modx-combo-browser",
                    source: MODx.config.default_media_source,
                    hideSourceCombo: true,
                }
            },
        ],
        tbar: this.getTbar(config),
    });
    basepackage.grid.Item.superclass.constructor.call(this, config);
};
Ext.extend(basepackage.grid.Item, MODx.grid.Grid, {
    getTbar: function (config) {
        return [
            {
                text: _("basepackage.item.create"),
                handler: this.createItem,
            },
            {
                text: _("basepackage.global.export"),
                handler: this.exportFilters,
            },
            "->",
            {
                xtype: "textfield",
                blankText: _("basepackage.global.search"),
                filterName: "query",
                listeners: {
                    change: this.filterSearch,
                    scope: this,
                    render: {
                        fn: function (cmp) {
                            new Ext.KeyMap(cmp.getEl(), {
                                key: Ext.EventObject.ENTER,
                                fn: this.blur,
                                scope: cmp,
                            });
                        },
                        scope: this,
                    },
                },
            },
            {
                xtype: "button",
                text: _("basepackage.global.clear"),
                handler: this.clearFilters,
                scope: this,
            },
        ];
    },

    getMenu: function () {
        var m = [];

        m.push({
            text: _("basepackage.global.update"),
            handler: this.updateItem,
        });

        m.push({
            text: _("basepackage.global.remove"),
            handler: this.removeItem,
        });

        m.push({
            text: _("basepackage.global.duplicate"),
            handler: this.duplicateItem,
        });

        return m;
    },

    updateItem: function (btn, e) {
        var updateItem = MODx.load({
            xtype: "basepackage-window-item",
            title: _("basepackage.item.update"),
            action: "BasePackage\\Processors\\Item\\Update",
            isUpdate: true,
            record: this.menu.record,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    },
                    scope: this,
                },
            },
        });

        updateItem.fp.getForm().reset();
        updateItem.fp.getForm().setValues(this.menu.record);
        updateItem.show(e.target);
    },

    createItem: function (btn, e) {
        var record = { geo_route: 1, published: 1 };
        var createItem = MODx.load({
            xtype: "basepackage-window-item",
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    },
                    scope: this,
                },
            },
        });

        createItem.fp.getForm().reset();
        createItem.fp.getForm().setValues(record);
        createItem.show(e.target);
    },

    removeItem: function (btn, e) {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _("basepackage.item.remove"),
            text: _("basepackage.item.remove_confirm", {
                title: this.menu.record.title,
            }),
            url: this.config.url,
            params: {
                action: "BasePackage\\Processors\\Item\\Remove",
                id: this.menu.record.id,
            },
            listeners: {
                success: {
                    fn: function (r) {
                        this.refresh();
                    },
                    scope: this,
                },
            },
        });

        return true;
    },

    duplicateItem: function () {
        if (!this.menu.record) return false;

        MODx.msg.confirm({
            title: _("basepackage.item.duplicate"),
            text: _("basepackage.item.duplicate_confirm", {
                title: this.menu.record.title,
            }),
            url: this.config.url,
            params: {
                action: "BasePackage\\Processors\\Item\\Duplicate",
                id: this.menu.record.id,
            },
            listeners: {
                success: {
                    fn: function (r) {
                        this.refresh();
                    },
                    scope: this,
                },
            },
        });

        return true;
    },

    exportFilters: function (comp, search) {
        var s = this.getStore();
        var filters = "export=true&HTTP_MODAUTH=" + MODx.siteId;
        Object.keys(s.baseParams).forEach((key) => {
            filters += "&" + key + "=" + s.baseParams[key];
        });
        window.location = this.config.url + "?" + filters;
    },

    filterSearch: function (comp, search) {
        var s = this.getStore();
        s.baseParams[comp.filterName] = search;
        this.getBottomToolbar().changePage(1);
    },

    clearFilters: function (btn, e) {
        this.getTopToolbar().items.items.forEach(function (item) {
            if (item.filterName) {
                item.reset();
            }
        });
        var s = this.getStore();
        s.baseParams = {
            action: s.baseParams.action,
        };
        this.getBottomToolbar().changePage(1);
    },
});
Ext.reg("basepackage-grid-item", basepackage.grid.Item);
