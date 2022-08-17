const endpoints = {
  registUserSQL: '/user',
  registUserMongo: '/mongo/user',

  loginUserSQL: '/login',
  loginUserMongo: '/mongo/login',

  verifySQL: '/verify/',
  verifyMongo: '/mongo/verify/',

  productSQL: '/product/',
  productMONGO: '/mongo/product/',

  productEXPSQL: '/product/expired/',
  productEXPMONGO: '/mongo/product/expired/',

  consumptionSQL: '/consumption/',
  consumptionMONGO: '/mongo/consumption/',


  donateSQL: '/expiry/donate/',
  donateMONGO: '/mongo/expiry/donate/',

  trashSQL: '/expiry/trash/',
  trashMONGO: '/mongo/expiry/trash/',
/**********************  ONLY SQL **************************** */
    remaining: '/queries/remaining/',
    duration: '/queries/durationsdays/',
    wast: '/queries/wast/',
    consumptiondays: '/queries/consumptiondays/',
    recomendation: '/queries/recomendation/',

    diet: '/diet/',
    message: '/message/',

    password: '/change_password/',
    password_verify: '/change_password/verify/',
    password_status: '/change_password/status/',

    config_product: '/product_config/',
    config_diet: '/diet_config/',





/********************** END  ONLY SQL **************************** */

};

const API_URL_LOCAL = 'http://localhost:9090';
const API_URL ='https://hogarapp.herokuapp.com';


const METHODS_SERVICES = {
  LOGIN_SQL: 'LOGIN_SQL',
  LOGUP_SQL: 'LOGUP_SQL',
  VERIFY_SQL: 'VERIFY_SQL',
  LOGIN_MONGO: 'LOGIN_MONGO',
  LOGUP_MONGO: 'LOGUP_MONGO',
  VERIFY_MONGO: 'VERIFY_MONGO',
  LIST_UNXPIRED_SQL: 'LIST_UNXPIRED_SQL',
  LIST_EXPIRED_SQL: 'LIST_EXPIRED_SQL',
  LIST_EXPIRED_MONGO: 'LIST_EXPIRED_MONGO',
  NEW_PRODUCT_SQL:   'NEW_PRODUCT_SQL',
  LIST_CONSUMPTION_SQL:   'LIST_CONSUMPTION_SQL',
  INSERT_CONSUMPTION_SQL:   'INSERT_CONSUMPTION_SQL',
  LIST_CONSUMPTION_MONGO:   'LIST_CONSUMPTION_MONGO',
  TO_TRASH_SQL:'TO_TRASH_SQL',
  TO_TRASH_MONGO:'TO_TRASH_MONGO',
  INSERT_DONATE_SQL:'INSERT_DONATE_SQL',
  INSERT_DONATE_MONGO:'INSERT_DONATE_MONGO',
  LIST_DONATE_SQL:'LIST_DONATE_SQL',
  LIST_DONATE_MONGO:'LIST_DONATE_MONGO',

  /**********************  ONLY SQL **************************** */
   REMAINING:"REMAINING",
   DURATION:"DURATION",
   WAST:"WAST",
   CONSUMPTIOND:"CONSUMPTIOND",
   RECOMENDATION:"RECOMENDATION",
   AVERAGE:"AVERAGE",


   INSERT_DIET:"INSERT_DIET",
   LIST_DIET:"LIST_DIET",
   PROGRESS_DAY_DIET:"PROGRESS_DAY_DIET",

   SEND_MESSAGE:"SEND_MESSAGE",

   CHANGE_PASSWORD:"CHANGE_PASSWORD",
   PASSWORD_STATUS:"PASSWORD_STATUS",
   VERIFY_PASSWORD_CHANGE:"VERIFY_PASSWORD_CHANGE",

   CONFIG_PRODUCT:"CONFIG_PRODUCT",
   GET_CONFIG_PRODUCT:"GET_CONFIG_PRODUCT",

   CONFIG_DIET:"CONFIG_DIET",
   GET_CONFIG_DIET:"GET_CONFIG_DIET",

  /**********************END  ONLY SQL **************************** */
};

const messages={
  requiredField:'El campo es obligatorio',
  invalidEmail:'Correo invalido detectado',
  required:(context:string)=>`Tu ${context} es obligatorio`
}

const METHODS = {
  LOGIN: METHODS_SERVICES.LOGIN_SQL,
  LOGUP: METHODS_SERVICES.LOGUP_SQL,
  VERIFY: METHODS_SERVICES.VERIFY_SQL,
  NEW_PRODUCT:METHODS_SERVICES.NEW_PRODUCT_SQL,
  LIST_UNXPIRED:METHODS_SERVICES.LIST_UNXPIRED_SQL,
  LIST_CONSUMPTION:METHODS_SERVICES.LIST_CONSUMPTION_SQL,
  INSERT_CONSUMPTION: METHODS_SERVICES.INSERT_CONSUMPTION_SQL,
  INSERT_DONATE:METHODS_SERVICES.INSERT_DONATE_SQL,
  LIST_DONATE:METHODS_SERVICES.LIST_DONATE_SQL,
  TO_TRASH:METHODS_SERVICES.TO_TRASH_SQL,
  LIST_EXPIRED:METHODS_SERVICES.LIST_EXPIRED_SQL,
  REMAINING:METHODS_SERVICES.REMAINING,
  DURATION:METHODS_SERVICES.DURATION,
  WAST:METHODS_SERVICES.WAST,
  CONSUMPTIOND:METHODS_SERVICES.CONSUMPTIOND,
  RECOMENDATION:METHODS_SERVICES.RECOMENDATION,
  INSERT_DIET:METHODS_SERVICES.INSERT_DIET,
  LIST_DIET:METHODS_SERVICES.LIST_DIET,
  PROGRESS_DAY_DIET:METHODS_SERVICES.PROGRESS_DAY_DIET,
  AVERAGE:METHODS_SERVICES.AVERAGE,
  SEND_MESSAGE:METHODS_SERVICES.SEND_MESSAGE,

  CHANGE_PASSWORD:METHODS_SERVICES.CHANGE_PASSWORD,
  PASSWORD_STATUS:METHODS_SERVICES.PASSWORD_STATUS,
  VERIFY_PASSWORD_CHANGE:METHODS_SERVICES.VERIFY_PASSWORD_CHANGE,

  CONFIG_PRODUCT:METHODS_SERVICES.CONFIG_PRODUCT,
  GET_CONFIG_PRODUCT:METHODS_SERVICES.GET_CONFIG_PRODUCT,

  CONFIG_DIET:METHODS_SERVICES.CONFIG_DIET,
  GET_CONFIG_DIET:METHODS_SERVICES.GET_CONFIG_DIET


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
      messages:{
        sendMessage: (
          (end: string) => (token: string) =>
            `${API_URL}${end}${token}`
        )(endpoints.message),
      },
    product: {
      productSQL: (token: string) =>
        `${API_URL}${endpoints.productSQL}${token}`,
        productEXPSQL: (token: string) =>
        `${API_URL}${endpoints.productEXPSQL}${token}`,

    },
    password:{
      change: () =>`${API_URL}${endpoints.password}`,
       status: (token: string) =>
        `${API_URL}${endpoints.password_status}${token}`,
        verify: (token: string) =>
        `${API_URL}${endpoints.password_verify}${token}`,
    },
    config_product:{
      config: (token:string) =>`${API_URL}${endpoints.config_product}${token}`,
    },
    config_diet:{
      config: (token:string) =>`${API_URL}${endpoints.config_diet}${token}`,
    },
      diet:{
        dietSql:(token: string) =>
        `${API_URL}${endpoints.diet}${token}`,
      }
    ,
    queries: {
      query:(end:'durationsdays'|'wast'|'consumptiondays'|'recomendation'|'remaining'|'average',token:string,queries:string)=> `${API_URL}/queries/${end}/${token}?${queries}`
    },
    consumption:{
      consumption:(token:string)=>`${API_URL}${endpoints.consumptionSQL}${token}`,
      ENOUGH:"No hay suficiente producto"
    },
    expiry:{
      donate:(token:string)=>`${API_URL}${endpoints.donateSQL}${token}`,
      trash:(token:string)=>`${API_URL}${endpoints.trashSQL}${token}`,
      ENOUGH:"No hay suficiente producto"
    }

  },

  components: {
    ToPlural:(singular:string)=>{
       let consonantes=["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","z"];
       let vocales=["a","e","i","o","u"];
      let  res=singular.slice(singular.length-1,singular.length)
      if(consonantes.includes(res))return "es"
      else if(vocales.includes(res))return "s"
      else return ""
    },

    nodata:{
      contextList:{Product:"Producto",expired:"Caducado",donate:"Donación",dieta:"Dieta",consumo:"Consumo",config:"Configuración",login:"Login",logup:"Log up"},
      message:(context:string)=>`No hemos detectado ningun/a ${context} reciente`
    },
    classes:{
      active:"active",
      today:"today",
      notToday:"notToday"
  },

    week:[{ui:"Domingo",code:"Domingo"},{ui:"Lunes",code:"Lunes"},{ui:"Martes",code:"Martes"},{ui:"Miércoles",code:"Miercoles"},{ui:"Jueves",code:"Jueves"},{ui:"Viernes",code:"Viernes"},{ui:"Sábado",code:"Sabado"}],
    services: METHODS,
    card_absolute_error: 'card_absolute_error',
    card_absolute_success: 'card_absolute_success',
    IMAGE: `${API_URL}/images/`,
    img_products: 'products/',
    Authorization: 'Authorization',
    Email:"Email",
    routes: {
      home: '/',
      dashboard: '/dashboard',
      login: '/login',
      logup: '/logup',

    },
    errors:{
      unverified:"Unverified user are detected",
     not_exist:"Noexistent user",
     novalid_credential:"Invalid Credentials",
     wrong:"Sory someing was wrong, try again in some minutes",
     enough:"Ther's not enough",
     token:"TokenExpiredError"
  },


    login: {
      message_error_field: {
        email: {
          required: messages.required('correo'),
          email: messages.invalidEmail,
        },
        password: {
          required:  messages.required('contraseña'),
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
          required: messages.required('nombre'),
        },
        email: {
          required: messages.required('correo'),
          email: messages.invalidEmail,
        },
        password: {
          required: 'Porfavor cree una contraseña de acceso',
        },
      },

      map_errors: {
        name: '',
        email: '',
        password: '',
      },

      welcome: (name: string, email: string) =>
        `Hola ${name}! Agradecemos que nos hayas elegido, por tu seguridad se requiere verificar la dirección del correo ${email} en menos de una hora`,
    },

    verify: {
      welcome: (name: string) =>
        `Hola ${name} te damos la bienvenida a HOGARAPP, ya puedes empezar a disfrutar de nuestros servicios. No esperes más !`,
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
          required: messages.requiredField,
        },
        category: {
          required:messages.requiredField,
        },
        expired: {
          required:messages.requiredField,
        },
        total: {
          required: messages.requiredField,
          min: 'This value its not valid',
        },
        quantity: {
          required: messages.requiredField,
          min: 'This value its not valid',
        },
        unit: {
          required: messages.requiredField,
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
        cleanLiveInteraction:()=>({remaining:0,
          durationsD:0,
          wast:0,
          consumptionsD:0,
          recomendation:0,
          average:0}),
        liveInteraction:{
          remaining:0,
          durationsD:0,
          wast:0,
          consumptionsD:0,
          recomendation:0,
          average:0
      },
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
      },

    },
    diet:{
      cleanForm:()=>({product: "",quantity:0,daysTime:[{day:0,textDay:"",time:""}], initDate: new Date, endDate: new Date })
      },
      messages:{
        messagesError:{
          email:{
            required:messages.requiredField,
            email:messages.invalidEmail,
          },
          ratting:{
            required:messages.requiredField,
            min:"Valor mínimo requerido: 1",
          },
          message:{
            required:messages.requiredField,
            minlength:"Total de caracteres mínimo requerido: 50",
          }
        }

      },
      config:{
       error_messages: {
          password:{
            required:messages.requiredField,
          },
          new_password:{
            required:messages.requiredField,
          },
          new_password2:{
            required:messages.requiredField,
            match:"Las coraseñas no coinciden"
          }
        }
      }
  },
};
