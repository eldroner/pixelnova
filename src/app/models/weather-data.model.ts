export interface WeatherData {
    origen: {
      productor: string;
      web: string;
      enlace: string;
      language: string;
      copyright: string;
      notaLegal: string;
    };
    elaborado: string;
    nombre: string;
    provincia: string;
    prediccion: { // Cambia "prediccion" a "previdacion"
      dia: {
        probPrecipitacion: { value: number; periodo: string }[];
        cotaNieveProv: { value: string; periodo: string }[];
        estadoCielo: { value: string; periodo: string; descripcion: string }[];
        viento: { direccion: string; velocidad: number; periodo: string }[];
        rachaMax: { value: string; periodo: string }[];
        temperatura: {
          maxima: number;
          minima: number;
          dato: { value: number; hora: number }[];
        };
        sensTermica: {
          maxima: number;
          minima: number;
          dato: { value: number; hora: number }[];
        };
        humedadRelativa: {
          maxima: number;
          minima: number;
          dato: { value: number; hora: number }[];
        };
        uvMax: number;
        fecha: string;
      }[];
    };
    id: number;
    version: number;
  }