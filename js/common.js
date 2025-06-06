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
const mobileLogo = header.querySelector('.btn-home');
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

    header.classList.toggle('fixed', isMenuOpen);
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

// logo 클릭 시, scrollTo : 0 이동
const headerLogo = header.querySelector('.btn-home');
headerLogo.addEventListener('click', function(e){
  e.preventDefault();
  lenis.scrollTo(0,{duration:1});
});



// Lenis 메뉴 이동
function handleMenuClick(e){
  // e.preventDefault();
  // e.stopPropagation();
  const target = e.currentTarget;
  const navData = target.dataset.link;

  console.log('menu clicked:',navData);
  lenis.scrollTo(navData);
}

const pcMenus = document.querySelectorAll("#nav .btn:not(#mobile-menu)");
pcMenus.forEach(function(menu){
  menu.addEventListener('click', handleMenuClick);
});

const mobileMenus = document.querySelectorAll(".mobile-nav .btn:not(.letter)");
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
// const navMenus = document.querySelectorAll('#nav .btn:not(#mobile-menu)');
// navMenus.forEach(function(menu){
//   menu.addEventListener('click',function(e){
//      e.preventDefault();
//     e.stopPropagation();
//     console.log('click!!!');
//     const navData = menu.dataset.link;
//     // console.log(navData);
//     lenis.scrollTo(navData);

//     //  console.log('matches:', mediaQueryMO.matches); // true?
//     // console.log('fixed:', header.classList.contains('fixed')); // true?
//     // if(mediaQueryMO.matches && header.classList.contains('fixed')){
//     //   mobileNavHidden();
//     //   header.classList.remove('fixed');
//     //   document.documentElement.classList.remove('fixed');
//     //   console.log('mobile menu closed');
//     // }


//   });
// }); 









// 반응형 
function handleResize(){
  if(mediaQueryPC.matches){
    // 모바일 메뉴 상태 초기화
    lenis.start();
    mobileMenuBtn.classList.remove('show');
    document.documentElement.classList.remove('mobile','fixed');
    header.classList.remove('mobile','fixed','viewing');
    gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
    gsap.set(mobileNavBox,{autoAlpha:0});
    gsap.set(mobileLogo,{color:'#000'});
    gsap.set(mobileBtnBar,{backgroundColor:'#000'});
    gsap.set(noise,{autoAlpha:1});


    // letter 초기화
    gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
    gsap.set('.sc-letter .inner',{autoAlpha:0});
    letterViewer.style.zIndex = '10';

  }else{
    document.documentElement.classList.add('mobile');
    header.classList.add('mobile');
  }
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
closeBtn?.addEventListener('click', letterClosePc);   // PC 닫기 버튼
closeBtnMo?.addEventListener('click', letterCloseMo); // 모바일 닫기 버튼
  if(mediaQueryPC.matches){
    letterBtn?.addEventListener('click',letterView);
    closeBtn?.addEventListener('click', letterClosePc);
  }else{
    letterBtnMo?.addEventListener('click',function(){
      letterView();
      letterViewer.style.zIndex = '99';
        //  mobileNavHidden();
      gsap.set(noise,{autoAlpha:1});
      // mobileNavHidden();
      // 추가할 내용
    });
    closeBtnMo?.addEventListener('click', function(){
      letterCloseMo();
      letterViewer.style.zIndex = '10';
            gsap.set(noise,{autoAlpha:0});

    });
  }
}

gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
gsap.set('.sc-letter .inner',{autoAlpha:0});

// 편지 오픈
function letterView(){
  lenis.stop();
  header.classList.add('viewing');
  document.documentElement.classList.add('fixed');

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
}
function letterClosePc(){
  lenis.start();
  header.classList.remove('viewing');
  document.documentElement.classList.remove('fixed');
letterCloseAniamtion();
}
function letterCloseMo(){
  lenis.stop();
  header.classList.remove('viewing');
  document.documentElement.classList.add('fixed');
letterCloseAniamtion();
}

// 초기 이벤트 등록
handleLetterEventBinding();

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




// function handleHeader(){
//   if(mediaQueryMO.matches && header.classList.contains('mobile')){
//     mobileMenuBtn.addEventListener('click', function(){
//       header.classList.toggle('fixed');
//       document.documentElement.classList.toggle('fixed');
      
//       // nav 노출
//       if(header.classList.contains('fixed')){
//         mobileNavShow();
//       }else{
//         mobileNavHidden();
//       }
//     });
//   }else{
//     mobileNavHidden();
//       header.classList.remove('fixed');
//       document.documentElement.classList.remove('fixed');
//   }
// }
// Nav show
// gsap.set(mobileNav,{yPercent:-100, autoAlpha:0});
// gsap.set(mobileNavBox,{autoAlpha:0});


// gsap.set(moMenu,{autoAlpha:0});
// function mobileNavShow(){
//   const showTl = gsap.timeline({paused:true});
//   showTl
//   .to(mobileNav,0.4,{yPercent:0, autoAlpha:1,ease:"power2.out"},"show")
//   .to(mobileLogo,0.1,{color:"#fff"},"show")
//   .to(mobileBtnBar,0.1,{backgroundColor:"#fff"},"show")
//   .to(mobileNavBox,0.2,{autoAlpha:1, ease:"power2.in"},"show +=0.01");

//   showTl.restart();
//   lenis.stop();
// }

// Nav hidden
// function mobileNavHidden(){
//   const hiddenTl = gsap.timeline({paused:true});
//   hiddenTl
//   .to(mobileNav,0.4,{yPercent:-100, autoAlpha:0,ease:"power2.in"},"hidden")
//   .to(mobileLogo,0.1,{color:"#000"},"hidden")
//   .to(mobileBtnBar,0.1,{backgroundColor:"#000"},"hidden")
//   .to(mobileNavBox,0.2, {autoAlpha:0, ease:"power2.out"},"hidden -=0.35");
//   hiddenTl.restart();
//   lenis.start();

// }

// handleHeader();
// window.addEventListener('resize', handleHeader);



// monthly-letter 스크롤 이벤트 버블링
// function handleStopPropagation() {  
//   if (mediaQueryPC.matches) {
//     document.querySelector('.sc-letter .paper')?.addEventListener('wheel', stopWheel, true);
//   } else {
//     document.querySelector('.sc-letter .inner')?.addEventListener('wheel', stopWheel, true);
//   }
// }
// function stopWheel(e) {
//   e.stopPropagation();
// }
// handleStopPropagation();
// window.addEventListener('resize',handleStopPropagation);







// // 모바일 header

// const headerEl = document.querySelector('#header');
// let openTl;
// let closeTl;

// mediaQuery.add({
//   isPC: "(min-width:1201px)",
//   isMO:"(max-width:1200px)"
// },(context =>{
//   const {isPC, isMO} = context.conditions;

//   
//   const moSpanEls = moMenuBtn.querySelectorAll('span');
//   const moMenu = moNav.querySelector('ul');

//   // 모바일용 세팅
//   if(isMO){

//   // header에 mobile 클래스 추가
//   headerEl.classList.add('mobile');

//   // 모바일용 header, mobile-nav 모션
//   closeTl = gsap.timeline({paused:true});

//   gsap.set(moNav,{yPercent:-100, autoAlpha:0});
//   gsap.set(moMenu,{autoAlpha:0});

//   openTl
//   .to(headerEl,0.4,{backgroundColor:'transparent',color:"#fff" ,ease:"power2.out"},"header")
//   .to(moSpanEls,0.4,{backgroundColor:"#fff", ease:"power2.out"},"header")
//   .to(moNav,0.4,{yPercent:0,autoAlpha:1, ease:"power2.out"},"<")
//   .to(moMenu,0.2,{autoAlpha:1},"-=0.2");

//   closeTl
//   .to(moMenu,0.2,{autoAlpha:0})
//   .to(moNav,0.4,{yPercent:-100,autoAlpha:0, ease:"power2.out"},"-=0.1")
//   .to(headerEl,0.4,{backgroundColor:'#fff', color:"#000", ease:"power2.out"},"< header")
//   .to(moSpanEls,0.4,{backgroundColor:"#000"},"< header");

//   let isNavOpen = false;
  
//   moMenuBtn.addEventListener("click", function(){
//   if(isNavOpen){
//     closeTl.restart();
//     lenis.start();
//     document.documentElement.classList.remove('fixed');
//   }else{
//     openTl.restart();
//     lenis.stop();
//     document.documentElement.classList.add('fixed');
//   }
//   isNavOpen = !isNavOpen;
//   console.log(isNavOpen);
//   });

//   // console.log(navMenus);

//   navMenus.forEach(function(menu){
//   menu.addEventListener('click',function(){
//       console.log('nav menu clicked');

//     if(isNavOpen === true){
//       closeTl.restart();
//       lenis.start();
//       document.documentElement.classList.remove('fixed');
//       isNavOpen = false;
//     }
//   });
// }); 
// }else{
//   headerEl.classList.remove('mobile');
//   gsap.set(moNav,{yPercent:-100, autoAlpha:0});
//   gsap.set(headerEl,{backgroundColor:"#fff", color:"#000"});
//   gsap.set(moSpanEls, {backgroundColor:"#000"});
//   document.documentElement.classList.remove('fixed');
//   lenis.start();
//   }
// }));

// // 브라우저 크기 변경 시 다시 실행
// window.addEventListener('resize', handleResponsive);







//메모!!!!!!!
//모바일 메뉴 monthly letter 부터 다시.

// // monthly letter
// const letterViewer = document.querySelector("#monthly-letter");
// const letterBtn = header.querySelector('.pc-letter button.monthly-letter');
// const letterBtnMo = header.querySelector('.mobile-nav button.monthly-letter');
// const closeBtn = document.querySelector('#header button.btn-close');
// const closeBtnMo = letterViewer.querySelector('button.btn-close');

// // Monthly Letter 버튼 클릭 시

// // PC
// if(mediaQueryPC.matches){
//   // Monthly Letter 보기 버튼 클릭 시
//   letterBtn.addEventListener('click',function(){
//     letterView();
//     console.log('pc letter 클릭');
//   });

//   closeBtn.addEventListener('click', function(){
//     letterClose();
//   });
// }

// // viewer 초기화
// gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
// gsap.set('.sc-letter .inner',{autoAlpha:0});

// // letter 열기
// function letterView(){
//   lenis.stop();
//   header.classList.add('viewing');
//   document.documentElement.classList.add('fixed');

//   const viewTl = gsap.timeline({paused:true});

//   viewTl
//   .to(".sc-letter",0.4,{yPercent:0, autoAlpha:1, ease:"power2.out"})
//   .to('.sc-letter .inner',0.2,{autoAlpha:1, ease:"power2.in"},"< -=0.1");

//   viewTl.restart();
// }

// // letter 닫기
// function letterClose(){
//   lenis.start();
//     header.classList.remove('viewing');
//     document.documentElement.classList.remove('fixed');

//   const hideTl = gsap.timeline({paused:true});
//   hideTl
//   .to(".sc-letter",0.4,{yPercent:-100, autoAlpha:0, ease:"power1.inOut"},"< ")
//   .to(".sc-letter .inner", 0.1, {autoAlpha:0},"< +=0.05");

//   hideTl.restart();
// }




// mediaQuery.add({
//   isPC : "(min-width: 1201px)",
//   isMO : "(max-width: 1200px)"
// }, function(context){
//   const {isPC, isMO} = context.conditions;
//   // console.log(context.conditions)

  
//   // viewer 초기화
//   gsap.set('.sc-letter',{yPercent:-100, autoAlpha:0});
//   gsap.set('.sc-letter .inner',{autoAlpha:0});
  
//   const viewTl = gsap.timeline({paused:true});
  
//   viewTl
//   .to(".sc-letter",0.2,{yPercent:0, autoAlpha:1, ease:"power2.out"})
//   .to('.sc-letter .inner',0.1,{autoAlpha:1},"+=0.1");
  
  
//   const hideTl = gsap.timeline({paused:true});
//   hideTl
//   .to(".sc-letter",0.2,{yPercent:-100, autoAlpha:0, ease:"power2.out"})
//   .to(".sc-letter .inner", 0.1, {autoAlpha:0},"-=0.1");

  
//   // view 버튼 클릭
//   const viewBtn = isPC ? letterBtn : letterBtnMo;
// console.log(letterBtn, letterBtnMo);
//   viewBtn.addEventListener("click",function(){
//     //monthly-letter 모션

//     if(isPC){
//       console.log('pc버튼');
//       viewTl.restart();
//       document.documentElement.classList.add('fixed');
//             headerEl.classList.add('viewing');

//       lenis.stop();
//     }else{
//       console.log('모바일 버튼');
//       viewTl.restart();
//       document.documentElement.classList.add('fixed');
//             headerEl.classList.add('viewing');

//       lenis.stop();
//     }
//   });

//   // close 버튼 클릭
//   const hideBtn = isPC ? closeBtn : closeBtnMo;
//   console.log(closeBtn, closeBtnMo);
//   hideBtn.addEventListener("click", function(){
//      if(isPC){
//       console.log('pc버튼');
//       hideTl.restart();
//       document.documentElement.classList.remove('fixed');
//       headerEl.classList.remove('viewing');
//       lenis.start();

//     }else{
//       console.log('모바일 버튼');
//             hideTl.restart();
//             document.documentElement.classList.remove('fixed');
//                   headerEl.classList.remove('viewing');

//       lenis.start();
//     }
//   });
// }
// )
// //mediaQuery


// letterBtn.addEventListener("click", function(){
//   letterViewer.classList.add("view");
//   headerEl.classList.add('fixed');
//   document.documentElement.classList.add('fixed');
//   lenis.stop();
// });
// closeBtn.addEventListener("click", function(){
//   letterViewer.classList.remove("view");
//         headerEl.classList.remove('fixed');
//         document.documentElement.classList.remove('fixed');
//         lenis.start();
// });





