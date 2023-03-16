FROM maven:3.8.6-openjdk-18 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM gcr.io/distroless/java
WORKDIR /app
COPY --from=build /app/target/*.war app.war
EXPOSE 9000
ENTRYPOINT ["java", "-jar", "app.war"]
