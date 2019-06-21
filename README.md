# LAN_TOURNAMENT_DASHBOARD
Dashboard for tracking the tournaments with its points - CI and visual dashboard for 4:3 beamer


## Idea

We will have a LAN party where we want to display the tournaments with the points per person on a 4:3 beamer.
Adding tournaments, persons, points via CI to a database should be alright.
A basic react app which displays all given tournaments, each for a few seconds.

## Tech

Docker.
React in NodeJS.
Plus react-bootstrap
Use of browser localStorage.
Manipulating data via a basic UI under /admin.

## Data

Example:
```
{"LAN_Tournaments":"[{\"name\":\"Deathmatch Cod 2\",\"id\":1},{\"name\":\"Age 3\",\"id\":2}]","LAN_Participants":"[{\"name\":\"Kurt\",\"image\":\"http://ldap.aksw.org/pic/sn/Junghanns/gn/Kurt\",\"id\":1},{\"name\":\"Dan\",\"image\":\"https://tse3.mm.bing.net/th?id=OIP.qluDIseLh-ELyHjzI_8AiwHaKM&pid=Api\",\"id\":2},{\"name\":\"Test\",\"image\":\"https://ibin.co/4lMR4pDYGZNy.jpg\",\"id\":3}]","LAN_Games":"[{\"name\":\"CoD 2\",\"image\":\"https://tse4.mm.bing.net/th?id=OIP.N8Ti7Cb7RW8MqCxL4JULIAHaHa&pid=Api\",\"id\":1},{\"name\":\"Age of Empires 3\",\"image\":\"https://tse4.mm.bing.net/th?id=OIP.0qgQLhqSukuaoOm-rip_5AAAAA&pid=Api\",\"id\":2}]","LAN_Points":"[{\"tournament\":1,\"game\":1,\"participant\":1,\"value\":\"12\",\"id\":1,\"time\":1561113719862},{\"tournament\":1,\"game\":1,\"participant\":2,\"value\":\"14\",\"id\":2,\"time\":1561113725693},{\"tournament\":2,\"game\":2,\"participant\":1,\"value\":\"1\",\"id\":3,\"time\":1561113733124},{\"tournament\":2,\"game\":2,\"participant\":2,\"value\":\"3\",\"id\":4,\"time\":1561113738677},{\"tournament\":1,\"game\":1,\"participant\":1,\"value\":\"6\",\"id\":5,\"time\":1561115721762},{\"tournament\":2,\"game\":2,\"participant\":2,\"value\":\"4\",\"id\":6,\"time\":1561115785248}]"}
```

## Other

Each user and each game will have a name and an image URL.
If a user needs a personal image then imagebin.ca could be used.
