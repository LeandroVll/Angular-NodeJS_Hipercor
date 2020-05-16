import { Credenciales } from './credenciales';
import { Direccion } from './direccion';
import { Pedido } from './pedido';
export class cliente {

    nombre : string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: Date;
    telefono: string;
    nif: string;
    

    credenciales: Credenciales;
    direcciones: Direccion[];
    pedidos: Pedido[];

}