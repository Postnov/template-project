# template-project


Шаблон проекта. <br>

## Особенности:
- SCSS
- Pug
- Babel (возможность использовать es6)
- Возможность импорта js файлов (подробности подключения ниже)
- Компиляция и кэширование svg-спрайта

После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code>. Некоторые плагины могут не установиться со всеми, их нужно установить вручную.<br>

<code>gulp css:build</code>     -  компиляция scss<br>
<code>gulp js:build</code>      -  компиляция js <br>
<code>gulp pug:build</code>     -  компиляция pug<br>
<code>gulp css:comb</code>      -  "причесывание" css<br>
<code>gulp js:comb</code>        -  минификация js<br>
<code>gulp pug:comb</code>      -  "причесывание" pug и html<br>
<code>gulp fonts:build</code>   -  переносит папку src/fonts в dist/fonts <br>
<code>gulp images:build</code>  -  переносит папку src/images в dist/images <br>
<code>gulp images:optimize</code>  -  переносит папку src/images в dist/images <br>
<code>gulp svg-build</code>    -  генерирует svg спрайт из svg-иконок, находящихся в src/images/svg-separate. Вывод в виде html файла в <code>dist/images/sprite-result.html</code> <br>
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

Если вам нужно сделать градиенты для svg-спрайта, пишите код здесь: <code>src/pug/partails/stach/gradients.pug</code>.<br>
Он скомпилируется и войдет в результатирующий спрайт.

<br>

Задачи для компиляции и "причесывания" разделены в целях оптимизации скорости сборки.<br>
<br>

## Проблемы и планы

- При большом количестве pug файлов время компиляции заметно увеличивается. Если включить коспиляцию только корневых файлов <code>pug/*.pug</code>, появляется неудобство при разработке - для обновления страницы нужно сохранять корневой файл каждый раз.
- Сделать так чтобы .min файлы оставались такими в main.js (не путать с main.min.js). Сейчас идет сначала подключение импортов а потом код улучшается, в итоге все .min файлы разворачиваются. Это нужно убрать

