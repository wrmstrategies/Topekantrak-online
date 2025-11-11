
function setActive(id){
  const map={home:'nav-home',events:'nav-events',roster:'nav-roster',join:'nav-join'};
  Object.values(map).forEach(x=>document.getElementById(x)?.classList.remove('active'));
  document.getElementById(map[id])?.classList.add('active');
}

async function loadEvents(){
  const el=document.getElementById('events-grid');
  try{
    const res=await fetch('data/events.json'); const items=await res.json();
    el.innerHTML=items.map(e=>`<div class="card"><h3>${e.title}</h3><p>${e.date} • ${e.location}</p><p>${e.notes||''}</p></div>`).join('');
  }catch{ el.textContent='Failed to load events.'}
}

async function loadLatestEvent(){
  try{
    const res=await fetch('data/events.json'); const items=await res.json();
    if(!items.length) return;
    const e=items[0];
    document.getElementById('latest-event').innerHTML = `<strong>${e.title}</strong><br>${e.date} • ${e.location}`;
  }catch{}
}

async function loadRoster(){
  const tb=document.querySelector('#roster tbody');
  try{
    const res=await fetch('data/roster.json'); const items=await res.json();
    tb.innerHTML=items.map(m=>`<tr><td>${m.name}</td><td>${m.role}</td><td>${m.email?'<' + m.email + '>':''}</td></tr>`).join('');
  }catch{ tb.innerHTML='<tr><td colspan=3>Failed to load roster.</td></tr>'}
}

async function submitJoin(ev){
  ev.preventDefault();
  const form=new FormData(ev.target);
  const payload=Object.fromEntries(form.entries());
  const status=document.getElementById('form-status');
  status.textContent='Sending…';
  try{
    // Replace with your Static Web App API route or Function URL
    const res = await fetch('/api/join', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    if(res.ok){ status.textContent='Thanks! We will reach out soon.'; ev.target.reset(); }
    else{ status.textContent='Failed to send. Try again later.'; }
  }catch{ status.textContent='Network error.'; }
  return false;
}
