import { mkdirSync, writeFileSync } from 'node:fs'

const outDir = 'docs'
mkdirSync(outDir, { recursive: true })

const sections = [
  {
    title: '프로젝트 전체 그림',
    body: [
      '이 프로젝트는 React + Vite로 만든 작은 CRUD 게시판입니다.',
      'CRUD = Create(글쓰기), Read(목록/상세보기), Update(수정), Delete(삭제)',
      '',
      '[화면이 시작되는 순서]',
      '',
      'index.html',
      '  |',
      '  |  <div id="root"></div> 자리 준비',
      '  v',
      'src/main.jsx',
      '  |',
      '  |  React를 #root에 꽂음',
      '  v',
      'App.jsx',
      '  |',
      '  |  주소에 따라 화면 선택',
      '  +---------------------+',
      '  |                     |',
      '  v                     v',
      'Board.jsx          Detail.jsx',
      '목록/글쓰기        상세보기'
    ]
  },
  {
    title: '파일 역할 그림',
    body: [
      'hospital',
      '  |',
      '  +-- index.html              브라우저가 처음 읽는 HTML',
      '  +-- vite.config.js          Vite + React 설정',
      '  +-- package.json            실행 명령어와 라이브러리 목록',
      '  |',
      '  +-- src',
      '      |',
      '      +-- main.jsx            React 시작점',
      '      +-- App.jsx             게시글 데이터와 CRUD 함수 보관',
      '      +-- index.css           전체 기본 스타일',
      '      +-- App.css             Vite 기본 스타일이 많이 남아 있음',
      '      |',
      '      +-- pages',
      '      |   +-- Board.jsx       메인 게시판 페이지',
      '      |   +-- Detail.jsx      상세보기 페이지',
      '      |',
      '      +-- components',
      '          +-- PostForm.jsx   글쓰기 폼',
      '          +-- PostList.jsx   글 목록 테이블'
    ]
  },
  {
    title: '데이터 흐름 큰 그림',
    body: [
      '게시글 데이터(posts)는 App.jsx에 있습니다.',
      '자식 컴포넌트들은 posts를 직접 소유하지 않고 props로 받아서 사용합니다.',
      '',
      '[props 내려가는 방향]',
      '',
      'App.jsx',
      '  posts',
      '  addPost()',
      '  deletePost()',
      '  updatePost()',
      '    |',
      '    +----------------------------+',
      '    |                            |',
      '    v                            v',
      'Board.jsx                    Detail.jsx',
      '    |                            |',
      '    +----------+                 |',
      '    |          |                 |',
      '    v          v                 v',
      'PostForm   PostList          글 하나 찾기',
      '글쓰기     목록/삭제         posts.find(...)',
      '',
      '[중요한 감각]',
      '데이터는 보통 위에서 아래로 내려갑니다.',
      '아래 컴포넌트가 데이터를 바꾸고 싶으면, 부모에게 받은 함수를 호출합니다.'
    ]
  },
  {
    title: 'index.html 그림',
    body: [
      '중요 코드:',
      '<div id="root"></div>',
      '<script type="module" src="/src/main.jsx"></script>',
      '',
      '[그림]',
      '',
      '브라우저',
      '  |',
      '  v',
      'index.html 읽음',
      '  |',
      '  +-- #root라는 빈 자리 발견',
      '  |',
      '  +-- /src/main.jsx 실행',
      '          |',
      '          v',
      '      React 화면이 #root 안으로 들어감',
      '',
      '#root는 빈 액자 같은 자리입니다.',
      'main.jsx가 그 액자 안에 React 앱을 넣어줍니다.'
    ]
  },
  {
    title: 'src/main.jsx 그림',
    body: [
      'main.jsx는 React 앱의 시작 파일입니다.',
      '',
      'createRoot(document.getElementById("root")).render(...)',
      '',
      '[그림]',
      '',
      'document.getElementById("root")',
      '  |',
      '  |  index.html의 <div id="root"> 찾기',
      '  v',
      'createRoot(...)',
      '  |',
      '  |  React가 쓸 수 있는 공간으로 만들기',
      '  v',
      'render(',
      '  <BrowserRouter>',
      '    <App />',
      '  </BrowserRouter>',
      ')',
      '',
      'BrowserRouter는 주소 이동 기능을 쓰기 위한 큰 울타리입니다.',
      'Link, Routes, Route, useParams는 이 울타리 안에서 자연스럽게 작동합니다.'
    ]
  },
  {
    title: 'src/App.jsx 그림',
    body: [
      'App.jsx는 게시판의 중심입니다.',
      'posts 배열과 글 추가/삭제/수정 함수를 가지고 있습니다.',
      '',
      '[posts 모양]',
      '',
      'posts = [',
      '  { id: 2, title: "두번째 글", writer: "관리자", content: "내용" },',
      '  { id: 1, title: "첫번째 글", writer: "관리자", content: "내용" }',
      ']',
      '',
      '[addPost 그림]',
      '',
      '새 글 입력',
      '  |',
      '  v',
      'newPost = { title, writer, content }',
      '  |',
      '  v',
      'nextId 계산',
      '  |',
      '  v',
      'setPosts([{...newPost, id: nextId}, ...posts])',
      '  |',
      '  v',
      '새 글이 목록 맨 앞에 추가됨',
      '',
      '[deletePost 그림]',
      '',
      '삭제할 id = 2',
      '  |',
      '  v',
      'posts.filter(item => item.id !== 2)',
      '  |',
      '  v',
      'id가 2가 아닌 글만 남음',
      '',
      '[updatePost 그림]',
      '',
      '수정된 글 객체',
      '  |',
      '  v',
      'posts.map(...)',
      '  |',
      '  +-- id가 같으면 수정된 글로 교체',
      '  +-- id가 다르면 기존 글 그대로 유지'
    ]
  },
  {
    title: '라우터 그림',
    body: [
      'App.jsx 안에는 Routes와 Route가 있습니다.',
      '',
      '[주소에 따라 화면 고르기]',
      '',
      '현재 주소가 "/"',
      '  |',
      '  v',
      '<Board /> 보여줌',
      '',
      '현재 주소가 "/detail/2"',
      '  |',
      '  v',
      '<Detail /> 보여줌',
      '  |',
      '  v',
      'Detail 안에서 useParams()로 id = "2" 꺼냄',
      '',
      '[Route 코드 감각]',
      'path="/"              -> 메인 목록',
      'path="/detail/:id"    -> 상세보기, :id 자리에 글 번호가 들어감'
    ]
  },
  {
    title: 'src/pages/Board.jsx 그림',
    body: [
      'Board.jsx는 메인 게시판 화면입니다.',
      '직접 많은 일을 하기보다 PostForm과 PostList를 배치합니다.',
      '',
      '[Board의 모양]',
      '',
      'Board.jsx',
      '  |',
      '  +-- <h2>게시판 제목</h2>',
      '  |',
      '  +-- <PostForm addPost={props.addPost} />',
      '  |       |',
      '  |       +-- 글쓰기 담당',
      '  |',
      '  +-- <PostList posts={props.posts} deletePost={props.deletePost} ... />',
      '          |',
      '          +-- 목록 보여주기 / 삭제 / 상세 이동 담당',
      '',
      'Board는 중간 관리자 같은 역할입니다.',
      'App에게 받은 것을 PostForm, PostList에게 다시 나눠줍니다.'
    ]
  },
  {
    title: 'src/components/PostForm.jsx 그림',
    body: [
      'PostForm은 글쓰기 입력 폼입니다.',
      '',
      '[state 3개]',
      '',
      'title    -> 제목 input 값',
      'writer   -> 작성자 input 값',
      'content  -> 내용 textarea 값',
      '',
      '[입력할 때 흐름]',
      '',
      '사용자가 제목 input에 "안녕" 입력',
      '  |',
      '  v',
      'onChange 이벤트 발생',
      '  |',
      '  v',
      'setTitle(e.target.value)',
      '  |',
      '  v',
      'title state가 "안녕"으로 바뀜',
      '  |',
      '  v',
      'input value={title}라서 화면에도 "안녕" 표시',
      '',
      '[등록 버튼 흐름]',
      '',
      '등록 버튼 클릭',
      '  |',
      '  v',
      'submitB() 실행',
      '  |',
      '  +-- 빈 칸 검사: trim() === "" ?',
      '  |       |',
      '  |       +-- 비었으면 alert 후 종료',
      '  |',
      '  +-- 안 비었으면 newPost 만들기',
      '          |',
      '          v',
      '      props.addPost(newPost)',
      '          |',
      '          v',
      '      App.jsx의 posts에 새 글 추가'
    ]
  },
  {
    title: 'src/components/PostList.jsx 그림',
    body: [
      'PostList는 게시글 목록을 table로 보여줍니다.',
      '',
      '[조건부 렌더링]',
      '',
      'props.posts.length === 0 ?',
      '  |',
      '  +-- true  -> "등록된 게시글이 없습니다"',
      '  |',
      '  +-- false -> table 보여주기',
      '',
      '[map 그림]',
      '',
      'posts 배열',
      '  |',
      '  +-- { id: 2, title: "두번째 글" }',
      '  +-- { id: 1, title: "첫번째 글" }',
      '  |',
      '  v',
      'posts.map(item => <tr>...</tr>)',
      '  |',
      '  v',
      'table 줄 생성',
      '  +-- <tr>2번 글</tr>',
      '  +-- <tr>1번 글</tr>',
      '',
      '[상세 이동]',
      '',
      '<Link to={`/detail/${item.id}`}>{item.title}</Link>',
      '',
      'item.id가 2라면:',
      '/detail/2 주소로 이동',
      '',
      '[삭제]',
      '',
      '삭제 버튼 클릭',
      '  |',
      '  v',
      'props.deletePost(item.id)',
      '  |',
      '  v',
      'App.jsx의 deletePost가 posts를 새 배열로 바꿈'
    ]
  },
  {
    title: 'src/pages/Detail.jsx 그림',
    body: [
      'Detail은 상세보기 페이지입니다.',
      '목록에서 /detail/2 같은 주소로 이동하면, 여기서 id가 2인 글을 찾습니다.',
      '',
      '[useParams 그림]',
      '',
      '주소: /detail/2',
      'Route: /detail/:id',
      '          |',
      '          v',
      'useParams() 결과',
      '{ id: "2" }',
      '',
      'const { id } = useParams()',
      '  |',
      '  v',
      'id 변수에는 "2"가 들어감',
      '',
      '[find 그림]',
      '',
      'posts = [',
      '  { id: 2, title: "두번째 글" },',
      '  { id: 1, title: "첫번째 글" }',
      ']',
      '',
      'id = "2"',
      'Number(id) = 2',
      '',
      'posts.find(item => item.id === Number(id))',
      '  |',
      '  +-- 첫 번째 item: 2 === 2 true',
      '  |',
      '  v',
      'post = { id: 2, title: "두번째 글" }',
      '',
      '[현재 안 보이는 이유 그림]',
      '',
      'const [isEdit, setIsEdit] = useState(false)',
      '  |',
      '  v',
      '처음 isEdit는 false',
      '  |',
      '  v',
      'isEdit ? 수정모드 : 읽기모드',
      '  |',
      '  v',
      'false라서 읽기모드 쪽으로 감',
      '  |',
      '  v',
      '읽기모드 JSX가 <></> 빈 상태',
      '  |',
      '  v',
      '화면에 아무것도 안 보임'
    ]
  },
  {
    title: 'useState 그림',
    body: [
      'useState는 React가 값을 기억하게 만드는 도구입니다.',
      '',
      'const [title, setTitle] = useState("")',
      '',
      '[그림]',
      '',
      'React 기억상자',
      '+-------------------+',
      '| title = ""        |',
      '+-------------------+',
      '        |',
      '        | setTitle("새 제목")',
      '        v',
      '+-------------------+',
      '| title = "새 제목" |',
      '+-------------------+',
      '',
      '중요:',
      'title = "새 제목"처럼 직접 바꾸는 게 아니라',
      'setTitle("새 제목") 함수를 써서 바꿉니다.'
    ]
  },
  {
    title: 'map, filter, find 그림',
    body: [
      '[map: 여러 개를 여러 개로 바꿈]',
      '',
      '[1, 2, 3].map(x => x * 2)',
      '  |',
      '  v',
      '[2, 4, 6]',
      '',
      '게시판에서는 posts.map(...)으로 게시글 여러 개를 tr 여러 줄로 바꿉니다.',
      '',
      '[filter: 조건에 맞는 것만 남김]',
      '',
      '[1, 2, 3].filter(x => x !== 2)',
      '  |',
      '  v',
      '[1, 3]',
      '',
      '게시판에서는 deletePost에서 삭제할 id가 아닌 글만 남깁니다.',
      '',
      '[find: 조건에 맞는 것 하나만 찾음]',
      '',
      '[{id:1}, {id:2}].find(item => item.id === 2)',
      '  |',
      '  v',
      '{id:2}',
      '',
      '게시판에서는 Detail에서 주소 id와 같은 게시글 하나를 찾습니다.'
    ]
  },
  {
    title: 'props 그림',
    body: [
      'props는 부모가 자식에게 건네주는 값입니다.',
      '',
      '[그림]',
      '',
      'App.jsx',
      '  |',
      '  |  <Board posts={posts} addPost={addPost} />',
      '  v',
      'Board.jsx',
      '  |',
      '  |  props.posts',
      '  |  props.addPost',
      '  v',
      'PostForm.jsx / PostList.jsx',
      '',
      '쉽게 말하면:',
      '부모: 이 데이터랑 함수 써!',
      '자식: props로 받아서 쓸게!',
      '',
      '주의:',
      '자식이 posts를 직접 바꾸는 게 아닙니다.',
      '자식은 addPost/deletePost 같은 함수를 호출해서 부모에게 변경을 부탁합니다.'
    ]
  },
  {
    title: '버튼 클릭 흐름 그림',
    body: [
      '[글 등록 버튼]',
      '',
      'PostForm의 등록 버튼',
      '  |',
      '  v',
      'submitB',
      '  |',
      '  v',
      'props.addPost(newPost)',
      '  |',
      '  v',
      'App.jsx addPost',
      '  |',
      '  v',
      'setPosts',
      '  |',
      '  v',
      '화면 다시 그림',
      '',
      '[삭제 버튼]',
      '',
      'PostList의 삭제 버튼',
      '  |',
      '  v',
      'props.deletePost(item.id)',
      '  |',
      '  v',
      'App.jsx deletePost',
      '  |',
      '  v',
      'filter로 글 제거',
      '  |',
      '  v',
      'setPosts',
      '  |',
      '  v',
      '화면 다시 그림'
    ]
  },
  {
    title: '공부 순서 그림',
    body: [
      '처음부터 다 이해하려고 하면 머리가 복잡합니다.',
      '이 순서대로 보면 흐름이 덜 꼬입니다.',
      '',
      '1. index.html',
      '   |',
      '   v',
      '2. main.jsx',
      '   |',
      '   v',
      '3. App.jsx',
      '   |',
      '   v',
      '4. Board.jsx',
      '   |',
      '   +--> PostForm.jsx',
      '   |       글쓰기 흐름 보기',
      '   |',
      '   +--> PostList.jsx',
      '           목록/map/delete/Link 보기',
      '',
      '5. Detail.jsx',
      '   useParams -> Number(id) -> find 흐름 보기',
      '',
      '외울 것보다 중요한 감각:',
      'App이 데이터를 가지고 있고, 자식들은 props로 받아서 화면을 그립니다.'
    ]
  }
]

const htmlEscape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>React CRUD 게시판 코드 해설</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body {
      font-family: "Malgun Gothic", "Apple SD Gothic Neo", Arial, sans-serif;
      line-height: 1.65;
      color: #202124;
      background: #fff;
      font-size: 14px;
    }
    h1 { font-size: 26px; margin: 0 0 18px; }
    h2 { font-size: 19px; margin: 28px 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
    p { margin: 4px 0; }
    pre {
      white-space: pre-wrap;
      background: #f6f8fa;
      border: 1px solid #d8dee4;
      border-radius: 6px;
      padding: 12px;
      font-family: Consolas, "Malgun Gothic", monospace;
      font-size: 13px;
    }
    .note { color: #5f6368; }
  </style>
</head>
<body>
  <h1>React CRUD 게시판 코드 해설</h1>
  <p class="note">그림 설명을 많이 넣은 공부용 문서입니다. 원본 앱 코드는 수정하지 않았습니다.</p>
  ${sections.map((section) => `
    <h2>${htmlEscape(section.title)}</h2>
    <pre>${htmlEscape(section.body.join('\n'))}</pre>
  `).join('\n')}
</body>
</html>`

writeFileSync(`${outDir}/react-crud-study-guide.html`, html, 'utf8')

const pdfEscapeUtf16Hex = (text) => {
  const buffer = Buffer.from(`\uFEFF${text}`, 'utf16le')
  const swapped = Buffer.alloc(buffer.length)
  for (let i = 0; i < buffer.length; i += 2) {
    swapped[i] = buffer[i + 1]
    swapped[i + 1] = buffer[i]
  }
  return swapped.toString('hex').toUpperCase()
}

const wrapLine = (line, maxChars) => {
  if (line.length <= maxChars) return [line]
  const parts = []
  let rest = line
  while (rest.length > maxChars) {
    let cut = rest.lastIndexOf(' ', maxChars)
    if (cut < maxChars * 0.45) cut = maxChars
    parts.push(rest.slice(0, cut))
    rest = rest.slice(cut).trimStart()
  }
  if (rest) parts.push(rest)
  return parts
}

const plainLines = [
  'React CRUD 게시판 코드 해설',
  '그림 설명을 많이 넣은 공부용 문서입니다. 원본 앱 코드는 수정하지 않았습니다.',
  '',
  ...sections.flatMap((section) => [
    `# ${section.title}`,
    ...section.body,
    ''
  ])
]

const pages = []
let current = []
let y = 790
const pushPage = () => {
  pages.push(current)
  current = []
  y = 790
}

for (const rawLine of plainLines) {
  const isHeading = rawLine.startsWith('# ')
  const isTitle = rawLine === 'React CRUD 게시판 코드 해설'
  const maxChars = isHeading ? 34 : 52
  const wrapped = rawLine === '' ? [''] : wrapLine(rawLine, maxChars)

  for (const line of wrapped) {
    const size = isTitle ? 18 : isHeading ? 14 : 9
    const step = line === '' ? 9 : size + 5
    if (y - step < 45) pushPage()
    current.push({ text: line, x: 42, y, size })
    y -= step
  }
}
if (current.length > 0) pushPage()

const objects = []
const addObject = (value) => {
  objects.push(value)
  return objects.length
}

const catalogId = addObject('')
const pagesId = addObject('')
const fontId = addObject('<< /Type /Font /Subtype /Type0 /BaseFont /MalgunGothic /Encoding /Identity-H /DescendantFonts [4 0 R] >>')
addObject('<< /Type /Font /Subtype /CIDFontType2 /BaseFont /MalgunGothic /CIDSystemInfo << /Registry (Adobe) /Ordering (Korea1) /Supplement 2 >> /CIDToGIDMap /Identity >>')

const pageIds = []
for (const page of pages) {
  const stream = [
    'BT',
    '/F1 9 Tf',
    ...page.map((line) => `/F1 ${line.size} Tf 1 0 0 1 ${line.x} ${line.y} Tm <${pdfEscapeUtf16Hex(line.text)}> Tj`),
    'ET'
  ].join('\n')
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`)
  const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`)
  pageIds.push(pageId)
}

objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (let i = 0; i < objects.length; i += 1) {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
}
const xrefOffset = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

writeFileSync(`${outDir}/react-crud-study-guide.pdf`, pdf, 'binary')

console.log(`created ${outDir}/react-crud-study-guide.html`)
console.log(`created ${outDir}/react-crud-study-guide.pdf`)
