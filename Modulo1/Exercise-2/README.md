# Ejercicio 2

## Introducción

Hacer un servicio o una API no es simplemente programarla y que funcione. Si es de uso interno para una aplicación nuestra podrá tener más control sobre ella, pero el caso más frecuente es que sea utilizada por otros programadores o clientes externos.

Es muy importante que nuestra API o servicio tenga un contrato explícito muy estricto, es decir, debemos especificar todos y cada uno de los posibles resultados que puede producir nuestro servicio para que los programadores o clientes externos sepan identificar perfectamente cómo utilizarla y qué esperan que les devolvamos.

Además de esto siempre hay que protegerse de los errores. Imaginemos que un cliente malintencionado o inexperto comienza a hacernos requests no esperadas que provocan que nuestro servicio se comporte de manera no deseada, produciendo caídas, mal funcionamiento o servicio degradado para el resto de clientes. Para evitar esto necesitamos incorporar no sólo mecanismos de seguridad informática, sino un control de errores robusto.

En este segundo ejercicio nos pondremos por parejas para intentar destruir el servicio que desarrolló ayer nuestro compañero, para luego así poder documentarlo y protegerlo adecuadamente.

###  1 - Hackea el servicio de tu compañero.

- Descárgate el servicio de tu compañero e intenta romperlo.
  Utiliza herramientas como [Postman](https://www.getpostman.com/) o [cURL](https://curl.haxx.se/) para realizar llamadas erróneas o no deseadas y documenta qué falla y qué se debería esperar.
- Anótalas con claridad para pasárselas a tu compañero una vez hayas terminado.
- Implementa un cliente de línea de comandos para automatizar las pruebas con los fallos que has encontrado.
  Para ello, puedes crear primero un módulo cliente para tu servicio, y que el programa en línea de comandos haga uso de él.
  Este cliente lo utilizará tu compañero para validar que ha solucionado los problemas de su servicio,
  documenta cómo ha de usarse e incluye todas las peticiones que consideres relevantes, incluyendo todas las problemáticas que hayas detectado.

### 2 - Recupera tu servicio.

Queremos tener un servicio fuerte y estable, con un contrato explícito concreto.
Utiliza control de errores y validaciones dentro de tu servicio para que éste sea todo lo robusto que necesites.
Devuelve los códigos HTTP correspondientes para que el cliente o programador entienda qué está pasando en tu servicio.
Sigue estos criterios:

- Recoge las anotaciones de tu compañero y el cliente que ha preparado para validarlo.
- Mejora tu servicio para que no se rompa. Compruébalo con el cliente que te han proporcionado.

### 3 - Documentación

Hasta ahora el _contrato_ de tu API ha sido informal, aún así, es probable que tanto tú como tu compañero estéis de acuerdo en que algunas cosas estaban funcionando como deberían y otras no. Formaliza este contrato en forma de documentación estricta de tu servicio.

- Crea un archivo `README.md` o una carpeta `doc/` donde introducir cada una de las buenas y malas respuestas que acepta y devuelve tu servicio.
- Documenta los diferentes APIs de los componentes que has desarrollado.