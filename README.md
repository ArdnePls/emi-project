# Respuestas

## Problemática de Burger King

- En principio, utilizaría para mappear los datos del excel de coordenadas alguna librería para parsear csv, como por ejemplo, `json2csv`. Obteniendo los valores de las coordenadas y de cada sucursal, haría el **cálculo correspondiente para poder calcular la distancia en kilómetros desde la dirección ingresada** (la del postulante) hasta la sucursal. Este kilometraje por sucursal se calcularía de la siguiente forma:

```
const deg2rad = (deg) => deg * (Math.PI / 180);

const obtainDistanceByCoordKM = (latBranch, lonBranch, latCustomer, lonCustomer) => {
  const earthRadiousKM = 6371;
  const distanceLat = deg2rad(latCustomer - latBranch);
  const distanceLon = deg2rad(lonCustomer - lonBranch);
  // Haversine
  const a = 
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos(deg2rad(latBranch)) * Math.cos(deg2rad(latCustomer)) * 
    Math.sin(distanceLon / 2) * Math.sin(distanceLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  // Distance
  return earthRadiousKM * c;
}
```

- Otra solución posible puede ser implementar la **integración con la API de Google Maps** para obtener la distancia entre dos puntos mediante la longitud y latitud. La ventaja de esto, es que ya no estaríamos calculando la distancia recta como si fuera una línea sobre la tierra, sino teniendo en cuenta las calles y recorrido. Esto tendría la desventaja de tener que pagar el servicio de la API, y también posibles latencias y demoras por la integración. Con esta API podremos enviar el origen (la dirección del cliente) con las múltiples direcciónes de las sucursales, en formato de lat y long. Nos devolverá un array ordenado en base al órden en  el cual le hayamos enviado los destinos. Esto devuelve la distancia en kilómetros y el tiempo de viaje. Como mencionaba anteriormente, devuelve la MEJOR RUTA recomendada, y el kilometraje proporcional por los caminos tomados, no una línea recta en el globo terráqueo.
[Distance Matrix](https://developers.google.com/maps/documentation/distance-matrix/overview?hl=es-419)

- Otra solución posible es utilizar **un package NPM** como por ejemplo, [distance-from](https://www.npmjs.com/package/distance-from), para evitar implementaciones innecesarias dentro de nuestro código. La desventaja de esto sería una nueva dependencia en el proyecto, que probablemente tenga dependencias propias de las cuales deberemos depender.

En conclusión, depende del proyecto y del presupuesto disponible, yo utilizaría las primeras dos soluciones, la segunda si se 
tiene licencia de Google Maps, ya que permite enviar la lista de direcciones de las sucursales sin tener que mappearlas por segunda
vez (es decir, luego de parsear el csv), y calcula todas las distancias de una forma más realista y no como una línea recta. Si no
se tiene una licencia de Maps, eligiría la primera opción, ya que es gratis y evade latencias que podrían producirse con las 
requests. Hay formas de optimizar el código para obtener una fórmula más eficiente.


## Problemática de Requests por minuto

Para controlar las requests por minuto, podríamos usar un middleware (por ejemplo, si estuvieramos usando Express), como por ejemplo [express-rate-limit](http://npmjs.com/package/express-rate-limit) . La ventaja de este package NPM es que no cuenta con dependencias, y a su vez considero que tiene solución tanto para API's pequeñas como para períodos de tiempo y requests mayores. En este caso, el valor que utilizaríamos es Requests por Minuto, para lo cual el package tiene por default ese período de tiempo, teniendo que asignar entonces, un máximo (max) de 600.000 requests (serían 10.000 por segundo proporcionalmente). 
Teniendo en cuenta la **escalabilidad**, deberíamos pensar en el caso de decidir períodos de tiempo mayores (por ejemplo, un año). Siendo que el `setTimeout()` de Node soporta hasta 2147483647 de delay, no almacenará nada mayor a 1ms. En ese caso tendremos que **definir un propio store** (como nos lo permite el package en la opción `store`) para designar un nuevo storage de requests distinto a la memoria (default MemoryStore), o bien utilizar otras herramientas de storage como `rate-limit-redis`, `rate-limit-mongo`, entre otras, lo cual el package recomienda en el caso de desear una solución más robusta. Esto sería menos económico y quizás performante, pero es una solución ante mayor período de tiempo que lo que permite el `setTimeout()`. 
Al ser un middleware, **la API estará respondiendo lo que nosotros definamos ante la recepción de mayor cuota de requests de lo predefinido**. Luego del tiempo declarado, se reseteará el contador y seguirá respondiendo normalmente.
La escalabilidad de la herramienta se refleja en la posibilidad de utilizar distintos storages, en base a la robustez requerida
y a los períodos de tiempo deseados. Esto permite utilizar más o menos recursos en funcionalidad a lo necesario.


