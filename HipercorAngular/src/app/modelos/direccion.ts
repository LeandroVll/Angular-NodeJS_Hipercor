import {Provincia} from'./provincia';
import { Municipio } from './municipio';
//import {} from'';
export class Direccion{
    tipovia: string;
    nombrevia: string;
    edificio: string;
    escalera: string;
    piso: string;
    puerta: string;
    cp: string;
    provincia: Provincia;
    localidad: Municipio;
}