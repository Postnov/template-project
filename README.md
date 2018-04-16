# template_build_project (v3)

Код в этой ветке до хорошего не тянет, со временем все приберу :-)<br>
В этой версии добавлены некоторые улучшения <br>
Эта ветка использует pug, scss <br>

Особенности:
------------
- Генерация критического css (генерируется в main.critical.min.css)
- Основной css подключается файлом loadCss.js (src/lib/loadCss.js)
- Bem-подобная файловая структура (каждый компонент содержит свои изображения, стили, скрипты)



Проблемы:
---------

- gulp-rigger испытывает трудности с таском js:blocks. Который генерирует js в папку blocks. Проблема возникает когда мы в js одного компонента, хотим подключить другой. Это довольно странно учитывая то что css:blocks отрабатывает нормально, хотя и делает тоже самое. Ох уж этот rigger.

- Критический css генерится отдельной задачей, вставлять в html его придется руками

Все пути находятся в объекте path в файле gulpfile.js <br>


Будьте внимательны с подключением файлов через gulp-rigger, в случае:<br>
- подключении файла, расширение которого отличается от расширения текущего файла<br>
- неправильном имени/пути файла<br>
- пустых символах в конце строки подключения<br>
rigger сбрасывает работу вашего watch таска.<br><br>

Если используете препроцессор css, при подключении css файла, измените его расширение на то, которое соостветствует расширению препроцессора (я заменил .css на .sass)<br><br>

Открыт <a href="https://github.com/Postnov/template_build_project/issues/1">issue</a><br>


Если есть предложения, пишите в личку, создавайте issue и pull request