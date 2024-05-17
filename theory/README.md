```
const arr = [10, 12, 15, 21]

for (var i = 0; i < arr.length; i++) {
    setTimeout(function () {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```
Данный код 4 раза выведет undefined по причине того, что "var" имеет hosting, а так же только глобальную и функциональную области видимости.
В результате i принимает значение 4, а потом уже выполняется setTimout 4 раза

**Исправить цикл можно следующими способами:**

1. Использовать переменную let, которая, помимо глобальной и функциональной еще имеет блочную область видимости
```
for (let i = 0; i < arr.length; i++) {
    setTimeout(function () {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}
```

2. Обернуть setTimout в функцию и вызывать для каждого значения i
```
for (var i = 0; i < arr.length; i++) {
  function x(i) {
    setTimeout(function () {
      console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
  }
  x(i)
}
```