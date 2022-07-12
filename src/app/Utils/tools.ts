const endpoints = {
  registUserSQL: '/user',
  registUserMongo: '/mongo/user',

  loginUserSQL: '/login',
  loginUserMongo: '/mongo/login',

  verifySQL: '/verify/',
  verifyMongo: '/mongo/verify/',
};
const API_URL = 'http://localhost:9090';

const METHODS_AUTH_MONGO= {
     LOGIN_SQL:"LOGIN_SQL",
     LOGUP_SQL:"LOGUP_SQL",
     VERIFY_SQL:"VERIFY_SQL",
};

const METHODS_AUTH_SQL= {
  LOGIN_MONGO:"LOGIN_MONGO" ,
  LOGUP_MONGO:"LOGUP_MONGO",
  VERIFY_MONGO:"VERIFY_MONGO",
}

const METHODS= {
  LOGIN:"LOGIN_SQL" ,
  LOGUP:"LOGUP_SQL",
  VERIFY:"VERIFY_SQL",
}

export default {
  services: {
    auth: {
      loginSQL: ((end: string) => `${API_URL}${end}`)(endpoints.loginUserSQL),
      loginMongo: ((end: string) => `${API_URL}${end}`)(
        endpoints.loginUserMongo
      ),

      registSQL: ((end: string) => `${API_URL}${end}`)(endpoints.registUserSQL),
      registMongo: ((end: string) => `${API_URL}${end}`)(
        endpoints.registUserMongo
      ),

      verifySQL: (
        (end: string) => (token: string) =>
          `${API_URL}${end}${token}`
      )(endpoints.verifySQL),

      verifyMongo: (
        (end: string) => (token: string) =>
          `${API_URL}${end}${token}`
      )(endpoints.verifyMongo),

       methods:{
        ...METHODS_AUTH_MONGO,
        ...METHODS_AUTH_SQL
       }
    },
  },

  components: {
     services:METHODS,
    card_absolute_error: 'card_absolute_error',
    card_absolute_success: 'card_absolute_success',

    login: {
      message_error_field: {
        email: {
          required: 'Youre email  is required',
          email: 'Invalid email detected',
        },
        password: {
          required: 'Youre password is required',
        },
      },
      mat_error_field: {
        password: '',
        email: '',
      },


    },

    logup: {
      map_mesage_error: {
        name: {
          required: 'Youre name  is required',
        },
        email: {
          required: 'Youre email  is required',
          email: 'The email  is invalid',
        },
        password: {
          required: 'Create youre password pleas',
        },
      },
      map_errors: {
        name: '',
        email: '',
        password: '',
      },
      welcome: (name: string, email: string) =>
        `Hola ${name}  ! Agradecemos que nos hayas elegido, por tu seguridad se requiere verificar la direccion del correo ${email}, es bueno que lo hagas en menos de una hora`,
    },

    verify: {
      welcome: (name: string) =>
        `Hola ${name} te damos la bienvenida a HOGARAPP, ya puedes empezar a disfrutar de nuestros servicios. No esperes mas.`,
    },
  },
};
