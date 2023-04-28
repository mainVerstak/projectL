document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('scroll', throttle(function () {
    return hideFloatBtn();
  }, 500));
  let floatBtn = document.querySelector('.float-btn');
  function hideFloatBtn() {
    console.log("object");
    if ((window.pageYOffset + this.window.innerHeight) > document.body.scrollHeight - 600) {
      floatBtn.classList.add('_hide');
    } else {
      floatBtn.classList.remove('_hide');
    }
  }

  let locationLinks = document.querySelectorAll('.location-list__link')
  locationLinks.forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
      this.classList.add('_show');
      this.addEventListener('mousemove', thumbnailPosition);
    });
    item.addEventListener('mouseleave', function (e) {
      this.classList.remove('_show');
    })
  });
  window.addEventListener('scroll', function () {
    locationLinks.forEach(function (item) {
      item.classList.remove('_show');
    })
  })

  function thumbnailPosition(e) {
    let thumbnail = this.querySelector('.location-list__thumbnail')
    thumbnail.style.top = (e.clientY + 10) + 'px';
    thumbnail.style.left = (e.clientX + 10) + 'px';
  }

  document.querySelectorAll('.video-box__btn').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let id = new URL(item.href).searchParams.get('v');
      let player = document.createElement('div');
      player.innerHTML = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      player.classList.add('video-box__wrapper');
      let container = item.closest('.video-box');
      container.classList.add('_active');
      container.querySelector('.video-box__wrapper').replaceWith(player);
    });
  });

  var swiperNews = new Swiper(".news-slider", {
    slidesPerView: 3,
    spaceBetween: 169,
    touchEventsTarget: 'container',
  });

  var swiperAwards = new Swiper(".awards-slider", {
    slidesPerView: 3,
    spaceBetween: 60,
    touchEventsTarget: 'container',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  var swiperServices = new Swiper(".services-slider", {
    slidesPerView: 3,
    spaceBetween: 169,
    touchEventsTarget: 'container',
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiperTeam = new Swiper(".team-slider", {
    slidesPerView: 4,
    spaceBetween: 75,
    touchEventsTarget: 'container',
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiperReviews = new Swiper(".reviews-slider", {
    slidesPerView: 4,
    spaceBetween: 47,
    touchEventsTarget: 'container',
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiperRoute = new Swiper(".route-slider", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    touchEventsTarget: 'container',
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      lock: function (swiper) {
        swiper.el.classList.add('swiper-hide-button')
      },
      unlock: function (swiper) {
        swiper.el.classList.remove('swiper-hide-button')
      },
    },
  });

  var swiperStyle2 = new Swiper(".style-slider2", {
    slidesPerView: 3,
    spaceBetween: 146,
    touchEventsTarget: 'container',
  });

  if (document.querySelectorAll('.marquee3k').length > 0) {
    Marquee3k.init();
    setTimeout(function () {
      Marquee3k.refreshAll();
    }, 5000);
  }
  //+modal
  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || '#' + this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId)
    })
  })
  function openModal(modalId) {
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('_modal-open');
  }
  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('_modal-open');
  }
  //-modal
  //+tabs
  document.querySelectorAll('.js-tab').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tabs');
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let tabsContent = tabsBtn.nextElementSibling;
      if (tabsContent.classList.contains('js-tabs-content')) {
        let index = elIndex(this);
        tabsContent.querySelectorAll('.js-tab-content._active').forEach(function (tab) {
          tab.classList.remove('_active');
        });
        tabsContent.querySelectorAll('.js-tab-content')[index].classList.add('_active');
      }
    })
  })
  //-tabs

  //+map
  function initMap() {
    if (document.getElementById("location-map"))
      initMapCompany();
  }
  window.initMap = initMap;
  function initMapCompany() {
    const addresses = [
      [0, 'Подол, ул. Нижний Вал, 15', 50.4648254, 30.509515, '<h3>Подол, ул. Нижний Вал, 15</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [1, 'Оболонь, ул. Оболонская набережная, 19 (корп.3)', 50.4998109, 30.5189947, '<h3>Оболонь, ул. Оболонская набережная, 19 (корп.3)</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [2, 'Печерск, бул. Дружбы Народов 21', 50.4167936, 30.5408454, '<h3>Печерск, бул. Дружбы Народов 21</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [3, 'Позняки, ул. А.Мишуги, 7а (2 этаж)', 50.3956142, 30.6376157, '<h3>Позняки, ул. А.Мишуги, 7а (2 этаж)</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [4, 'Теремки, ул. Ломоносова, 48', 50.3867162, 30.4659305, '<h3>Теремки, ул. Ломоносова, 48</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [5, 'Осокорки, Днепровская набережная, 25 Б', 50.4064115, 30.6150558, '<h3>Осокорки, Днепровская набережная, 25 Б</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [6, 'Русановка, ул. Энтузиастов, 25', 50.4407813, 30.6052856, '<h3>Русановка, ул. Энтузиастов, 25</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [7, 'Виноградарь, ул. Вышгородская, 32/2', 50.5075244, 30.4516999, '<h3>Виноградарь, ул. Вышгородская, 32/2</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>'],
      [8, 'Троещина, ул. Цветаевой, 13', 50.5227853, 30.6106104, '<h3>Троещина, ул. Цветаевой, 13</h3><p>ПН - ВС / 10:00 - 21:00 </br> +38 (067) 333 98 71</p>']
    ];
    for (var i = 0; i < addresses.length; i++) {
      let listItem = document.createElement('li');
      listItem.innerHTML = '<span class="section-map__list-item">' + addresses[i][1] + '</span>';
      document.querySelector('.section-map__list').append(listItem);
    };

    const mapAdressInfo = document.querySelector('.section-map__info');
    const mapAddressList = document.querySelectorAll('.section-map__list-item');

    const mapPin = './images/map-pin.svg';
    const mapPinActive = './images/map-pin_active.svg';
    const mapCenter = { lat: 50.453682, lng: 30.5727833 };
    const map = new google.maps.Map(document.getElementById("location-map"), {
      zoom: 11,
      mapTypeControl: false,
      center: mapCenter,
      styles: mapStyle
    });
    google.maps.event.addListenerOnce(map, 'idle', function () {
      map.panBy(-(mapAdressInfo.offsetWidth / 2), 0);
      google.maps.event.clearListeners(map, 'idle');
    });

    var markers = [];
    var infoWindow = new google.maps.InfoWindow();
    for (var i = 0; i < addresses.length; i++) {
      let address = addresses[i];
      let marker = new google.maps.Marker({
        position: { lat: address[2], lng: address[3] },
        map,
        title: addresses[i][1],
        icon: mapPin,
      })

      marker.addListener("click", function () {
        activateMapPin(marker, address[0], false);
      });
      markers.push(marker);
    }
    google.maps.event.addListener(map, "click", function (event) {
      infoWindow.close();
      markers.forEach(function (marker) {
        marker.setIcon(mapPin);
      })
      mapAddressList.forEach(function (listAdress) {
        listAdress.classList.remove('_active');
      })
    });

    mapAddressList.forEach(function (item) {
      item.addEventListener('click', function () {
        let index = elIndex(item.parentNode);
        map.setCenter(new google.maps.LatLng(markers[index].position.lat(), markers[index].position.lng()));
        map.setZoom(14);
        activateMapPin(markers[index], index, true);
      });
    });
    function activateMapPin(marker, index, menuClick) {
      mapAddressList.forEach(function (listAdress) {
        listAdress.classList.remove('_active');
      })
      mapAddressList[index].classList.add('_active');
      infoWindow.setContent(addresses[index][4])
      infoWindow.open({
        anchor: marker,
        map,
      });
      marker.setIcon(mapPinActive);
      if (menuClick)
        map.panBy(-(mapAdressInfo.offsetWidth / 2), 0);
    }
  }
  //-map
});

function elIndex(el) {
  if (!el) return -1;
  var i = 0;
  while (el = el.previousElementSibling) {
    i++;
  }
  return i;
}

function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#f8f5ec"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e8e5dc"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]