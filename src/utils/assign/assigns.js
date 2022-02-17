import { sample } from 'lodash';

export const generarKey = () => {
  const random = Math.random().toString(36).substring(2)
  const fecha = Date.now().toString(36)
  return random + fecha;
}

export const typeAssign = [
  { id: "typeCourse", title: "Tipo de curso" },
  { id: "modality", title: "Modalidad" },
  { id: "regional", title: "Regional" },
  { id: "centerTraining", title: "Centro de formación" },
  { id: "program", title: "Código de programa" },
  { id: "rol", title: "Rol" },
  { id: "user", title: "Usuario registrado" },
  { id: "anonimous", title: "Usuario no registrado" }
]

export const typeCourse = [
  { id: "titulada", title: "Titulada" },
  { id: "complementaria", title: "Complementaria" }
];

export const titulada = [
  { id: "auxiliar", title: "AUXILIAR" },
  { id: "operativo", title: "OPERARIO" },
  { id: "técnico", title: "TÉCNICO" },
  { id: "tecnólogo", title: "TECNÓLOGO" },
  { id: "especialización tecnológica", title: "ESPECIALIZACIÓN TECNOLÓGICA" },
  { id: "profundización técnica", title: "PROFUNDIZACIÓN TÉCNICA" }
];

export const complementaria = [
  { id: "complementaria virtual", title: "COMPLEMENTARIA VIRTUAL" },
  { id: "curso especial", title: "CURSO ESPECIAL" }
];

export const modality = [
  {id: "presencial", title: "PRESENCIAL"},
  {id: "virtual", title: "VIRTUAL"},
  {id: "a distancia", title: "A DISTANCIA"}
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

export const centerTraining = [
  {id: "1234", title: "Centro de comercio y servicio"},
  {id: "5627", title: "Centro de mercados"},
  {id: "3546", title: "Centro industria"}
];

export const program = [
  {id: "452354", title: "ANÁLISIS Y DESARROLLO DE SOFTWARE"},
  {id: "2891588", title: "ANIMACIÓN DIGITAL"},
  {id: "15165165", title: "DESARROLLO PUBLICITARIO"}
];

export const rol = [
  {id: "aprendiz", title: "APRENDIZ"},
  {id: "instructor", title: "INSTRUCTOR"}
];

export const user = [
  {id: "...", title: "..."},
  {id: "---", title: "---"}
];

export const anonimous = [
  {id: "no registrado", title: "NO REGISTRADO"}
];

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