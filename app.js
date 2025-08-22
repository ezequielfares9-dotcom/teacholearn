// TeachOrLearn — app.js
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Resources
const teachers = [
  {
    title: "Lesson Plan Template (K‑12)",
    filename: "lesson-plan-template.md",
    description: "Plantilla clara y flexible para planificar clases con objetivos, materiales, procedimientos y evaluación.",
    preview: "assets/card-1.svg",
    tags: ["Planificación", "Evaluación", "EGB/BGU"],
    content:
`# Lesson Plan Template (K‑12)

Teacher:
Subject:
Grade:
Date:

## Objectives (SMART)
- 
- 

## Materials
- 

## Procedure (Stages)
1) Warm‑up (5')
2) Presentation (10')
3) Guided Practice (15')
4) Independent Practice (15')
5) Wrap‑up (5')

## Assessment
- Formative checks
- Exit ticket

## Differentiation
- Support (SEN)
- Fast‑finishers

## Reflection
- What worked?
- Improvements
`
  },
  {
    title: "Rubric: Speaking (A1‑B1)",
    filename: "rubric-speaking-a1-b1.md",
    description: "Rúbrica simple para evaluar producción oral: fluidez, precisión, pronunciación e interacción.",
    preview: "assets/card-2.svg",
    tags: ["Rúbrica", "Inglés", "Oral"],
    content:
`# Speaking Rubric (A1‑B1)

| Criteria | 4 | 3 | 2 | 1 |
|---|---|---|---|---|
| Fluency | Smooth, natural | Minor pauses | Frequent pauses | Halting |
| Accuracy | Few errors | Some errors | Many errors | Constant errors |
| Pronunciation | Clear | Mostly clear | Interferes sometimes | Hard to understand |
| Interaction | Initiates, responds | Responds well | Minimal response | Rarely interacts |

**Score:** /16  →  **Level:**  
`
  },
  {
    title: "Worksheet: Reading + Vocabulary",
    filename: "worksheet-reading-vocabulary.md",
    description: "Hoja de trabajo con texto corto, vocabulario clave y preguntas de comprensión.",
    preview: "assets/card-3.svg",
    tags: ["Worksheet", "Lectura", "Vocabulario"],
    content:
`# Reading & Vocabulary Worksheet

Topic: Daily Routines
Level: A2

### Text
Maria wakes up at 6:30. She makes coffee and checks her messages... 

### Vocabulary
- wake up
- make coffee
- check messages

### Comprehension
1) What time does Maria wake up?
2) What does she drink?
3) What does *check* mean?
`
  },
  {
    title: "Syllabus: English I (16 weeks)",
    filename: "syllabus-english-I.md",
    description: "Programa base de asignatura con objetivos, calendarización, evaluación y políticas.",
    preview: "assets/card-1.svg",
    tags: ["Sílabo", "Universidad", "Inglés"],
    content:
`# English I – Syllabus (16 Weeks)

Instructor: | Email: | Office Hours:

## Course Description
Functional English for beginners focusing on communication.

## Assessment
- Participation 10%
- Quizzes 20%
- Projects 30%
- Midterm 20%
- Final 20%

## Weekly Outline
W1: Introductions, be
W2: Family, have
...
W16: Final Exam
`
  },
];

const students = [
  {
    title: "Study Planner (30 días)",
    filename: "study-planner-30dias.md",
    description: "Agenda imprimible para organizar objetivos, hábitos y estudio diario.",
    preview: "assets/card-2.svg",
    tags: ["Productividad", "Hábitos", "Plan"],
    content:
`# Study Planner – 30 Days

Goal:
Why it matters:

| Day | Focus | Done |
|---|---|---|
| 1 | | ☐ |
| 2 | | ☐ |
| 3 | | ☐ |
...
| 30 | | ☐ |
`
  },
  {
    title: "Flashcards – 100 palabras básicas",
    filename: "flashcards-100-basic.md",
    description: "Lista de 100 palabras de alta frecuencia lista para Anki/quiz.",
    preview: "assets/card-3.svg",
    tags: ["Memoria", "Vocabulario", "Anki"],
    content:
`# 100 Basic Words (EN‑ES)
I = yo
you = tú/usted
he = él
she = ella
it = eso
we = nosotros
...
`
  },
  {
    title: "Checklist: Pronunciación en inglés",
    filename: "checklist-pronunciation.md",
    description: "Lista de verificación para practicar sonidos clave, acentuación y ritmo.",
    preview: "assets/card-1.svg",
    tags: ["Pronunciación", "Speaking"],
    content:
`# Pronunciation Checklist
- Th (think / this)
- Vowel length (ship vs sheep)
- Word stress (PHOtograph vs phoTOGraphy)
- Sentence stress & rhythm
- Connected speech (gonna, wanna)
`
  },
  {
    title: "Template: Cornell Notes",
    filename: "template-cornell-notes.md",
    description: "Plantilla de apuntes Cornell para mejorar comprensión y memoria.",
    preview: "assets/card-2.svg",
    tags: ["Técnicas de estudio", "Apuntes"],
    content:
`# Cornell Notes – Template

Course / Topic:
Date:

| Cues | Notes |
|---|---|
| | |

Summary:
`
  },
];

let role = "teacher";
const state = { query: "", tag: "" };

const els = {
  btnTeacher: document.getElementById('btnTeacher'),
  btnStudent: document.getElementById('btnStudent'),
  title: document.getElementById('resourceTitle'),
  search: document.getElementById('search'),
  tag: document.getElementById('tagSelect'),
  grid: document.getElementById('grid'),
  empty: document.getElementById('empty'),
};

function currentData(){
  return role === "teacher" ? teachers : students;
}

function uniqueTags(list){
  const s = new Set();
  list.forEach(r => (r.tags||[]).forEach(t => s.add(t)));
  return Array.from(s);
}

function renderTags(){
  const tags = uniqueTags(currentData());
  els.tag.innerHTML = '<option value=\"\">Todas las etiquetas</option>' + tags.map(t => `<option value="${t}">${t}</option>`).join('');
}

function downloadTextFile(filename, content, mime = "text/plain;charset=utf-8"){
  const blob = new Blob([content], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function cardTemplate(item){
  const tags = (item.tags||[]).map(t => `<span class="tag">${t}</span>`).join('');
  return `<article class="card">
    <img src="${item.preview}" alt="preview" />
    <div class="card-body">
      <h5>${item.title}</h5>
      <p>${item.description}</p>
      <div class="tags">${tags}</div>
      <a href="#" class="btn primary" data-dl="${encodeURIComponent(item.filename)}">Descargar</a>
    </div>
  </article>`;
}

function filterData(){
  const data = currentData();
  const q = state.query.trim().toLowerCase();
  const t = state.tag.toLowerCase();
  return data.filter(r => {
    const inTags = t ? (r.tags||[]).map(x => x.toLowerCase()).includes(t) : true;
    const haystack = (r.title + " " + r.description + " " + (r.tags||[]).join(" ")).toLowerCase();
    const inText = q ? haystack.includes(q) : true;
    return inTags && inText;
  });
}

function render(){
  const list = filterData();
  els.grid.innerHTML = list.map(cardTemplate).join('');
  els.empty.classList.toggle('hidden', list.length !== 0);

  // Bind downloads
  const buttons = els.grid.querySelectorAll('[data-dl]');
  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = filterData()[idx];
      downloadTextFile(item.filename, item.content);
    });
  });
}

function setRole(newRole){
  role = newRole;
  els.title.textContent = role === "teacher" ? "Recursos para profesores" : "Recursos para estudiantes";
  document.getElementById('btnTeacher').classList.toggle('active', role === "teacher");
  document.getElementById('btnStudent').classList.toggle('active', role === "student");
  state.tag = ""; els.tag.value = "";
  renderTags();
  render();
}

// Events
els.btnTeacher.addEventListener('click', () => setRole("teacher"));
els.btnStudent.addEventListener('click', () => setRole("student"));
els.search.addEventListener('input', (e) => { state.query = e.target.value; render(); });
els.tag.addEventListener('change', (e) => { state.tag = e.target.value; render(); });

// Init
renderTags();
render();
