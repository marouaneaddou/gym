
import app                          from './app';
import { checkConfig, 
    config }                        from './config';
import { checkDataBaseConnection }  from './db/prisma';
import { setupSwagger }             from './docs/setup';


const port = config.port;

setupSwagger( app );

app.listen(port, async () => {
    checkConfig();
    await checkDataBaseConnection();
    console.log(`Example app listening on port http://localhost:${port}`);
    console.log( `Swagger is running at http://localhost:${port}/docs`);
});
