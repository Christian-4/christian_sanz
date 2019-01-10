##¿Qué pasa si se envía si la base de datos da un error?
```
Pues si la DB ha dado un error, no se podría guardar este mensaje en la DB y no tendríamos constancia de que se ha mandado.
Intentaríamos algunas peticiones a la DB hasta que se conecte y guarde los datos o bien si llega al límite de intentos, guardaríamos ese mensaje en algún lugar, en memoria, o bien en una DB que tengamos de respaldo.
Haríamos peticiones con un intervalo de tiempo donde si vuelve a fallar se intentaría de nuevo persistir los datos en la DB, y una vez que consigan guardarse correctamente, borraríamos esta información de donde la manteníamos, o bien de la memoria, o bien de la DB de respaldo.

```
##¿Es igual de importante el error en el envío de un mensaje o en la consulta del registro?
```
No, pienso que es más importante el error en el envío de un mensaje que la consulta del registro.
¿Porque?, porque nos interesa más guardar el mensaje y tener constancia de los mensajes que ha mandado el usuario, por el costo que pueda suponer, que la consulta del registro, donde podríamos indicar al usuario que vuelva a realizar la petición.
Aún así, son dos errores que deberían ser bien controlados.
```