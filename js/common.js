let mediaQuery = gsap.matchMedia();

//  미디어쿼리
let mediaQueryPC = window.matchMedia('(min-width:1201px)');
let mediaQueryMO = window.matchMedia('(max-width:1200px)');


// Smooth scroll (Lenis)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); 
});
gsap.ticker.lagSmoothing(500);

// 새로고침 시, 스크롤 위치 변경
window.addEventListener('beforeunload', () => {
  lenis.scrollTo(0, { immediate: true });
});


// header scrollSpy
const header = document.querySelector("#header");
let currentScroll = 0;

window.addEventListener("scroll",function(){
//   console.log(window.pageYOffset);
  const scrollTop = window.pageYOffset;
  if(scrollTop > currentScroll && scrollTop > 300){
    gsap.to(header, {yPercent:-100, ease:"power2.out"});
  }else{
    gsap.to(header, {yPercent:0, ease:"power2.out"});
  }
  currentScroll = scrollTop;
});





// 모바일 header, 모바일 nav
const mobileMenuBtn = header.querySelector('#mobile-menu');
const mobileNav = header.querySelector('.mobile-nav');
const mobileNavBox = mobileNav.querySelector('ul');
const mobileLogo = header.querySelector('.link-home');
const mobileBtnBar = mobileMenuBtn.querySelectorAll('span');


// monthly letter
const letterViewer = document.querySelector("#monthly-letter");
const letterBtn = header.querySelector('.pc-letter button.monthly-letter');
const letterBtnMo = header.querySelector('.mobile-nav button.monthly-letter');
const closeBtn = document.querySelector('#header button.btn-close');
const closeBtnMo = letterViewer.querySelector('button.btn-close');

const noise = document.querySelector('.noise');

// 모바일 메뉴 클릭
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click',function(){
  if(mediaQueryMO.matches && header.classList.contains('mobile')){
    // const menuOpen = header.classList.toggle('fixed');
    // document.documentElement.classList.toggle('fixed');
    isMenuOpen = !isMenuOpen;

    // header.classList.toggle('fixed', isMenuOpen);
    document.documentElement.classList.toggle('fixed', isMenuOpen);

    if(isMenuOpen){
      gsap.set(noise,{autoAlpha:0});
      mobileMenuBtn.classList.add('show');
      mobileNavShow();
    }else{
      mobileNavHidden();
      mobileMenuBtn.classList.remove('show');
      gsap.set(noise,{autoAlpha:1});
    }
  }
});






// Lenis 메뉴 이동
function handleMenuClick(e){
  // e.preventDefault();
  // e.stopPropagation();
  const target = e.currentTarget;
  const navData = target.dataset.link;

  console.log('menu clicked:',navData);
  lenis.scrollTo(navData, { immediate: true });
}

const headerLogo = header.querySelector('.link-home');
headerLogo.addEventListener('click', handleMenuClick);






const pcMenus = document.querySelectorAll("#nav .nav-item:not(#mobile-menu)");
pcMenus.forEach(function(menu){
  menu.addEventListener('click', handleMenuClick);
});

const mobileMenus = document.querySelectorAll(".mobile-nav .nav-item:not(.letter)");
mobileMenus.forEach(function(menu){
  menu.addEventListener('click', function(e){
    if(mediaQueryMO.matches){
        // e.preventDefault();

      handleMenuClick(e);
      mobileNavHidden();
      gsap.set(noise,{autoAlpha:1});
      header.classList.remove('fixed');
      document.documentElement.classList.remove('fixed');
      mobileMenuBtn.classList.remove('show');

        isMenuOpen = false;  // 상태 동기화
    }
  });
});






// 반응형 초기화
// function handleResize(){
//   if(mediaQueryPC.matches){
//     // 모바일 메뉴 상태 초기화
//     lenis.start();
//     mobileMenuBtn.classList.remove('show');
//     document.documentElement.classList.remove('mobile','fixed');
//     header.classList.remove('mobile','fixed','viewing');
//     gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
//     gsap.set(mobileNavBox,{autoAlpha:0});
//     gsap.set(mobileLogo,{color:'#000'});
//     gsap.set(mobileBtnBar,{backgroundColor:'#000'});
//     gsap.set(noise,{autoAlpha:1});


//     // letter 초기화
//     gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
//     gsap.set('.sc-letter .inner',{autoAlpha:0});
//     letterViewer.style.zIndex = '10';



//      // 접근성 상태 초기화
//     letterBtn?.setAttribute('aria-expanded', 'false');
//     letterBtnMo?.setAttribute('aria-expanded', 'false');
//     mobileMenuBtn?.querySelector('.btn-menu')?.setAttribute('aria-expanded', 'false');
//     // letterViewer?.setAttribute('hidden', '');

//     // mobileNav?.setAttribute('hidden', '');

//   }else{
//     document.documentElement.classList.add('mobile');
//     header.classList.add('mobile');
//     //   gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
//     // gsap.set('.sc-letter .inner',{autoAlpha:0});
//     // letterViewer.style.zIndex = '99';
//   }
// }

// 처음 화면 크기
let isNowPC = mediaQueryPC.matches;

function handleResize(){

  // 🌟 반응형 헤더
  if (mediaQueryPC.matches) {
  document.documentElement.classList.remove('mobile');
  header.classList.remove('mobile');

  // 1. 접근성 초기화
  mobileMenuBtn.querySelector('.btn-menu').removeAttribute('aria-expanded');

} else {
  document.documentElement.classList.add('mobile');
  header.classList.add('mobile');

  // 1. 접근성 초기화
  mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"false");

}


   // 🌟 반응형 초기화 (bp 추적)
  const isPC = mediaQueryPC.matches;
  const isLetterOpen = letterViewer.classList.contains('open');
  if(isPC && !isNowPC){ //지금은 pc화면이고 처음엔 mobile이었다.
    // 모바일에서 pc로 전환
    console.log('pc로 전환');

    // 1. letter 초기화
    if(isLetterOpen){
      lenis.stop();
      header.classList.add('viewing');
      document.documentElement.classList.add('fixed');
    }
    letterViewer.style.zIndex = '10';

    // 2. 반응형 모바일 Nav 초기화
  // mobileNavHidden();
    const isMobileNavOpen = mobileMenuBtn.classList.contains('show');
    if(isMobileNavOpen && isPC){
      mobileMenuBtn.classList.remove('show');
      document.documentElement.classList.remove('fixed');
      mobileNavHidden();
    }




  }else if(!isPC && isNowPC){ // 지금은 mobile이고 처음엔 pc였다.
    console.log('모바일로 전환');

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
    



  }

  isNowPC = isPC;
}




handleResize();
// 반응형 대응
window.addEventListener('resize', function(){
  handleResize();
  handleStopPropagation();
  handleLetterEventBinding();
});



// 초기 모바일 nav 상태 세팅
gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
gsap.set(mobileNavBox,{autoAlpha:0});
// 모바일 nav show 모션
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
// 모바일 nav hidden 모션
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


// Monthly letter 모션
function handleLetterEventBinding(){
  // 이벤트 초기화
  letterBtn?.removeEventListener('click', letterView);
  letterBtnMo?.removeEventListener('click',letterView);
closeBtn?.removeEventListener('click', letterClosePc);   
closeBtnMo?.removeEventListener('click', letterCloseMo); 
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
      // letterViewer.style.zIndex = '10';
      gsap.set(noise,{autoAlpha:0});

    });
  }
}
// 초기 이벤트 등록
handleLetterEventBinding();



gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
gsap.set('.sc-letter .inner',{autoAlpha:0});

// 편지 오픈
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

// 편지 닫기
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

  if(isMobileNavOpen){ // nav 열려있는 상태
    lenis.stop();
    document.documentElement.classList.add('fixed');    
  }else{
    lenis.start();
        document.documentElement.classList.remove('fixed');    
    
  }
}



// letter 이벤트 버블링 방지
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




// 접근성 컨트롤
// 1. Monthly letter (PC, MO)
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

// 2. 모바일 Nav
mobileMenuBtn.addEventListener('click', function(){
  if(mobileMenuBtn.classList.contains('show')){
    mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"true");
  }else{
    mobileMenuBtn.querySelector('.btn-menu').setAttribute('aria-expanded',"false");
  }
});