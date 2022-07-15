const endpoints = {
  registUserSQL: '/user',
  registUserMongo: '/mongo/user',

  loginUserSQL: '/login',
  loginUserMongo: '/mongo/login',

  verifySQL: '/verify/',
  verifyMongo: '/mongo/verify/',

  productSQL: '/product/',
  productMONGO: '/mongo/product/',
};

const API_URL = 'http://localhost:9090';

const METHODS_SERVICES = {
  LOGIN_SQL: 'LOGIN_SQL',
  LOGUP_SQL: 'LOGUP_SQL',
  VERIFY_SQL: 'VERIFY_SQL',
  LOGIN_MONGO: 'LOGIN_MONGO',
  LOGUP_MONGO: 'LOGUP_MONGO',
  VERIFY_MONGO: 'VERIFY_MONGO',
  LIST_UNXPIRED_SQL: 'LIST_UNXPIRED_SQL',
  NEW_PRODUCT_SQL:   'NEW_PRODUCT_SQL',
};

const METHODS = {
  LOGIN: 'LOGIN_SQL',
  LOGUP: 'LOGUP_SQL',
  VERIFY: 'VERIFY_SQL',
  NEW_PRODUCT:'NEW_PRODUCT_SQL',
  LIST_UNXPIRED:'LIST_UNXPIRED_SQL'
};



export default {
  services: {
    methods: {
      ...METHODS_SERVICES,
   },
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

    },

    product: {
      productSQL: (token: string) =>
        `${API_URL}${endpoints.productSQL}${token}`,

    }
  },

  components: {
    services: METHODS,
    card_absolute_error: 'card_absolute_error',
    card_absolute_success: 'card_absolute_success',
    IMAGE: `${API_URL}/images/`,
    Authorization: 'Authorization',
    routes: {
      home: '/',
      dashboard: '/dashboard',
    },

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

    unexpired: {
      img_products: 'products/',
    },

    newproduct: {

      message_error: {
        product: '',
        category: '',
        expired: '',
        total: '',
        quantity: '',
        unit: '',
      },

      errors: {
        product: {
          required: 'This field is required',
        },
        category: {
          required: 'This field is required',
        },
        expired: {
          required: 'This field is required',
        },
        total: {
          required: 'This field is required',
          min: 'This value its not valid',
        },
        quantity: {
          required: 'This field is required',
          min: 'This value its not valid',
        },
        unit: {
          required: 'This field is required',
        },
      },
      fieldsForm: {
        list: [
          'product',
          'category',
          'expiryDate',
          'total',
          'quantity',
          'unit',
          'price',
          'image',
          'alt',
        ],

        product: 'product',
        category: 'category',
        expiryDate: 'expiryDate',
        total: 'total',
        quantity: 'quantity',
        unit: 'unit',
        price: 'price',
        image: 'image',
        alt: 'alt',
      },

      form:(fields:string[],values:any)=>{
        const form:FormData=new FormData();
          for (let index = 0; index < fields.length; index++) {
             form.append(fields[index],values[fields[index]])
          }
          return form;
      }
    },
  },
};
