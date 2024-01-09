const fuelGifts = document.getElementById('fuel-gifts') as HTMLUListElement
const brandGifts = document.getElementById('brand-gifts') as HTMLUListElement
const departmentStoreGifts = document.getElementById('department-store-gifts') as HTMLUListElement
const bestGifts = document.getElementById('best-gifts') as HTMLUListElement
const luxuryGifts = document.getElementById('luxury-gifts') as HTMLUListElement
const healthyGifts = document.getElementById('healthy-gifts') as HTMLUListElement

const heart = new URL('../assets/heart.svg', import.meta.url)
// gift image URLs
const fuelGiftImages = [
  new URL('../assets/fuel-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/fuel-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/fuel-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/fuel-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/fuel-gifts/image5.png?as=webp&width=152', import.meta.url),
  new URL('../assets/fuel-gifts/image6.png?as=webp&width=152', import.meta.url),
]
const brandGiftImages = [
  new URL('../assets/brand-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/brand-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/brand-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/brand-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/brand-gifts/image5.png?as=webp&width=152', import.meta.url),
]
const departmentStoreGiftImages = [
  new URL('../assets/department-store-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/department-store-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/department-store-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/department-store-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/department-store-gifts/image5.png?as=webp&width=152', import.meta.url),
]
const bestGiftImages = [
  new URL('../assets/best-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/best-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/best-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/best-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/best-gifts/image5.png?as=webp&width=152', import.meta.url),
]
const luxuryGiftImages = [
  new URL('../assets/luxury-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/luxury-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/luxury-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/luxury-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/luxury-gifts/image5.png?as=webp&width=152', import.meta.url),
]
const healthyGiftImages = [
  new URL('../assets/healthy-gifts/image1.png?as=webp&width=152', import.meta.url),
  new URL('../assets/healthy-gifts/image2.png?as=webp&width=152', import.meta.url),
  new URL('../assets/healthy-gifts/image3.png?as=webp&width=152', import.meta.url),
  new URL('../assets/healthy-gifts/image4.png?as=webp&width=152', import.meta.url),
  new URL('../assets/healthy-gifts/image5.png?as=webp&width=152', import.meta.url),
]

interface Gift {
  choiceCount: number
  image: string | URL
  brandName: string
  name: string
  price: number
  likeCount: number
}

const fuelGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: fuelGiftImages[0],
    brandName: 'GS 칼텍스',
    name: 'GS칼텍스 주유쿠폰 50,000원(30일)',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: fuelGiftImages[1],
    brandName: 'S-OIL',
    name: '에쓰-오일 모바일주유상품권 5만원권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: fuelGiftImages[2],
    brandName: 'GS 칼텍스',
    name: '이마트_GS칼텍스 50,000원 모바일쿠폰',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: fuelGiftImages[3],
    brandName: 'SK',
    name: 'SK모바일주유권(5만원권)',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: fuelGiftImages[4],
    brandName: 'TMAP',
    name: 'TMAP 전기차 충전권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: fuelGiftImages[5],
    brandName: '차지비',
    name: '차지비 모바일 충전권',
    price: 50000,
    likeCount: 253,
  },
]
const brandGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: brandGiftImages[0],
    brandName: '배달의민족',
    name: '배달의민족 5만원권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: brandGiftImages[1],
    brandName: '스타벅스',
    name: '스타벅스 e카드교환권 5만원권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: brandGiftImages[2],
    brandName: '요기요',
    name: '요기요 5만원권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: brandGiftImages[3],
    brandName: '아웃백 스테이크 하우스',
    name: '아웃백 스테이크 하우스 기프트카드 5만원권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: brandGiftImages[4],
    brandName: 'CJ',
    name: 'CJ 통합 기프트카드 5만원권',
    price: 50000,
    likeCount: 253,
  },
]
const departmentStoreGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: departmentStoreGiftImages[0],
    brandName: '신세계 백화점',
    name: '신세계 백화점 모바일교환권 5만원(이마트 교환전용)',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: departmentStoreGiftImages[1],
    brandName: '롯데모바일상품권',
    name: '롯데 모바일교환권 50,000원',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: departmentStoreGiftImages[2],
    brandName: '현대 백화점',
    name: '현대 백화점 5만원 상품권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: departmentStoreGiftImages[3],
    brandName: '롯데 백화점',
    name: '롯데 백화점 5만원 상품권',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: departmentStoreGiftImages[4],
    brandName: 'AK 플라자',
    name: 'AK 모바일상품권 50,000원(교환권)',
    price: 50000,
    likeCount: 253,
  },
]
const bestGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: bestGiftImages[0],
    brandName: '스타벅스',
    name: '아이스 카페 아메리카노 T 8잔',
    price: 38000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: bestGiftImages[1],
    brandName: 'AESOP',
    name: '레저렉션 아로마틱 핸드 워시',
    price: 49000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: bestGiftImages[2],
    brandName: '양키캔들',
    name: '양키캔들 시그니처 텀블러(L)',
    price: 55000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: bestGiftImages[3],
    brandName: '고디바',
    name: '[고디바] 까레 어쏘트먼트 24개입/원산지 : 벨기에',
    price: 50000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: bestGiftImages[4],
    brandName: '투썸플레이스',
    name: '마스카포네 티라미수',
    price: 37000,
    likeCount: 253,
  },
]
const luxuryGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: luxuryGiftImages[0],
    brandName: '정관장',
    name: '[고급 보자기포장] 정관장 서눌세트 다보록_감사휘편/원산지 : 국내산',
    price: 53000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: luxuryGiftImages[1],
    brandName: '지방시',
    name: '[각인/선물포장] 르 루즈 앵떼르디 밤',
    price: 53000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: luxuryGiftImages[2],
    brandName: '아실',
    name: '계절의 정취를 담은 제철과일 선물세트 삼색소담(프리미엄) 2.7kg (샤인머스캣 애플골드망고 한라봉 체리)',
    price: 59800,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: luxuryGiftImages[3],
    brandName: '푸드장',
    name: '푸드장 프리미엄 구이 선물세트1.15kg(부채살+살치살+토시살+소목등심(척아이롤))원산지 : 미국',
    price: 49900,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: luxuryGiftImages[4],
    brandName: '정관장',
    name: '정관장 홍삼정 에브리타임 샷 (20입) [한국인삼공사]',
    price: 53100,
    likeCount: 253,
  },
]
const healthyGiftsData: Gift[] = [
  {
    choiceCount: 240,
    image: healthyGiftImages[0],
    brandName: '오퍼스',
    name: '차량용 방향제 대시보드형(쇼핑백 & 감사카드 증정)',
    price: 49000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: healthyGiftImages[1],
    brandName: '불스원',
    name: '[불스원] 차량용 무선 청소기 3in1 멀티 핸디형 미니 청소기',
    price: 69000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: healthyGiftImages[2],
    brandName: '그랑핸드',
    name: '[각인/선물포장] 르 루즈 앵떼르디 밤',
    price: 53000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: healthyGiftImages[3],
    brandName: '덴티스테',
    name: '덴티스테 안티캐비티 3p 충치케어 선물세트[100g 3개+브레스케어스프레이+카림파우치]',
    price: 39000,
    likeCount: 253,
  },
  {
    choiceCount: 240,
    image: healthyGiftImages[4],
    brandName: '카템',
    name: '카템 맥세이프 호환 15W 차량용 고속 무선 충전 거치대 IC-M1',
    price: 39900,
    likeCount: 253,
  },
]

function giftItemTemplate(gift: Gift) {
  return `<li class="w-152">
            <p class="text-c1-regular text-gray-500">
              <strong class="text-c1-semibold text-violet-300">
                ${gift.choiceCount}
              </strong>
              명이 선택했어요
            </p>
            <div
              class="my-6 flex h-152 w-152 items-center justify-center rounded-4 border border-gray-200 bg-gray-100"
            >
              <img
                src=${gift.image}
                alt=${gift.name}
              />
            </div>
            <span class="pb-4 text-c2 text-gray-500">${gift.brandName}</span>
            <p class="line-clamp-2 text-b3-regular text-black">
              ${gift.name}
            </p>
            <p class="py-10 text-b2-semibold text-black">50000원</p>
            <div
              class="flex justify-end border-t border-gray-200 py-6"
            >
              <button type="button" class="inline pr-6">
                <img src=${heart} alt='좋아요 버튼 아이콘'  />
                </button>
                ${gift.likeCount}
            </div>
          </li>`
}

export function renderGiftItems() {
  fuelGifts.innerHTML = fuelGiftsData.map((gift) => giftItemTemplate(gift)).join('')
  brandGifts.innerHTML = brandGiftsData.map((gift) => giftItemTemplate(gift)).join('')
  departmentStoreGifts.innerHTML = departmentStoreGiftsData.map((gift) => giftItemTemplate(gift)).join('')
  bestGifts.innerHTML = bestGiftsData.map((gift) => giftItemTemplate(gift)).join('')
  luxuryGifts.innerHTML = luxuryGiftsData.map((gift) => giftItemTemplate(gift)).join('')
  healthyGifts.innerHTML = healthyGiftsData.map((gift) => giftItemTemplate(gift)).join('')
}
