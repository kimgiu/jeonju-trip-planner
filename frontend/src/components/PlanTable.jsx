import React, { useEffect, useRef } from 'react';

function PlanTable({ planArray }) {
  const mapContainer = useRef(null);

  // 로컬에서 테스트할 때나, 지도 라이브러리(Leaflet 등)를 불러올 때
  // 반드시 window.L이 정의된 이후에 지도를 초기화해야 합니다.
  useEffect(() => {
    if (!planArray || planArray.length === 0) return;

    // **Leaflet 예시**: CDN 방식으로 <head>에 script 로드했다면 window.L이 준비돼 있어야 함
    // 만약 import 방식이라면 `import L from 'leaflet'` 해도 됩니다.
    if (typeof window.L === 'undefined') {
      console.warn('Leaflet 라이브러리가 아직 로드되지 않았습니다.');
      return;
    }

    // 이미 지도가 그려져 있다면, 먼저 지우거나 새로 생성해야 함
    mapContainer.current.innerHTML = ''; // 기존 map 컨테이너 초기화

    const map = window.L.map(mapContainer.current).setView([35.8242, 127.1480], 13); // 전주 좌표
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // planArray: 예를 들어 [{ day: 1, places: [{ name, lat, lng }...] }, { day: 2, places: [... ] }]
    planArray.forEach((dayPlan) => {
      // dayPlan.places 배열이 있다고 가정
      if (!Array.isArray(dayPlan.places)) return;

      dayPlan.places.forEach((place) => {
        // place.lat/lng가 없는 경우엔 기본 좌표(전주 시청)로 fallback
        const lat = place.lat || 35.8242;
        const lng = place.lng || 127.1480;
        const marker = window.L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>${place.name}</b><br/>${dayPlan.day}일차`);
      });
    });
  }, [planArray]);

  // 화면에 일정표(테이블)과 지도를 같이 렌더링
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-2xl font-semibold mb-4">생성된 일정 (표 및 지도)</h2>

      {/* 1) 일정표(테이블) */}
      {(!planArray || planArray.length === 0) ? (
        <p className="text-red-500">생성된 일정이 없습니다.</p>
      ) : (
        <div className="overflow-x-auto mb-6">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Day</th>
                <th className="border px-4 py-2">관광지/장소</th>
                <th className="border px-4 py-2">추천 음식점</th>
                <th className="border px-4 py-2">추천 숙소</th>
              </tr>
            </thead>
            <tbody>
              {planArray.map((dayPlan, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{dayPlan.day}일차</td>
                  <td className="border px-4 py-2">
                    {/* 예시: 장소 이름만 콤마로 구분 */}
                    {Array.isArray(dayPlan.places)
                      ? dayPlan.places.map((p) => p.name).join(', ')
                      : '정보 없음'}
                  </td>
                  <td className="border px-4 py-2">
                    {/* 예시: 추천 음식점이 배열로 들어왔다고 가정 */}
                    {Array.isArray(dayPlan.restaurants)
                      ? dayPlan.restaurants.map((r, i) => (
                          <div key={i} className="mb-2">
                            <strong className="text-green-600">{r.name}</strong>
                            <div>메뉴: {r.menu}</div>
                            <div>가격대: {r.price}</div>
                            <div>주소: {r.address}</div>
                            <div>전화: {r.phone}</div>
                          </div>
                        ))
                      : '정보 없음'}
                  </td>
                  <td className="border px-4 py-2">
                    {/* 예시: 추천 숙소가 배열로 들어왔다고 가정 */}
                    {Array.isArray(dayPlan.hotels)
                      ? dayPlan.hotels.map((h, i) => (
                          <div key={i} className="mb-2">
                            <strong className="text-blue-600">{h.name}</strong>
                            <div>가격대: {h.priceRange}</div>
                            <div>주소: {h.address}</div>
                            <div>전화: {h.phone}</div>
                          </div>
                        ))
                      : '정보 없음'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2) 지도 영역 */}
      <div
        ref={mapContainer}
        className="w-full h-80 rounded border border-gray-300"
        id="map"
        style={{ minHeight: '300px' }}
      >
        {/* Leaflet 또는 다른 지도 라이브러리에 의해 여기에 지도가 그려집니다. */}
      </div>
    </div>
  );
}

export default PlanTable;
