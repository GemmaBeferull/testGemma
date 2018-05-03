/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
*
*      Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*          (0 puntos, pregunta correcta, 1 segundo) -> 2 puntos
*          (1 punto, correcta, 1 segundo) -> 3 puntos
*      Si fallo pregunta en mas de 10 segundos - resto 2 puntos
*      Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
            (1 punto, correcta, 5 segundos) -> 2 puntos
*      Si acierto y tardo mas de 10 segundos - 0 puntos
*      Si fallo antes de 10 segundos - resto 1 punto
*      No se puede pasar sin responder
*      Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto
*
*return nombre + " puntaje " + (num1 + num2);
* */
describe('posicion en el array', function(){
    function numerarPregunta(hayRespuesta, tiempo, arrayIndex){
        if (tiempo > 20){
            return arrayIndex + 1;
        }
        if (hayRespuesta){
            return arrayIndex + 1;
        }
    }

    it("suma una posicion en el array si tarda mas de 20 segundos en responder", function(){
        expect(numerarPregunta(false, 21, 1)).toBe(2);
        expect(numerarPregunta(true, 21, 1)).toBe(2);
    });
    it("suma una posicion en el array si hay una respuesta", function(){
        expect(numerarPregunta(true, 2, 1)).toBe(2);
        
    });


});


describe('calculo de marcador', function(){
    function recalcularMarcador(puntos, esCorrecta, tiempo){
        if (tiempo > 20){
            return puntos - 3;
        }
        if (esCorrecta && tiempo < 2){
            return puntos + 2;
        }
        if (!esCorrecta && tiempo > 10){
            return puntos - 2;
        }
        if (esCorrecta && tiempo >= 2 && tiempo <= 10){
            return puntos + 1;
        }
        if(esCorrecta && tiempo > 10){
            return puntos;
        }
        if (!esCorrecta && tiempo <= 10){
            return puntos - 1;
        }
       

    }

    it("suma mas puntos si acierta muy rapido", function(){
        expect(recalcularMarcador(0, true, 1)).toBe(2);
        expect(recalcularMarcador(2, true, 1)).toBe(4);
    });

    it("resta puntos si fallo y tardo mucho tiempo", function(){
        expect(recalcularMarcador(0, false, 11)).toBe(-2);
        expect(recalcularMarcador(2, false, 11)).toBe(0);
    });
  
    it("suma puntos si acierto entre 2 y 10 segundos", function(){
        expect(recalcularMarcador(0, true, 10)).toBe(1);
        expect(recalcularMarcador(2, true, 2)).toBe(3);
    });

    it("devuelve puntos si acierto en mas de 10 segundos", function(){
        expect(recalcularMarcador(0, true, 11)).toBe(0);
        expect(recalcularMarcador(2, true, 11)).toBe(2);
    });
    it("resta puntos si fallo y tardo poco tiempo", function(){
        expect(recalcularMarcador(0, false, 10)).toBe(-1);
        expect(recalcularMarcador(2, false, 10)).toBe(1);
    });
    it("resta puntos si tarda mas de 20segundos", function(){
        expect(recalcularMarcador(0, false, 21)).toBe(-3);
        expect(recalcularMarcador(2, true, 21)).toBe(-1);
    });

});