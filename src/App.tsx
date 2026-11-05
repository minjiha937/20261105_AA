import { FormEvent, useEffect, useState } from "react"

type ModalType = "reservation" | "video" | null

const heroSlides = [
  {
    eyebrow: "몸과 마음이 다시, 편안해지는 곳",
    title: (
      <>
        일상의 건강을
        <br />
        되찾는 한방의 힘
      </>
    ),
    description: (
      <>
        사람을 먼저 생각하는 다온한방병원이
        <br />
        건강한 하루를 함께 만들어갑니다.
      </>
    ),
    tone: "hero-art--warm",
  },
  {
    eyebrow: "오늘보다 가벼운 내일을 위해",
    title: (
      <>
        내 몸에 꼭 맞는
        <br />
        세심한 통합 치료
      </>
    ),
    description: (
      <>
        한방과 양방의 협진으로 원인을 살피고
        <br />
        회복의 과정까지 정성껏 동행합니다.
      </>
    ),
    tone: "hero-art--sage",
  },
  {
    eyebrow: "천천히, 그러나 분명한 회복",
    title: (
      <>
        건강한 삶으로
        <br />
        이어지는 진료
      </>
    ),
    description: (
      <>
        마음 놓고 머물 수 있는 편안한 공간에서
        <br />
        오롯이 나를 위한 치료를 시작하세요.
      </>
    ),
    tone: "hero-art--rose",
  },
]

const strengths = [
  ["✦", "맞춤 한방진료", "개인별 체질과 상태에 맞춘", "1:1 집중 치료"],
  ["✤", "안전한 한약 처방", "믿을 수 있는", "청정 한약재 사용"],
  ["⌁", "통증 클리닉", "허리·목·관절 등", "만성 통증 치료"],
  ["♧", "생활질환 클리닉", "소화기·호흡기·여성질환 등", "생활 속 건강 관리"],
  ["✧", "면역·보약 클리닉", "체질 개선과", "면역력 증진"],
]

const clinics = [
  ["통증·척추 클리닉", "허리, 목, 어깨, 무릎 등", "clinic-art--brown"],
  ["소화기 클리닉", "소화불량, 위장장애 등", "clinic-art--sand"],
  ["교통사고 후유증 클리닉", "사고 후 통증, 재활 치료", "clinic-art--sage"],
  ["여성건강 클리닉", "생리통, 갱년기, 여성질환 등", "clinic-art--rose"],
  ["소아·성장 클리닉", "성장, 면역, 체질 개선", "clinic-art--green"],
  ["보약·면역 클리닉", "체질 개선, 기력 회복", "clinic-art--blue"],
]

const rooms = ["진료실", "추나요법실", "한약조제실", "입원실"]

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>
}

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="다온한방병원 홈">
      <span className="brand__mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>다온한방병원</strong>
        <small>DAON KOREAN MEDICINE HOSPITAL</small>
      </span>
    </a>
  )
}

function AbstractRoom({
  compact = false,
  tone = "",
}: {
  compact?: boolean
  tone?: string
}) {
  return (
    <div
      className={`abstract-room ${
        compact ? "abstract-room--compact" : ""
      } ${tone}`}
      aria-hidden="true"
    >
      <span className="abstract-room__light" />
      <span className="abstract-room__wall" />
      <span className="abstract-room__window" />
      <span className="abstract-room__bench" />
      <span className="abstract-room__floor" />
    </div>
  )
}

function Header({ onReserve }: { onReserve: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = [
    ["병원소개", "#about"],
    ["진료안내", "#clinics"],
    ["치료클리닉", "#clinics"],
    ["한방건강정보", "#notice"],
    ["커뮤니티", "#stories"],
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner page-shell">
        <Brand />
        <nav
          className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}
          aria-label="주 메뉴"
        >
          {menu.map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu}>
            온라인 상담
          </a>
          <button
            className="button button--brown nav-reserve"
            onClick={() => {
              closeMenu()
              onReserve()
            }}
          >
            예약하기
          </button>
        </nav>
        <button
          className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero({ onReserve }: { onReserve: () => void }) {
  const [active, setActive] = useState(0)
  const move = (amount: number) =>
    setActive(
      (current) => (current + amount + heroSlides.length) % heroSlides.length,
    )

  // 슬라이드는 6초마다 자동으로 전환되며, 사용자는 화살표로 직접 이동할 수 있습니다.
  useEffect(() => {
    const timer = window.setInterval(() => move(1), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const slide = heroSlides[active]
  return (
    <section className="hero" id="home" aria-label="병원 주요 안내">
      <div className="hero__copy">
        <div className="hero__copy-inner">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="hero__description">{slide.description}</p>
          <div className="hero__actions">
            <button className="button button--brown" onClick={onReserve}>
              진료 예약하기 <ArrowIcon />
            </button>
            <a className="button button--light" href="#about">
              병원 소개 보기
            </a>
          </div>
          <div className="slider-controls">
            <div className="slider-count">
              <span>0{active + 1}</span>
              <i />
              <span>0{heroSlides.length}</span>
            </div>
            <div className="slider-buttons">
              <button onClick={() => move(-1)} aria-label="이전 슬라이드">
                <ArrowIcon direction="left" />
              </button>
              <button onClick={() => move(1)} aria-label="다음 슬라이드">
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__visual">
        <AbstractRoom tone={slide.tone} />
      </div>
    </section>
  )
}

function Strengths() {
  return (
    <section className="strengths" aria-label="다온한방병원의 진료 강점">
      {strengths.map(([icon, title, line1, line2]) => (
        <article className="strength" key={title}>
          <span className="strength__icon" aria-hidden="true">
            {icon}
          </span>
          <h3>{title}</h3>
          <p>
            {line1}
            <br />
            {line2}
          </p>
        </article>
      ))}
    </section>
  )
}

function About({ onVideo }: { onVideo: () => void }) {
  return (
    <section className="about" id="about">
      <div className="about__visual">
        <AbstractRoom tone="hero-art--warm" />
      </div>
      <div className="about__content">
        <div className="about__text">
          <p className="section-kicker">전통의 지혜, 오늘의 건강으로</p>
          <h2>
            사람을 위한
            <br />
            올바른 한방치료
          </h2>
          <p>
            다온한방병원은 전통의 가치를 바탕으로
            <br />
            현대인의 건강 고민을 함께 해결합니다.
          </p>
        </div>
        <div className="about__features">
          <span>
            ◇<b>환자 중심 진료</b>
          </span>
          <span>
            ♧<b>안전한 의료 시스템</b>
          </span>
          <span>
            ♙<b>풍부한 임상 경험</b>
          </span>
        </div>
        <button
          className="video-button"
          onClick={onVideo}
          aria-label="다온한방병원 소개 영상 보기"
        >
          <span>▶</span>
          <small>다온한방병원</small>
        </button>
      </div>
    </section>
  )
}

function Clinics() {
  return (
    <section className="clinics content-section page-shell" id="clinics">
      <div className="section-heading">
        <h2>주요 진료 클리닉</h2>
        <p>
          다양한 한방 진료로
          <br />
          일상의 건강을 지켜드립니다.
        </p>
        <a href="#contact">
          전체 진료 보기 <ArrowIcon />
        </a>
      </div>
      <div className="clinic-grid">
        {clinics.map(([title, description, tone]) => (
          <a className="clinic-card" href="#contact" key={title}>
            <div className={`clinic-art ${tone}`} aria-hidden="true">
              <i />
              <i />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

function Rooms() {
  return (
    <section className="rooms" id="rooms">
      <div className="rooms__inner page-shell">
        <div className="rooms__intro">
          <h2>
            편안함이 머무는
            <br />
            치료 공간
          </h2>
          <p>
            몸과 마음이 모두 편안할 수 있는
            <br />
            쾌적한 진료 환경을 제공합니다.
          </p>
          <a className="button button--white" href="#location">
            병원 둘러보기 <ArrowIcon />
          </a>
        </div>
        <div className="room-gallery">
          {rooms.map((room, index) => (
            <button
              key={room}
              onClick={() =>
                document
                  .getElementById("location")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <AbstractRoom
                compact
                tone={index % 2 ? "hero-art--sage" : "hero-art--warm"}
              />
              <span>{room}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function Information({ onReserve }: { onReserve: () => void }) {
  return (
    <section className="information" id="contact">
      <div className="information__inner page-shell">
        <article className="notice" id="notice">
          <div className="info-title">
            <h2>공지사항</h2>
            <a href="#notice">더보기 ↓</a>
          </div>
          <ul>
            <li>
              <span>추석 연휴 진료 일정 안내</span>
              <time>2024.09.10</time>
            </li>
            <li>
              <span>특강 허리 한약 프로그램 안내</span>
              <time>2024.09.05</time>
            </li>
            <li>
              <span>진료 예약 시스템 오픈 안내</span>
              <time>2024.08.28</time>
            </li>
          </ul>
        </article>
        <article className="story" id="stories">
          <h2>환자분들의 이야기</h2>
          <blockquote>
            “꾸준한 치료로 허리 통증이 많이 좋아졌어요.
            <br />
            친절하고 세심한 진료에 늘 감사합니다.”
          </blockquote>
          <p>김○○ 님 | 허리 통증 치료</p>
        </article>
        <article className="location" id="location">
          <h2>오시는 길</h2>
          <div className="map-preview" aria-label="병원 위치 지도">
            <span />
          </div>
          <p>
            경상남도 진주시 진주대로 123
            <br />
            다온한방병원
          </p>
          <a
            href="https://maps.google.com/?q=진주시+진주대로+123"
            target="_blank"
            rel="noreferrer"
          >
            지도에서 보기 <ArrowIcon />
          </a>
        </article>
        <article className="contact-card">
          <h2>진료 예약 및 상담</h2>
          <a className="phone" href="tel:0551234567">
            ☎ &nbsp;055-123-4567
          </a>
          <p>
            평일&nbsp;&nbsp; 09:00 - 18:00
            <br />
            토요일&nbsp; 09:00 - 13:00
            <br />
            점심시간&nbsp; 12:30 - 13:30
          </p>
          <div>
            <button className="button button--white" onClick={onReserve}>
              진료 예약하기 <ArrowIcon />
            </button>
            <a href="tel:0551234567">
              온라인
              <br />
              상담 <ArrowIcon />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

function Modal({ type, onClose }: { type: ModalType onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!type) return
    const onKeyDown = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose()
    document.body.classList.add("modal-open")
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.classList.remove("modal-open")
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [type, onClose])

  if (!type) return null

  const submitReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="팝업 닫기"
        >
          ×
        </button>
        {type === "video" ? (
          <>
            <p className="section-kicker">DAON HOSPITAL</p>
            <h2 id="modal-title">사람을 위한 올바른 치료</h2>
            <div className="video-preview">
              <AbstractRoom compact tone="hero-art--warm" />
              <span>다온한방병원은 몸과 마음의 건강한 회복을 함께합니다.</span>
            </div>
          </>
        ) : submitted ? (
          <div className="reservation-complete">
            <span aria-hidden="true">✓</span>
            <h2 id="modal-title">예약 신청이 완료되었습니다.</h2>
            <p>확인 후 입력하신 연락처로 안내드리겠습니다.</p>
            <button className="button button--brown" onClick={onClose}>
              확인
            </button>
          </div>
        ) : (
          <>
            <p className="section-kicker">RESERVATION</p>
            <h2 id="modal-title">진료 예약 신청</h2>
            <p className="modal__description">
              원하시는 날짜와 정보를 남겨주시면 확인 후 연락드립니다.
            </p>
            <form className="reservation-form" onSubmit={submitReservation}>
              <label>
                이름
                <input
                  name="name"
                  required
                  placeholder="이름을 입력해 주세요"
                />
              </label>
              <label>
                연락처
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                />
              </label>
              <label>
                희망 진료일
                <input name="date" type="date" required />
              </label>
              <label>
                진료 분야
                <select name="clinic" required defaultValue="">
                  <option value="" disabled>
                    진료 분야를 선택해 주세요
                  </option>
                  {clinics.map(([title]) => (
                    <option key={title}>{title}</option>
                  ))}
                </select>
              </label>
              <button className="button button--brown" type="submit">
                예약 신청하기 <ArrowIcon />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [modal, setModal] = useState<ModalType>(null)

  return (
    <>
      <Header onReserve={() => setModal("reservation")} />
      <main>
        <Hero onReserve={() => setModal("reservation")} />
        <Strengths />
        <About onVideo={() => setModal("video")} />
        <Clinics />
        <Rooms />
        <Information onReserve={() => setModal("reservation")} />
      </main>
      <Modal type={modal} onClose={() => setModal(null)} />
    </>
  )
}
