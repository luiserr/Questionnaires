import { sample } from 'lodash';

export const titulada = [
  { id: "check-1", title: "AUXILIAR" },
  { id: "check-2", title: "OPERARIO" },
  { id: "check-3", title: "TÉCNICO" },
  { id: "check-4", title: "TECNÓLOGO" },
  { id: "check-5", title: "ESPECIALIZACIÓN TECNOLÓGICA" },
  { id: "check-6", title: "PROFUNDIZACIÓN TÉCNICA" }
];

export const complementaria = [
  { id: "check-11", title: "COMPLEMENTARIA VIRTUAL" },
  { id: "check-21", title: "CURSO ESPECIAL" }
];

export const modalidad = [
  {id: "check-12", title: "PRESENCIAL"},
  {id: "check-12", title: "VIRTUAL"},
  {id: "check-12", title: "A DISTANCIA"}
];

export const regional = [
  {id:91,	title: "REGIONAL AMAZONAS"},
  {id:5,	title: "REGIONAL ANTIOQUIA"},
  {id:81,	title: "REGIONAL ARAUCA"},
  {id:8,	title: "REGIONAL ATLÁNTICO"},
  {id:13,	title: "REGIONAL BOLÍVAR"},
  {id:15,	title: "REGIONAL BOYACÁ"},
  {id:17,	title: "REGIONAL CALDAS"},
  {id:18,	title: "REGIONAL CAQUETÁ"},
  {id:85,	title: "REGIONAL CASANARE"},
  {id:19,	title: "REGIONAL CAUCA"},
  {id:20,	title: "REGIONAL CESAR"},
  {id:27,	title: "REGIONAL CHOCÓ"},
  {id:23,	title: "REGIONAL CÓRDOBA"},
  {id:25,	title: "REGIONAL CUNDINAMARCA"},
  {id:11,	title: "REGIONAL DISTRITO CAPITAL"},
  {id:94,	title: "REGIONAL GUAINÍA"},
  {id:44,	title: "REGIONAL GUAJIRA"},
  {id:95,	title: "REGIONAL GUAVIARE"},
  {id:41,	title: "REGIONAL HUILA"},
  {id:47,	title: "REGIONAL MAGDALENA"},
  {id:50,	title: "REGIONAL META"},
  {id:52,	title: "REGIONAL NARIÑO"},
  {id:54,	title: "REGIONAL NORTE DE SANTANDER"},
  {id:86,	title: "REGIONAL PUTUMAYO"},
  {id:63,	title: "REGIONAL QUINDÍO"},
  {id:66,	title: "REGIONAL RISARALDA"},
  {id:88,	title: "REGIONAL SAN ANDRÉS"},
  {id:68,	title: "REGIONAL SANTANDER"},
  {id:70,	title: "REGIONAL SUCRE"},
  {id:73,	title: "REGIONAL TOLIMA"},
  {id:76,	title: "REGIONAL VALLE"},
  {id:97,	title: "REGIONAL VAUPÉS"},
  {id:99,	title: "REGIONAL VICHADA"}]

const assigns = [...Array(26)].map((_, index) => ({
  id: index + 1,
  title: sample(['Titulo1', 'Titulo1', 'Titulo3']),
  status: sample(['Sin asignar', 'Asignada', 'Terminada', 'Cancelada']),
  fichas: sample([
    '123456',
    '61651594',
    '54165165',
    '5916510',
    '9895',
    '9519596',
    '8651',
    '95165065',
    '8591651065',
    '54165165'
  ]),
  dateCreate: sample(['23/02/1985', '10/02/2022','02/12/2021']),
  numUserSend: 1000,
  numUserResponse: 800,
  rangeActivate: sample(['23/02/1985', '10/02/2022','02/12/2021'])
}));

export default assigns;