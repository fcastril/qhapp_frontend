import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'MENÚ PRINCIPAL',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    option: '1',
    subItems: [
      {
        label: 'Medicina',
        link: '/dash-medicine',
      },
      {
        label: 'Facturación',
        link: '/dash-billing'
      },
      {
        label: 'Agendamiento',
        link: '/dash-appointment'
      },
   ]
  },
  {
    label: 'Pacientes',
    icon: 'users',
    link: '/patients',
  },
  {
    label: 'Medicina Estética',
    icon: 'heart',
    link: '/medical-histories'
  },
  {
    label: 'Agenda diaria ',
    icon: 'calendar',
    link: '/daily-agenda',
  },
  {
    label: 'Agendamiento',
    icon: 'calendar',
  },
  {
    label: 'Inventario',
    icon: 'archive',
    subItems: [
      {
        label: 'Productos',
        link: '/products',
      },
      {
        label: 'Bodegas',
        link: '/warehouses'
      },
      {
        label: 'Lista de Precios',
        link: '/list-price'
      },
      {
        label: 'Movimientos Inventario',
        link: '/movements-entry'
      },
      {
        label: 'Consulta de inventario',
        link: '/report-products'
      },

    ]
  },
  {
    label: 'Facturación',
    icon: 'credit-card',
    subItems: [
      {
        label: 'Facturas',
        link: '/invoices',
      },
      {
        label: 'Notas crédito',
        link: '/credit-notes'
      },
      {
        label: 'Notas débito',
        link: '/debit-notes'
      }
    ]
  },
  {
    label: 'Agendamiento',
    icon: 'inbox',
    subItems: [
      {
        label: 'Citas',
        link: '/appointment-records',
      },
    ]
  },
  {
    label: 'Administración',
    isTitle: true
  },
  {
    label: 'Configuración',
    icon: 'settings',
    subItems: [
      {
        label: 'Usuarios',
        link: '/users'
      },
      {
        label: 'Perfiles',
        link: '/profiles'
      },
      {
        label: 'Cómo se entero?',
        link: '/types-hearabout'
      },
      {
        label: 'Tipos de Movimientos',
        link: '/types-movements',
      },
      {
        label: 'Tipos / Maestros Básicos',
        subItems: [
          {
            label: 'Tipos de Agenda',
            link: '/types-agendas',
          },
          {
            label: 'Tipos de Documentos',
            link: '/types-documents',
          },
          {
            label: 'Tipos de Vinculación',
            link: '/types-connections',
          },
          {
            label: 'Tipos de Parentescos',
            link: '/relations-ships',
          },
          {
            label: 'Tipos de Contribuyentes',
            link: '/types-taxpayers',
          },
          {
            label: 'Tipos de Medidas',
            link: '/types-measures',
          },
          {
            label: 'Regimenes Contables',
            link: '/types-accountings',
          },
          {
            label: 'Géneros',
            link: '/genders',
          },
          {
            label: 'Estados Civiles',
            link: '/civil-statuses',
          },
          {
            label: 'Ciudades',
            link: '/cities',
          },
          {
            label: 'Estado de Citas',
            link: '/status-appointments',
          },
          {
            label: 'Tratamientos',
            link: '/reasons-appointments'
          },
          {
            label: 'Diagnosticos',
            link: '/diagnostics'
          },
          {
            label: 'Notas para Agregar',
            link: '/addnotes'
          },

        ]

      },
      {
        label: 'PQR',
        link: '/pqrs'
      },
      {
        label: 'Encuestas de Satisfacción',
        link: '/surveys'
      },

    ]
  },
  {
    label: 'Medicina',
    icon: 'clipboard',
    subItems: [
      {
        label: 'Finalidades',
        link: '/purposes',
      },
      {
        label: 'Causas Externas',
        link: '/causes',
      },
      {
        label: 'Aseguradoras',
        link: '/insurance-companies'
      },
      {
        label: 'Especialidades',
        link: '/disciplines'
      },
      {
        label: 'Recetas',
        link: '/recipes'
      },
      {
        label: 'Consentimientos',
        link: '/consents'
      },
    ]
  },
  {
    label: 'Inventarios',
    icon: 'archive',
    subItems: [
      {
        label: 'Listas de Precios',
        link: '/types-pricelists',
      },
      {
        label: 'Tipos de Productos',
        link: '/types-products'
      },
    ]
  },
  {
    label: 'Movimientos',
    icon: 'credit-card',
    subItems: [

      {
        label: 'UEN',
        link: '/uens'
      },
      {
        label: 'Formas de Pago',
        link: '/types-payments'
      },
      {
        label: 'Motivos Notas',
        link: '/reasons-movements'
      },
    ]
  },
];
