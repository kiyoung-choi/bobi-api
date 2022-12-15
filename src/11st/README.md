반품/교환지 등록 POST (/area/registerReturnAdr)
{
    apiOption: {
        key: "", // API 키
    },
    addrNm: "", // String	필수	주소명
    rcvrNm: "", // String	필수	이름
    gnrlTlphnNo: "", // String	필수	일반전화번호 입력형식 예시) 02-000-0000
    prtblTlphnNo: "", // String	필수	휴대전화번호 입력형식 예시) 010-1111-2222
    buildMngNO: "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
    lnmAddrSeq: "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
    dtlsAddr: "", // String	필수	상세주소 최대 한글 100자 영/숫자 200자
    addrClfCd: "", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
}

반품/교환지 조회 GET (/area/getReturnAdr)
{
    apiOption: {
        key: "", // API 키
    },
}

반품/교환지 수정 POST (/area/updateReturnAdr)
{
    apiOption: {
        key: "", // API 키
    },
    addrSeq: "", // String	O   주소 순번
    addrNm: "", // String	필수	주소명
    rcvrNm: "", // String	필수	이름
    gnrlTlphnNo: "", // String	필수	일반전화번호 입력형식 예시) 02-000-0000
    prtblTlphnNo: "", // String	필수	휴대전화번호 입력형식 예시) 010-1111-2222
    buildMngNO: "", // String	X	건물관리번호 건물관리번호 또는 관련 지번 순번 둘중에 하나는 필수
    lnmAddrSeq: "", // String	X	관련 지번 순번 입력시 건물관리번호 빈값
    dtlsAddr: "", // String	필수	상세주소 최대 한글 100자 영/숫자 200자
    addrClfCd: "", // String	X	주소 구분기본값은 도로명. 도로명인 경우 01, 지번인 경우 02
}