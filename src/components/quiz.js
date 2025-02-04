import { $effect, $signal, html, } from "gloomjs";
import Question from "./question";
import ProgressBar from "./progress-bar";


/**
 * @param {Object} param0 
 * @param {{ q: string, a: [string,string,string], correct: number }[]} param0.questions
 * @param {(wrong: {question: number, selected: number}[])=>void} param0.end
 */
export default function Quiz({ questions, end }){
      const index = $signal(0);
      const answers = [];
      /**
       * @param {number} selected 
       */
      const next = ( selected ) => {
            answers[index.value] = selected;

            if( index.value < questions.length - 1 ){
                  index.value++;
            }else if( index.value == questions.length - 1 ){
                  const wrong = [];
                  for( let i = 0; i < questions.length; i++ ){
                        if( answers[i] != questions[i].correct ){
                              wrong.push({
                                    question: i,
                                    selected: answers[i],
                              });
                        }
                  }
                  end( wrong );
            }
      }
      /**
       * @param {number} selected 
       */
      const back = ( selected ) => {
            answers[index.value] = selected;

            if( index.value > 0 ){
                  index.value--;
            }
      }

      return html`
            <div style="display: grid; align-content: center; justify-content: center;">
                  <${ProgressBar({ tot: questions.length, curr: index, color:"var(--primary-color)" })}/>
            </div>
            
            <div style="margin-top: 50px;">
            ${
                  $effect( () =>  
                  Question({ 
                        a: questions[index.value].a, 
                        q: (index.value + 1) + ' - ' + questions[index.value].q , 
                        next, 
                        back,
                        isFirst: index.value == 0, 
                        isLast: index.value == questions.length - 1,
                        value: answers[index.value],
                  }), 
                  index ) 
            }
            </div>
      `
}