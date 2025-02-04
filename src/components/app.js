import { html, $signal, $effect } from "gloomjs";
import { Doves, Exotics } from "../questions";
/**
 * @param {number} num 
 */
function randUpTo( num ){
      const max = num*5;
      let res = 0;
      for( let i = 0; i < 10; i++ )
            res += Math.trunc( Math.random() * max/(i+1) );
      return Math.min( res%num, num - 1 )
}

/**
 * @param {{
 *   q: string;
 *   a: string[];
 *   correct: number;
 * }[]} group 
 * @param {number} num
 */
function generateFromGroup( group, num ){
      /**
      * @type {{
      *   q: string;
      *   a: string[];
      *   correct: number;
      * }[]}
      */
      const res = [];
      const pool = [...group];

      for( let i = 0; i < num; i++ ){
            res.push( pool.splice( randUpTo( pool.length ), 1 )[0] ); 
      }

      return res;
}

/**
 * @param {number} questionForGroup 
 */
function generateQuestions( questionForGroup ){
      return [
            ...generateFromGroup( Doves, questionForGroup ),
            ...generateFromGroup( Exotics, questionForGroup )
      ];
}

export default function App(){
      let start;
      let wrongAnswers = [];
      let questions;
      /**
       * @param {{
       *    question: number, 
       *    selected: number
       * }[]} wrong 
       */
      const analyzeWrong = wrong =>{
            wrongAnswers = wrong;
            showResults.value = true;
      }
      const reloadQuiz = () => {
            showResults.value = false;
      }
      const showResults = $signal(false);
      const Page = $effect( () => {
            if( showResults.value ){
                  return html`
                        <Statistics questions=${questions} wrong=${wrongAnswers} end=${reloadQuiz} start=${start} />
                  `
            }
            questions = generateQuestions( 5 );
            start = Date.now();
            return html`
                  <Quiz questions=${questions} end=${analyzeWrong}/>
            `
      }, showResults )

      return html`
            <div style="border-radius: 10px; margin-left: 20%; margin-top: 100px; background-color: #fff; width: 700px; height: fit-content; min-height: 500px; padding: 50px;">
                  ${Page}
            </div>
      `
}