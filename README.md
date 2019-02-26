# template-project


Шаблон проекта. <br>

## Особенности:
- SCSS
- Pug
- линтинг кода с eslint, конфигурация AirBnb
- Babel (возможность использовать es6)
- Возможность импорта js файлов (подробности подключения ниже)
- Компиляция и кэширование svg-спрайта

После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code>. Некоторые плагины могут не установиться со всеми, их нужно установить вручную.<br>


## Tasks:

<code>gulp pug:build</code>     -  компиляция pug<br>
<code>gulp pug:comb</code>      -  "причесывание" pug и html<br>
<code>gulp css:build</code>     -  компиляция scss<br>
<code>gulp css:comb</code>      -  "причесывание" css<br>
<code>gulp js:build</code>      -  компиляция js <br>
<code>gulp js:comb</code>        -  минификация js<br>
<code>gulp js:lint</code>        -  линтинг js<br>
<code>gulp js:lint --specific</code>        -  проверка конкретного файла или папки js (подробнее ниже)<br>
<code>gulp fonts:build</code>   -  переносит папку src/fonts в dist/fonts <br>
<code>gulp images:build</code>  -  переносит папку src/images в dist/images <br>
<code>gulp images:optimize</code>  -  оптимизирует изображения с помощью плагина tiny-png и кладет в dist/images <br>
<code>gulp svg-build</code>    -  генерирует svg спрайт из svg-иконок, находящихся в src/images/svg-separate. Вывод в виде html файла в <code>dist/images/sprite-result.html</code> <br>
<code>gulp build</code>         -  выполняет таск по сборке проекта (выполняет все такски по компиляции, конкатенации и переносу) <br>
<code>gulp watch</code>         -  команда слежения за файлами <br>
<code>gulp webserver</code>     -  запуск сервера <br>
<code>gulp clean</code>         -  удаление папки dist <br>
<code>gulp</code>               -  default таск для запуска всех таксков <br>


## Пути
Все пути находятся в объекте <code>path</code> в файле <code>gulpfile.js</code> <br>

Путь до файлов, которые вы хотите проверить с eslint можно изменить вФайлы для линтинга вы можете заменить в <code>path.scr.jsLint</code><br>

## Линтинг
Для того чтобы проверить конкретный файл или файлы в папке, введите в консоли:<br>
<code>gulp js:lint --specific'</code>и путь до вашего файла, по-умолчанию путь уже содержит 'src/js', вам нужно подставить лишь конечный путь или папку: <br>
<code>gulp js:lint --specific partails/common.js</code> - проверит файл по адресу 'src/js/partails/common.js'. <br>
Поддерживает ввод таких путей:
<code>gulp js:lint --specific partails/**/*.js</code> - проверит все js-файлы папки partails и все js-файлы подпапок.
<code>gulp js:lint --specific partails/*.js</code> - проверит все js-файлы папки partails.


## Подключение файлов
Все подключаемые части расположены в папках <code>partails/</code><br><br>
Подключение файлов:
- scss - <code>@import 'partails/header.scss';</code>
- pug  - <code>include partails/header.pug</code>
- js   - <code>//import('partails/app.js')</code>

<br>


### svg-sprite
Для того чтобы файлы попали в спрайт, положите их в <code>src/images/svg-separate</code>

Если вам нужно сделать градиенты для svg-спрайта, пишите код здесь: <code>src/pug/partails/stach/gradients.pug</code>.<br>
Он скомпилируется и войдет в результатирующий спрайт.

Задачи для компиляции и "причесывания" разделены в целях оптимизации скорости сборки.<br>

## Проблемы и планы

- При большом количестве pug файлов время компиляции заметно увеличивается. Если включить коспиляцию только корневых файлов <code>pug/*.pug</code>, появляется неудобство при разработке - для обновления страницы нужно сохранять корневой файл каждый раз.
- Сделать так чтобы .min файлы оставались такими в main.js (не путать с main.min.js). Сейчас идет сначала подключение импортов а потом код улучшается, в итоге все .min файлы разворачиваются. Это нужно убрать

