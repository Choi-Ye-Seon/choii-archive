// main title + sub title 모션
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.remove('is-loding');
    
    document.documentElement.classList.add('fixed');
    lenis.stop();


  // 1. main title
  // 1-1. text split
  const logo = document.querySelector('.sc-home h2');
  const characters = logo.textContent.split('');
  const wrappedText = characters
    .map(function (char) {
      return `<span class="char">${char}</span>`;
    })
    .join('');
  logo.innerHTML = wrappedText;


  // 2. sub title 모션
//   gsap.set('.sc-home .group-title, .sc-home .main-scroll .content-box',{autoAlpha:0});

  gsap.set('.sc-home h3 .text-box span', {yPercent: 100});
  gsap.set('.sc-home h2', {height: 0});
  gsap.set('.sc-home h2 .char', {autoAlpha: 0});

  const mainTitle = gsap.timeline();
  mainTitle
    // .to('.sc-home .group-title, .sc-home .main-scroll .content-box',{autoAlpha:1})
  .to('.sc-home h3 .text-box span', {yPercent: 0, stagger: 0.5})
  .to('.sc-home h2', {height: 'auto', ease: 'power2.out'})
  .to('.sc-home .group-title .wrap', {width: 'auto', ease: 'power2.out',
    onComplete:function(){
         document.documentElement.classList.remove('fixed');
        lenis.start();
    }
  }, '<')
  .to('.sc-home h2 .char', {autoAlpha: 1, y: 0, stagger: 0.1})
  .fromTo('.sc-home .main-scroll .main-frame', 
    {scale: 0.4, autoAlpha: 0}, 
    {scale: 1, autoAlpha: 1}, '<');
});


// 3. main frame scale 모션
const frameScale = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-home .group-title',
    start: '50% 0%',
    end: '100% 0%',
    scrub: 1,
    // markers:true
  }
});

frameScale
.to('.sc-home .figure.sequence .overlay', {opacity: 0}, '<')
.to('.sc-home .main-scroll .main-frame', {scale: 1.2, overwrite: 'auto'}, '<');


// 3-1. main frame overlay 컨트롤
gsap.to('.sc-home .main-scroll .main-frame', {
  scale: 1.2,
  scrollTrigger: {
    trigger: '.sc-home .group-title',
    start: '50% 0%',
    end: '100% 0%',
    scrub: 1,
    onEnter: function () {
      gsap.to('.sc-home', {'--opacity': 0});
    }
    //   markers: true,
  }
});


// 4. main 이미지시퀀스
const sequenceImages = document.querySelectorAll('.sc-home .figure.sequence img');
// 초기실행
sequenceImages.forEach(function (img, i) {
  setTimeout(function () {
    document.querySelector('.sc-home .figure.sequence img.active')?.classList.remove('active');
    img.classList.add('active');
  }, 600 * i);
});
// 반복실행
setInterval(function () {
  sequenceImages.forEach(function (img, i) {
    setTimeout(function () {
      document.querySelector('.sc-home .figure.sequence img.active')?.classList.remove('active');
      img.classList.add('active');
    }, 600 * i);
  });
}, sequenceImages.length * 600);


// 5. main hero scroll (best-images 및 data 노출)
const mainHero = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-home',
    start: '20% 0%',
    end: '27% 0%',
    scrub: 2,
    // markers:true
  }
});

gsap.set($('.sc-home .main-scroll .content-box').eq(0).find('.frame-title').get(), {y: 40, autoAlpha: 0});
gsap.set($('.sc-home .main-scroll .content-box').eq(0).find('.frame-data').get(), {y: -60, autoAlpha: 0});
gsap.set('.area-figure .sequence',{y:0});
gsap.set('.area-figure .best-one',{yPercent:100});
mainHero
.to('.area-figure .sequence', 3, {yPercent: -100}, 'move')
.to('.area-figure .best-one', 3, {yPercent: 0}, 'move')
.to($('.sc-home .main-scroll .content-box').eq(0).find('.frame-title, .frame-data').get(), 3, 
{y: 0, autoAlpha: 1}, 'move');


// 6. main frame 가로스크롤 모션
const mainScroll = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-home',
    start: '35% 0%',
    end: '100% 90%',
    scrub: 1.4,
    // markers:true,
    invalidateOnRefresh: true
  }
});

mainScroll.to('.sc-home .main-scroll', {
  xPercent: -100,
  x: function () {
    return (window.innerWidth + 120) * -1;
  }
});



// 7. COMMENT
// 7-1. icon motion
gsap.to('.sc-comment .group-line.top .ic-flower', {
  rotate: 180,
  scrollTrigger: {
    trigger: '.sc-comment',
    start: '0% 90%',
    end: '100% 0%',
    scrub: 1
    // markers:true
  }
});
gsap.to('.sc-comment .group-line.bottom .ic-flower', {
  rotate: 180,
  scrollTrigger: {
    trigger: '.sc-comment',
    start: '0% 0%',
    end: '100% 0%',
    scrub: 1
    // markers:true
  }
});

// 7-2. text
const comment = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-comment',
    start: '25% 0%',
    end: '100% 80%',
    // markers:true,
    toggleActions: 'play none none reverse'
  }
});
gsap.set('.sc-comment .comment-wrap.second .comment-line', {yPercent: 100, autoAlpha:0});
gsap.set('.sc-comment .comment-wrap.first', { zIndex: 2 });
gsap.set('.sc-comment .comment-wrap.second', { zIndex: 1 });

comment
.to('.sc-comment .comment-wrap.first .comment-line', 0.5, {yPercent: -100, autoAlpha:0}, '<')
  .to('.sc-comment .comment-wrap.first', { zIndex: 1 },"<") // first를 아래로
  .to('.sc-comment .comment-wrap.second', { zIndex: 2 },"<") // second를 위로
.to('.sc-comment .comment-wrap.second .comment-line', 0.5, {yPercent: 0,autoAlpha:1}, '<');



// 8. Film
// 8-1. Film title split
const filmTitle = document.querySelectorAll('.sc-film h2 .text');

filmTitle.forEach(function (text) {
  let wordEls = text.textContent.split('');
  let wordWrap = wordEls
    .map(function (word) {
      return `<span class="word">${word}</span>`;
    })
    .join('');
  text.innerHTML = wordWrap; // 수정된 부분
});

const filmDesc = document.querySelectorAll('.sc-film .desc');

filmDesc.forEach(function (desc) {
  wordEls = desc.textContent.split('');
  wordWrap = wordEls
    .map(function (word) {
      return `<span class="word">${word}</span>`;
    })
    .join('');
  desc.innerHTML = wordWrap; // 수정된 부분
});

// 8-2. Film scrollTrigger (PC)
// const filmStart = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.sc-film',
//     start: '0% 15%',
//     end: '0% 100%',
//     // scrub:2,
//     toggleActions: 'play none reverse none',
//     // markers: true
//   }
// });
// gsap.set('.sc-film .group-title h2 .word, .sc-film .group-title .desc .word', {
//   opacity: 0,
//   y: 30,
//   filter: 'blur(10px)'
// });

// filmStart
//   .to(
//     '.sc-film .group-title h2 .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.05,
//       ease: 'power2.out'
//     },
//     'a'
//   )
//   .to(
//     '.sc-film .group-title .desc:first-child .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.01,
//       ease: 'power2.out'
//     },
//     'a-=0.25'
//   )
//   .to(
//     '.sc-film .group-title .desc:last-child .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.01,
//       ease: 'power2.out'
//     },
//     'a'
//   );

  // 8-3. Film scrollTrigger (M)

// mediaQuery.add('(max-width: 1200px)', function(){
//   const filmStartMo = gsap.timeline({
//     scrollTrigger:{
//           trigger: '.sc-film',
//     start: '0% 80%',
//     end: '0% 80%',
//     // scrub:2,
//     toggleActions: 'play none reverse none',
//     markers: true
//     }
//   });
//   filmStartMo
//   .to(
//     '.sc-film .group-title h2 .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.05,
//       ease: 'power2.out'
//     },
//     'a'
//   )
//   .to(
//     '.sc-film .group-title .desc:first-child .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.01,
//       ease: 'power2.out'
//     },
//     'a-=0.25'
//   )
//   .to(
//     '.sc-film .group-title .desc:last-child .word',
//     {
//       opacity: 1,
//       y: 0,
//       filter: 'blur(0px)',
//       duration: 1,
//       stagger: 0.01,
//       ease: 'power2.out'
//     },
//     'a'
//   );

// });




// let mediaQuery = gsap.matchMedia();

// 코드 숙지하기

mediaQuery.add({
  // PC: 1201px 이상
  isPC: "(min-width: 1201px)",
  // Mobile/Tablet: 1200px 이하
  isMO: "(max-width: 1200px)"
}, (context) => {
  const { isPC, isMO } = context.conditions;

  const filmFrame = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-film',
      start: isPC ? '0% 15%' : '0% 80%',
      end: isPC ? '0% 100%' : '0% 80%',
      toggleActions: 'play none reverse none',
      // markers: true
    }
  });

  gsap.set('.sc-film .group-title h2 .word, .sc-film .group-title .desc .word', {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)'
  });

  filmFrame
  .to('.sc-film .group-title h2 .word', {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 1,
    stagger: 0.05,
    ease: 'power2.out'
  }, 'a')
    .to('.sc-film .group-title .desc:first-child .word', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.01,
      ease: 'power2.out'
    }, 'a-=0.25')
    .to('.sc-film .group-title .desc:last-child .word', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.01,
      ease: 'power2.out'
    }, 'a');


    // Mobile group-film 노출 모션
    if(isMO){
      gsap.set(".sc-film .group-film",{y:50, opacity:0, filter:'blur(3px)'});

      gsap.to(".sc-film .group-film",{
        opacity:1,
        filter:'blur(0)',
        y:0,
        scrollTrigger:{
          trigger:".sc-film",
          start:"0% 20%",
          end:"0% 20%",
          toggleActions:"play none reverse none",
          // markers:true
        }
      })
    }
});




// About




gsap.to('.sc-about .motion-line .ic-flower', {
  rotate: 180,
  scrollTrigger: {
    trigger: '.sc-about',
    start: '0% 90%',
    end: '100% 90%',
    scrub: 1,
    // markers:true
  }
});

gsap.set('.sc-about img', {scale: 0.4, opacity: 0});
gsap.to('.sc-about img', {
  scrollTrigger: {
    trigger: '.sc-about',
    start: '0% 55%',
    end: '100% 55%',
        toggleActions: 'play none none reverse'

    // markers:true
  },
  scale: 1,
  opacity: 1
});

gsap.set('.sc-about .comment-line',{yPercent:100});
gsap.to('.sc-about .comment-line', {
  yPercent: 0,
  scrollTrigger: {
    trigger: '.sc-about',
    start: '70% 60%',
    end: '100% 60%',
        toggleActions: 'play none none reverse',
    // markers:true
  }
});
