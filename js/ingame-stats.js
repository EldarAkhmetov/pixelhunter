export default (results) => `\
  <div class="stats">
    <ul class="stats">
      ${results.map((result) => `\ <li class="stats__result stats__result--${result}"></li>`).join(``)}
    </ul>
  </div>`;
