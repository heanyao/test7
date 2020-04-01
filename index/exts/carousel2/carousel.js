//　il
var galleryThumbs = document.querySelector(".gallery-thumbs");
// li
var thumbs = document.querySelectorAll(".gallery-thumbs ul li");

var ulText = document.querySelector('.album .photos-list-label span');

var photosNum = document.querySelector('.photosNum .number')

var oldThumbslength = thumbs.length //　原始元素长度

var setTime = null; //　定时器

var swiperUl = document.querySelector('.photoAlbum .gallery-thumbs ul')

var oldTime = Date.now();
//　标示
var index = oldThumbslength;

var gallerLeft = galleryThumbs.clientWidth / 2 - 35

var galleryTop = null;

var videoSpan = document.querySelectorAll('.mask .videoSpan')

var video = null;
var videoSpanJ = null;
// document.querySelector('')
initial();
swiper();
function black() {
  window.open("../housingDetails.html", '_self');
}
function initial() {

  //　０－３
  var firstArr = Array.from(thumbs).splice(0, thumbs.length);
  // 最后三张
  var lastArr = Array.from(thumbs).splice(0, thumbs.length);
  //　　合并后的新数组
  lastArr.forEach(function (item) {
    var li = document.createElement('li')
    li.classList.add('swiper-slide')
    li.innerHTML = item.innerHTML;
    swiperUl.insertBefore(li, firstArr[0])
  })
  firstArr.forEach(function (item) {
    var li = document.createElement('li')
    li.classList.add('swiper-slide')
    li.innerHTML = item.innerHTML;
    swiperUl.appendChild(li)
  })
  thumbs = document.querySelectorAll(".gallery-thumbs ul li")

  // 70
  swiperUl.style.width = (60 + 10) * thumbs.length + 'px';

  swiperUl.style.transform = 'translateX(-' + (index * 70 - gallerLeft) + 'px)';
  thumbs[index].classList.add('activeClass')

  for (var i = 0; i < thumbs.length; i++) {
    (function (i) {
      thumbs[i].setAttribute('data-index', i)
      thumbs[i].addEventListener('click', function (event) {
        var nowTime = Date.now()
        //　当前时间 - 旧的时间　> 550
        if (nowTime - oldTime < 350) {
          return;
        }
        oldTime = nowTime;
        if (setTime) clearTimeout(setTime);
        index = event.target.dataset['index'] * 1
        console.log(index)
        if (galleryTop) {

          if (index > 14) {
            galleryTop.slideTo(index, 0, false)
          } else {
            galleryTop.slideTo(index, 300, false)
          }
        }
      })
    })(i)
  }

  for (var j = 0; j < videoSpan.length; j++) {
    (function (j) {
      videoSpan[j].addEventListener('click', function (event) {
        video = videoSpan[j].parentNode.querySelector('.video-js')
        videoSpanJ = videoSpan[j]
        videoSpanJ.style.display = "none";
        video.style.display = 'block';
        video.play();
      })
    })(j);
  }
}

function swiper() {
  galleryTop = new Swiper('.gallery-top', {
    slidesPerView: 'auto',
    loop: true,
    speed:500,
    centeredSlides: true,
    slidesOffsetBefore: 0,
    loopAdditionalSlides: 1,
    spaceBetween: 10,
    slideToClickedSlide: true,
    preventClicksPropagation: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        this.slideTo(this.activeIndex, 300, false)
      },
      slideChange() {
        index = this.activeIndex
        swiperUlTrans();
        if (video) {
          video.pause()
          videoSpanJ.style.display = "block";
          video.style.display = "none";

        }
      }
    }
  });
}

function swiperUlTrans() {
  swiperUl.style.transition = '0.3s all';
  for (var j = 0; j < thumbs.length; j++) {
    thumbs[j].classList.remove('activeClass');
  }
  if (index <= 6) {
    swiperUl.style.transform = 'translateX(-' + (index * 70 - (galleryThumbs.clientWidth / 2 - 35)) + 'px)';
    setTime = setTimeout(function () {
      index = index + oldThumbslength;
      swiperUl.style.transition = '0s all';
      swiperUl.style.transform = 'translateX(-' + (index * 70 - (galleryThumbs.clientWidth / 2 - 35)) + 'px)';
      thumbs[index].classList.add('activeClass')
    }, 300)

  } else if (index > 13) {
    swiperUl.style.transform = 'translateX(-' + (index * 70 - (galleryThumbs.clientWidth / 2 - 35)) + 'px)';
    setTime = setTimeout(function () {
      index = index - oldThumbslength;
      swiperUl.style.transition = '0s all';
      swiperUl.style.transform = 'translateX(-' + (index * 70 - (galleryThumbs.clientWidth / 2 - 35)) + 'px)';
      thumbs[index].classList.add('activeClass')
    }, 300)
  } else {
    swiperUl.style.transform = 'translateX(-' + (index * 70 - (galleryThumbs.clientWidth / 2 - 35)) + 'px)';
  }
  thumbs[index].classList.add('activeClass')
  ulText.innerHTML = "(" + oldThumbslength + ")"
  var num = 1;
  if (index >= oldThumbslength && index < oldThumbslength * 2) {
    num = index - oldThumbslength + 1;
  } else if (index > oldThumbslength * 2 - 1) {
    num = 1;
  } else if (index < 7) {
    num = 7
  }
  photosNum.innerHTML = num + "/" + oldThumbslength
}
