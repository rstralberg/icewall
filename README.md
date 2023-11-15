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

## 




