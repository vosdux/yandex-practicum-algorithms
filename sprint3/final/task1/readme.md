Алла ошиблась при копировании из одной структуры данных в другую. Она хранила массив чисел в кольцевом буфере. Массив был отсортирован по возрастанию, и в нём можно было найти элемент за логарифмическое время. Алла скопировала данные из кольцевого буфера в обычный массив, но сдвинула данные исходной отсортированной последовательности (при этом массив все равно мог остаться отсортированным).
Тем не менее, нужно обеспечить возможность находить в нем элемент за O(logn).
Можно предполагать, что в массиве только уникальные элементы.
От вас требуется реализовать функцию, осуществляющую поиск в сломанном массиве. Обратите внимание, что считывать данные и выводить ответ не требуется.
Используйте заготовки кода для данной задачи, расположенные по ссылкам:


### Формат ввода
Функция принимает массив натуральных чисел и искомое число k. Длина массива не превосходит 10000. Элементы массива и число k не превосходят по значению 10000.

В примерах:
В первой строке записано число n –— длина массива.
Во второй строке записано положительное число k –— искомый элемент. 
Далее в строку через пробел записано n натуральных чисел – элементы массива.

Инструкцию по работе с Make вы можете найти в конце этого урока

### Формат вывода
Функция должна вернуть индекс элемента, равного k, если такой есть в массиве (нумерация с нуля). Если элемент не найден, функция должна вернуть −1.

Изменять массив нельзя.
Для отсечения неэффективных решений ваша функция будет запускаться от 100000 до 1000000 раз.

### Пример 1
Ввод
9
5
19 21 100 101 1 4 5 7 12

Вывод
6

### Пример 2
Ввод
2
1
5 1

Вывод
1