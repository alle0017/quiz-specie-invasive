import { html } from "gloomjs";
/**@typedef {number} Milliseconds */
/**
 * @param {{
 *  wrong: {question: number, selected: number}[],
 *  questions: { q: string, a: [string,string,string], correct: number }[],
 *  end: () => void,
 *  start: Milliseconds,
 * }} param0
 */
export default function Statistics({ wrong, questions, end, start }){
      let dt = Date.now() - start;
      const h = Math.trunc(dt/3.6e6);
      dt %= 3.6e6;
      const min = Math.trunc(dt/6e4);
      dt %= 6e4;
      const sec = Math.trunc(dt/1000);
      const timeElapsed = `${h} h ${min} min ${sec} sec`;

      return html`
            <div>
                  <div style="font-size: 25px; font-weight: bolder; ">
                        <div style="margin-top: 20px;margin-bottom: 20px;">
                              Errate: ${wrong.length}
                              Corrette: ${questions.length - wrong.length}
                        </div>
                        <div>
                              Tempo Impiegato: ${timeElapsed}
                        </div>
                  </div>
                  <button @click=${end} style="width: 150px;margin-top: 20px;">
                        <span>fai un altro quiz</span>
                  </button>
                  ${wrong.map(w => html`
                              <div style="margin-bottom: 50px; margin-top: 50px; padding: 10px; border-radius: 5px; border: 2px solid black;">
                                    <div style="font-size: 20px; font-weight: bolder; margin-bottom: 20px; margin-top: 20px;">
                                          ${w.question+1} - ${questions[w.question].q}
                                    </div>
                                    <div style="background-color: var(--primary-color); margin-bottom: 10px; width: calc(100% - 40px); padding: 20px;">
                                          ${questions[w.question].a[questions[w.question].correct]}
                                    </div>
                                    <div style="background-color: var(--danger-color); width: calc(100% - 40px); padding: 20px;">
                                          ${questions[w.question].a[w.selected]}
                                    </div>
                              </div>
                        `
                  )}
            </div>
      `
}