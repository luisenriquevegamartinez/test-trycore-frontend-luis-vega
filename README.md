
**Table of Contents**

[TOCM]

[TOC]

### Caracteristicas de la Prueba

Aplicacion que permite identificar planetas y personas registradas en la base de datos y las relaciones que hay entre si.

- ####Modulo personas
	* crear 
	* editar
	* eliminar
	* contador de visitas
	* mostrar

- ####Modulo planetas
	* crear 
	* editar
	* eliminar
	* contador de visitas
	* mostrar

- ####Home
	* pagina con botones para redireccion a los modulos de persona y planeta
	* menu de navegacion con botones para redireccion a los modulos persona y planeta


# instrucciones de despliegue

#####Requisitos previos:
 - despliegue del backend

#####comandos
una vez clonado el repositorio y situado en la carpeta del proyecto ejecutamos el siguiente comando para instalar todas las dependencias del proyecto
``````
	npm install
``````
luego actualizar los valores de url server, en el archivo /src/environments/environment.prod.ts

``````javascript
export const environment = {
  production: true,
  urlServer: 'http://test-traycore-backend.test/api/'
};

``````
se debe reemplazar la linea http://test-traycore-backend.test/api/ con la url correspondiente al dominio donde se despliegue el backend


luego de debe compilar el proyecto con el siguiente comando
``````
ng build --prod
`````
esto genera una carpeta llamada "www" la cual debe ser colocada en el servidor en la carpeta public.


## Servidor de Desarrollo

Ejecute `ng serve` para un servidor de desarrollo. Vaya a `http: // localhost: 4200 /`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

