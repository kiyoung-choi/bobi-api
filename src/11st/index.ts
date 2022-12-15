import axios from "axios";
import { decode } from "iconv-lite";
import { parse } from "js2xmlparser";
import { parseString } from "xml2js";

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