/**
 * Created by 51101 on 2019/7/21.
 */

function carousel(option) {
  // var albumAll = document.querySelectorAll('.photoAlbum .album');
  var imgAll = document.querySelectorAll('.photoAlbum .slider-frame li img');

  var isOne = 1;
  for(var j =0;j<imgAll.length;j++){
     imgAll[j].setAttribute('data-index',j+1)
  }
  var photosNum = document.querySelector('.big-photos .photosNum')
  var albumIndex = option.firstShow;

  // 初始显示第一组图片集
  var albumNum = document.querySelectorAll(
    ".photoAlbum .album" + option.firstShow + " >.slider-frame > ul >  li"
  );

  var albumUlNode = document.querySelector(
    ".photoAlbum .album" + option.firstShow + "  >.slider-frame > ul"
  );

  var albumAll = document.querySelectorAll(".photoAlbum .album");
  // 左右侧按钮
  var leftBtn = document.querySelector(" .left-btn");

  var rightBtn = document.querySelector(".right-btn");

  // ul
  var bigPhotosUl = document.getElementById("big-photos-ul");
  // li
  var bigPhotosLi = 0;

  //当前big-photos处于第几张
  var bigPhoto = 1;

  var nowBindAlbmu = null;

  var setTime = null;

  var swiper = null;

  var oldTime = null;

  var voideNode = null;




  function albumSwiper(id) {
    swiper = new Swiper('.swiper-container' + id, {
        slidesPerView: 'auto',
        loop:true,
        centeredSlides: true,
        loopAdditionalSlides:2,
        loopedSlides:5,
        slidesOffsetBefore : 0,
        centerInsufficientSlides:true,
        spaceBetween: 2,
        slideToClickedSlide: true,
        preventClicksPropagation: false,
        slideActiveClass: 'photos-active',
        on: {
            init: function () {
                var str = albumNum[this.realIndex].firstElementChild.attributes['data-index'].value;
                photosNum.innerHTML = '<span class="number">'+str +'/'+imgAll.length+'</span>'
                bigPhotosUl.style.transition = "0.5s left";
                bigPhotosUl.style.left = -100 * (this.realIndex * 1 + 1) + 'vw'
            },
            click: function (event) {
                // bigPhotosUl.style.transition = "0.5s left";
                // bigPhotosUl.style.left = -100 * (event.target.dataset.swiperSlideIndex * 1 + 1) + 'vw'
                // bigPhoto = event.target.dataset.swiperSlideIndex * 1 + 1;
            },
            slideChange() {
             
              var str = albumNum[this.realIndex].firstElementChild.attributes['data-index'].value;
              photosNum.innerHTML = '<span class="number">'+str +'/'+imgAll.length+'</span>'
                bigPhotosUl.style.transition = "0.5s left";
                bigPhotosUl.style.left = -100 * (this.realIndex * 1 + 1) + 'vw'
                bigPhoto = this.realIndex * 1 + 1;
            }
        }
        
    });
}


  bindAlbmu();  
  function bindAlbmu() {
    for (var i = 0; i < albumAll.length; i++) {
      (function(i) {
        albumAll[i].addEventListener("click", function(event) {
          var isOne2 = Array.from(event.target.parentNode.parentNode.classList).find(function (item) { 
          return item == 'swiper-container' + albumIndex
           })

          if(isOne === 1 && isOne2 ) {
            isOne = 2;
            return;
          };
          if (event.target.localName !== "li") {
            return;
          }
          if (nowBindAlbmu !== i) {
            swiper.destroy();
            albumNum = document.querySelectorAll('.photoAlbum .album' + (i + 1) + ' >.slider-frame > ul >  li');
            bigPhoto = 1;
            albumIndex = i+1;
            showBigImg();
            swiper.slideTo(Math.ceil(albumAll.length/2),300,false)
          }
          nowBindAlbmu = i;
        });
      })(i);
    }
  }

  showBigImg();
  function showBigImg() {
      bigPhotosUl.innerHTML = '';
      var firstSrc, lastSrc
      albumNum.forEach(function (item, index) {
        if(item.querySelector("img")){
         var itemArr = Array.from(item.classList)
         var isVoide =  itemArr.find(function (i) { 
              return i == 'viode'
          })
      if (!isVoide) {
        if (index === 0) {
          firstSrc = item.querySelector("img").src;
        }
        if (index === albumNum.length - 1) {
          lastSrc = item.querySelector("img").src;
        }
        var src = item.querySelector("img").src;
        var li = document.createElement("li");
        li.innerHTML =
          '<div class="carousel-image" style="background-image: url(' +
          src +
          ')"></div>';
        bigPhotosUl.appendChild(li);
      } else {
        if (index === 0) {
          firstSrc = item.querySelector("img").src;
        }
        if (index === albumNum.length - 1) {
          lastSrc = item.querySelector("img").src;
        }
        var src = item.querySelector("img").src;
        var li = document.createElement("li");
        li.innerHTML =
          '<div class="mask"><span><svg viewBox="0 0 24 24" class="domain-icon allhomes-listing-photo-carousel__carousel-overlay-icon"><path fill="currentColor" stroke="currentColor" stroke-width="2" d="M19 11.5L7 19V5l12 6.5z"></path></svg></span></div><div class="carousel-image" style="background-image: url(' +
          src +
          ')"></div>'+
          '<video  class="video-js" controls preload="auto" width="640" height="264" poster="" data-setup="{}" > <source src="'+option.voide[index]+'" type="video/mp4"> <source src="'+option.voide[index]+'" type="video/webm"> <source src="'+option.voide[index]+'" type="video/ogg"> <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browserthat<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p></video>'

        bigPhotosUl.appendChild(li);
        voideFn();
       }
      }
    });
    var firstlis = document.createElement('li');
    firstlis.innerHTML = '<div class="carousel-image" style="background-image: url(' + lastSrc + ')"></div>'
    bigPhotosUl.insertBefore(firstlis, bigPhotosUl.querySelector('li'));


    var lastlis = document.createElement('li');
    lastlis.innerHTML = '<div class="carousel-image" style="background-image: url(' + firstSrc + ')"></div>'
    bigPhotosUl.appendChild(lastlis)

    bigPhotosLi = bigPhotosUl.querySelectorAll('li')
    bigPhotosUl.style.width = bigPhotosLi.length * 100 + "vw";
    // 初始显示图片
    bigPhotosUl.style.transition = '0s left';
    bigPhotosUl.style.left = -100 * bigPhoto + 'vw';

    
    albumAllLiNum();
    albumSwiper(albumIndex);
    indexAll = document.querySelector('.photos-active > img').attributes['data-index'].value //　当前处于的值
   
     
}
  // 左侧点击 --
  leftBtn.addEventListener("click", function() {
    
    var nowTime = Date.now();
    if (nowTime - oldTime >= 350) {
        if(voideNode) voideNode.pause();
      clearTimeout(setTime);
      bigPhoto--;
      swiper.slidePrev();
      if (bigPhoto == 0) {
        bigPhotosUl.style.transition = "0s left";
        bigPhotosUl.style.left = -100 * (bigPhotosLi.length - 1) + "vw";
        bigPhoto = bigPhotosLi.length - 2;
        swiper.slideTo(bigPhotosLi.length - 1);
      }
      setTime = setTimeout(function() {
        bigPhotosUl.style.transition = "0.5s left";
        bigPhotosUl.style.left = -100 * bigPhoto + "vw";
      }, 10);
      oldTime = nowTime;
    }
  });

  // 右侧点击  ++
  rightBtn.addEventListener("click", function() {
  

    var nowTime = Date.now();
    if (nowTime - oldTime >= 350) {
        if(voideNode) voideNode.pause();
      clearTimeout(setTime);
      bigPhoto++;

      swiper.slideNext();
      if (bigPhoto == bigPhotosLi.length - 1) {
        swiper.slideTo(0);
        bigPhotosUl.style.transition = "0s left ";
        bigPhotosUl.style.left = 0 + "vw";
        bigPhoto = 1;
      }
      
      setTime = setTimeout(function() {
        bigPhotosUl.style.transition = "0.5s left";
        bigPhotosUl.style.left = -100 * bigPhoto + "vw";
      }, 10);
      oldTime = nowTime;
    }
  });

  function albumAllLiNum (param) {  
    for(var i = 0;i<albumAll.length;i++){
     var nodeNum = albumAll[i].querySelectorAll('.swiper-wrapper li')
     albumAll[i].querySelector('.photoAlbum .album .photos-list-label > span').innerHTML = '('+nodeNum.length+')'
    }
 }

  function voideFn() {
    var mask = document.querySelectorAll(".mask");
    var iconNode = document.querySelectorAll(".mask > span .domain-icon");
    for (var i = 0; i < iconNode.length; i++) {
      (function(i) {
        iconNode[i].addEventListener("click", function(event) {
          var arr = Array.from(bigPhotosUl.querySelectorAll("li"));
          arr.splice(0, 1);
          arr.splice(arr.length - 1, 1);

          voideNode = arr[i].querySelector("video");

          arr[i].querySelector(".carousel-image").style.display = "none";

          mask[i].style.display = "none";
          voideNode.style.display = "block";
          voideNode.play();
        });
      })(i);
    }
  }

  document.querySelector('.close').addEventListener('click',function () {
      // window.open("../housingDetails.html", '_self');
      window.open(OPEN_URL, '_self');
    })

}
