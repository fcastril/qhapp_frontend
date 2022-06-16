import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: "1",
    label: "MENÚ PRINCIPAL",
    isTitle: true,
  },
  {
    id: "11",
    label: "Dashboard",
    icon: "home",
    option: "1",
    subItems: [
      {
        id: "1105",
        label: "Medicina",
        link: "/dash-medicine",
      },
      {
        id: "1110",
        label: "Facturación",
        link: "/dash-billing",
      },
      {
        id: "1115",
        label: "Agendamiento",
        link: "/dash-appointment",
      },
    ],
  },
  {
    id: "12",
    label: "Pacientes",
    icon: "users",
    link: "/patients",
  },
  {
    id: "13",
    label: "Medicina Estética",
    icon: "heart",
    link: "/medical-histories",
  },
  {
    id: "14",
    label: "Agenda diaria ",
    icon: "calendar",
    link: "/daily-agenda",
  },
  {
    id: "15",
    label: "Agendamiento",
    icon: "calendar",
    subItems: [],
  },
  {
    id: "16",
    label: "Inventario",
    icon: "archive",
    subItems: [
      {
        id: "1605",
        label: "Productos",
        link: "/products",
      },
      {
        id: "1610",
        label: "Bodegas",
        link: "/warehouses",
      },
      {
        id: "1615",
        label: "Lista de Precios",
        link: "/list-price",
      },
      {
        id: "1620",
        label: "Movimientos Inventario",
        link: "/movements-entry",
      },
      {
        id: "1625",
        label: "Consulta de inventario",
        link: "/report-products",
      },
    ],
  },
  {
    id: "17",
    label: "Facturación",
    icon: "credit-card",
    subItems: [
      {
        id: "1705",
        label: "Facturas",
        link: "/invoices",
      },
      {
        id: "1710",
        label: "Notas crédito",
        link: "/credit-notes",
      },
      {
        id: "1715",
        label: "Notas débito",
        link: "/debit-notes",
      },
    ],
  },
  {
    id: "2",
    label: "Administración",
    isTitle: true,
  },
  {
    id: "21",
    label: "Configuración",
    icon: "settings",
    subItems: [
      {
        id: "2105",
        label: "Usuarios",
        link: "/users",
      },
      {
        id: "2110",
        label: "Perfiles",
        link: "/profiles",
      },
      {
        id: "2115",
        label: "Cómo se entero?",
        link: "/types-hearabout",
      },
      {
        id: "2120",
        label: "Tipos de Movimientos",
        link: "/types-movements",
      },
      {
        id: "2125",
        label: "Tipos / Maestros Básicos",
        subItems: [
          {
            id: "212505",
            label: "Tipos de Agenda",
            link: "/types-agendas",
          },
          {
            id: "212510",
            label: "Tipos de Documentos",
            link: "/types-documents",
          },
          {
            id: "212515",
            label: "Tipos de Vinculación",
            link: "/types-connections",
          },
          {
            id: "212520",
            label: "Tipos de Parentescos",
            link: "/relations-ships",
          },
          {
            id: "212525",
            label: "Tipos de Contribuyentes",
            link: "/types-taxpayers",
          },
          {
            id: "212530",
            label: "Tipos de Medidas",
            link: "/types-measures",
          },
          {
            id: "212535",
            label: "Regimenes Contables",
            link: "/types-accountings",
          },
          {
            id: "212540",
            label: "Géneros",
            link: "/genders",
          },
          {
            id: "212545",
            label: "Estados Civiles",
            link: "/civil-statuses",
          },
          {
            id: "212550",
            label: "Ciudades",
            link: "/cities",
          },
          {
            id: "212555",
            label: "Estado de Citas",
            link: "/status-appointments",
          },
          {
            id: "212560",
            label: "Tratamientos",
            link: "/reasons-appointments",
          },
          {
            id: "212565",
            label: "Diagnosticos",
            link: "/diagnostics",
          },
          {
            id: "212570",
            label: "Notas para Agregar",
            link: "/addnotes",
          },
        ],
      },
      {
        id: "2130",
        label: "PQR",
        link: "/pqrs",
      },
      {
        id: "2135",
        label: "Encuestas de Satisfacción",
        link: "/surveys",
      },
    ],
  },
  {
    id: "22",
    label: "Medicina",
    icon: "clipboard",
    subItems: [
      {
        id: "2205",
        label: "Finalidades",
        link: "/purposes",
      },
      {
        id: "2210",
        label: "Causas Externas",
        link: "/causes",
      },
      {
        id: "2215",
        label: "Aseguradoras",
        link: "/insurance-companies",
      },
      {
        id: "2220",
        label: "Especialidades",
        link: "/disciplines",
      },
      {
        id: "2225",
        label: "Recetas",
        link: "/recipes",
      },
      {
        id: "2230",
        label: "Consentimientos",
        link: "/consents",
      },
    ],
  },
  {
    id: "23",
    label: "Inventarios",
    icon: "archive",
    subItems: [
      {
        id: "2305",
        label: "Listas de Precios",
        link: "/types-pricelists",
      },
      {
        id: "2310",
        label: "Tipos de Productos",
        link: "/types-products",
      },
    ],
  },
  {
    id: "24",
    label: "Movimientos",
    icon: "credit-card",
    subItems: [
      {
        id: "2405",
        label: "UEN",
        link: "/uens",
      },
      {
        id: "2410",
        label: "Formas de Pago",
        link: "/types-payments",
      },
      {
        id: "2415",
        label: "Motivos Notas",
        link: "/reasons-movements",
      },
    ],
  },
];
