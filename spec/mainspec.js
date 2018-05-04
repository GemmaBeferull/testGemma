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

* */


// var questions = [
//     {title: '¿Cuántos años tiene Celio?', answer: {a: '35', b: 'No lo sabe ni ella', c: '25' }, correctAnswer: 'b'},
//     {title: '¿Cuál es la capital de Zambia?', answer: {a: 'Lusaka', b: 'Harare', c: 'Madrid' }, correctAnswer: 'a'},
//     {title: '¿Cuál es el nombre completo de Freud?', answer: {a: 'Adolf', b: 'Sefarad', c: 'Sigmund' }, correctAnswer: 'c'},
//     {title: '¿Cuál es el animal más rápido del mundo?', answer: {a: 'Guepardo', b: 'León', c:'Tortuga' }, correctAnswer: 'a'}
//   ]

    describe('Compara respuesta', function(){
        var questions=
            {
                id:1,
                question: 'Capital de Portugal?',
                answers:[
                    {id:1, answer1:'Lisboa'}, 
                    {id:2, answer2:'Faro'},
                    {id:3, answer3:'Porto'}
                ],
                correctAnswerId: 1,
                correctAnswer: 'Lisboa'
            }


        function IsAnswerCorrect(correctAnswer, selectedAnswer){
            if (correctAnswer == selectedAnswer){
                return true
            }
            if (correctAnswer !== selectedAnswer){
                return false
            }
        }

        it("compara respuesta", function(){
            expect(IsAnswerCorrect('Lisboa', 'Lisboa')).toBe(true);
            expect(IsAnswerCorrect('Lisboa', 'Porto')).toBe(false);
        });
       
        it("compara respuesta utilizando strings del array", function(){
            expect(IsAnswerCorrect(questions.correctAnswer, 'Lisboa')).toBe(true);
            expect(IsAnswerCorrect(questions.correctAnswer, 'Faro')).toBe(false);
        });
        it("compara respuesta utilizando id del array", function(){
            expect(IsAnswerCorrect(questions.correctAnswerId, 1)).toBe(true);
            expect(IsAnswerCorrect(questions.correctAnswerID, 2)).toBe(false);
        });

       
    });


  describe('reiniciar tiempo', function(){
    function reiniciaTiempo(hayRespuesta, tiempo){
        if (tiempo > 20){
            return tiempo = 0;
        }
        if (hayRespuesta){
            return tiempo = 0;
        }
    }

    it("reinicia el tiempo si tarda mas de 20 segundos en responder", function(){
        expect(reiniciaTiempo(false, 21)).toBe(0);
        expect(reiniciaTiempo(true, 21)).toBe(0);
    });
    it("reinicia el tiempo si hay una respuesta", function(){
        expect(reiniciaTiempo(true, 2)).toBe(0);          
    });

});

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

describe ('calculo de marcador', function(){
    function recalcularAcertandoPregunta (marcador, tiempo) {
      if (tiempo <= 2) {
        return marcador + 2;
      }
      if (tiempo > 2 && tiempo <= 10) {
        return marcador + 1;
      }
      if (tiempo > 10) {
        return marcador;
      }
    }
    function recalcularFallandoPregunta (marcador, tiempo) {
      if (tiempo <= 10) {
        return marcador - 1;
      }
      if (tiempo > 10) {
        return marcador - 2;
      }
    }
    function recalcularSinRespuesta (marcador) {
      return marcador - 3;
    }

    it ("suma los puntos si acierta muy rápido", function(){
      expect (recalcularAcertandoPregunta(0, 1)).toBe(2);
      expect (recalcularAcertandoPregunta(1, 1)).toBe(3);
    });
    it ("suma menos puntos si tarda mucho en dar la respuesta correcta", function(){
      expect (recalcularAcertandoPregunta(1, 5)).toBe(2);
      expect (recalcularAcertandoPregunta(1, 10)).toBe(2);
    });
    it ("no cambia la puntuación si tarda mucho en acertar", function(){
      expect (recalcularAcertandoPregunta(1, 11)).toBe(1);
    });
    it ("resta puntos si falla y tarda mucho", function(){
      expect (recalcularFallandoPregunta(1, 11)).toBe(-1);
    });
    it ("resta menos puntos si falla muy rápido", function(){
      expect (recalcularFallandoPregunta(0, 9)).toBe(-1);
      expect (recalcularFallandoPregunta(0, 10)).toBe(-1);
    });
    it ("resta puntos si tarda mucho en responder", function(){
      expect (recalcularFallandoPregunta(0, 21)).toBe(-2);
    });
    it ("resta puntos si no hay respuesta", function(){
      expect (recalcularSinRespuesta(0)).toBe(-3);
    });
});