import axios from "axios";
import { decode } from "iconv-lite";
import { parseString } from "xml2js";

const util = require('util');

(async () => {
	const response = await axios({
		method: "GET",
		url: `http://api.11st.co.kr/rest/cateservice/category`,
		headers: {
			"Content-type": "text/xml;charset=EUC-KR",
		},
		responseType: "arraybuffer",
	});

	const res = await parseXML(response.data);
	console.log(util.inspect(res["ns2:categorys"]["ns2:category"], { maxArrayLength: null }))
})();

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