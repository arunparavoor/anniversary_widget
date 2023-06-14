from odoo import models, fields, api, _

class Employee(models.Model):
    _inherit = "hr.employee"
    
    anniversary_date = fields.Date(compute='_compute_anniversary_date', groups="hr.group_hr_user", store=True,string="Anniversary info")


    @api.depends('contract_ids.state', 'contract_ids.date_start','first_contract_date')
    def _compute_anniversary_date(self):
        for employee in self:
            contracts = employee._get_first_contracts()
            if contracts:
                employee.anniversary_date = min(contracts.mapped('date_start'))
            else:
                employee.anniversary_date = False
