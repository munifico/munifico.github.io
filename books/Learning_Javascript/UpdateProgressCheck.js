const match = /(\[\s\]).*?(\d+\.{1}\d+\.*\d*\.*).*?([a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣].*)/;
const inputs = [
    '- [ ]  17.19 룩어헤드',
    '- [ ]  17.20 동적으로 정규식 만들기',
    '- [ ]  17.21 요약',
]

function completeSection(s) {
    const matches = s.match(match);
    return s.replace(matches[1],'[x]').replace(matches[2], `[${matches[2]}`) + ']' +
    '(CHAPTER_' + matches[2].match(/[0-9]{2}.*?/) +'/'+matches[2]+'.md' +
    ')';           
}

for(let input of inputs) {
    console.log(completeSection(input));
}