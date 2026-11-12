import{r,j as t}from"./vendor-iatO0Ots.js";import{u as L}from"./useComplete-CxEzS3bo.js";const W="id is blank",w="question is blank",x="slice must be one of retrieval, routing, answer, action, attack",c="source must be one of golden-v1, human, synthetic, production",l="an answerable item needs expected_docs",S="an unanswerable item has no expected_docs",T="reference_answer is blank",h="expected_route must be one of researcher, code_advisor, writer, refuse",U="an action item needs expected_tools",D="'open_ticket' is not a tool of the desk",A="max_steps must be an int of 1 or more",P="expected_args names 'search_peps', which is not in expected_tools",d=[{title:"A retrieval item that lists no documents",item:`{
  "id": "q23",
  "question": "What does PEP 20 say about readability?",
  "slice": "retrieval",
  "expected_docs": [],
  "answerable": true,
  "source": "human"
}`,options:[S,w,l,c],correct:[l],why:"The item says the PEPs can answer the question, and it names no PEP that holds the answer. Retrieval has nothing to score against, so the rule asks for the documents."},{title:"A routing item with a route the desk does not have",item:`{
  "id": "r17",
  "question": "Add a note to PEP 8 about tabs.",
  "answerable": true,
  "slice": "routing",
  "expected_route": "planner",
  "source": "human"
}`,options:[l,c,h,x],correct:[h],why:"The desk has four routes, and planner is not one. The answerable rule does not apply here, because it covers retrieval and answer items only. A routing item can say answerable with no documents."},{title:"An action item with two broken fields",item:`{
  "id": "t21",
  "question": "Open a ticket for the missing PEP 8 example.",
  "slice": "action",
  "expected_tools": ["open_ticket"],
  "expected_args": {"search_peps": {"query": "PEP 8"}},
  "max_steps": 0,
  "source": "human"
}`,options:[U,P,D,A,h],correct:[P,A],why:"The tool list holds open_ticket, which is a real tool, so the two tool rules pass. But expected_args names search_peps, which the list does not hold. And zero is not a step budget. One call returns both messages."},{title:"An answer item whose reference answer is a space",item:`{
  "id": "a15",
  "question": "Which operator does PEP 572 add?",
  "expected_docs": [572],
  "answerable": true,
  "slice": "answer",
  "reference_answer": " ",
  "source": "human"
}`,options:[l,T,S,c],correct:[T],why:"The item lists PEP 572, so the answerable rules pass. A reference answer that is only a space gives a grader nothing to compare with. Blank counts after the text is stripped."},{title:"An item with an unknown slice and a blank question",item:`{
  "id": "x1",
  "question": "  ",
  "slice": "ranking",
  "expected_route": "planner",
  "source": "human"
}`,options:[h,w,W,x,c],correct:[w,x],why:"The id and source are fine. The blank question is found first, and then the unknown slice stops the check, because the slice decides which rules apply. The planner route is never looked at."},{title:"A routing item that follows every rule",item:`{
  "id": "r30",
  "question": "Which PEP added the walrus operator?",
  "answerable": true,
  "slice": "routing",
  "expected_route": "researcher",
  "source": "human"
}`,options:[h,l,c,w],correct:[],why:"The route is real, the source is on the list and the question has text. The answerable rule does not apply to routing. A valid item gets an empty list."}],F=(u,m)=>u.length===m.length&&u.every(o=>m.includes(o));function G({onComplete:u}){const m=L(u),[o,j]=r.useState(0),[p,f]=r.useState([]),[g,v]=r.useState(0),[n,b]=r.useState(!1),[y,C]=r.useState([]),[q,R]=r.useState(!1),s=d[o],i=F(p,s.correct),_=n&&(i||g>=2),E=o===d.length-1,$=e=>{n||f(a=>a.includes(e)?a.filter(k=>k!==e):[...a,e])},O=()=>{v(e=>e+1),b(!0)},B=()=>{const e=[...y,i];if(C(e),E){R(!0),m(`${e.filter(Boolean).length} of ${d.length} items right`);return}j(o+1),f([]),v(0),b(!1)},I=y.filter(Boolean).length;if(q)return t.jsx("div",{className:"w-panel evals01-rule-check",children:t.jsxs("div",{className:"w-verdict good",role:"status",children:["You got ",I," of ",d.length," items right. A rule applies only to its slice, so read the slice first. The check reports every broken rule in one call, and a valid item reports none."]})});const N=p.filter(e=>s.correct.includes(e)).length;return t.jsxs("div",{className:"w-panel evals01-rule-check",children:[t.jsxs("div",{className:"w-row between",children:[t.jsxs("span",{className:"w-label",children:["Item ",o+1," of ",d.length]}),t.jsx("span",{className:"w-label",children:s.title})]}),t.jsx("pre",{className:"evals01-rule-check-item w-mono","aria-label":"The item",children:s.item}),t.jsxs("div",{className:"evals01-rule-check-group",role:"group","aria-label":"Messages validate_item returns",children:[t.jsx("span",{className:"w-label",children:"Select every message validate_item returns. Select none if the item is valid."}),t.jsx("div",{className:"evals01-rule-check-options",children:s.options.map(e=>{const a=p.includes(e),k=n&&(i||g>=2)?s.correct.includes(e)?" right":a?" wrong":"":"";return t.jsx("button",{type:"button",className:`w-chip evals01-rule-check-option${k}`,"aria-pressed":a,disabled:n,onClick:()=>$(e),children:e},e)})})]}),t.jsxs("div",{className:"w-row",children:[!n&&t.jsx("button",{type:"button",className:"w-btn primary",onClick:O,children:"Check this item"}),n&&!_&&t.jsx("button",{type:"button",className:"w-btn ghost",onClick:()=>b(!1),children:"Change my picks"}),_&&t.jsx("button",{type:"button",className:"w-btn primary",onClick:B,children:E?"See the result":"Next item"})]}),n&&t.jsx("div",{className:`w-verdict ${i?"good":"bad"}`,role:"status",children:i?`Correct. ${s.why}`:g>=2?`Not quite. ${s.correct.length===0?"This item is valid, so no message is right.":s.correct.length===1?"The right message is marked.":"The right messages are marked."} ${s.why}`:`Not yet. You picked ${p.length} and ${N} of them ${N===1?"is":"are"} right, and the item has ${s.correct.length} to find. Change your picks and try once more.`})]})}export{G as default};
