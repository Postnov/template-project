# template_build_project (v3)

Эта ветка использует pug, scss <br>

Особенности:
------------
- Генерация критического css (генерируется в main.critical.min.css)
- Основной css файл подключается файлом loadCss.js (src/lib/loadCss.js)
- Bem-подобная файловая структура (каждый компонент содержит свои изображения, стили, скрипты)


После скачивания или клонирования в командой строке необходимо установить все пакеты, выполните <code>npm i</code> <br>
После завершения установки у на имеется 10 команд (tasks):

<code>gulp css:build</code>    -  компиляция scss и генерация критического css<br>
<code>gulp css:critical</code> -  генерирует критический css, подробнее ниже<br>
<code>gulp js:build</code>     -  сборка js <br>
<code>gulp pug:build</code>    -  компиляция pug<br>
<code>gulp fonts:build</code>  -  переносит папку src/fonts в dist/fonts <br>
<code>gulp images:build</code> -  собирает файлы по папкам blocks/images и помещает в папку dist/images <br>

<code>gulp css:blocks</code>    -  собирает все .scss файлы из папки blocks, компилирует и переносит в dist/blocks<br>
<code>gulp js:blocks</code>     -  собирает все .js файлы из папки blocks, компилирует и переносит в dist/blocks<br>
<code>gulp pug:blocks</code>    -  собирает все .pug файлы из папки blocks, компилирует и переносит в dist/blocks<br>
<code>gulp images:blocks</code> -  собирает все файлы в папках blocks/image и дублирует их в папке dist/blocks/images<br>

<code>gulp build</code>        -  выполняет таск по сборке проекта (выполняет все такски по компиляции, конкатенации и переносу) <br>
<code>gulp watch</code>        -  команда слежения за файлами <br>
<code>gulp webserver</code>    -  запуск сервера <br>
<code>gulp clean</code>        -  удаление папки dist <br>
<code>gulp</code>              -  default таск для запуска всех таксков <br>


Все пути находятся в объекте <code>path</code> в файле <code>gulpfile.js</code> <br>

Все подключаемые части расположены в папках <code>partails/</code><br>
Подключение файлов:
- scss - <code>@import 'partails/header.scss';</code>
- pug  - <code>include partails/header.pug</code>
- js   - <code>//import('partails/app.js')</code> - используется плагин gulp-imports

<br>


Для указания критичкского css используется <code> critical: this; </code>, например:

<pre>
    body {
        critical: this;
        color: #000;
        font-size: 16px;
    }
</pre>

В итоге на выходе вы получите файл <code>"имя css фала".critical.min.css</code>, в котором будет содержаться css правила, отмеченные <code> critical: this; </code>, содержимое файла необходимо поставить в тег <code>style</code> в <code>head</code>:

<pre>
    &lthead&gt
        &ltstyle&gt
            body{color:#000;font-size:16px}
        &lt/style&gt
    &lt/head&gt
</pre>


Чтобы загружать остальной css-код страницы, используется скрипт src/js/partails/loadCss.js, который я уже подключил в <code>main.js</code>

В строке <br>
<code>l.href = 'css/main.css';</code> <br> - указывам имя css файла, который нужно загрузить асинхронно




Проблемы:
-----------

- критический css приходится ставить в <code>head -> style</code> вручную

- много точек для указания пути к файлам