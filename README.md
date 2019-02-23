# template-project

Заготовка проекта. <br>
Эта ветка включает себя код <strong>c использованием pug</strong>. <br>

После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code> <br>

<code>gulp css:build</code>     -  компиляция scss<br>
<code>gulp js:build</code>      -  компиляция js <br>
<code>gulp pug:build</code>     -  компиляция pug<br>
<code>gulp css:comb</code>      -  "причесывание" css<br>
<code>gulp js:min</code>        -  минификация js<br>
<code>gulp pug:comb</code>      -  "причесывание" pug и html<br>
<code>gulp fonts:build</code>   -  переносит папку src/fonts в dist/fonts <br>
<code>gulp images:build</code>  -  переносит папку src/images в dist/images <br>
<code>gulp svg-sprite</code>    -  генерирует svg спрайт из svg-иконок, находящихся в src/images/svg-separate. <br> Иконки могут лежать во вложенных папках. Файл со спрайтом подключается в <code>scripts.pug</code>, в самом низу страниц <br>
<code>gulp build</code>         -  выполняет таск по сборке проекта (выполняет все такски по компиляции, конкатенации и переносу) <br>
<code>gulp watch</code>         -  команда слежения за файлами <br>
<code>gulp webserver</code>     -  запуск сервера <br>
<code>gulp clean</code>         -  удаление папки dist <br>
<code>gulp</code>               -  default таск для запуска всех таксков <br>


Все пути находятся в объекте <code>path</code> в файле <code>gulpfile.js</code> <br>

Все подключаемые части расположены в папках <code>partails/</code><br>
Подключение файлов:
- scss - <code>@import 'partails/header.scss';</code>
- pug  - <code>include partails/header.pug</code>
- js   - <code>//import('partails/app.js')</code>

<br>

Задачи для компиляции и "причесывания" разделены в целях оптимизации скорости сборки.<br>
Так же для оптимизации в компиляцию pug были включены только те файлы, которые изменяются, а не все скопом. Из-за этого есть проблема. (#1)<br>

Проблемы и планы
---------

- Pug файлы будут компилироваться только тогда, когда они изменены. Если мы включили файл блока в главную страницу и изменили его, ничего не произойдет, для того чтобы изменения отобразились нужно сохранить файл главной, то есть файл-родитель.
- Добавить gulp-babel и обработку es6
- Добавить код кэширования svg-sprite
- Сделать так чтобы .min файлы оставались такими в main.js (не путать с main.min.js). Сейчас идет сначала подключение импортов а потом код улучшается, в итоге все .min файлы разворачиваются. Это нужно убрать

