[![Build Status](https://travis-ci.org/euhoo/maps-server.svg?branch=master)](https://travis-ci.org/euhoo/maps-server)
[![Maintainability](https://api.codeclimate.com/v1/badges/14f52627a97148fd7ebd/maintainability)](https://codeclimate.com/github/euhoo/maps-server/maintainability)  
https://maps-server-euhoo.herokuapp.com/  

Тестовое задание.
Используя любой из современных javascript-фреймворков реализовать следующее приложение.  
На странице отобразить карту мира, на которой в течении минуты отобразить на карте 100 маркеров в случайных местах.  
Плюсом будет если маркеры будут только на суше.  
Плюсом будет реализация взаимодействия с сервером на node.js.  
  
Использую:  
Асинхронность(promises), AJAX(axios), React, кнопки bootstrap, websocket, server.io, lodash, CORS, deploy на heroku.com, другие ништяки js ES 6+ (spread, destructuring, стрелочные функции)
  
Комментарии:  
Сервер хранит массив координат.
При заходе каждого нового посетителя, делается 1 запрос и масив координат пополняется новыми элементами.  
Таким образом,чем дольше существует сервер,тем больше рандомнее значения.
Для поиска координат на суше взаимодействую сначала с ВК(получаю города), а потом с Яндекс(получаю готовые координаты).  
При получении новых координат они отправляются на сервер, сервер добавляет их в свой список и отправляет (только новые) обратно, где они добавляются к существующему массиву для отрисовки.  
По достижении заданного количества маркеров(по умолчанию 100), перерисовка перестанет добавлять маркеры.  
В файле constants задается количество точек и общее время отрисовки, а так же масштаб карты.  