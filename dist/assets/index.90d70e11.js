const w = function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s)
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === 'childList')
        for (const n of o.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && r(n)
  }).observe(document, { childList: !0, subtree: !0 })
  function e(s) {
    const o = {}
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerpolicy && (o.referrerPolicy = s.referrerpolicy),
      s.crossorigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossorigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    )
  }
  function r(s) {
    if (s.ep) return
    s.ep = !0
    const o = e(s)
    fetch(s.href, o)
  }
}
w()
var c = {
  panelSize: { width: 15, height: 20 },
  nextSize: { width: 6, height: 20 },
  levels: [
    { score: 0, duration: 1e3 },
    { score: 10, duration: 900 },
    { score: 20, duration: 600 },
    { score: 30, duration: 400 },
    { score: 40, duration: 300 },
  ],
}
function g(i) {
  return typeof i.x != 'undefined'
}
var a = ((i) => (
    (i[(i.left = 0)] = 'left'),
    (i[(i.right = 1)] = 'right'),
    (i[(i.down = 2)] = 'down'),
    i
  ))(a || {}),
  h = ((i) => (
    (i[(i.init = 0)] = 'init'),
    (i[(i.playing = 1)] = 'playing'),
    (i[(i.pause = 2)] = 'pause'),
    (i[(i.over = 3)] = 'over'),
    i
  ))(h || {})
class l {
  static canIMove(t, e, r) {
    const s = t.map((n) => ({ x: n.x + e.x, y: n.y + e.y }))
    let o = s.some(
      (n) =>
        n.x < 0 ||
        n.x > c.panelSize.width - 1 ||
        n.y < 0 ||
        n.y > c.panelSize.height - 1
    )
    return !(
      o ||
      ((o = s.some((n) =>
        r.some((p) => p.point.x === n.x && p.point.y === n.y)
      )),
      o)
    )
  }
  static move(t, e, r) {
    if (g(e))
      return this.canIMove(t.shape, e, r) ? ((t.centerPoint = e), !0) : !1
    {
      const s = e
      let o
      switch (s) {
        case a.right:
          o = { x: t.centerPoint.x + 1, y: t.centerPoint.y }
          break
        case a.down:
          o = { x: t.centerPoint.x, y: t.centerPoint.y + 1 }
          break
        case a.left:
          o = { x: t.centerPoint.x - 1, y: t.centerPoint.y }
          break
      }
      return this.move(t, o, r)
    }
  }
  static moveDirectly(t, e, r) {
    for (; this.move(t, e, r); );
  }
  static rotate(t, e) {
    const r = t.afterRotateShape()
    return this.canIMove(r, t.centerPoint, e) ? (t.rotate(), !0) : !1
  }
  static deleteTeris(t) {
    const e = t.map((n) => n.point.y),
      r = Math.max(...e),
      s = Math.min(...e)
    let o = 0
    for (let n = s; n <= r; n++) this.deleteLine(t, n) && o++
    return o
  }
  static deleteLine(t, e) {
    const r = t.filter((s) => s.point.y === e)
    return (
      console.log(r.length, c.panelSize.width),
      r.length === c.panelSize.width
        ? (r.forEach((s) => {
            var n
            ;(n = s.view) == null || n.remove()
            const o = t.indexOf(s)
            t.splice(o, 1)
          }),
          t
            .filter((s) => s.point.y < e)
            .forEach((s) => {
              s.point = { x: s.point.x, y: s.point.y + 1 }
            }),
          !0)
        : !1
    )
  }
}
class v {
  constructor(t, e, r, s) {
    ;(this._point = t), (this._view = e), (this._color = r), (this._size = s)
  }
  set point(t) {
    var e
    if (t) {
      if (this.point.x === t.x && this.point.y === t.y) return
      ;(this._point = t), (e = this.view) == null || e.show()
    }
  }
  get point() {
    return this._point
  }
  set view(t) {
    t && ((this._view = t), this.view.show())
  }
  get view() {
    return this._view
  }
  set color(t) {
    this._color = t
  }
  get color() {
    return this._color
  }
  set size(t) {
    this._size = t
  }
  get size() {
    return this._size
  }
}
class u {
  constructor(t, e, r) {
    ;(this._shape = t),
      (this._centerPoint = e),
      (this._color = r),
      (this.terisGroups = []),
      (this.clock = !0)
    const s = []
    this._shape.forEach((o) => {
      const n = new v(o)
      ;(n.color = this._color), s.push(n)
    }),
      (this.terisGroups = s),
      this.setGroupsCenterPoint()
  }
  get teris() {
    return this.terisGroups
  }
  get centerPoint() {
    return this._centerPoint
  }
  get shape() {
    return this._shape
  }
  set centerPoint(t) {
    ;(this._centerPoint = t), this.setGroupsCenterPoint()
  }
  setGroupsCenterPoint() {
    this._shape.forEach((t, e) => {
      this.teris[e].point = {
        x: this._centerPoint.x + t.x,
        y: this._centerPoint.y + t.y,
      }
    })
  }
  afterRotateShape() {
    return this.clock
      ? this.shape.map((t) => ({ x: -t.y, y: t.x }))
      : this.shape.map((t) => ({ x: t.y, y: -t.x }))
  }
  rotate() {
    ;(this._shape = this.afterRotateShape()), this.setGroupsCenterPoint()
  }
}
function m(i, t) {
  const e = t - i
  return Math.floor(Math.random() * (e + i))
}
class T extends u {
  constructor(t, e) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      t,
      e
    )
  }
}
class S extends u {
  constructor(t, e) {
    super(
      [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      t,
      e
    )
  }
}
class P extends u {
  constructor(t, e) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      t,
      e
    )
  }
  rotate() {
    super.rotate(), (this.clock = !this.clock)
  }
}
class z extends u {
  constructor(t, e) {
    super(
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      t,
      e
    )
  }
  rotate() {
    super.rotate(), (this.clock = !this.clock)
  }
}
class D extends u {
  constructor(t, e) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      t,
      e
    )
  }
}
class E extends u {
  constructor(t, e) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      t,
      e
    )
  }
  afterRotateShape() {
    return this.shape
  }
}
class R extends u {
  constructor(t, e) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      t,
      e
    )
  }
  rotate() {
    super.rotate(), (this.clock = !this.clock)
  }
}
const x = [T, D, P, R, E, S, z],
  y = ['#f40', 'blue', 'green', 'orange'],
  f = (i) => {
    let t = m(0, x.length)
    const e = x[t]
    t = m(0, y.length)
    const r = y[t]
    return new e(i, r)
  }
class L {
  constructor(t) {
    ;(this._view = t),
      (this._score = 0),
      (this._exists = []),
      (this._gameStatus = h.init),
      (this._duration = c.levels[0].duration),
      this.createNextTeris(),
      this._view.init(this),
      this._view.showScore(this.score)
  }
  get score() {
    return this._score
  }
  get gameStatus() {
    return this._gameStatus
  }
  set score(t) {
    ;(this._score = t), this._view.showScore(this.score)
    const e = c.levels.filter((r) => r.score <= t).pop()
    this._duration !== e.duration &&
      ((this._duration = e.duration),
      this._timer &&
        (clearInterval(this._timer), (this._timer = void 0), this.autoDrop()))
  }
  start() {
    this._gameStatus !== h.playing &&
      (this._gameStatus === h.over && this.init(),
      (this._gameStatus = h.playing),
      this._curTeris || this.switchTeris(),
      this.autoDrop(),
      this._view.onGameStart(this))
  }
  pause() {
    this._gameStatus === h.playing &&
      ((this._gameStatus = h.pause),
      clearInterval(this._timer),
      (this._timer = void 0),
      this._view.onGamePause(this))
  }
  controlLeft() {
    this._gameStatus === h.playing &&
      this._curTeris &&
      l.move(this._curTeris, a.left, this._exists)
  }
  controlRight() {
    this._gameStatus === h.playing &&
      this._curTeris &&
      l.move(this._curTeris, a.right, this._exists)
  }
  controlDown() {
    this._gameStatus === h.playing &&
      this._curTeris &&
      (l.moveDirectly(this._curTeris, a.down, this._exists), this.hitBottom())
  }
  controlRotate() {
    this._gameStatus === h.playing &&
      this._curTeris &&
      l.rotate(this._curTeris, this._exists)
  }
  autoDrop() {
    this._timer ||
      this._gameStatus !== h.playing ||
      (this._timer = setInterval(() => {
        this._curTeris &&
          (l.move(this._curTeris, a.down, this._exists) || this.hitBottom())
      }, this._duration))
  }
  createNextTeris() {
    ;(this._nextTeris = f({ x: 0, y: 0 })),
      this.restCenterPoint(c.nextSize.width, this._nextTeris),
      this._view.showNextTeris(this._nextTeris)
  }
  init() {
    this._exists.forEach((t) => {
      var e
      ;(e = t.view) == null || e.remove()
    }),
      (this._exists = []),
      this.createNextTeris(),
      (this._curTeris = void 0),
      (this.score = 0)
  }
  hitBottom() {
    this._exists.push(...this._curTeris.teris)
    const t = l.deleteTeris(this._exists)
    this.addScore(t), this.switchTeris()
  }
  addScore(t) {
    t !== 0 &&
      (t === 1
        ? (this.score += 10)
        : t === 2
        ? (this.score += 25)
        : t === 3
        ? (this.score += 60)
        : (this.score = 100))
  }
  switchTeris() {
    if (
      ((this._curTeris = this._nextTeris),
      this._curTeris.teris.forEach((t) => {
        t.view && t.view.remove()
      }),
      this.restCenterPoint(c.panelSize.width, this._curTeris),
      (this._nextTeris = f({ x: 0, y: 0 })),
      this.restCenterPoint(c.nextSize.width, this._nextTeris),
      !l.canIMove(
        this._curTeris.shape,
        this._curTeris.centerPoint,
        this._exists
      ))
    ) {
      ;(this._gameStatus = h.over),
        clearInterval(this._timer),
        (this._timer = void 0),
        this._view.onGameOver(this)
      return
    }
    this._view.showNextTeris(this._nextTeris),
      this._view.switchTeris(this._curTeris)
  }
  restCenterPoint(t, e) {
    const r = Math.ceil(t / 2) - 1,
      s = 0
    for (e.centerPoint = { x: r, y: s }; e.teris.some((o) => o.point.y < 0); )
      e.centerPoint = { x: e.centerPoint.x, y: e.centerPoint.y + 1 }
  }
}
class _ {
  constructor(t, e = document.body) {
    ;(this.rect = t),
      (this.container = e),
      (this.dom = null),
      (this.isRemove = !1),
      (this.rect = t),
      (this.container = e)
  }
  show() {
    var s, o, n, p, d
    const t =
        (o = (s = this.rect.size) == null ? void 0 : s.width) != null ? o : 30,
      e =
        (p = (n = this.rect.size) == null ? void 0 : n.height) != null ? p : 30,
      r = (d = this.rect.color) != null ? d : 'red'
    this.isRemove ||
      (this.dom ||
        ((this.dom = document.createElement('div')),
        (this.dom.className = 'rect'),
        (this.dom.style.background = r),
        (this.dom.style.width = `${t}px`),
        (this.dom.style.position = 'absolute'),
        (this.dom.style.height = `${e}px`)),
      (this.dom.style.left = this.rect.point.x * t + 'px'),
      (this.dom.style.top = this.rect.point.y * e + 'px'),
      this.container.appendChild(this.dom))
  }
  remove() {
    this.dom && (this.dom.remove(), (this.dom = null), (this.isRemove = !0))
  }
}
class I {
  constructor() {
    ;(this.nextDom = document.getElementById('next')),
      (this.panelDom = document.getElementById('panel')),
      (this.scoreDom = document.getElementById('score')),
      (this.messageDom = document.getElementById('message'))
  }
  onGameOver(t) {
    ;(this.messageDom.style.display = 'flex'),
      (this.messageDom.querySelector('span').innerText =
        '\u6E38\u620F\u7ED3\u675F')
  }
  onGamePause(t) {
    ;(this.messageDom.style.display = 'flex'),
      (this.messageDom.querySelector('span').innerText =
        '\u6E38\u620F\u6682\u505C')
  }
  onGameStart(t) {
    this.messageDom.style.display = 'none'
  }
  init(t) {
    ;(this.panelDom.style.width = c.panelSize.width * 30 + 'px'),
      (this.panelDom.style.height = c.panelSize.height * 30 + 'px'),
      (this.nextDom.style.width = c.nextSize.width * 30 + 'px'),
      (this.nextDom.style.height = c.nextSize.height * 30 + 'px'),
      this.addKeyDownEvent(t)
  }
  showScore(t) {
    this.scoreDom.innerHTML = '\u79EF\u5206 ' + t
  }
  addKeyDownEvent(t) {
    document.onkeydown = ({ key: e }) => {
      console.log(e),
        e == ' ' && (t.gameStatus === h.playing ? t.pause() : t.start()),
        e === 'ArrowDown' && t.controlDown(),
        e === 'ArrowLeft' && t.controlLeft(),
        e === 'ArrowRight' && t.controlRight(),
        e === 'ArrowUp' && t.controlRotate()
    }
  }
  switchTeris(t) {
    t.teris.forEach((e) => {
      var r
      ;(r = e.view) == null || r.remove(), (e.view = new _(e, this.panelDom))
    })
  }
  showNextTeris(t) {
    t.teris.forEach((e) => {
      e.view = new _(e, this.nextDom)
    })
  }
}
new L(new I())
