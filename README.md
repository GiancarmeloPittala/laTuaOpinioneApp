# SERVER REST

## Descrizione Progetto


> Votalo_app sarà un app web che permetterà a noi comuni mortali di dare il nostro parere su argomenti che potranno riguardare tutti i settori attualmente conosciuti, chiunque abbia creato un account sarà in grado di creare una nuova votazione per un argomento e creare le possibili risposte, gli utenti potranno votare e dare il loro parere, e se reputono necessario potranno ( se il creatore acconsente ) aggiungere una possibile risposta la quale potrà essere votata a sua volta da altri utenti, progettio distruggi tempo iniziato sia per una sfida personale sia per affinare le conoscenze. 
> Le tecnologie usate saranno
> - nodejs
> - vuejs o ejs ( a seconda di come mi sentirò quel giorno xD) *bootwach*


## Passi

Creare un nuovo npm project e installare tutti i Packages necessari

```bash
npm i --save express cors dotenv sequelize mariadb bcryptjs body-parser jsonwebtoken morgan helmet multer express-joi-validate

npm i --save-dev sequelize-cli nodemon
```

## Configurazione base

* [] Lanciare il comando git init da bash
* configurazione di base per il progetto
  * [ X ] .env
  * [ X ] sequelize init 
  * [ X ] configurazione per sequelize
  * [ X ] set app(cors)
  * [ X ] set app(body-parser)
  * [ X ] struttura file per la gestione rotte

## Generazione database per l'autenticazione

* [ X ] Table user
  * id
  * nome
  * username ( unique )
  * pass ( 60 char )
  * email ( unique )

## Generare rotte utente
* [ X ] /register (POST)
  * [ X ] gestire le password con crittografia
* [] /login (POST)
  * [] autenticazione e generazione token tecnologia jwt
* [] /me (GET)
* [] /:id (GET | id come parametro di ricerca)
  
