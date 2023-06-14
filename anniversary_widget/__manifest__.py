{
    'name': 'Job anniversary info for all employees List and Kanban view',
    'summary': """Job anniversary for all employees in List and Kanban view.""",
    'version': '15.0',
    'license': "LGPL-3",
    'description': """Job anniversary info for all employees in List and Kanban view.Javascript widget.""",
    'author': 'Arun Reghu Kumar',
    'company': 'Tech4Logic',
    'website': 'https://tech4logic.wordpress.com/',
    'category': 'HR',
    'depends': ['base', 'hr','hr_contract'],
    'data': [
        'views/hr_employee_view.xml',
        ],
    'qweb': [],
    'assets': {
        'web.assets_backend': [
            'anniversary_widget/static/src/js/anniversary_reminder.js'
        ],
    },
    'images': ['static/description/banner.jpg'],
    'demo': [],
    'installable': True,
    'auto_install': False,

}
