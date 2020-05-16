import { Producto } from './producto';

export class Pedido{
    idPedido: string;
    nifcliente: string;
    fechaPedido: Date;
    estadoPedido: string;
    listaElementosPedido: Array<[Producto, number]>; // <--- es un Array de arrays 
    tipoGastosEnvio: string;
    gastosEnvio: number;
    subtotal: number;
    total: number;
}