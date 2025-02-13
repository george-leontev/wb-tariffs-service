import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve, dirname } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    global.appRootPath = dirname(resolve(__dirname));

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle('WB TARIFFS API')
        .setDescription('WB TARIFFS')
        .setVersion('1.0')
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
