export interface IProduct {
	/** API 옵션 */
	apiOption: object;

	/** 상품명 */
	name: string;
	/** 상품코드 */
	pcode: string;
	/** 카테고리 */
	category: string;

	/** 판매가 */
	price: number;
	/** 소비자준수가 */
	listPrice: number;

	/** 배송비 타입 */
	shippingType: "F" | "S" | "C"; // F: 무료배송, S: 선불, C: 착불
	/** 배송비 */
	shippingCharge: number;
	/** 교환 배송비 */
	changeShippingCharge: number;
	/** 반품비 */
	returnShippingCharge: number;
	/** 제주 도선료 */
	jejuShippingCharge: number;
	/** 도서산간 추가 배송비 */
	mountainShippingCharge: number;
	/** 묶음배송 수량 */
	maxq: number;

	/** 키워드 */
	keyword: string;
	/** 상품수량 */
	quantity: number;
	/** 상세설명 */
	content: string;
	/** 모델명 */
	model?: string;
	/** 브랜드 */
	brand?: string;
	/** 제조사 */
	production: string;
	/** 제조국 */
	madein: string;
	/** 이미지모음 */
	imageUrls: string[];
	/** 과세여부 */
	tax: "tax" | "free" | "nocharge", // tax: 과세, free: 면세, nocharge: 영세
	/** 미성년자 판매 가능 여부 */
	blockMinor: "Y" | "N";
	/** 해외배송상품 여부 */
	isOversea: "Y" | "N";

	options: {
		/** 옵션데이터 */
		attributes: {
			name: string; // 옵션명
			value: string; // 옵션값
		}[]; // 옵션이 2단계일경우 배열로 ex) [{name: "색상", value: "레드"}, {name: "사이즈", value: "S"}]
		/** 옵션상태 */
		status: "sale" | "soldout"; // sale: 판매중, soldout: 품절
		/** 옵션가 */
		price: number;
		/** 옵션수량 */
		quantity: number;
	}[];

	/** 상품 인증정보 */
	certifications?: {
		/** 인증정보 타입 */
		type: string; // 01 : 전기용품/생활용품 KC인증, 02 : 어린이제품 KC인증, 03 : 방송통신기자재 KC인증, 04 : 생활화학 및 살생물제품
		/** KC인증대상여부 */
		isKcCerti: string; // 01 : KC인증대상, 02 : KC면제대상, 03 : KC인증대상 아님, 04 : 생활화학 및 살생물제품 대상, 05 : 생활화학 및 살생물제품 대상 아님
		/** KC면제유형 */
		isCertiExpt: string; // 01 : 구매대행면제대상, 02 : 병행수입면제대상
		/** 인증정보 */
		certiInfo: string;
		/** 인증 번호 */
		key: string;
	};

	/** 의료기기 */
	medicals?: {
		/** 의료기기 품목허가번호 */
		key: string;
		/** 의료기기 판매업신고 기관 및 번호 */
		retail: string;
		/** 의료기기사전광고심의번호 */
		ad: string;
	}
}