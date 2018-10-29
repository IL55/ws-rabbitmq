(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(e,t){},139:function(e,t){},143:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(51),c=n.n(a),u=(n(63),n(19)),l=n(25),o=n(14),s=n(52),m=n(53),b=n(56),p=n(54),f=n(57),d=n(55),h=n.n(d),E=new TextDecoder("utf-8"),g=function(e){function t(){var e,n;Object(s.a)(this,t);for(var r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];return(n=Object(b.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(i)))).state={error:null,client:null,subscriptions:[]},n.withErrorHandling=function(e){return function(){try{return e.apply(void 0,arguments)}catch(t){console.error(t),n.setState({error:t})}}},n.withFormHandling=function(e){return n.withErrorHandling(function(t){t.preventDefault();var n=Object(o.a)(Array(t.target.length).keys()).reduce(function(e,n){var r=t.target[n];return r.name?Object(l.a)({},e,Object(u.a)({},r.name,r.value)):e},{});return e(n)})},n.connect=n.withFormHandling(function(e){var t=e.url,r=h.a.connect(t);r.on("connect",function(){return n.setState({client:r})}),r.on("message",function(e,t){n.setState(function(n){return{subscriptions:n.subscriptions.map(function(n){return n.topic!==e?n:Object(l.a)({},n,{messages:Object(o.a)(n.messages).concat([E.decode(t)])})})}})})}),n.endClient=n.withErrorHandling(function(){n.state.client.end(!1,function(){return n.setState({client:null})})}),n.disconnect=n.withErrorHandling(function(){var e=n.state,t=e.client,r=e.subscriptions;r.length>0?t.unsubscribe(r.map(function(e){return e.topic}),function(){return n.endClient()}):n.endClient()}),n.publish=n.withFormHandling(function(e){var t=e.topic,r=e.message;document.getElementById("publish-message").value="",n.state.client.publish(t,r,{qos:2})}),n.subscribe=n.withFormHandling(function(e){var t=e.topic;document.getElementById("subscribe-topic").value="";var r=n.state,i=r.client;r.subscriptions.some(function(e){return e.topic===t})||i.subscribe(t,{qos:2},function(e,t){n.setState(function(e){return{subscriptions:Object(o.a)(e.subscriptions).concat(Object(o.a)(t.map(function(e){return{topic:e.topic,messages:[]}})))}})})}),n.unsubscribe=n.withErrorHandling(function(e){n.state.client.unsubscribe(e,function(){return n.setState(function(t){return{subscriptions:t.subscriptions.filter(function(t){return t.topic!==e})}})})}),n}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.error,r=t.client,a=t.subscriptions;return n?i.a.createElement("p",null,"Oops, something went wrong! ",i.a.createElement("a",{href:"/"},"Reload")):null===r?i.a.createElement("form",{onSubmit:this.connect},i.a.createElement("label",{htmlFor:"url"},"URL*:")," ",i.a.createElement("input",{id:"url",name:"url",placeholder:"ws://",defaultValue:"http://localhost:15675/ws",required:!0})," ",i.a.createElement("input",{type:"submit",value:"Connect"})):i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h2",null,"Status"),i.a.createElement("div",null,"Connected to ","".concat(r.options.href," "),i.a.createElement("button",{type:"button",onClick:this.disconnect},"Disconnect"))),i.a.createElement("div",null,i.a.createElement("h2",null,"Publish"),i.a.createElement("form",{onSubmit:this.publish},i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"publish-topic"},"Topic*:")," ",i.a.createElement("input",{id:"publish-topic",name:"topic",required:!0})),i.a.createElement("div",null,i.a.createElement("label",{htmlFor:"publish-message"},"Message*:")," ",i.a.createElement("input",{id:"publish-message",name:"message",required:!0})),i.a.createElement("input",{type:"submit",value:"Publish"}))),i.a.createElement("div",null,i.a.createElement("h2",null,"Subscribe"),i.a.createElement("form",{onSubmit:this.subscribe},i.a.createElement("label",{htmlFor:"subscribe-topic"},"Topic*:")," ",i.a.createElement("input",{id:"subscribe-topic",name:"topic",required:!0,defaultValue:"foo"})," ",i.a.createElement("input",{type:"submit",value:"Subscribe"})),i.a.createElement("div",{className:"topic-info"},a.map(function(t){var n=t.topic,r=t.messages;return i.a.createElement("div",{key:n},"Message count for ",i.a.createElement("strong",null,n),": ",r.length," ",i.a.createElement("button",{type:"button",onClick:function(){return e.unsubscribe(n)}},"Unsubscribe"),i.a.createElement("ul",{className:"message-list"},r.map(function(e,t){return i.a.createElement("li",{key:t},e)})))}))))}}]),t}(r.Component),v=function(){return i.a.createElement(g,null)};c.a.render(i.a.createElement(v,null),document.getElementById("root"))},58:function(e,t,n){e.exports=n(143)},63:function(e,t,n){},68:function(e,t){},70:function(e,t){}},[[58,2,1]]]);
//# sourceMappingURL=main.8840b907.chunk.js.map