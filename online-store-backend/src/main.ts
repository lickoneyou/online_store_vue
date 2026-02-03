import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Accept, Authorization",
  });

  const config = new DocumentBuilder()
    .setTitle("Online Store")
    .setDescription("Online Store Documentation")
    .setVersion("1.0.0")
    .addTag("online-store")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
