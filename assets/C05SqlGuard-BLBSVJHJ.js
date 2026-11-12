import{r as d,j as e}from"./vendor-iatO0Ots.js";import{m as q}from"./react-DmiSq_ed.js";import{u as x}from"./useComplete-CxEzS3bo.js";import{M as N}from"./index-DiVb_ch2.js";import{A as j}from"./index-jyAhvC-o.js";import"./MotionConfigContext-BPT8-ODl.js";const c=[{sql:`SELECT s.name, SUM(i.total_gbp) AS owed
FROM invoices i
JOIN suppliers s ON s.id = i.supplier_id
WHERE i.status = 'open'
GROUP BY s.name
ORDER BY owed DESC
LIMIT 20`,note:"Allowed. It reads only permitted columns, it is a single SELECT and it carries its own limit."},{sql:`SELECT COUNT(*)
FROM invoices
WHERE due_date < CURRENT_DATE
  AND status = 'open'`,note:"Allowed. An aggregate returns one row, so the missing LIMIT does not matter. The invoices table is small enough for the time-out."},{sql:`WITH late AS (
  SELECT supplier_id, COUNT(*) AS n
  FROM invoices
  WHERE due_date < CURRENT_DATE - 30
  GROUP BY supplier_id
)
SELECT s.name, late.n
FROM late
JOIN suppliers s ON s.id = late.supplier_id
ORDER BY late.n DESC
LIMIT 10`,note:"Allowed. The subquery looks complicated, but every table and column in it is permitted. Complexity is not a policy rule."},{sql:`SELECT s.name, s.iban
FROM suppliers s
WHERE s.name ILIKE '%Northern%'
LIMIT 5`,note:"Blocked. The suppliers table is allowed, but the iban column is denied. A check on table names alone would miss it, so the parser must check columns."},{sql:`SELECT invoice_no, total_gbp
FROM invoices
WHERE supplier_id = $1
  AND issued_on >= $2
LIMIT 200`,note:"Allowed. The values are bound parameters, the columns are permitted and the limit is under the cap."},{sql:`SELECT account, SUM(amount_gbp) AS total
FROM ledger
WHERE posted_on BETWEEN '2026-09-01' AND '2026-09-30'
GROUP BY account`,note:"Allowed. The ledger has a date range, which the policy requires. The runner binds the literals and caps the rows, so the missing LIMIT is harmless."}],i=3,S=["It writes or changes data","It reads a denied column","It has no date range on the ledger","It has no row limit"],h=1,C=["Every query here is a SELECT, and the role is read-only anyway.","The deny list covers columns as well as tables, and a column can hide inside an allowed table.","Only the last query touches the ledger, and it has a date range.","The runner appends a row cap, and the aggregates return few rows."];function _({onComplete:E}){const[t,g]=d.useState(null),[a,b]=d.useState(null),[p,y]=d.useState(0),[r,m]=d.useState(!1),w=x(E),o=t===i&&a===h,l=r&&(o||p>=2),T=()=>{const n=p+1;y(n),m(!0);const s=t===i&&a===h;(s||n>=2)&&w(`${s?"Found the unsafe query and its rule":"Shown the unsafe query and its rule"} on attempt ${n}`)},R=()=>m(!1);let u="";return r&&!o&&(t!==i&&t!==null?u=`Query ${t+1} is safe. ${c[t].note}`:u=`Right query, wrong rule. ${a!==null?C[a]:""}`),e.jsx(N,{reducedMotion:"user",children:e.jsxs("div",{className:"w-panel design-sql-guard",children:[e.jsx("p",{className:"design-sql-guard-hint",children:"Illustrative queries from the Harbour Supplies finance assistant. One breaks the policy. Pick it, then pick the rule it breaks."}),e.jsxs("div",{className:"design-sql-guard-policy w-inset",children:[e.jsx("span",{className:"w-label",children:"Policy"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Read-only role, one SELECT per query."}),e.jsxs("li",{children:["Denied columns: ",e.jsx("code",{children:"suppliers.iban"})," and ",e.jsx("code",{children:"suppliers.sort_code"}),"."]}),e.jsx("li",{children:"Ledger queries need a date range."}),e.jsx("li",{children:"The runner binds literals, adds a row cap of 500 and stops at 10 seconds."})]})]}),e.jsx("div",{role:"radiogroup","aria-label":"Generated queries",className:"design-sql-guard-list",children:c.map((n,s)=>e.jsxs("button",{type:"button",role:"radio","aria-checked":t===s,disabled:l,className:`design-sql-guard-card${t===s?" is-on":""}${l&&s===i?" is-bad":""}`,onClick:()=>g(s),children:[e.jsxs("span",{className:"w-label",children:["Query ",s+1]}),e.jsx("pre",{className:"design-sql-guard-sql",children:n.sql})]},s))}),e.jsx("p",{className:"design-sql-guard-ask",children:"Which rule does it break?"}),e.jsx("div",{className:"w-row",role:"radiogroup","aria-label":"Rule broken",children:S.map((n,s)=>e.jsx("button",{type:"button",role:"radio","aria-checked":a===s,disabled:l,className:`w-chip${a===s?" is-on":""}${l&&s===h?" good":""}`,onClick:()=>b(s),children:n},n))}),!l&&!r&&e.jsx("button",{type:"button",className:"w-btn",disabled:t===null||a===null,onClick:T,children:"Check my answer"}),e.jsx(j,{children:r&&!l&&e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},className:"design-sql-guard-why miss",role:"status",children:[e.jsx("p",{children:u}),e.jsx("button",{type:"button",className:"w-btn",onClick:R,children:"Try once more"})]})}),l&&e.jsxs("div",{className:`w-verdict ${o?"good":"bad"}`,role:"status",children:[e.jsxs("p",{children:[o?"Correct. ":"The unsafe query is query 4, and it breaks the denied column rule. ",c[i].note]}),e.jsxs("p",{children:["The other five are safe: ",c.filter((n,s)=>s!==i).map(n=>n.note.replace(/^Allowed\. /,"")).join(" ")]}),e.jsx("p",{children:"The lesson: check every table and column the query touches, including inside subqueries, and back the parser with column grants on the read-only role."})]})]})})}export{_ as default};
