import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static slugPattern = '^[a-z0-9_]+(?:-[a-z0-9_]+)*$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'emailTaken':
          return `El correo electrónico ya está siendo usado por otro usuario`;

        case 'noStrider':
          return `No se puede usar el username de strider en la app`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electrónico';
          }

          return 'Error de patrón contra expresión regular';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor');

    await sleep(); // 2 segundos y medio

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static inputClasses(form: FormGroup, fieldName: string): string | null{
    if (!form.controls[fieldName]) return null;

    if ( form.controls[fieldName].errors && form.controls[fieldName].touched ) {
      
      return 'outline-error border-error';

    } else if ( !form.controls[fieldName].errors && form.controls[fieldName].touched ) {
      
      return 'outline-success border-success';

    } else {
      
      return '';
    }
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value === 'strider' ? { noStrider: true } : null;
  }

  static variants: { [key: number]: string } = {
    1 : "Náhuatl de la Sierra, noreste de Puebla",
    2 : "Náhuatl del noroeste central",
    3 : "Náhuatl del Istmo",
    4 : "Náhuatl de la Huasteca veracruzana",
    5 : "Náhuatl de la Huasteca potosina",
    6 : "Náhuatl de Oaxaca",
    7 : "Náhuatl de la Sierra negra, sur",
    8 : "Náhuatl de la Sierra negra, norte",
    9 : "Náhuatl central de Veracruz",
    10 : "Náhuatl de la Sierra oeste de Puebla",
    11 : "Náhuatl alto del norte de Puebla",
    12 : "Náhuatl del Istmo bajo",
    13 : "Náhuatl del centro de Puebla",
    14 : "Mexicano bajo de occidente",
    15 : "Mexicano del noroeste",
    16 : "Mexicano de Guerrero",
    17 : "Mexicano de occidente",
    18 : "Mexicano central de occidente",
    19 : "Mexicano central bajo",
    20 : "Mexicano de Temixco",
    21 : "Mexicano de Puente de Ixtla",
    22 : "Mexicano de Tetela del Volcán",
    23 : "Mexicano alto de occidente",
    24 : "Mexicano del oriente",
    25 : "Mexicano del oriente central",
    26 : "Mexicano del centro bajo",
    27 : "Mexicano del centro alto",
    28 : "Mexicano del centro",
    29 : "Mexicano del oriente de Puebla",
    30 : "Mexicano de la Huasteca hidalguense"
  }

  static states : { [key: string]: string } = {
    "01AS": "Aguascalientes",
    "02BC": "Baja California",
    "03BS": "Baja California Sur",
    "04CC": "Campeche",
    "05CL": "Coahuila de Zaragoza",
    "06CM": "Colima",
    "07CS": "Chiapas",
    "08CH": "Chihuahua",
    "09DF": "Ciudad de México",
    "10DG": "Durango",
    "11GT": "Guanajuato",
    "12GR": "Guerrero",
    "13HG": "Hidalgo",
    "14JC": "Jalisco",
    "15MC": "Estado de México",
    "16MN": "Michoacán de Ocampo",
    "17MS": "Morelos",
    "18NT": "Nayarit",
    "19NL": "Nuevo León",
    "20OC": "Oaxaca",
    "21PL": "Puebla",
    "22QT": "Querétaro",
    "23QR": "Quintana Roo",
    "24SP": "San Luis Potosí",
    "25SL": "Sinaloa",
    "26SR": "Sonora",
    "27TC": "Tabasco",
    "28TS": "Tamaulipas",
    "29TL": "Tlaxcala",
    "30VZ": "Veracruz de Ignacio de la Llave",
    "31YN": "Yucatán",
    "32ZS": "Zacatecas" 
  }

  static abreviaturas: { [key: string]: string } = {
    "adj.":       "Adjetivo", 
    "adv.":       "Adverbio", 
    "art.":       "Artículo", 
    "aux.":       "Auxiliar", 
    "dem.":       "Demostrativo",
    "calificat.": "Calificativo", 
    "compl.":     "Complementario", 
    "conj.":      "Conjunción", 
    "cort.":      "Cortesía", 
    "esp.":       "Español", 
    "f.":         "Femenino", 
    "fut.":       "Futuro", 
    "ger.":       "Gerundio", 
    "imper.":     "Imperativo",
    "indic.":     "Indicativo", 
    "indef.":     "Indefinido", 
    "interj.":    "Interjección", 
    "interr.":    "Interrogativo", 
    "irr.":       "Irregular", 
    "lit.":       "Literalmente", 
    "m.":         "Masculino", 
    "núm.card.":  "Número cardinal", 
    "núm.ord.":   "Número ordinal", 
    "obj.":       "Objeto", 
    "part.":      "Partícula", 
    "pers.":      "Persona",
    "prnl.":      "Pronominal", 
    "pl.":        "Plural", 
    "pos.":       "Posesivo", 
    "posp.":      "Posposición", 
    "pref.":      "Prefijo", 
    "prep.":      "Preposición", 
    "pret.":      "Pretérito", 
    "pres.":      "Presente", 
    "pron.":      "Pronombre", 
    "reg.":       "Regionalismo", 
    "rel.":       "Relativo", 
    "s.":         "Sustantivo", 
    "sing.":      "Singular", 
    "sinón.":     "Sinónimo", 
    "suf.":       "Sufijo",
    "v.":         "Verbo", 
    "v.i.":       "Verbo intransitivo", 
    "v. met.":    "Verbo meteorológico", 
    "v. prnl.":   "Verbo pronominal", 
    "v. r.":      "Verbo reflexivo", 
    "v. rec.":    "Verbo recíproco", 
    "v.t.":       "Verbo transitivo", 
    "v.t.i.":     "Verbo transitivo usado como intransitivo" 
  }
}