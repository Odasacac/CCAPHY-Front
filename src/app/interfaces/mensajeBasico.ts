import { EmpleadoParaRestablecer } from "./empleadoParaRestablecer";

export interface Mensaje
{
    asunto: string;
    contenido: string;
    emisor: EmpleadoParaRestablecer;
    receptor: EmpleadoParaRestablecer;
}
