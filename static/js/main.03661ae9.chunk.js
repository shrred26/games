(this.webpackJsonpsnake=this.webpackJsonpsnake||[]).push([[0],{27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),a=n.n(r),i=n(19),o=n.n(i),u=(n(27),n(20)),s=n(2),f=n(7),j=n(10),l=n(8),b=(n(28),16),d=function(e){for(var t=[],n=Math.trunc((e-1)/2),c=0;c<e;c++){for(var r=[],a=0;a<e;a++)c===n&&a===n?r.push(1):r.push(0);t.push(r)}var i=O(t),o=i.x,u=i.y;return y(o,u,2,t)},h=function(e,t,n){return 0===e?(t*b+n+t)%2===0?"dark":"light":1===e?"blue":"red"},O=function e(t){var n=Math.floor(Math.random()*b),c=Math.floor(Math.random()*b);return 1===t[n][c]?e(t):{x:n,y:c}},y=function(e,t,n,c){return[].concat(Object(l.a)(c.slice(0,e)),[[].concat(Object(l.a)(c[e].slice(0,t)),[n],Object(l.a)(c[e].slice(t+1)))],Object(l.a)(c.slice(e+1)))},m={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]},v=function(){return window.localStorage.getItem("highScore")||0},w=function(e,t){return Object(j.a)(Object(j.a)({},e),t)},p=function(e){return{grid:d(e),snake:[[Math.trunc((e-1)/2),Math.trunc((e-1)/2)]],score:0}};var x=function(){var e=Object(r.useState)(!1),t=Object(f.a)(e,2),n=t[0],a=t[1],i=Object(r.useReducer)(w,b,p),o=Object(f.a)(i,2),u=o[0],s=u.grid,j=u.snake,d=u.score,y=o[1],x=Object(r.useState)(v),g=Object(f.a)(x,2),k=g[0],A=g[1],S=function(){var e=Object(r.useState)("ArrowRight"),t=Object(f.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){var e=function(e){if(e.keyCode>=37&&e.keyCode<=40){if(n===e.key)return;if("ArrowRight"===n&&"ArrowLeft"===e.key||"ArrowLeft"===n&&"ArrowRight"===e.key)return;if("ArrowDown"===n&&"ArrowUp"===e.key||"ArrowUp"===n&&"ArrowDown"===e.key)return;c(e.key)}};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[n]),n}(),E=Object(r.useRef)();return Object(r.useEffect)((function(){n||(clearInterval(E.current),E.current=setInterval((function(){var e=m[S],t=j[0][0]+e[0],n=j[0][1]+e[1];if(t>15||t<0||n>15||n<0||1===s[t][n])return a("Game Over"),clearInterval(E.current),void(d>k&&(window.localStorage.setItem("highScore",d),A(d)));var c=Object(l.a)(s),r=Object(l.a)(j),i=!1;if(2==c[t][n]&&(i=!0),r.unshift([t,n]),c[t][n]=1,i){var o=O(c),u=o.x,f=o.y;c[u][f]=2}else r.pop(),c[j[j.length-1][0]][j[j.length-1][1]]=0;y({grid:c,snake:r,score:i?d+1:d})}),100))})),Object(c.jsxs)("div",{className:"App",children:[Object(c.jsxs)("div",{className:"flex",children:[Object(c.jsx)("h1",{children:n||"Score: ".concat(d)}),Object(c.jsx)("button",{type:"button",onClick:function(){a(!1),y(p(b))},children:"Reset"}),Object(c.jsx)("h2",{children:"HighScore: ".concat(k)})]}),Object(c.jsx)("div",{className:"container",children:s.map((function(e,t){return e.map((function(e,n){return Object(c.jsx)("div",{className:"gridBlock ".concat(h(e,t,n))},t*b+n)}))}))})]})},g=(n(29),function(){var e=Object(r.useRef)(window.innerHeight/2),t=Object(r.useReducer)((function(t,n){switch(n.type){case"gravity":return e.current=t.y+t.Vy*n.sec,{y:e.current,Vy:t.Vy-200*n.sec};case"up":return{y:t.y,Vy:n.Vy};case"setY":return{y:n.y,Vy:t.Vy};case"setBoth":return{y:n.y,Vy:n.Vy};default:return t}}),{y:window.innerHeight/2,Vy:0}),n=Object(f.a)(t,2),a=n[0].y,i=n[1],o=Object(r.useState)([]),u=Object(f.a)(o,2),s=u[0],b=u[1],d=Object(r.useRef)([]),h=Object(r.useRef)(),O=Object(r.useState)(0),y=Object(f.a)(O,2),m=y[0],v=y[1],w=Object(r.useState)(!1),p=Object(f.a)(w,2),x=p[0],g=p[1];Object(r.useEffect)((function(){if(h){var e;return d.current[0]=requestAnimationFrame((function t(n){x?cancelAnimationFrame(d.current[0]):(void 0===e&&(e=n),i({type:"gravity",sec:(n-e)/1e3}),e=n,d.current[0]=requestAnimationFrame(t))})),function(){return cancelAnimationFrame(d.current[0])}}}),[h,x]),Object(r.useEffect)((function(){(a>window.innerHeight||a<4)&&g(!0)}),[a]),Object(r.useEffect)((function(){var e=function(e){"ArrowUp"===e.key&&i({type:"up",Vy:120})};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),Object(r.useEffect)((function(){return d.current[1]=setInterval((function(){if(x)clearInterval(d.current[1]);else{var e=1*window.innerHeight/4+Math.random()*(1*window.innerHeight/2-120),t=window.innerHeight-e-120;b((function(n){return[].concat(Object(l.a)(n),[{x:window.innerWidth-30,col1:e,col2:t}])}))}}),1e3),function(){clearInterval(d.current[1])}}),[x]);Object(r.useEffect)((function(){var t;return d.current[2]=requestAnimationFrame((function n(c){if(x)cancelAnimationFrame(d.current[2]);else{void 0===t&&(t=c);var r=c-t;b((function(t){t.length>0&&function(t){t.forEach((function(t){if(Math.abs(t.x-80)<13){var n=e.current;return console.log(n,t.col2,t.col2+120),void((n<t.col2||n>t.col2+120)&&g(!0))}}))}(t);var n=Object(l.a)(t).map((function(e){return Object(j.a)(Object(j.a)({},e),{},{x:e.x-150*r/1e3})}));return n[0]&&n[0].x<0&&(n.shift(),v((function(e){return e+.5}))),n})),t=c,d.current[2]=requestAnimationFrame(n)}})),function(){return cancelAnimationFrame(d.current[2])}}),[x]);return Object(c.jsxs)("div",{className:"sky",children:[Object(c.jsx)("h1",{className:"score",children:"Score: ".concat(m)}),x&&Object(c.jsxs)("div",{className:"center",children:[Object(c.jsx)("h2",{children:"Game Over"}),Object(c.jsx)("button",{type:"button",onClick:function(){b([]),i({type:"setBoth",y:window.innerHeight/2,Vy:0}),v(0),g(!1)},children:"Reset"})]}),Object(c.jsx)("div",{className:"atCenter",style:{transform:"translate(calc(80px - 50%), ".concat(-a,"px)")},children:"bird"}),s.map((function(e,t){return Object(c.jsxs)("div",{style:{transform:"translate(".concat(e.x,"px,0)")},className:"column",children:[Object(c.jsx)("div",{style:{height:"".concat(e.col1,"px")},className:"pipe"}),Object(c.jsx)("div",{style:{height:"120px"}}),Object(c.jsx)("div",{style:{height:"".concat(e.col2,"px")},className:"pipe"})]},t)}))]})}),k=function(){return Object(c.jsx)(u.a,{basename:"/games",children:Object(c.jsxs)(s.c,{children:[Object(c.jsx)(s.a,{path:"/snake",children:Object(c.jsx)(x,{})}),Object(c.jsx)(s.a,{path:"/flappy",children:Object(c.jsx)(g,{})}),Object(c.jsx)(s.a,{component:g})]})})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(k,{})}),document.getElementById("root")),A()}},[[35,1,2]]]);
//# sourceMappingURL=main.03661ae9.chunk.js.map