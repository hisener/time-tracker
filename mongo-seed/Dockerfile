FROM mongo

WORKDIR /usr/src/app

COPY init.json ./init.json
CMD mongoimport --host mongodb --db timetracker --collection timeLog --type json --file ./init.json --jsonArray
