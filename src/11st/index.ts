import axios from "axios";
import { decode } from "iconv-lite";
import { parse } from "js2xmlparser";
import { parseString } from "xml2js";
import { IProduct } from "../common";

const express = require("express");
const router = express.Router();

/** 반품/교환지 등록 */
router.post("/area/registerReturnAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		if (!body.addrNm) {
			throw new Error("주소명을 확인해 주세요.");
		}

		if (!body.rcvrNm) {
			throw new Error("이름을 확인해 주세요.");
		}

		if (!body.gnrlTlphnNo) {
			throw new Error("일반전화번호를 확인해 주세요.");
		}

		if (!body.prtblTlphnNo) {
			throw new Error("휴대전화번호를 확인해 주세요.");
		}

		if (!body.buildMngNO && !body.lnmAddrSeq) {
			throw new Error("건물관리번호 또는 관련 지번 순번을 확인해 주세요.");
		}

		if (!body.dtlsAddr) {
			throw new Error("상세주소를 확인해 주세요.");
		}

		const params = {
			addrNm: body.addrNm, // String	O	주소명
			rcvrNm: body.rcvrNm, // String	O	이름
			gnrlTlphnNo: body.gnrlTlphnNo, // String	O	일반전화번호 입력형식 예시) 02-000-0000
			prtblTlphnNo: body.prtblTlphnNo, // String	O	휴대전화번호 입력형식 예시) 010-1111-2222
			buildMngNO: body.buildMngNO || "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
			lnmAddrSeq: body.lnmAddrSeq || "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
			dtlsAddr: body.dtlsAddr, // String	O	상세주소 최대 한글 100자 영/숫자 200자
			addrClfCd: body.addrClfCd || "01", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
		};
		const data = parse("InOutAddress", params);
		const response = await request(data, body.apiOption, "/areaservice/v2/registerRtnAddress", "POST");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 반품/교환지 조회 */
router.get("/area/getReturnAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		const response = await request("", body.apiOption, "/areaservice/inboundarea", "GET");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 반품/교환지 수정 */
router.post("/area/updateReturnAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		if (!body.addrSeq) {
			throw new Error("주소 순번을 확인해 주세요.");
		}

		if (!body.addrNm) {
			throw new Error("주소명을 확인해 주세요.");
		}

		if (!body.rcvrNm) {
			throw new Error("이름을 확인해 주세요.");
		}

		if (!body.gnrlTlphnNo) {
			throw new Error("일반전화번호를 확인해 주세요.");
		}

		if (!body.prtblTlphnNo) {
			throw new Error("휴대전화번호를 확인해 주세요.");
		}

		if (!body.buildMngNO && !body.lnmAddrSeq) {
			throw new Error("건물관리번호 또는 관련 지번 순번을 확인해 주세요.");
		}

		if (!body.dtlsAddr) {
			throw new Error("상세주소를 확인해 주세요.");
		}

		const params = {
			addrSeq: body.addrSeq, // String	O	주소 순번
			addrNm: body.addrNm, // String	O	주소명
			rcvrNm: body.rcvrNm, // String	O	이름
			gnrlTlphnNo: body.gnrlTlphnNo, // String	O	일반전화번호 입력형식 예시) 02-000-0000
			prtblTlphnNo: body.prtblTlphnNo, // String	O	휴대전화번호 입력형식 예시) 010-1111-2222
			buildMngNO: body.buildMngNO || "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
			lnmAddrSeq: body.lnmAddrSeq || "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
			dtlsAddr: body.dtlsAddr, // String	O	상세주소 최대 한글 100자 영/숫자 200자
			addrClfCd: body.addrClfCd || "01", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
		};
		const data = parse("InOutAddress", params);
		const response = await request(data, body.apiOption, "/areaservice/v2/updateRtnAddress", "POST");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 출고지 등록 */
router.post("/area/registerOutAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		if (!body.addrNm) {
			throw new Error("주소명을 확인해 주세요.");
		}

		if (!body.rcvrNm) {
			throw new Error("이름을 확인해 주세요.");
		}

		if (!body.gnrlTlphnNo) {
			throw new Error("일반전화번호를 확인해 주세요.");
		}

		if (!body.prtblTlphnNo) {
			throw new Error("휴대전화번호를 확인해 주세요.");
		}

		if (!body.buildMngNO && !body.lnmAddrSeq) {
			throw new Error("건물관리번호 또는 관련 지번 순번을 확인해 주세요.");
		}

		if (!body.dtlsAddr) {
			throw new Error("상세주소를 확인해 주세요.");
		}

		const params = {
			addrNm: body.addrNm, // String	O	주소명
			rcvrNm: body.rcvrNm, // String	O	이름
			gnrlTlphnNo: body.gnrlTlphnNo, // String	O	일반전화번호 입력형식 예시) 02-000-0000
			prtblTlphnNo: body.prtblTlphnNo, // String	O	휴대전화번호 입력형식 예시) 010-1111-2222
			buildMngNO: body.buildMngNO || "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
			lnmAddrSeq: body.lnmAddrSeq || "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
			dtlsAddr: body.dtlsAddr, // String	O	상세주소 최대 한글 100자 영/숫자 200자
			addrClfCd: body.addrClfCd || "01", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
		};
		const data = parse("registerOutAddress", params);
		const response = await request(data, body.apiOption, "/areaservice/v2/registerRtnAddress", "POST");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 출고지 조회 */
router.get("/area/getOutAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		const response = await request("", body.apiOption, "/areaservice/outboundarea", "GET");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 출고지 수정 */
router.post("/area/updateOutAdr", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		if (!body.addrSeq) {
			throw new Error("주소 순번을 확인해 주세요.");
		}

		if (!body.addrNm) {
			throw new Error("주소명을 확인해 주세요.");
		}

		if (!body.rcvrNm) {
			throw new Error("이름을 확인해 주세요.");
		}

		if (!body.gnrlTlphnNo) {
			throw new Error("일반전화번호를 확인해 주세요.");
		}

		if (!body.prtblTlphnNo) {
			throw new Error("휴대전화번호를 확인해 주세요.");
		}

		if (!body.buildMngNO && !body.lnmAddrSeq) {
			throw new Error("건물관리번호 또는 관련 지번 순번을 확인해 주세요.");
		}

		if (!body.dtlsAddr) {
			throw new Error("상세주소를 확인해 주세요.");
		}

		const params = {
			addrSeq: body.addrSeq, // String	O	주소 순번
			addrNm: body.addrNm, // String	O	주소명
			rcvrNm: body.rcvrNm, // String	O	이름
			gnrlTlphnNo: body.gnrlTlphnNo, // String	O	일반전화번호 입력형식 예시) 02-000-0000
			prtblTlphnNo: body.prtblTlphnNo, // String	O	휴대전화번호 입력형식 예시) 010-1111-2222
			buildMngNO: body.buildMngNO || "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
			lnmAddrSeq: body.lnmAddrSeq || "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
			dtlsAddr: body.dtlsAddr, // String	O	상세주소 최대 한글 100자 영/숫자 200자
			addrClfCd: body.addrClfCd || "01", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
		};
		const data = parse("InOutAddress", params);
		const response = await request(data, body.apiOption, "/areaservice/v2/updateOutAddress", "POST");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 상품 등록 */
router.post("/product/register", async (req: any, res: any) => {
	try {
		interface Product extends IProduct {
			apiOption: {
				key: string;
				addrSeqOut: string;
				addrSeqIn: string;
			}
		}
		const body: Product = req.body;

		const tax = body.tax === "tax" ? "01" : (body.tax === "free" ? "02" : "03");

		const params: any = {
			selMthdCd: "01", // 판매방식
			dispCtgrNo: body.category, // 카테고리번호
			prdTypCd: "01", // 서비스 상품 코드
			prdNm: body.name, // 상품명
			brand: body.brand || "&#39;알수없음&#39;", // 브랜드
			rmaterialTypCd: "05", // 원재료 유형 코드 05: 상품별 원산지는 상세설명 참조
			orgnTypCd: "03", // 원산지 코드
			orgnNmVal: body.madein, // 원산지명
			suplDtyfrPrdClfCd: tax, // 부가세/면세상품코드
			forAbrdBuyClf: body.isOversea === "Y" ? "02" : "01", // 해외구매대행상품 여부
			prdStatCd: "01", // 상품상태
			minorSelCnYn: body.blockMinor, // 미성년자 구매가능
			prdImage01: body.imageUrls[0], // 대표 이미지 URL
			htmlDetail: body.content, // 상세설명
			selPrc: body.price, // 판매가
			gblDlvYn: "", // 전세계배송 이용여부
			dlvCnAreaCd: "01", // 배송가능지역 코드
			dlvWyCd: "01", // 배송방법
			dlvCstInstBasiCd: body.shippingType === "S" ? "02" : "01", // 배송비 종류
			dlvCst1: body.shippingType === "S" ? body.shippingCharge : "", // 배송비
			bndlDlvCnYn: body.isMaxq, // 묶음배송 여부
			selLimitQty: body.maxq, // 최대구매수량 개수
			dlvCstPayTypCd: "03", // 결제방법
			jejuDlvCst: body.jejuShippingCharge, // 제주
			islandDlvCst: body.mountainShippingCharge, // 도서산간
			// addrSeqOut: body.apiOption.addrSeqOut, // 출고지 주소 코드
			// addrSeqIn: body.apiOption.addrSeqIn, // 반품/교환지 주소 코드
			rtngdDlvCst: body.returnShippingCharge, // 반품배송비
			exchDlvCst: body.changeShippingCharge, // 교환배송비(왕복)
			asDetail: "상세페이지 참조", // A/S 안내
			rtngExchDetail: "상세페이지 참조", // 반품/교환 안내
			dlvClf: "02", // 배송 주체
			ProductNotification: {
				type: "891045", // 유형코드
				item: [
					{
						code: "23759100", // 항목코드
						name: "상세페이지 참조", // 항목값
					},
					{
						code: "23756033", // 항목코드
						name: "상세페이지 참조", // 항목값
					},
					{
						code: "11905", // 항목코드
						name: "상세페이지 참조", // 항목값
					},
					{
						code: "23760413", // 항목코드
						name: "상세페이지 참조", // 항목값
					},
					{
						code: "11800", // 항목코드
						name: "상세페이지 참조", // 항목값
					},
				],
			},
			company: body.production || "", // 제조사
			modelNm: body.model || "", // 모델명
		};

		if (body.certifications) {
			params.ProductCertGroup = {
				crtfGrpTypCd: body.certifications.type, // 인증정보그룹번호
				crtfGrpObjClfCd: body.certifications.isKcCerti, // KC인증대상여부
				crtfGrpExptTypCd: body.certifications.isCertiExpt, // KC면제유형
				ProductCert: {
					certTypeCd: body.certifications.certiInfo, // 인증유형
					certKey: body.certifications.key, // 인증번호
				},
			};
		}

		if (body.medicals) {
			params.ProductMedical = {
				MedicalKey: body.medicals.key, // 의료기기 품목허가번호
				MedicalRetail: body.medicals.retail, // 의료기기 판매업신고 기관 및 번호
				MedicalAd: body.medicals.ad, // 의료기기사전광고심의번호
			};
		}

		if (body.options) {
			params.ProductOption = body.options.map((o, idx) => {
				const colValue0 = o.attributes.length === 1 ? o.attributes[0].value : `${o.attributes[0].value}_${o.attributes[1].value}`;
				return {
					useYn: o.status === "sale" ? "Y" : "N", // 옵션상태
					colOptPrice: o.price, // 옵션가
					colValue0, // 옵션값
					colCount: o.quantity, // 옵션재고수량
					colSellerStockCd: idx, // 셀러재고번호
				};
			});
		}

		return res.status(200).json(params);

		// const data = parse("Product", params);
		// const response = await request(data, body.apiOption, "/prodservices/product", "POST");

		// return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

/** 상품 수정 */

/** 판매 중지 */
router.post("/product/soldout", async (req: any, res: any) => {
	try {
		const body = req.body;

		if (!body.apiOption || !body.apiOption.key) {
			throw new Error("API키 값을 확인해 주세요.");
		}

		if (!body.prdNo) {
			throw new Error("상품코드를 확인해 주세요.");
		}

		const response = await request("", body.apiOption, `/prodstatservice/stat/stopdisplay/${body.prdNo}`, "PUT");

		return res.status(200).json(response);
	} catch (err) {
		return res.status(400).send({ status: 400, message: err.message });
	}
});

function parseXML(data: any): Promise<any> {
	return new Promise((resolve, reject) =>
		parseString(decode(data, "EUC-KR"), {}, (err: any, i: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(i);
			}
		}),
	);
}

async function request(data: string, apiOpt: any, action: string, method: "GET" | "POST" | "PUT") {
	try {
		const response = await axios({
			method,
			url: `http://api.11st.co.kr/rest${action}`,
			headers: {
				"Content-type": "text/xml;charset=EUC-KR",
				openapikey: apiOpt.key,
			},
			data,
			responseType: "arraybuffer",
		});

		return parseXML(response.data);
	} catch (err) {
		throw new Error(err.message);
	}
}

export default router;