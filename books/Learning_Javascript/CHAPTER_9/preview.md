# 객체와 객체지향 프로그래밍
배열과 마찬가지로 자바스크립트 객체 역시 컨테이너지만, 크게 보면 다음 두 가지 측면에서 배열과 다릅니다.
<ul>
    <li>배열은 값을 가지며 각 값에는 숫자형 인덱스가 있습니다. 객체는 프로퍼티를 가지며 각 프로퍼티에는 문자열이나 심볼 인덱스가 있습니다.</li>
    <li>배열에는 순서가 있습니다. 즉, arr[0]은 항상 arr[1]보다 앞에 있습니다. 반면 객체에는 그런 순서가 보장되지 않습니다. obj.a가 obj.b보다 앞에 있다고 말할 수는 없습니다.</li>
</ul>
이런 차이는 중요하긴 하지만, 다분히 이론적입니다. 그러니 객체를 정말로 객체답게 만드는 프로퍼티에 대해 생각해 봅시다. 프로퍼티는 키(문자열 또는 심볼)과 값으로 구성됩니다. 객체의 진짜 특징은 키를 통해 프로퍼티에 접근할 수 있다는 점입니다.

***
~~[이전 : 요약](../CAHPTER_8/8.8.md)~~ <br/>
[다음 : 프로퍼티 나열](9.1.md) <br/>
[목차](../progressCheck.md)