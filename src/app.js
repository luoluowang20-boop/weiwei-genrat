import { createUuid } from './uuid.js';
const output = document.querySelector('#uuid');
const generate = document.querySelector('#generate');
const copy = document.querySelector('#copy');
const status = document.querySelector('#status');
let revision = 0;
function announce(message, error = false) {
  status.textContent = message;
  status.classList.toggle('error', error);
}
function refresh(initial = false) {
  revision++;
  copy.textContent = 'Copy UUID';
  try {
    output.value = createUuid();
    copy.disabled = false;
    generate.disabled = false;
    announce(initial ? 'Ready to copy. Yours to use.' : 'New UUID generated. Ready to copy.');
  } catch {
    output.value = '';
    copy.disabled = true;
    generate.disabled = true;
    announce('Generation is unavailable. Open this page in a current browser using HTTPS or localhost.', true);
  }
}
generate.addEventListener('click', () => refresh());
copy.addEventListener('click', async () => {
  const currentRevision = revision;
  const value = output.value;
  try {
    await navigator.clipboard.writeText(value);
    if (currentRevision !== revision) return;
    copy.textContent = 'Copied!';
    announce('Copied to clipboard. Paste it into your project.');
  } catch {
    if (currentRevision !== revision) return;
    output.focus();
    output.select();
    output.setSelectionRange(0, output.value.length);
    announce('Copy was blocked. Your UUID is selected; use your device’s Copy command.', true);
  }
});
window.addEventListener('pageshow', event => { if (event.persisted) refresh(); });
refresh(true);
