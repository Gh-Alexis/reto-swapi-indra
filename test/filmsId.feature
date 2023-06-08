Feature: Prueba de FilmsId 

  Scenario Outline: Obteniendo el Paydload para un Id de pelicula
    Given el id de la pelicula <filmsId>
    When estos son consultados en una api externa
    Then se obtendrá un objeto
    Then el objeto tendrá tantos elementos: <cantidadAtributos>
    Then el statusCode: <statusCode>
    Then el payload tendra la cantidad de elementos: <tamanoPayload>

    Examples:
      | filmsId  | cantidadAtributos | statusCode | tamanoPayload |
      | 1        | 2                 | 200        | 14            |
      | 2        | 2                 | 200        | 14            |