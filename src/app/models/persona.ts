import { Usuario } from "./usuario";

export class Persona {
    _id!:string;
    usuario: Usuario=new Usuario();
    apellido: string="";
    nombre: string="";
    dni: string="";
    fechaNac: string="";
    celular: number=0;
    domicilio: string="";
    correo: string="";
    fotoPerfil: string="";

    constructor(){}
}
