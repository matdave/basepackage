var BasePackage = function (config) {
    config = config || {};
    BasePackage.superclass.constructor.call(this, config);
};
Ext.extend(BasePackage, Ext.Component, {

    page: {},
    window: {},
    grid: {},
    tree: {},
    panel: {},
    combo: {},
    field: {},
    config: {},

});
Ext.reg('basepackage', BasePackage);
basepackage = new BasePackage();
