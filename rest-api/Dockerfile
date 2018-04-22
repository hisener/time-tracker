FROM maven:3.5.3-jdk-8

WORKDIR /usr/src/app

COPY . .
RUN mvn clean package

EXPOSE 8080
CMD java -jar target/*.jar
