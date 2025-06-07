//  미디어쿼리
let mediaQueryPC = window.matchMedia('(min-width:1201px)');
let mediaQueryMO = window.matchMedia('(max-width:1200px)');

// 변수 선언
const noise = document.querySelector('.noise');
const header = document.querySelector("#header");

// 🌟 모바일 header, 모바일 nav 변수 선언
const mobileMenuBtn = header.querySelector('#mobile-menu');
const mobileNav = header.querySelector('.mobile-nav');
const mobileNavBox = mobileNav.querySelector('ul');
const mobileLogo = header.querySelector('.link-home');
const mobileBtnBar = mobileMenuBtn.querySelectorAll('span');

// 🌟 Monthly Letter 변수 선언
const letterViewer = document.querySelector("#monthly-letter");
const letterBtn = header.querySelector('.pc-letter button.monthly-letter');
const letterBtnMo = header.querySelector('.mobile-nav button.monthly-letter');
const closeBtn = document.querySelector('#header button.btn-close');
const closeBtnMo = letterViewer.querySelector('button.btn-close');



// 1. Smooth scroll (Lenis)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); 
});
gsap.ticker.lagSmoothing(500);


// 2. 새로고침 시, 스크롤 위치 변경
window.addEventListener('beforeunload', () => {
  lenis.scrollTo(0, { immediate: true });
});


// 3. Header
// 3-1. scrollSpy
let currentScroll = 0;

window.addEventListener("scroll",function(){
  const scrollTop = window.pageYOffset;
  if(scrollTop > currentScroll && scrollTop > 300){
    gsap.to(header, {yPercent:-100, ease:"power2.out"});
  }else{
    gsap.to(header, {yPercent:0, ease:"power2.out"});
  }
  currentScroll = scrollTop;
});


// 3-2. Lenis 메뉴 이동 (함수 선언)
function handleMenuClick(e){
  const target = e.currentTarget;
  const navData = target.dataset.link;

  lenis.scrollTo(navData, { immediate: true });
}
// 3-3. header 클릭 시 (이동 함수 실행)
const headerLogo = header.querySelector('.link-home');
headerLogo.addEventListener('click', handleMenuClick);

// 3-4. pc menu 클릭 시 (이동 함수 실행)
const pcMenus = document.querySelectorAll("#nav .nav-item:not(#mobile-menu)");
pcMenus.forEach(function(menu){
  menu.addEventListener('click', handleMenuClick);
});


// 4. 모바일 Header, 모바일 Nav
// 4-1. 모바일 menu 클릭 시 (이동 함수 실행)
const mobileMenus = document.querySelectorAll(".mobile-nav .nav-item:not(.letter)");
mobileMenus.forEach(function(menu){
  menu.addEventListener('click', function(e){
    if(mediaQueryMO.matches){
      handleMenuClick(e);

      // menu 클릭 시, nav 닫기
      mobileNavHidden();
      
      gsap.set(noise,{autoAlpha:1});
      header.classList.remove('fixed');
      document.documentElement.classList.remove('fixed');
      mobileMenuBtn.classList.remove('show');

      isMenuOpen = false; 
    }
  });
});

// 4-2. 모바일 메뉴 클릭
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click',function(){
  if(mediaQueryMO.matches && header.classList.contains('mobile')){
    isMenuOpen = !isMenuOpen;
    // html fixed
    document.documentElement.classList.toggle('fixed', isMenuOpen);

    if(isMenuOpen){
      // menu open
      gsap.set(noise,{autoAlpha:0});
      mobileMenuBtn.classList.add('show');
      mobileNavShow();
    }else{
      // menu close
      mobileNavHidden();
      mobileMenuBtn.classList.remove('show');
      gsap.set(noise,{autoAlpha:1});
    }
  }
});

// 4-3. 모바일 Nav 모션
gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
gsap.set(mobileNavBox,{autoAlpha:0});

// Nav show 함수 선언
function mobileNavShow(){
  const showTl = gsap.timeline({paused:true});
  showTl
  .to(mobileNav,0.4,{yPercent:0, autoAlpha:1,ease:"power2.out"},"show")
  .to(mobileLogo,0.1,{color:"#fff"},"show")
  .to(mobileBtnBar,0.1,{backgroundColor:"#fff"},"show")
  .to(mobileNavBox,0.2,{autoAlpha:1, ease:"power2.in"},"show +=0.01");

  showTl.restart();
  lenis.stop();
}

// Nav hidden 함수 선언
function mobileNavHidden(){
  const hiddenTl = gsap.timeline({paused:true});
  hiddenTl
  .to(mobileNav,0.4,{yPercent:-100, autoAlpha:0,ease:"power2.in"},"hidden")
  .to(mobileLogo,0.1,{color:"#000"},"hidden")
  .to(mobileBtnBar,0.1,{backgroundColor:"#000"},"hidden")
  .to(mobileNavBox,0.2, {autoAlpha:0, ease:"power2.out"},"hidden -=0.35");

  hiddenTl.restart();
  lenis.start();
}


// 5. Monthly Letter
// 5-1. Monthly letter 버튼 클릭
function handleLetterEventBinding(){
  if(mediaQueryPC.matches){
    letterBtn?.addEventListener('click',letterView);
    closeBtn?.addEventListener('click', letterClosePc);
  }else{
    letterBtnMo?.addEventListener('click',function(){
      letterView();
      letterViewer.style.zIndex = '99';
      gsap.set(noise,{autoAlpha:1});
    });
    closeBtnMo?.addEventListener('click', function(){
      letterCloseMo();
      gsap.set(noise,{autoAlpha:0});
    });
  }
}
handleLetterEventBinding();


// 5-2. Letter open/hidden 모션
gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
gsap.set('.sc-letter .inner',{autoAlpha:0});

// open
function letterView(){
  lenis.stop();
  if(mediaQueryPC.matches){
    header.classList.add('viewing');
  }
  document.documentElement.classList.add('fixed');
  letterViewer.classList.add('open');

  const viewTl = gsap.timeline({paused:true});
  viewTl
  .to(".sc-letter", 0.4, {yPercent: 0, autoAlpha: 1, ease: "power2.out"})
  .to('.sc-letter .inner', 0.2, {autoAlpha: 1, ease: "power2.in"}, "< -=0.1");
  viewTl.restart();
}

// close
// 공통
function letterCloseAniamtion(){
const hideTl = gsap.timeline({paused:true});
  hideTl
  .to(".sc-letter", 0.4, {yPercent: -100, autoAlpha: 0, ease: "power1.inOut"}, "< ")
  .to(".sc-letter .inner", 0.1, {autoAlpha: 0}, "< +=0.05");
  hideTl.restart();
  letterViewer.classList.remove('open');
}

function letterClosePc(){
  lenis.start();
  header.classList.remove('viewing');
  document.documentElement.classList.remove('fixed');
letterCloseAniamtion();
}
function letterCloseMo(){
  letterCloseAniamtion();
  header.classList.remove('viewing');

  const isMobileNavOpen = mobileMenuBtn.classList.contains('show');

  if(isMobileNavOpen){ 
    // Nav 열림
    lenis.stop();
    document.documentElement.classList.add('fixed');    
  }else{
    // Nav 닫힘
    lenis.start();
        document.documentElement.classList.remove('fixed');    
  }
}


// 5-3. letter 이벤트 버블링 방지
function handleStopPropagation() {  
  const letterPC = document.querySelector('.sc-letter .paper');
  const letterMO = document.querySelector('.sc-letter .inner');
  
  letterPC?.removeEventListener('wheel', stopWheel, true);
  letterMO?.removeEventListener('wheel', stopWheel, true);
  letterMO?.removeEventListener('touchmove', stopWheel, { passive: false, capture: true });

  if (mediaQueryPC.matches) {
    letterPC?.addEventListener('wheel', stopWheel, true);
  } else {
    letterMO?.addEventListener('wheel', stopWheel, true);
    letterMO?.addEventListener('touchmove', stopWheel,  { passive: false, capture: true });
  }
}
function stopWheel(e) {
  e.stopPropagation();
}
handleStopPropagation();



// 6.접근성 컨트롤
// 6-1. Monthly letter (PC, MO)
letterBtn.addEventListener('click', function(){
  letterBtn.setAttribute('aria-expanded',"true");
});

closeBtn.addEventListener('click',function(){
  letterBtn.setAttribute('aria-expanded',"false");
});

letterBtnMo.addEventListener('click',function(){
  letterBtnMo.setAttribute('aria-expanded',"true");
});

closeBtnMo.addEventListener('click',function(){
  letterBtnMo.setAttribute('aria-expanded',"false");
});

// 6-2. 모바일 Nav
mobileMenuBtn.addEventListener('click', function(){
  if(mobileMenuBtn.classList.contains('show')){
    mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"true");
  }else{
    mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"false");
  }
});



// 반응형 충돌 방지 초기화 스크립트
// 처음 화면 크기
let isNowPC = mediaQueryPC.matches;

function handleResize(){
  // 🌟 반응형 헤더
  if (mediaQueryPC.matches) {
  document.documentElement.classList.remove('mobile');
  header.classList.remove('mobile');

  // 접근성 초기화
  mobileMenuBtn.querySelector('.btn-menu').removeAttribute('aria-expanded');

} else {
  document.documentElement.classList.add('mobile');
  header.classList.add('mobile');

  // 접근성 초기화
  mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"false");

}

  // 🌟 반응형 초기화 (bp 추적)
  const isPC = mediaQueryPC.matches;
  const isLetterOpen = letterViewer.classList.contains('open');

  if(isPC && !isNowPC){ 
    // 모바일 -> pc로 전환
    // 1. letter 초기화
    if(isLetterOpen){
      header.classList.add('viewing');
      lenis.stop();
      document.documentElement.classList.add('fixed');
    }
    letterViewer.style.zIndex = '10';

    // 2. 모바일 Nav 초기화
    const isMobileNavOpen = mobileMenuBtn.classList.contains('show');
    if(isMobileNavOpen && isPC){
      mobileMenuBtn.classList.remove('show');
      document.documentElement.classList.remove('fixed');
      mobileNavHidden();
    }

  }else if(!isPC && isNowPC){ 
    // pc -> 모바일로 전환
    // 1. letter 초기화
    if(isLetterOpen){
      lenis.stop();
      header.classList.remove('viewing');
      document.documentElement.classList.add('fixed');
      letterViewer.style.zIndex = '99';

      closeBtnMo.addEventListener('click', function(){
        lenis.start();
        document.documentElement.classList.remove('fixed');
    });
    }
    
   // Nav 기본값 재설정
  gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
  gsap.set(mobileNavBox,{autoAlpha:0});
}
isNowPC = isPC;
}

handleResize();

// 반응형 resize
window.addEventListener('resize', function(){
  handleResize();
  handleStopPropagation();
  handleLetterEventBinding();
});
