export default function Footer ({ html, state }) {
  return html`<footer>footer here<pre>${JSON.stringify(state, null, 2)}</footer>`
}
