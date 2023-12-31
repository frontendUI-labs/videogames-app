import "./style.css";
import "../src/home.ts";
import "../src/filterGames.ts";
import "../src/components/sidebar.ts";
import "../src/header.ts";
import "../src/components/details.ts";
import Router from "../src/router";

window.addEventListener("DOMContentLoaded", () => {
  Router.init();
});

// import Router from '../src/router.ts';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// window.addEventListener('DOMContentLoaded', () => {
//   Router.init();
// });
