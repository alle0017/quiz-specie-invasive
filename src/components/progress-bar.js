import { html, css, $ref, $watcher } from "gloomjs";
/**@import {Signal} from "gloomjs" */

/**
 * @param {{ tot: number, curr: Signal<number>, color?: string }} param0 
 */
export default function ProgressBar({ tot, curr, color }){
      color ||= '#f00';
      const style = css`
            .pb-container {
                  width: 500px;
                  height: 20px;
                  border: 2px solid black;
                  border-radius: 5px;
            }
            .pb-bar {
                  display: inline-block;
                  height: 20px;
                  width: 0%;
                  position: relative;
                  left: 0px;
                  right: 0px;
                  background-color: ${color};
                  text-align: center;
                  transition: 0.5s linear;
            }
      `;
      const ref = $ref();

      $watcher( () => {
            ref.element.style.width = curr.value/tot*100 + '%';
      }, curr );

      return html`
            <div style=${style} class="pb-container">
                  <div ref=${ref} class="pb-bar">${curr.map( i => (i/tot*100).toFixed(2) )}%</div>
            </div>
      `
}