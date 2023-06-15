/** @odoo-module **/
import AbstractField from 'web.AbstractField';
import fieldRegistry from 'web.field_registry';
var core = require('web.core');
var _t = core._t;
var _lt = core._lt;
var session = require('web.session');
var anniversaryinfo = AbstractField.extend({
    description: _lt("Anniversary Info"),
    supportedFieldTypes: ['date', 'datetime'],

    /**
     * @override
     */
    init() {        
        this._super(...arguments);
        this.formatOptions.timezone = true;
    },   
    _renderReadonly() {
        if (this.value === false) {
            this.$el.removeClass('font-weight-bold text-danger text-warning');
            return;
        }
       
        var nowtimeUTC = moment().utc();
        var nowUsertimeTZ = nowtimeUTC.clone().add(session.getTZOffset(nowtimeUTC), 'minutes');
        var contract_date = this._formatValue(this.value, 'date')
        var fieldDataValue = this.value;
        var diffDays = Math.abs(fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'days'));
        var diffYears = Math.abs(fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'years'));
        diffDays = diffDays - (diffYears*365)
        diffDays = 365 - Math.abs(diffDays)
        let text;
        if (fieldDataValue > nowUsertimeTZ) {
            text = "Join on: " + this.value.format('DD/MMM/YYYY');
            this.$el.toggleClass('text-muted font-weight-bold');
        } else if (diffDays === 1) {
            text = _t("Anniversary on Tomorrow ");
        } else if (diffDays === 0) {
            text = _t(" Anniversary Today ");
        } else if (diffDays > 0 && diffDays <= 30) {
            text = _.str.sprintf(_t('Anniversary in %s days'), diffDays);
        } else if (diffDays > 0 && diffDays < 365) {
            var diffMonths = parseInt(diffDays/30);
            text = _.str.sprintf(_t('Anniversary in %s months'), diffMonths);
        } else {
             text = "Joined on: "+ this.value.format('DD/MMM/YYYY');
             this.$el.toggleClass('text-muted font-weight-bold');
        }
         
        this.$el.text(text).attr('title',  this.value.format('DD/MMM/YYYY') );
        this.$el.toggleClass('text-primary font-weight-bold', diffDays > 0 && diffDays > 30);
        this.$el.toggleClass('text-warning font-weight-bold', diffDays > 0 && diffDays <= 30);
        this.$el.toggleClass('text-success ont-weight-bold fa fa-1x fa-gift', diffDays === 0);
        this.$el.toggleClass('text-danger font-weight-bold', diffDays === 1);
    }
});
fieldRegistry.add('anniversaryinfo', anniversaryinfo);
