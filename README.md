# SERVER REST

### PER PETENA

> Sito per le web api https://livequest.herokuapp.com/ 
> l'elenco delle rotte le trovi più in fondo, tutte le rotte stanno sotto /api/

## Descrizione Progetto


> Votalo_app sarà un app web che permetterà a noi comuni mortali di dare il nostro parere su argomenti che potranno riguardare tutti i settori attualmente conosciuti, chiunque abbia creato un account sarà in grado di creare una nuova votazione per un argomento e creare le possibili risposte, gli utenti potranno votare e dare il loro parere, e se reputono necessario potranno ( se il creatore acconsente ) aggiungere una possibile risposta la quale potrà essere votata a sua volta da altri utenti, progettio distruggi tempo iniziato sia per una sfida personale sia per affinare le conoscenze. 
> Le tecnologie usate saranno
> - nodejs
> - vuejs o ejs ( a seconda di come mi sentirò quel giorno xD) *bootwach*


## Passi

Creare un nuovo npm project e installare tutti i Packages necessari

```bash
npm i --save express cors dotenv sequelize mariadb bcryptjs body-parser jsonwebtoken morgan helmet multer express-joi-validate redis

npm i --save-dev sequelize-cli nodemon
```

## Configurazione base

* [ X ] Lanciare il comando git init da bash
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

* [ X ] Table gallery
  * image ( per il momento è concesso solo immagini tramite url completo )
  * tipoImage ( può contenere: "url" o "base64", "default => "url")

## Generare rotte utente
* [ X ] /register (POST)
  * [ X ] gestire le password con crittografia
* [ X ] /login (POST)
  * [ X ] autenticazione e generazione token tecnologia jwt
* [ X ] /me (GET)
* [ X ] /me (PUT)
* [ X ] /me (DELETE)
* [] /:id (GET | id come parametro di ricerca)
  
