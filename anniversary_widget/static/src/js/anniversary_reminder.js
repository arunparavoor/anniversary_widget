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
        console.log("this.value",this.value);
        var contract_date = this._formatValue(this.value, 'date')
        console.log("contract_date",contract_date);
        var fieldDataValue = this.value;
        console.log("fieldDataValue1",fieldDataValue);
        var diffDays = Math.abs(fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'days'));
        var diffYears = Math.abs(fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'years'));
        console.log("fieldDataValue2",fieldDataValue);
        console.log("diffDays",diffDays);
        console.log("diffYears",diffYears);
        diffDays = diffDays - (diffYears*365)
        diffDays = 365 - Math.abs(diffDays)
        console.log("diffDays",diffDays);
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
        
        // const contract_date = this._formatValue(this.value, 'date')
        // const contract_date_value = this.value
        // console.log("contract_date",contract_date,contract_date_value);
        // var fieldDataValue = this.value;
        // fieldDataValue = fieldDataValue.year(nowUsertimeTZ.year()+1);
        // var diffDays = fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'days');
        // console.log("diff",diffDays);
        // var text;
        // console.log("contract_date_value",contract_date_value);
        // console.log("nowUsertimeTZ",nowUsertimeTZ);
        // if (contract_date_value > nowUsertimeTZ) {
        //     text = "Join1 on:" + this._formatValue(contract_date, 'date');
        //     console.log("contract_date2",contract_date);
        //     this.$el.toggleClass('text-muted font-weight-bold');
        // }
        // else if (diffDays === 1) {
        //     text = _t("Anniversary on Tomorrow ");
        // } else if (diffDays === 0) {
        //     text = _t(" Anniversary Today ");
        // } else if (diffDays > 0 && diffDays <= 30) {
        //     text = _.str.sprintf(_t('Anniversary in %s days'), diffDays);
        // } else if (diffDays > 0 && diffDays > 365) {
        //     var diffMonths = parseInt(diffDays/30);
        //     text = _.str.sprintf(_t('Anniversary in %s months'), diffMonths);
        // }        
        // else {
        //      text = "Joined on:"+this._formatValue(this.value, 'date');
        //      this.$el.toggleClass('text-muted font-weight-bold');
        // }        
        this.$el.text(text).attr('title',  this.value.format('DD/MMM/YYYY') );
        this.$el.toggleClass('text-primary font-weight-bold', diffDays > 0 && diffDays > 30);
        this.$el.toggleClass('text-warning font-weight-bold', diffDays > 0 && diffDays <= 30);
        this.$el.toggleClass('text-success ont-weight-bold fa fa-1x fa-gift', diffDays === 0);
        this.$el.toggleClass('text-danger font-weight-bold', diffDays === 1);
    }
});
fieldRegistry.add('anniversaryinfo', anniversaryinfo);
