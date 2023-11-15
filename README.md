# IceWall
Ett mycket elementärt webbhanteringsverktyg av Roland Stråberg, Stralberg Development

# Version 0.99
Utvecklingsversion

# Allmänt om koden

Trots att jag är väl bevandrad i OOP utvecklning har jag här valt att skippa det
och köra mer direkt. Några ord om mitt sätt att skriva denna kod

## Namngivning

Jag använder 'underscore' i namnen. Så tex. blir funktionsnamn i stil med 'get_that_parameter' istället för 'getThatParameter'. 
Detsamma gäller namn på variabler och argument. Versaler använder jag ENDAST för globala konstanter.

Programmet består av några övergripande komponenter som te.x

- Användare
- Sidor
- Innehåll
- Teman

På engelska skulle det då bli

- Users
- Pages
- Content
- Themes

Här jag valt följade strategi som gäller för dessa komponenter och i stort sett överallt så långt det är befogat.
Ett exempel: Allt som har med Users att göra får förkortningen 'usr_' i början vilket gör det enkelt att spåra 
vilka filer och rutiner som berör just Users. Det blir då med andra ord så här

- 'usr_'
- 'pg-'
- 'con_'
- 'th_'

Ja jag vet att man ska skriva ut namn och inte använda förkortningar, men det struntar jag i. 

I det mycket få ställen där jag använt en klass så har klassnamnet alltid en versal som första tecken

# Database

För att det här ska funka måst en databasanvändare skapas. 
Gör så här på servern

**~$ mysql -u root**
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 52028
Server version: 10.5.21-MariaDB-0+deb11u1 Debian 11

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

**MariaDB [(none)]> create user 'icewall'@'%' identified by 'Winterfall';**
Query OK, 0 rows affected (0,013 sec)

**MariaDB [(none)]> grant all privileges on *.* to 'icewall'@'%';**
Query OK, 0 rows affected (0,001 sec)

**MariaDB [(none)]> flush privileges;**
Query OK, 0 rows affected (0,003 sec)

**MariaDB [(none)]> exit;**

