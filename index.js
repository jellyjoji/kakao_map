let container = document.getElementById("map");
let options = {
  center: new kakao.maps.LatLng(35.8729129, 128.5985872),
  level: 3,
};

let map = new kakao.maps.Map(container, options);
/* -------------------------------------------------------------------------- */
// 마커가 표시될 위치입니다
var markerPosition = new kakao.maps.LatLng(35.8729129, 128.5985872);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);
/* -------------------------------------------------------------------------- */
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

/* -------------------------------------------------------------------------- */

// // 장소 검색 객체를 생성합니다
// var ps = new kakao.maps.services.Places();

// // 키워드로 장소를 검색합니다
// ps.keywordSearch("이태원 맛집", placesSearchCB);

// // 키워드 검색 완료 시 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//     // LatLngBounds 객체에 좌표를 추가합니다
//     var bounds = new kakao.maps.LatLngBounds();

//     for (var i = 0; i < data.length; i++) {
//       displayMarker(data[i]);
//       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//     }

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
//   }
// }

// // 지도에 마커를 표시하는 함수입니다
// function displayMarker(place) {
//   // 마커를 생성하고 지도에 표시합니다
//   var marker = new kakao.maps.Marker({
//     map: map,
//     position: new kakao.maps.LatLng(place.y, place.x),
//   });

//   // 마커에 클릭이벤트를 등록합니다
//   kakao.maps.event.addListener(marker, "click", function () {
//     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//     infowindow.setContent(
//       '<div style="padding:5px;font-size:12px;">' + place.place_name + "</div>"
//     );
//     infowindow.open(map, marker);
//   });
// }
/* -------------------------------------------------------------------------- */
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

//? 키워드로 장소를 검색합니다
//? 검색 버튼을 눌렀을 때 호출되는 함수
function searchPlaces() {
  let searchKeyword = document.getElementById("searchPlace").value;
  if (!searchKeyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  //? 키워드로 검색된 결과를 ps.keywordSearch() 함수를 이용해 검색합니다.
  ps.keywordSearch(searchKeyword, placesSearchCB);
}

//? 검색 버튼의 이벤트 리스너를 등록합니다.
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", searchPlaces);

//? 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    //? 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //? LatLngBounds 객체에 좌표를 추가합니다
    let bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    //? 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }

  function displayMarker(place) {
    //? 마커를 생성하고 지도에 표시합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    //? 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      //? 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  }
}
/* -------------------------------------------------------------------------- */
