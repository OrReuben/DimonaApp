# Client side for worker dashboard

The application is combined with 2 repositories, one for client and one for server.
this is the client side of the dashboard project.
It is meant to be used by a municipality workers in order to make their job easier.

## Table Of Contents <a name="Table"></a>
- [Table Of Contents](#Table)
- [How it works?](#why)
- [What options do I have on this website](#info)
- [How to run](#run)
- [Screenshots](#Screenshots)
- [Technologies](#Technologies)
- [Demo](#Demo)
- [What next](#next)


## How it works? <a name="why"></a>
This app contains 2 seperate websites, one for the city citizens, and one for the workers.
The citizen finds something that needs to be fixed in the city (alike a broken fence) and reports about it.
the report gets into the database and is being presented to the workers.
This app is the workers app - over here you can manage your work a lot easier.

## So how does it work and what are my tools? <a name="info"></a>
- Beautiful and easy to use UI
- Responsive design for both phone and PC users
- Secured user account using CryptoJS and JWT
- Automatically filtering data by the user credentials and profession - only workers with a certain profession gets certain tasks to do.
- Ability to work on ongoing reports, and finish them incase the task is completed.
- Automatically sends msgs to the user that posted the report regarding it being made.
- A fully functioning filtering for anything inside the task table
- An admin panel to add new users and view suggestions by the citizens - with the ability to reply to them by email.

## Running the project <a name="run"></a>
In the project directory, you can run:
Make sure to get into react-client branch - 

1.Clone the repo.

2.Run `npm install`.

3.run `npm start`

4.Navigate to `http://localhost:3000`.

## Screenshots <a name="Screenshots"></a>
log in

![alt text](https://i.postimg.cc/R0xrbYDW/image-1.png)

Home page with a fully functioning search engine across the site

![alt text](https://i.postimg.cc/qqRW3Hz5/image-2.png)

Quick access categories and products

![alt text](https://i.postimg.cc/6qmgVbZ5/image.png)

All products page can be sorted by whatever you desire and with pagination

![alt text](https://i.postimg.cc/TYBBpSGt/image2.png)

Product page with an ability to buy now or bid!


## Technologies <a name="Technologies"></a>
   Client:
   -ReactJS
   -Axios
   -Mui
   -ApexCharts
   -FramerMotion
   
   Server:
   -Node.js
   -express
   -mongoDB
   -mongoose
   -JWT
   -CryptoJS
   
   ## Demo <a name="Demo"></a>
   [Dimona Workers](https://dimona-hazards.netlify.app/)
   
## Whats next <a name="next"></a>
- [ ] add an option to send messages by phone and emails.
- [ ] connect it fully with the citizen app
- [ ] fix run time by sending less requests.

