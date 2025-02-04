import { $ref, html, css } from "gloomjs";

/**
 * @param {{
 *    q: string,
 *    a: [string,string,string],
 *    next: ( selected: number ) => void,
 *    back: ( selected: number ) => void,
 *    isLast: boolean,
 *    isFirst: boolean,
 *    value?: number
 * }} param0
 * 
 * 
 */
export default function Question({ q, a, next, back, isLast, isFirst, value }){
      let selected = value;
      const btn = $ref();
      const check = e => {
            try {
                  let i = parseInt( e.target.id ) || 0;

                  e.target.setAttribute( 'checked', 'true' );

                  if( typeof selected == 'number' && selected != i ){
                        document.getElementById(selected+'').setAttribute( 'checked', 'false' )
                  }
                  if( btn.element.style.display != 'block' ) {
                        btn.element.style.display = 'block';
                  }
                  selected = i;
            } catch(e) {
                  console.error(e)
            }
      }
      const clean = () => {
            if( typeof selected == 'number' )
                  document.getElementById(selected+'').setAttribute( 'checked', 'false' )
      }

      const style = css`
            .cb-mark {
                  width: 20px;
                  height: 20px;
                  background-color: var(--light-grey);
                  border-radius: 5px;
            }

            .cb-mark[checked="true"] {
                  background-color: var( --primary-color );
            }

            .label {
                  font-weight: bold;
            }
            
      `;

      return html`
      <div style="display: grid">
            <div style="margin-bottom: 40px; font-size: 18px; height: 100px; max-height: 100px;">${q}</div>
            <div style="height: 200px; position: relative; top: 40px; left: 20px;">
                  ${
                        a.map( (v,i) => html`
                                    <div style="display: flex; gap: 10px; margin-top: 10px;" scoped=${style} >
                                          <span checked=${ i === value ? 'true': 'false' } class="cb-mark" id=${i} @click=${check} ></span>
                                          <span class="label" style="width: calc(100% - 30px); max-width: calc(100% - 30px);">${v}</span>
                                    </div>
                                    `
                        )
                  }
            </div>

            <div style="display: flex; gap: 30%; margin-top: 40px;">
                  <div style="width: 150px;">
                        <button style=${isFirst? 'display: none': 'display: block'} @click=${() =>{
                              const sel = selected;
                              clean();
                              back(sel);
                        }} >Precedente</button>
                  </div>
                  <div style="width: 150px;">
                        <button style=${typeof value == 'number'? 'display: block': 'display: none'} @click=${() =>{
                              const sel = selected;
                              clean();
                              btn.element.style.display = 'none';
                              next(sel);
                        }} ref=${btn} >${ isLast? 'Fine': 'Successiva' }</button>
                  </div>
            </div>
      </div>
      `
}