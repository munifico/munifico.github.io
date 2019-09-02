## 이터레이터와 제너레이터
ES6에서는 매우 중요한 새로운 개념 이터레이터<sup>Iterator</sup>와 제너레이터<sup>generator</sup>를 도입했습니다. 제너레이터는 이터레이터에 의존하는 개념이니 이터레이터부터 시작합시다.

이터레이터는 '지금 어디 있는지' 파악할 수 있도록 돕는다는 면에서 일종의 책갈피와 비슷한 개념입니다. 배열은 이터러블<sup>iterable</sup> 객체의 좋은 예입니다. 책에 여러 페이지가 있는 것처럼 배열에는 여러 요소가 들어 있으므로, 책에 책갈피를 끼울 수 있듯 배열에는 이터레이터를 사용할 수 있습니다. 책과 책갈피의 비유를 계속해서 사용해 봅시다. book이란 배열이 있고, 이 배열의 각 요소는 책의 한 페이지를 나타내는 문자열이라고 합시다. 루이스 캐럴의 <이상한 나라의 앨리스>에서 발췌한 '반짝 반짝 작은 박쥐' 원문을 사용해 볼까요. 한 페이지에 문장 하나씩만 들어 있는 어린이용 동화책을 상상해 보십시오.

~~~javascript
const book = [
    'Twinkle, twinkle, little bat!',
    'How I wonder what you\'re at! ',
    'Up above the world you fly',
    'Like a tea tray in the sky.',
    'Twinkle, twinkle, little bat!',
    'How I wonder what you\'re at! ',
]
~~~

이제 book 배열에 values 메서드를 써서 이터레이터를 만들 수 있습니다.

~~~javascript
const it = book.values();
~~~

이터레이터(보통 it이라고 줄여 씁니다)는 책갈피지만, 이 책에만 사용할 수 있습니다. 그리고 아직은 책갈피를 꽂을 수 없습니다. 읽지 않았으니까요. '읽기 시작'하려면 이터레이터의 next 메서드를 호출합니다. 이 메서드가 반환하는 객체에는 <b>value 프로퍼티(현재 페이지)</b>와 <b>done 프로퍼티(마지막 페이지를 읽으면 true로 바뀌는)</b>가 있습니다. 예제에는 6페이지밖에 없으니 책을 모두 읽는 과정을 쉽게 확인할 수 있습니다.

~~~javascript
for(let i=0; i<9; i++) {
    console.log(it.next());
}

/*
{ value: 'Twinkle, twinkle, little bat!', done: false }
{ value: "How I wonder what you're at! ", done: false }
{ value: 'Up above the world you fly', done: false }
{ value: 'Like a tea tray in the sky.', done: false }
{ value: 'Twinkle, twinkle, little bat!', done: false }
{ value: "How I wonder what you're at! ", done: false }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
*/
~~~

여기는 중요한 점이 몇 개 있습니다. 첫째, next에서 책의 마지막 페이지를 반환했다 해서 끝난 것은 아니란 겁니다. 책의 비유로는 조금 맞지 않는 부분입니다. 책의 마지막 페이지를 읽었다면 다 읽은 거지만, 이터레이터는 책을 읽는 것보다 훨씬 다양한 상황에 쓰일 수있고 끝나는 시점을간단히 결정할 수는 없습니다. 더 진행할 것이 없으면 value는 undefined가 되지만, next는 계속 호출할 수 있습니다. 물론 그렇다고 결과가 바뀌는 건 아닙니다. 일단 이터레이터가 끝까지 진행하면 뒤로 돌아가서 다른 데이터를 제공할 수는 없습니다.

~~~javascript
//위에서 한번 돌린 후에 다시금 돌리면
for(let i=0; i<9; i++) {
    console.log(it.next());
}

/*
결과는 다음과 같습니다.
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
*/
~~~

이 예제에서 묘사하지는 않았지만, it.next()를 호출하는 중간에 다른 일을 할 수 있습니다. 이 배열의 요소를 나열하는 것이 목적이라면 for루프나 for...of 루프를 쓸 수 있습니다. for 루프의 원리는 간단합니다. 배열 요소의 인덱스는 숫자형이고 순차적이므로 인덱스 변수를 써서 해당하는 배열 요소에 접근할 수 있습니다. 하지만 for...of 루프는 어떻게 된 걸까요? 인덱스 없이 어떻게 루프를 실행할 수 있었을까요? 답은 이터레이터입니다. 이터레이터만 제공할 수 있다면 무엇이든 for...of 루프를 함께 쓸 수 있습니다. 활용법에 대해서는 곧 알아봅니다. 먼저 이터레이터와 while 루프를 사용해서 for...of 루프를 흉내 내 봅시다.

~~~javascript
const it = book.values();
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}

/*
Twinkle, twinkle, little bat!
How I wonder what you're at!
Up above the world you fly
Like a tea tray in the sky.
Twinkle, twinkle, little bat!
How I wonder what you're at!
*/
~~~

이터레이터는 모두 독립적입니다. 즉, 새 이터레이터를 만들 때마다 처음에서 다시 시작합니다. 그리고 각각 다른 요소를 가리키는 이터레이터 여러 개를 동시에 사용할 수도 있습니다.

~~~javascript
const it1 = book.values();
const it2 = book.values();
//각각의 이터레이터가 새로 생성되었습니다.

//it1으로 두 페이지를 읽습니다.
it1.next(); //{ value: 'Twinkle, twinkle, little bat!', done: false }
it1.next(); //{ value: "How I wonder what you're at! ", done: false }

//it2로 한 페이지를 읽습니다.
it2.next(); //{ value: 'Twinkle, twinkle, little bat!', done: false }

//it1로 한 페이지를 더 읽습니다.
it1.next(); //{ value: 'Up above the world you fly', done: false }
~~~

이 예제는 두 이터레이터가 서로 독립적이며 같은 배열에서 따로따로 움직일 수 있음을 보여줍니다.

***
[이전 : 요약](../CHAPTER_11/11.6.md) <br/>
[다음 : 이터레이션 프로토콜](12.1.md) <br/>
[목차](../progressCheck.md)