(this.webpackJsonpjg_movies=this.webpackJsonpjg_movies||[]).push([[0],{44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var s=n(2),c=n.n(s),a=n(15),i=n.n(a),r=n(3),l=n.n(r),o=n(5),j=n(16),d=n(17),m=n(19),h=n(18),u=n(6),b=n.n(u),v=n(0);var g=function(e){var t=e.event;return Object(v.jsxs)("header",{className:"header",children:[Object(v.jsx)("h1",{className:"logo",children:"JG Movies"}),Object(v.jsxs)("nav",{className:"gnb",children:[Object(v.jsx)("input",{type:"checkbox",id:"gnb_btn"}),Object(v.jsxs)("label",{htmlFor:"gnb_btn",className:"menu_bar",children:[Object(v.jsx)("span",{}),Object(v.jsx)("span",{}),Object(v.jsx)("span",{})]}),Object(v.jsxs)("ul",{children:[Object(v.jsx)("li",{children:Object(v.jsx)("h2",{"data-genre":"all",onClick:t,children:"Main"})}),Object(v.jsxs)("li",{className:"gnb_genres",children:[Object(v.jsx)("h2",{children:"Genre"}),Object(v.jsxs)("ul",{className:"sub_menu",children:[Object(v.jsx)("li",{children:Object(v.jsx)("p",{"data-genre":"action",onClick:t,children:"Action"})}),Object(v.jsx)("li",{children:Object(v.jsx)("p",{"data-genre":"thriller",onClick:t,children:"Thriller"})}),Object(v.jsx)("li",{children:Object(v.jsx)("p",{"data-genre":"romance",onClick:t,children:"Romance"})}),Object(v.jsx)("li",{children:Object(v.jsx)("p",{"data-genre":"comedy",onClick:t,children:"Comedy"})}),Object(v.jsx)("li",{children:Object(v.jsx)("p",{"data-genre":"animation",onClick:t,children:"Animation"})})]})]}),Object(v.jsx)("li",{children:Object(v.jsx)("h2",{children:"Search"})})]})]})]})};var x=function(){return Object(v.jsx)("div",{className:"loader_scroll",children:Object(v.jsx)("span",{className:"loader_text",children:"Loding..."})})};var O=function(e){e.id;var t=e.year,n=e.title,s=e.summary,c=e.poster,a=e.genres,i=e.rating;return Object(v.jsxs)("div",{className:"movie",children:[Object(v.jsx)("img",{src:c,alt:n,title:n}),Object(v.jsxs)("div",{className:"movie_data",children:[Object(v.jsxs)("h3",{className:"movie_title",children:[n," ",Object(v.jsx)("span",{className:"title_year",children:t})]}),Object(v.jsx)("h4",{className:"movie_rating",children:i.toString().includes(".")?i:"".concat(i,".0")}),Object(v.jsx)("ul",{className:"genres",children:a.map((function(e,t){return Object(v.jsx)("li",{className:"genres_genre",children:e},t)}))}),Object(v.jsx)("p",{className:"movie_summary",children:s.length>160?"".concat(s.slice(0,160),"..."):s})]})]})};n(44);var p=function(){return Object(v.jsx)("footer",{className:"footer",children:Object(v.jsx)("p",{children:"\xa9 JG Movies"})})},f=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(j.a)(this,n);for(var s=arguments.length,c=new Array(s),a=0;a<s;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).state={isLoading:!0,movies:[],apiUrl:"https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=all"},e.getMovies=Object(o.a)(l.a.mark((function t(){var n,s;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get(e.state.apiUrl);case 2:n=t.sent,s=n.data.data.movies,e.setState({movies:s,isLoading:!1});case 5:case"end":return t.stop()}}),t)}))),e.clickMenu=function(t){var n=document.getElementById("gnb_btn");n.checked,n.checked=!1;var s=t.target.dataset.genre;e.state.apiUrl==="https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=".concat(s)||e.setState({apiUrl:"https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=24&genre=".concat(s),isLoading:!0})},e.scrollGetPage=function(){document.addEventListener("scroll",(function(){for(var t=document.scrollingElement.scrollTop,n=document.scrollingElement.scrollHeight-document.scrollingElement.clientHeight,s=e.state.movies.length,c=function(c){if(t===n&&s===24*c){var a=document.querySelector(".loader_scroll");a.classList.add("show"),function(){var t=Object(o.a)(l.a.mark((function t(){var n,s,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.a.get("".concat(e.state.apiUrl,"&page=").concat(c+1));case 2:n=t.sent,s=n.data.data.movies,i=e.state.movies.concat(s),e.setState({movies:i}),a.classList.remove("show");case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}},a=1;a<16;a++)c(a)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.getMovies(),this.scrollGetPage()}},{key:"componentDidUpdate",value:function(){!1===this.state.isLoading||this.getMovies()}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.movies;return Object(v.jsxs)("section",{className:"container",children:[Object(v.jsx)(g,{event:this.clickMenu}),Object(v.jsx)(x,{}),t?Object(v.jsx)("div",{className:"loader",children:Object(v.jsx)("span",{className:"loader_text",children:"Loding..."})}):Object(v.jsxs)("div",{className:"warp",children:[Object(v.jsx)("div",{className:"movies",children:n.map((function(e,t){return Object(v.jsx)(O,{id:e.id,year:e.year,genres:e.genres,title:e.title,rating:e.rating,summary:e.summary,poster:e.medium_cover_image},t)}))}),Object(v.jsx)(p,{})]})]})}}]),n}(c.a.Component);n(45),n(46),n(47),n(48);var y=function(){return Object(v.jsx)(f,{})};i.a.render(Object(v.jsx)(y,{}),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.399627f1.chunk.js.map