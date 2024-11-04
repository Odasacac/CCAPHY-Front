import { EmpleadoParaRestablecer } from "./empleado-restablecer";

export interface Mensajes
{
    asunto: string;
    contenido: string;
    emisor: EmpleadoParaRestablecer;
    receptor: EmpleadoParaRestablecer;
}
